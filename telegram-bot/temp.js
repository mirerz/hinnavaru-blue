const { google } = require('googleapis');
require('dotenv').config();
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive.readonly']
});
const drive = google.drive({ version: 'v3', auth });
async function run() {
  try {
    const res = await drive.files.list({ q: "'1NSWIdP8eY0_Okk8xlKGpTg6TjAVGRWlN' in parents" });
    console.log(res.data.files);
  } catch(e) {
    console.error(e.message);
  }
}
run();
