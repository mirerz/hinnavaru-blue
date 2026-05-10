/**
 * HINNAVARU BLUE — MEDIA SYNC ENGINE
 * Optimized for robustness, speed, and clear logging.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const CMS_FILE_PATH = path.join(__dirname, '../src/data/cms.js');
const MEDIA_HUB_DIR = path.join(__dirname, '../public/deep-archives/media-hub');
const MANIFEST_PATH = path.join(__dirname, '../src/data/media-manifest.json');

// Ensure directories exist
if (!fs.existsSync(MEDIA_HUB_DIR)) {
  fs.mkdirSync(MEDIA_HUB_DIR, { recursive: true });
}

/**
 * Robustly parses the CMS config from the JS file
 */
function getCMSConfig() {
  try {
    const content = fs.readFileSync(CMS_FILE_PATH, 'utf8');
    const driveIdMatch = content.match(/["']?drive_id["']?:\s*["'](.+?)["']/);
    const botIdMatch = content.match(/["']?bot_uploads_id["']?:\s*["'](.+?)["']/);
    const docsIdMatch = content.match(/["']?docs_id["']?:\s*["'](.+?)["']/);
    const imagesIdMatch = content.match(/["']?images_id["']?:\s*["'](.+?)["']/);
    const vidsIdMatch = content.match(/["']?vids_id["']?:\s*["'](.+?)["']/);
    
    return {
      drive_id: driveIdMatch ? driveIdMatch[1] : null,
      bot_uploads_id: botIdMatch ? botIdMatch[1] : null,
      docs_id: docsIdMatch ? docsIdMatch[1] : null,
      images_id: imagesIdMatch ? imagesIdMatch[1] : null,
      vids_id: vidsIdMatch ? vidsIdMatch[1] : null
    };

  } catch (err) {
    console.error('❌ Error reading CMS config:', err.message);
    return {};
  }
}

async function sync() {
  console.log('--- Starting Media Sync from Google Drive ---');

  let auth;
  try {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || 
                           (fs.existsSync('service-account-key.json') ? fs.readFileSync('service-account-key.json', 'utf8') : null);
    
    if (!credentialsJson) throw new Error('No Google credentials found.');
    
    auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentialsJson),
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata'
      ],
    });

    console.log('✅ Authenticated with Service Account.');
  } catch (err) {
    console.error('❌ Authentication failed:', err.message);
    process.exit(1);
  }

  const drive = google.drive({ version: 'v3', auth });
  const config = getCMSConfig();
  const DRIVE_FOLDER_ID = config.drive_id;

  if (!DRIVE_FOLDER_ID) {
    console.error('❌ No drive_id found in cms.js');
    process.exit(1);
  }

  try {
    // A. Fetch All Files Recursively
    console.log(`🔍 Scanning folder: ${DRIVE_FOLDER_ID}...`);
    
    async function getAllFiles(folderId, pathMap = {}) {
      let results = [];
      let pageToken = null;
      
      do {
        const res = await drive.files.list({
          q: `'${folderId}' in parents and trashed = false`,
          fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, parents, size)',
          pageToken: pageToken,
          pageSize: 100,
        });
        
        for (const file of res.data.files || []) {
          if (file.mimeType === 'application/vnd.google-apps.folder') {
            console.log(`📂 Entering subfolder: ${file.name} (${file.id})`);
            
            // Determine category for this folder and its children
            let currentCategory = pathMap[folderId] || null;
            if (file.id === config.images_id) currentCategory = 'images';
            else if (file.id === config.vids_id) currentCategory = 'vids';
            else if (file.id === config.docs_id) currentCategory = 'docs';
            
            const subPathMap = { ...pathMap, [file.id]: currentCategory };
            const subFiles = await getAllFiles(file.id, subPathMap);
            results = results.concat(subFiles);
          } else {
            // Determine category for this file
            let category = pathMap[folderId] || null;
            if (file.parents?.includes(config.images_id)) category = 'images';
            else if (file.parents?.includes(config.vids_id)) category = 'vids';
            else if (file.parents?.includes(config.docs_id)) category = 'docs';
            
            console.log(`📄 Found file: ${file.name} | Category: ${category} | MIME: ${file.mimeType}`);
            results.push({ ...file, category });
          }
        }
        pageToken = res.data.nextPageToken;
      } while (pageToken);
      
      return results;
    }

    const allFilesMain = await getAllFiles(DRIVE_FOLDER_ID);
    let allFilesBot = [];
    if (config.bot_uploads_id) {
      console.log(`🔍 Scanning Bot Uploads: ${config.bot_uploads_id}...`);
      allFilesBot = await getAllFiles(config.bot_uploads_id);
      
      // MOVE LOGIC: Sort bot uploads into respective folders
      for (const file of allFilesBot) {
        let destFolderId = null;
        if (file.mimeType.startsWith('image/')) destFolderId = config.images_id;
        else if (file.mimeType.startsWith('video/')) destFolderId = config.vids_id;
        else if (file.mimeType === 'application/pdf') destFolderId = config.docs_id;

        if (destFolderId) {
          console.log(`🚚 Moving ${file.name} to designated HBI folder...`);
          try {
            const previousParents = file.parents.join(',');
            await drive.files.update({
              fileId: file.id,
              addParents: destFolderId,
              removeParents: previousParents,
              fields: 'id, parents',
            });
            // Update the category for local processing
            if (destFolderId === config.images_id) file.category = 'images';
            else if (destFolderId === config.vids_id) file.category = 'vids';
            else if (destFolderId === config.docs_id) file.category = 'docs';
          } catch (moveErr) {
            console.error(`❌ Failed to move ${file.name}:`, moveErr.message);
          }
        }
      }
    }

    const allFiles = [...allFilesMain, ...allFilesBot];

    console.log(`📦 Found ${allFiles.length} total files across all tracked folders.`);

    const stories = [];
    const manifest = [];

    // B. Process Files
    for (const file of allFiles) {
      // Skip GoPro junk and very large files
      const ext = path.extname(file.name).toLowerCase();
      if (['.lrv', '.thm'].includes(ext)) {
        console.log(`⏩ Skipping junk file: ${file.name}`);
        continue;
      }
      
      const fileSizeMB = parseInt(file.size || '0') / (1024 * 1024);
      if (fileSizeMB > 20 && !file.mimeType.startsWith('video/')) {
        console.log(`⏩ Skipping large file (>20MB): ${file.name}`);
        continue;
      }

      const categoryPrefix = file.category ? `${file.category}_` : '';
      const safeName = (categoryPrefix + file.name).replace(/[^a-z0-9.]/gi, '_');
      const outputPath = path.join(MEDIA_HUB_DIR, safeName);
      
      // Determine if it should be in Pulse/Stories
      const isStory = (file.category === 'images' || file.category === 'vids') || file.name.startsWith('STORY_');

      try {
        if (file.mimeType.startsWith('image/')) {
          const optimizedName = safeName.replace(/\.[^.]+$/, '.webp');
          const webpPath = path.join(MEDIA_HUB_DIR, optimizedName);

          if (!fs.existsSync(webpPath)) {
            console.log(`🖼️ Processing Image: ${file.name}...`);
            const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'arraybuffer' });
            await sharp(Buffer.from(response.data))
              .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(webpPath);
          }

          if (isStory) {
            stories.push({ type: 'photo', url: `/deep-archives/media-hub/${optimizedName}`, timestamp: file.modifiedTime });
          }
          manifest.push({ id: file.id, name: file.name, type: 'image', url: `/deep-archives/media-hub/${optimizedName}`, category: file.category });

        } else if (file.mimeType.startsWith('video/')) {
          const gdriveUrl = `https://drive.google.com/file/d/${file.id}/preview`;
          console.log(`🎥 Mapping Video to GDrive: ${file.name}...`);
          if (isStory) {
            stories.push({ type: 'video', url: gdriveUrl, timestamp: file.modifiedTime });
          }
          manifest.push({ id: file.id, name: file.name, type: 'video', url: gdriveUrl, category: file.category });

        } else if (file.mimeType === 'application/pdf') {
          const gdriveUrl = `https://drive.google.com/file/d/${file.id}/view?usp=sharing`;
          console.log(`📄 Mapping PDF to GDrive: ${file.name}...`);
          manifest.push({ id: file.id, name: file.name, type: 'pdf', url: gdriveUrl, category: file.category });
        }
      } catch (err) {
        console.error(`❌ Error processing ${file.name}:`, err.message);
      }
    }

    // C. Update LAGOON_STORIES in cms.js
    console.log(`📝 Syncing ${stories.length} items to Pulse/Stories...`);
    if (stories.length > 0) {
      stories.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      const latestStories = stories.slice(0, 12).map((s, idx) => ({
        id: `DRIVE-${idx}`,
        type: s.type,
        url: s.url,
        guardianId: 'GD-00',
        timestamp: s.timestamp,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }));

      const cmsContent = fs.readFileSync(CMS_FILE_PATH, 'utf8');
      // Safer regex that looks for the closing bracket at the end of the assignment
      const storiesRegex = /export const LAGOON_STORIES = \[[\s\S]*?\s*\]/;
      const newStoriesString = `export const LAGOON_STORIES = ${JSON.stringify(latestStories, null, 2)}`;
      
      const updatedCmsContent = cmsContent.replace(storiesRegex, newStoriesString);
      fs.writeFileSync(CMS_FILE_PATH, updatedCmsContent);
      console.log('✅ Pulse/Stories updated in cms.js');
    }

    // D. Update DOCUMENT_VAULTS in cms.js
    // Include both PDFs and images if they are in the 'docs' folder (scanned docs)
    const docs = allFiles.filter(f => f.category === 'docs' && (f.mimeType === 'application/pdf' || f.mimeType.startsWith('image/')));
    if (docs.length > 0) {
      console.log(`📝 Syncing ${docs.length} documents to Vault...`);
      const vaultItems = docs.map(f => {
        const isImage = f.mimeType.startsWith('image/');
        const gdriveUrl = `https://drive.google.com/file/d/${f.id}/view?usp=sharing`;
        const optimizedName = isImage ? f.name.replace(/[^a-z0-9.]/gi, '_').replace(/\.[^.]+$/, '.webp') : f.name.replace(/[^a-z0-9.]/gi, '_');
        
        return {
          icon: isImage ? '📸' : '📄',
          title: f.name.replace(/\.[^.]+$/, ''),
          type: isImage ? 'Scanned Doc' : 'Archive Doc',
          date: new Date(f.modifiedTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          category: 'Awareness',
          url: isImage ? `/deep-archives/media-hub/${optimizedName}` : gdriveUrl
        };
      });

      const cmsContent = fs.readFileSync(CMS_FILE_PATH, 'utf8');
      const vaultRegex = /export const DOCUMENT_VAULTS = \[[\s\S]*?\s*\]/;
      const newVaultString = `export const DOCUMENT_VAULTS = ${JSON.stringify(vaultItems, null, 2)}`;
      
      const updatedCmsContent = cmsContent.replace(vaultRegex, newVaultString);
      fs.writeFileSync(CMS_FILE_PATH, updatedCmsContent);
      console.log('✅ Document Vault updated in cms.js');
    }

    // E. Update Manifest
    const finalManifest = {
      last_sync: new Date().toISOString(),
      archives: manifest.map(m => m.url),
      slideshow: manifest.filter(m => m.type === 'image').slice(0, 10).map(m => m.url),
      hero_pulse: null,
      videos: manifest.filter(m => m.type === 'video').map(m => ({
        name: m.name,
        path: m.url,
        id: m.id
      })),
      pdfs: manifest.filter(m => m.type === 'pdf').map(m => ({
        name: m.name,
        path: m.url,
        id: m.id
      }))
    };

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(finalManifest, null, 2));
    console.log('✅ UI Manifest updated.');

    console.log('--- Sync Complete ---');
  } catch (err) {
    console.error('❌ Sync Error:', err.message);
    process.exit(1);
  }
}

sync();
