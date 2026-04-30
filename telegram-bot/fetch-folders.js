const { google } = require('googleapis');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

async function run() {
  const res = await drive.files.list({
    q: "'12yWK3lhwcqiTNV6yUS6Insgqhg9r9jx7' in parents and mimeType = 'application/vnd.google-apps.folder'",
  });
  console.log(res.data.files);
}

run().catch(console.error);
