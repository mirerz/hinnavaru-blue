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
  res.sendStatus(200);

  // 1. Handle Button Clicks (Callback Queries)
  if (req.body.callback_query) {
    const callback = req.body.callback_query;
    const adminChatId = callback.from.id.toString();
    const data = callback.data; // e.g., "approve:12345:Zoya Ahmed"

    if (data.startsWith('approve:')) {
      const parts = data.split(':');
      const targetChatId = parts[1];
      const targetName = parts[2];

      try {
        const { data: fileData } = await octokit.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH });
        const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8');
        const sha = fileData.sha;

        // Verify admin
        const adminRegex = /role:\s*'Lead Diver'.*?telegramId:\s*'([^']+)'/;
        const adminMatch = currentContent.match(adminRegex);
        if (!adminMatch || adminMatch[1] !== adminChatId) {
          return await sendTelegramMessage(adminChatId, '⛔ *Permission Denied*');
        }

        await sendTelegramMessage(adminChatId, `⏳ *Approving ${targetName}...*`);

        const targetRegex = new RegExp(`(name:\\s*'${targetName}'.*?telegramId:\\s*')([^']*)(')`);
        if (!targetRegex.test(currentContent)) {
           return await sendTelegramMessage(adminChatId, `❌ *Error: Guardian Not Found*`);
        }

        const updatedContent = currentContent.replace(targetRegex, `$1${targetChatId}$3`);

        await octokit.repos.createOrUpdateFileContents({
          owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH,
          message: `bot: admin approved telegram access for ${targetName}`,
          content: Buffer.from(updatedContent).toString('base64'),
          sha: sha, branch: 'main'
        });

        await sendTelegramMessage(adminChatId, `✅ *Approval Completed!*\n\n**${targetName}** is now linked to Chat ID \`${targetChatId}\`.\nI will notify them immediately.`);
        await sendTelegramMessage(targetChatId, `🎉 *Access Granted!*\nThe Hinnavaru Blue Initiator has approved your device.\nType /ticker <message> to post an update.`);

        // Acknowledge the callback alert (removes loading state on the button)
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, { callback_query_id: callback.id });
      } catch (e) {
        await sendTelegramMessage(adminChatId, `❌ *Error processing approval:* ${e.message}`);
      }
    }
    return;
  }

  // 2. Handle standard Messages
  const message = req.body.message;
  if (!message || !message.text) return;

  const chatId = message.chat.id.toString();
  const text = message.text.trim();
  const senderFirstName = message.from.first_name || 'Guardian';

  try {
    const { data: fileData } = await octokit.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH });
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8');
    const sha = fileData.sha;

    const adminRegex = /role:\s*'Lead Diver'.*?telegramId:\s*'([^']+)'/;
    const adminMatch = currentContent.match(adminRegex);
    const adminChatId = adminMatch ? adminMatch[1] : null;

    const guardianMatchRegex = new RegExp(`name:\\s*'([^']+)',\\s*role:\\s*'([^']+)',\\s*avatar:\\s*'([^']+)',\\s*telegramId:\\s*'${chatId}'`);
    const guardianMatch = currentContent.match(guardianMatchRegex);

    if (text === '/start') {
      if (guardianMatch) {
         return await sendTelegramMessage(chatId, `🌊 *Hinnavaru Blue Gateway*\nWelcome back, ${guardianMatch[1]}. You are authorized for live updates.`);
      } else {
        await sendTelegramMessage(chatId, `🌊 *Hinnavaru Blue Bot Online*\nHey ${senderFirstName}, your Chat ID is: \`${chatId}\`\n\nThe Hinnavaru Blue Initiator has been notified to approve your device.`);
        
        if (adminChatId && adminChatId !== 'ADMIN_CHAT_ID') {
          // Find unassigned guardians to create clever buttons
          const unassignedRegex = /name:\s*'([^']+)',[^}]+telegramId:\s*''/g;
          let match;
          const buttons = [];
          
          while ((match = unassignedRegex.exec(currentContent)) !== null) {
            const name = match[1];
            buttons.push([{ text: `✅ Approve as ${name}`, callback_data: `approve:${chatId}:${name}` }]);
          }

          if (buttons.length === 0) buttons.push([{ text: `No unassigned spots left`, callback_data: `ignore` }]);

          const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
          await axios.post(url, { 
            chat_id: adminChatId, 
            text: `⚠️ *Access Request*\n${senderFirstName} (Chat ID: \`${chatId}\`) is requesting clearance.\nTap a button below to bind them to a profile:`, 
            parse_mode: 'Markdown',
            reply_markup: { inline_keyboard: buttons }
          });
        }
        return;
      }
    }

    if (!guardianMatch) {
      return await sendTelegramMessage(chatId, '⛔ *Unauthorized*\nYou are not a registered Guardian authorized to update the live website.');
    }

    const [_, gName, gRole, gAvatar] = guardianMatch;
    const guardianIdMatch = currentContent.match(new RegExp(`id:\\s*'([^']+)',\\s*name:\\s*'${gName}'`));
    const gId = guardianIdMatch ? guardianIdMatch[1] : 'GD-00';

    // Phase 2: Multimedia Handling (Photos & Videos)
    if (message.photo || message.video) {
      await sendTelegramMessage(chatId, `⏳ *Receiving Intel...*\nVerifying logical file size and initiating secure upload to Deep Archives...`);
      
      let fileId = '';
      let fileType = '';
      let fileSize = 0;
      let extension = '';

      if (message.photo) {
        // Telegram sends multiple sizes; grab the largest one
        const photo = message.photo[message.photo.length - 1];
        fileId = photo.file_id;
        fileSize = photo.file_size;
        fileType = 'photo';
        extension = 'jpg';
      } else if (message.video) {
        fileId = message.video.file_id;
        fileSize = message.video.file_size;
        fileType = 'video';
        extension = 'mp4';
      }

      // Logical file size limit: 10MB (to prevent choking GitHub)
      if (fileSize > 10 * 1024 * 1024) {
        return await sendTelegramMessage(chatId, `❌ *Upload Failed*\nFile size is ${(fileSize/1024/1024).toFixed(1)}MB. HBI protocol limits direct uploads to 10MB per file to maintain global server speed. Compress the file and try again.`);
      }

      try {
        // Step 1: Get File Path from Telegram
        const fileRes = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
        const filePath = fileRes.data.result.file_path;

        // Step 2: Download File Buffer
        const downloadRes = await axios.get(`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(downloadRes.data);
        
        // Step 3: Archive to GitHub -> public/deep-archives/
        const timestampMarker = Date.now();
        const archFileName = `archive_${timestampMarker}.${extension}`;
        const renderPath = `/deep-archives/${archFileName}`;

        await octokit.repos.createOrUpdateFileContents({
          owner: REPO_OWNER, repo: REPO_NAME, path: `public/deep-archives/${archFileName}`,
          message: `bot: deep-archive upload ${archFileName} by ${gName}`,
          content: fileBuffer.toString('base64'),
          branch: 'main'
        });

        await sendTelegramMessage(chatId, `✅ *File Archived Successfully!*\nInjecting visual data into the Live Updates (In Action) matrix...`);

        // Step 4: Inject into LAGOON_STORIES in cms.js
        const now = new Date();
        const expiry = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days active
        
        const newStory = `\n  { \n    id: 'ST-${timestampMarker}', \n    type: '${fileType}', \n    url: '${renderPath}', \n    guardianId: '${gId}', \n    timestamp: '${now.toISOString()}', \n    expiryDate: '${expiry.toISOString()}' \n  },`;
        
        const storyTarget = 'export const LAGOON_STORIES = [';
        const updatedContent = currentContent.replace(storyTarget, storyTarget + newStory);

        await octokit.repos.createOrUpdateFileContents({
          owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH,
          message: `bot: guardian ${gName} live visual update`,
          content: Buffer.from(updatedContent).toString('base64'),
          sha: sha, branch: 'main'
        });

        await sendTelegramMessage(chatId, `🎉 *Success! Visual Live Update Committed.*\n\n*${gName} (${gRole})*\nIt will materialize on the 'In Action' pulse tracker in 60s.`);
        return;
      } catch (err) {
        console.error(err);
        return await sendTelegramMessage(chatId, `❌ *Upload Failure*\nThe deep archive relay failed. Error: ${err.message}`);
      }
    }

    if (text.startsWith('/ticker ')) {
      const updateText = text.replace('/ticker ', '').trim();
      if (updateText.length < 5) return await sendTelegramMessage(chatId, '❌ Update text is too short. Please provide a full sentence.');

      await sendTelegramMessage(chatId, `⏳ *Initiating Website Update...*\nAuthenticating as ${gName} (${gRole})...`);
      
      const injectionTarget = 'export const NOTICE_BOARD = [';
      const newEntry = `\n  { icon: '${gAvatar}', type: 'Guardian Log', text: '${updateText.replace(/'/g, "\\'")}' },`;
      const updatedContent = currentContent.replace(injectionTarget, injectionTarget + newEntry);

      if (updatedContent === currentContent) throw new Error('Target string not found inside cms.js');

      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH,
        message: `bot: guardian ${gName} live update from Telegram`,
        content: Buffer.from(updatedContent).toString('base64'),
        sha: sha, branch: 'main'
      });

      await sendTelegramMessage(chatId, `✅ *Success! Update Committed.*\n\n*${gName} (${gRole})*\n"${updateText}"\n\nIt revolves live on \`hinnavarublueinitiative.org\` in 60s.`);
    } else if (text === '/start') {
      // Ignored here since handled above
    } else {
      await sendTelegramMessage(chatId, `🛠️ *Guardian Dashboard: ${gName}*\n\n\`/ticker <message>\` - Text broadcast to the live ticker.\n\n📸 🎥 **Upload Visuals:** Simply send a Photo or Video to me directly (under 10MB). It will automatically be committed to the Deep Archives and broadcasted to the 'In Action' live UI section!`);
    }

  } catch (error) {
    console.error(error);
    await sendTelegramMessage(chatId, `❌ *Critical System Failure*\nFailed to connect. Error: ${error.message}`);
  }
});

// Health check endpoint
app.get('/', (req, res) => res.send('Hinnavaru Guardian Telegram Bot Secure Webhook Online'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Telegram Guardian Bot Hook running on port ${port}`);
});
