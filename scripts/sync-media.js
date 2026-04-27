/**
 * HINNAVARU BLUE — MEDIA SYNC AUTOMATION
 * --------------------------------------
 * This script connects to the HBI Google Drive and synchronizes high-resolution
 * media to the local web environment, optimizing images to WebP format.
 * 
 * Folder ID: 12yWK3lhwcqiTNV6yUS6Insgqhg9r9jx7
 */

import { google } from 'googleapis';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. CONFIGURATION
const CMS_FILE_PATH = path.join(__dirname, '../src/data/cms.js');

function getDriveIdFromCMS() {
  try {
    const content = fs.readFileSync(CMS_FILE_PATH, 'utf8');
    const match = content.match(/drive_id:\s*["'](.+?)["']/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

const OUTPUT_DIR = path.join(__dirname, '../public/media-hub');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
const MANIFEST_PATH = path.join(__dirname, '../src/data/media-manifest.json');

  // 2. INITIALIZE DRIVE API
  // Note: Supports both service-account-key.json OR GOOGLE_SERVICE_ACCOUNT_JSON env var.
  async function sync() {
    console.log('--- Starting Media Sync from Google Drive ---');

    let authConfig;
    const keyPath = path.join(__dirname, '../service-account-key.json');

    if (fs.existsSync(keyPath)) {
      console.log('✅ Using service-account-key.json from disk.');
      authConfig = {
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      };
    } else if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      console.log('✅ Using credentials from GOOGLE_SERVICE_ACCOUNT_JSON env var.');
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      authConfig = {
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      };
    } else {
      console.error('❌ Error: No credentials found.');
      console.log('   Please place service-account-key.json in root OR set GOOGLE_SERVICE_ACCOUNT_JSON env var.');
      console.log('   See TECHNICAL_GUIDE.md for setup instructions.');
      return;
    }

    const auth = new google.auth.GoogleAuth(authConfig);
    const drive = google.drive({ version: 'v3', auth });

  try {
    // A. Improved Search: Recursive File Retrieval
    async function getAllFiles(folderId) {
      let results = [];
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType, modifiedTime)',
      });
      
      for (const file of res.data.files || []) {
        if (file.mimeType === 'application/vnd.google-apps.folder') {
          console.log(`📂 Entering subfolder: ${file.name}`);
          const subFiles = await getAllFiles(file.id);
          results = results.concat(subFiles);
        } else {
          results.push(file);
        }
      }
      return results;
    }

    const DRIVE_FOLDER_ID = getDriveIdFromCMS() || '12yWK3lhwcqiTNV6yUS6Insgqhg9r9jx7';
    const files = await getAllFiles(DRIVE_FOLDER_ID);
    
    if (!files?.length) {
      console.log('No files found in Drive.');
      return;
    }

    const manifest = {
      last_sync: new Date().toISOString(),
      archives: [],
      slideshow: [],
      hero_pulse: null
    };

    // B. Process Each File
    for (const file of files) {
      console.log(`Processing: ${file.name}...`);
      
      const isImage = file.mimeType.startsWith('image/');
      const isVideo = file.mimeType === 'video/mp4' || file.mimeType === 'video/quicktime';

      if (isImage) {
        // Optimize and Download Image
        const cleanName = file.name.replace(/\.[^/.]+$/, "");
        const outputFilename = cleanName + '.webp';
        const destPath = path.join(OUTPUT_DIR, outputFilename);
        
        try {
          const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' });
          await new Promise((resolve, reject) => {
            response.data
              .pipe(sharp().webp({ quality: 85 }))
              .pipe(fs.createWriteStream(destPath))
              .on('finish', resolve)
              .on('error', reject);
          });

          // Grouping logic:
          // 1. Everything goes to archives except logo
          if (!file.name.toLowerCase().includes('logo')) {
            manifest.archives.push(outputFilename);
          }
          
          // 2. Specific project slides go to slideshow
          const isProjectSlide = file.name.startsWith('PROJ_SLIDE_') || 
                                ['Project-Progs', 'Living-L', 'Born-Lagoon', 'Blue-Registry'].some(n => file.name.includes(n));
          
          if (isProjectSlide) {
            manifest.slideshow.push(outputFilename);
          }
        } catch (downloadErr) {
          console.error(`❌ Failed to process image ${file.name}: ${downloadErr.message}`);
        }
      }

      if (isVideo || file.name.toLowerCase().endsWith('.lrv')) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "");
        const outputFilename = cleanName + (file.name.toLowerCase().endsWith('.lrv') ? '.lrv' : '.mp4');
        const destPath = path.join(OUTPUT_DIR, outputFilename);
        
        try {
          // Special handling for HERO_PULSE (always latest)
          const isPulse = file.name.includes('HERO_PULSE') || file.name.includes('pulse-update');
          const finalDest = isPulse ? path.join(OUTPUT_DIR, 'HERO_PULSE_LATEST.mp4') : destPath;

          const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' });
          await new Promise((resolve, reject) => {
            response.data
              .pipe(fs.createWriteStream(finalDest))
              .on('finish', resolve)
              .on('error', reject);
          });
          
          if (isPulse) {
            manifest.hero_pulse = '/media-hub/HERO_PULSE_LATEST.mp4';
          } else {
            if (!manifest.videos) manifest.videos = [];
            manifest.videos.push({
              name: file.name,
              path: '/media-hub/' + outputFilename,
              id: file.id
            });
          }
          console.log(`✅ Synced Video: ${file.name}`);
        } catch (downloadErr) {
          console.error(`❌ Failed to process video ${file.name}: ${downloadErr.message}`);
        }
      }

      if (file.mimeType === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const outputFilename = file.name.replace(/\s+/g, '_');
        const destPath = path.join(OUTPUT_DIR, outputFilename);
        try {
          const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' });
          await new Promise((resolve, reject) => {
            response.data
              .pipe(fs.createWriteStream(destPath))
              .on('finish', resolve)
              .on('error', reject);
          });
          if (!manifest.pdfs) manifest.pdfs = [];
          manifest.pdfs.push({
            name: file.name,
            path: '/media-hub/' + outputFilename,
            id: file.id
          });
          console.log(`✅ Synced PDF: ${file.name}`);
        } catch (downloadErr) {
          console.error(`❌ Failed to process PDF ${file.name}: ${downloadErr.message}`);
        }
      }
    }

    // C. Write Manifest
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log('--- Sync Complete! Manifest Updated ---');

  } catch (err) {
    console.error('❌ Sync failed with error:');
    console.error(err.message || err);
    process.exit(1); // Force GitHub Action to show failure
  }
}

// Run if called directly
sync();
