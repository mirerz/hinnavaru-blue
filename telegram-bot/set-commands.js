require('dotenv').config();
const axios = require('axios');
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.argv[2];

async function setCommands() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`;
  const commands = [
    { command: 'menu', description: 'Show the Main Menu' },
    { command: 'sync', description: 'Trigger Google Drive Sync (Admins)' }
  ];

  try {
    const response = await axios.post(url, { commands });
    console.log("✅ Commands successfully set:", response.data);
  } catch (err) {
    console.error("❌ Error setting commands:", err.response ? err.response.data : err.message);
  }
}

setCommands();
