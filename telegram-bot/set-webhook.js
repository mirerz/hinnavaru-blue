require('dotenv').config();
const axios = require('axios');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.argv[3];
const WEBHOOK_URL = process.argv[2];

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is not set in your .env file or environment variables.");
  process.exit(1);
}

if (!WEBHOOK_URL) {
  console.error("❌ Please provide the webhook URL.");
  console.error("Usage: node set-webhook.js https://your-public-url.com/webhook");
  process.exit(1);
}

async function setWebhook() {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
    const response = await axios.post(url, { url: WEBHOOK_URL });
    console.log("✅ Webhook successfully set:", response.data);
  } catch (err) {
    console.error("❌ Error setting webhook:", err.response ? err.response.data : err.message);
  }
}

setWebhook();
