/**
 * HINNAVARU BLUE — MEDIA SYNC AUTOMATION
 * --------------------------------------
 * This script connects to the HBI Google Drive and synchronizes high-resolution
 * media to the local web environment, optimizing images to WebP format.
 * 
 * Folder ID: 1RButp5B8quSmH1NEA6E9N8YD_uIkxtE_
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

const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID || getDriveIdFromCMS() || '1RButp5B8quSmH1NEA6E9N8YD_uIkxtE_';
const OUTPUT_DIR = path.join(__dirname, '../public/media-hub');
const MANIFEST_PATH = path.join(__dirname, '../src/data/media-manifest.json');

// 2. INITIALIZE DRIVE API
// Note: Requires a service-account-key.json in the root directory.
async function sync() {
  console.log('--- Starting Media Sync from Google Drive ---');

  // Verify key exists
  if (!fs.existsSync(path.join(__dirname, '../service-account-key.json'))) {
     console.error('Error: service-account-key.json not found. Please provide credentials.');
     return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: './service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    // A. List Files
    const res = await drive.files.list({
      q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, modifiedTime)',
    });

    const files = res.data.files;
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
      const isVideo = file.mimeType === 'video/mp4';

      if (isImage) {
        // Optimize and Download Image
        const destPath = path.join(OUTPUT_DIR, file.name.replace(/\.[^/.]+$/, "") + '.webp');
        
        // Download logic using stream
        const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' });
        
        // Pipeline: Drive Stream -> Sharp (WebP) -> File Stream
        await new Promise((resolve, reject) => {
          response.data
            .pipe(sharp().webp({ quality: 90 }))
            .pipe(fs.createWriteStream(destPath))
            .on('finish', resolve)
            .on('error', reject);
        });

        // Add to manifest
        if (file.name.startsWith('HBF-')) manifest.archives.push(file.name.replace(/\.[^/.]+$/, "") + '.webp');
        if (file.name.startsWith('PROJ_SLIDE_')) manifest.slideshow.push(file.name.replace(/\.[^/.]+$/, "") + '.webp');
      }

      if (isVideo && file.name === 'HERO_PULSE_LATEST.mp4') {
        const destPath = path.join(OUTPUT_DIR, file.name);
        const response = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' });
        
        await new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(destPath))
            .on('finish', resolve)
            .on('error', reject);
        });
        manifest.hero_pulse = file.name;
      }
    }

    // C. Write Manifest
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log('--- Sync Complete! Manifest Updated ---');

  } catch (err) {
    console.error('Sync failed:', err);
  }
}

// Run if called directly
sync();
