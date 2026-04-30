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
    ROOT: '12yWK3lhwcqiTNV6yUS6Insgqhg9r9jx7',
    DOCS: '1NGwKXGaQs0S7hMLTJd5nhz_DboPas0Bw',
    IMAGES: '1vbeY96DGn3aXshplZjmzsERlNG72KRbs',
    VIDS: '1JDy0lTHiP2c-7KI4SlWGHR9Wbzly9FjG'
  }
};
