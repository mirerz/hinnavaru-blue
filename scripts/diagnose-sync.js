/**
 * HINNAVARU BLUE — SYNC DIAGNOSTICS
 * --------------------------------
 * Use this script to test if the Service Account can reach the Google Drive
 * and list files, without attempting to download or process them.
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function diagnose() {
  console.log('🔍 Starting Sync Diagnosis...');

  const keyPath = path.join(__dirname, '../service-account-key.json');
  let authConfig;

  if (fs.existsSync(keyPath)) {
    console.log('✅ Found service-account-key.json on disk.');
    authConfig = {
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    };
  } else if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    console.log('✅ Found GOOGLE_SERVICE_ACCOUNT_JSON env var.');
    authConfig = {
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    };
  } else {
    console.error('❌ No credentials found.');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth(authConfig);
    const drive = google.drive({ version: 'v3', auth });

    // Try to get folder info
    const folderId = '12yWK3lhwcqiTNV6yUS6Insgqhg9r9jx7';
    console.log(`Checking folder: ${folderId}`);
    
    const folder = await drive.files.get({ fileId: folderId, fields: 'name' });
    console.log(`✅ Connection Successful! Folder name: "${folder.data.name}"`);

    async function listRecursive(id, indent = '   ') {
      const res = await drive.files.list({
        q: `'${id}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType)',
      });
      const files = res.data.files;
      if (files?.length) {
        for (const f of files) {
          console.log(`${indent}- [${f.mimeType}] ${f.name} (ID: ${f.id})`);
          if (f.mimeType === 'application/vnd.google-apps.folder') {
            await listRecursive(f.id, indent + '  ');
          }
        }
      }
    }

    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
    });

    const files = res.data.files;
    if (files?.length) {
      console.log(`✅ Found ${files.length} items in root:`);
      for (const f of files) {
        console.log(`   - [${f.mimeType}] ${f.name} (ID: ${f.id})`);
        if (f.mimeType === 'application/vnd.google-apps.folder') {
          await listRecursive(f.id, '     ');
        }
      }
    } else {
      console.log('⚠️ No files found in root. Check permissions.');
    }

  } catch (err) {
    console.error('❌ Diagnosis Failed:');
    console.error(err.message);
    if (err.message.includes('404')) {
      console.log('👉 Tip: Ensure the folder ID is correct and shared with the service account.');
    }
  }
}

diagnose();
