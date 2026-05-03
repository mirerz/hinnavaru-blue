const { Octokit } = require('@octokit/rest');
const { google } = require('googleapis');

const GITHUB_TOKEN = process.env.GITHUB_PAT;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

const getDriveClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  return google.drive({ version: 'v3', auth });
};

module.exports = {
  octokit,
  getDriveClient,
  REPO_OWNER: 'mirerz',
  REPO_NAME: 'hinnavaru-blue',
  CMS_PATH: 'src/data/cms.js',
  DRIVE_FOLDERS: {
    ROOT: '1NSWIdP8eY0_Okk8xlKGpTg6TjAVGRWlN',
    DOCS: '1C2QtUsCsh25-erxxwtpXTNq8z8b_47h4',
    IMAGES: '1TBjSCthn9HHo8-DRYKo-pRtO9XvfIsjB',
    VIDS: '1GrRY4Z-KFyfgfQ6NCEkqtf71G2K1av2A'
  }
};
