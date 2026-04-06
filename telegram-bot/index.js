const express = require('express');
const { Octokit } = require('@octokit/rest');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_PAT;
const REPO_OWNER = 'mirerz';
const REPO_NAME = 'hinnavaru-blue';
const CMS_PATH = 'src/data/cms.js';

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Method to send Telegram replies
async function sendTelegramMessage(chatId, text) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(url, { chat_id: chatId, text: text, parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}

app.post('/webhook', async (req, res) => {
  // Acknowledge receipt to Telegram immediately
  res.sendStatus(200);

  const message = req.body.message;
  if (!message || !message.text) return;

  const chatId = message.chat.id.toString();
  const text = message.text.trim();

  // Handle identification command
  if (text === '/start') {
    return await sendTelegramMessage(chatId, `🌊 *Hinnavaru Blue Bot Online*\nYour Chat ID is: \`${chatId}\`\n\nIf you are a Guardian, provide this ID to the system admin to be added to the registry in \`cms.js\`.`);
  }

  try {
    // 1. Fetch current file
    const { data: fileData } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: CMS_PATH,
    });

    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8');
    const sha = fileData.sha;

    // 2. Identify Guardian using Regex to extract APPROVED_GUARDIANS block
    const guardianMatchRegex = new RegExp(`name:\\s*'([^']+)',\\s*role:\\s*'([^']+)',\\s*avatar:\\s*'([^']+)',\\s*telegramId:\\s*'${chatId}'`);
    const guardianMatch = currentContent.match(guardianMatchRegex);

    if (!guardianMatch) {
      return await sendTelegramMessage(chatId, '⛔ *Unauthorized*\nYou are not a registered Guardian authorized to update the live website. Ensure your Chat ID is in `cms.js`.');
    }

    const [_, gName, gRole, gAvatar] = guardianMatch;

    // Handle Commands
    if (text.startsWith('/ticker ')) {
      const updateText = text.replace('/ticker ', '').trim();
      if (updateText.length < 5) return await sendTelegramMessage(chatId, '❌ Update text is too short. Please provide a full sentence.');

      await sendTelegramMessage(chatId, `⏳ *Initiating Website Update...*\nAuthenticating as ${gName} (${gRole})...`);
      
      // Inject new ticker update into NOTICE_BOARD array
      const injectionTarget = 'export const NOTICE_BOARD = [';
      const newEntry = `\n  { icon: '${gAvatar}', type: 'Guardian Log', text: '${updateText.replace(/'/g, "\\'")}' },`;
      
      const updatedContent = currentContent.replace(injectionTarget, injectionTarget + newEntry);

      if (updatedContent === currentContent) {
        throw new Error('Could not find NOTICE_BOARD injection target in cms.js');
      }

      // 3. Commit new file
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: CMS_PATH,
        message: `bot: guardian ${gName} live update from Telegram`,
        content: Buffer.from(updatedContent).toString('base64'),
        sha: sha,
        branch: 'main'
      });

      await sendTelegramMessage(chatId, `✅ *Success! Update Committed.*\n\n*${gName} (${gRole})*\n"${updateText}"\n\nGitHub Actions is now rebuilding the secure server. Your update will be globally visible on \`hinnavarublueinitiative.org\` in approx 60 seconds.`);

    } else {
      // Help Message
      await sendTelegramMessage(chatId, `🛠️ *Guardian Dashboard: ${gName}*\n\nAvailable Directives:\n\n\`/ticker <message>\` - Broadcasts a live feed update instantly to the globally visible homepage ticker.\n\n*Note:* More commands coming online soon.`);
    }

  } catch (error) {
    console.error(error);
    await sendTelegramMessage(chatId, `❌ *Critical System Failure*\nFailed to commit update. Error: ${error.message}`);
  }
});

// Health check endpoint
app.get('/', (req, res) => res.send('Hinnavaru Guardian Telegram Bot Secure Webhook Online'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Telegram Guardian Bot Hook running on port ${port}`);
});
