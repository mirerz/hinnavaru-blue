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
const MANIFEST_PATH = path.join(MEDIA_HUB_DIR, 'manifest.json');

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
    const imagesIdMatch = content.match(/["']?images_id["']?:\s*["'](.+?)["']/);
    const vidsIdMatch = content.match(/["']?vids_id["']?:\s*["'](.+?)["']/);
    const docsIdMatch = content.match(/["']?docs_id["']?:\s*["'](.+?)["']/);

    return {
      drive_id: driveIdMatch ? driveIdMatch[1] : null,
      images_id: imagesIdMatch ? imagesIdMatch[1] : null,
      vids_id: vidsIdMatch ? vidsIdMatch[1] : null,
      docs_id: docsIdMatch ? docsIdMatch[1] : null
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
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
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

    const allFiles = await getAllFiles(DRIVE_FOLDER_ID);
    console.log(`📦 Found ${allFiles.length} total files.`);

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

      const safeName = file.name.replace(/[^a-z0-9.]/gi, '_');
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
          if (!fs.existsSync(outputPath)) {
            console.log(`🎥 Syncing Video: ${file.name}...`);
            const dest = fs.createWriteStream(outputPath);
            const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'arraybuffer' });
            fs.writeFileSync(outputPath, Buffer.from(response.data));
          }

          if (isStory) {
            stories.push({ type: 'video', url: `/deep-archives/media-hub/${safeName}`, timestamp: file.modifiedTime });
          }
          manifest.push({ id: file.id, name: file.name, type: 'video', url: `/deep-archives/media-hub/${safeName}`, category: file.category });

        } else if (file.mimeType === 'application/pdf') {
          if (!fs.existsSync(outputPath)) {
            console.log(`📄 Syncing PDF: ${file.name}...`);
            const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'arraybuffer' });
            fs.writeFileSync(outputPath, Buffer.from(response.data));
          }
          manifest.push({ id: file.id, name: file.name, type: 'pdf', url: `/deep-archives/media-hub/${safeName}`, category: file.category });
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
        const optimizedName = isImage ? f.name.replace(/[^a-z0-9.]/gi, '_').replace(/\.[^.]+$/, '.webp') : f.name.replace(/[^a-z0-9.]/gi, '_');
        
        return {
          icon: isImage ? '📸' : '📄',
          title: f.name.replace(/\.[^.]+$/, ''),
          type: isImage ? 'Scanned Doc' : 'Archive Doc',
          date: new Date(f.modifiedTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          category: 'Awareness',
          url: `/deep-archives/media-hub/${optimizedName}`
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
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify({
      last_sync: new Date().toISOString(),
      assets: manifest
    }, null, 2));
    console.log('✅ Manifest updated.');

    console.log('--- Sync Complete ---');
  } catch (err) {
    console.error('❌ Sync Error:', err.message);
    process.exit(1);
  }
}

sync();
