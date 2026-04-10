const express = require('express');
const { Octokit } = require('@octokit/rest');
const axios = require('axios');
const { google } = require('googleapis');
const cron = require('node-cron');
const Parser = require('rss-parser');
const parser = new Parser();

const app = express();
app.use(express.json());

const knowledgeBase = require('./knowledge_base');

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_PAT;
const REPO_OWNER = 'mirerz';
const REPO_NAME = 'hinnavaru-blue';
const CMS_PATH = 'src/data/cms.js';
const MANIFEST_PATH = 'src/data/media-manifest.json';
const DRIVE_FOLDER_ID = '1cLa1IO9Q0r1Q0EiLgqNiAqiLooVZfxOD';

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Session state management
const pendingMedia = {}; 

// Google Drive Sync Engine
async function syncGoogleDriveToGitHub() {
  console.log('🔄 Initiating Google Drive background sync...');
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
    const drive = google.drive({ version: 'v3', auth });

    // 1. List files in the Drive folder
    const res = await drive.files.list({
      q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
    });
    const driveFiles = res.data.files;

    // 2. Get current manifest from GitHub
    const { data: manifestFile } = await octokit.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: MANIFEST_PATH });
    const manifest = JSON.parse(Buffer.from(manifestFile.content, 'base64').toString());

    let updated = false;
    const newArchives = [...manifest.archives];

    for (const file of driveFiles) {
      if (!newArchives.includes(file.name)) {
        console.log(`📦 New file detected in Drive: ${file.name}`);
        
        // Download from Drive
        const driveRes = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'arraybuffer' });
        const fileContent = Buffer.from(driveRes.data);

        // Upload to GitHub
        await octokit.repos.createOrUpdateFileContents({
          owner: REPO_OWNER, repo: REPO_NAME,
          path: `public/deep-archives/${file.name}`,
          message: `admin: sync ${file.name} from Google Drive`,
          content: fileContent.toString('base64'),
          branch: 'main'
        });

        newArchives.push(file.name);
        updated = true;
      }
    }

    if (updated) {
      manifest.archives = newArchives;
      manifest.last_sync = new Date().toISOString();
      
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER, repo: REPO_NAME, path: MANIFEST_PATH,
        message: 'admin: update media-manifest from Drive sync',
        content: Buffer.from(JSON.stringify(manifest, null, 2)).toString('base64'),
        sha: manifestFile.sha,
        branch: 'main'
      });
      console.log('✅ Media manifest updated successfully.');
    } else {
      console.log('✨ Archive is already up to date.');
    }
  } catch (err) {
    console.error('❌ Sync Error:', err.message);
  }
}

// Helper for Info Menu
async function showInfoMenu(chatId) {
  const buttons = Object.keys(knowledgeBase.categories).map(key => [
    { text: knowledgeBase.categories[key].title, callback_data: `know:${key}` }
  ]);
  
  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: chatId,
    text: '📚 *Hinnavaru Blue Intelligence Matrix*\nSelect a topic to retrieve from the Deep Archives:',
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: buttons }
  });
}

// Schedule sync every 30 minutes
cron.schedule('*/30 * * * *', () => {
  syncGoogleDriveToGitHub();
});

// RSS Environmental News Sync Engine
async function syncRSSToGitHub() {
  console.log('📡 Fetching global environmental intelligence...');
  try {
    const feed = await parser.parseURL('https://news.un.org/feed/subscribe/en/news/topic/climate-change/feed/rss.xml');
    
    const { data: fileData } = await octokit.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH });
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8');
    const sha = fileData.sha;

    // Pick 2 latest items
    const latestItems = feed.items.slice(0, 2).map(item => ({
      icon: '🌍',
      type: 'Global News',
      text: `${item.title} (${new URL(item.link).hostname})`
    }));

    let updatedContent = currentContent;
    const injectionTarget = 'export const NOTICE_BOARD = [';

    latestItems.forEach(item => {
      // Check if item already exists to avoid duplicates
      if (!currentContent.includes(item.text)) {
        const newEntry = `\n  { icon: '${item.icon}', type: '${item.type}', text: '${item.text.replace(/'/g, "\\'")}' },`;
        updatedContent = updatedContent.replace(injectionTarget, injectionTarget + newEntry);
      }
    });

    if (updatedContent !== currentContent) {
      // Keep only latest 10 entries to prevent file bloat
      const boardMatch = updatedContent.match(/export const NOTICE_BOARD = \[\s*([\s\S]*?)\s*\]/);
      if (boardMatch) {
        let entries = boardMatch[1].split('},').filter(e => e.trim()).map(e => e.trim() + '},');
        if (entries.length > 10) {
          entries = entries.slice(0, 10);
          const newBoard = `export const NOTICE_BOARD = [\n  ${entries.join('\n  ')}\n]`;
          updatedContent = updatedContent.replace(/export const NOTICE_BOARD = \[\s*[\s\S]*?\s*\]/, newBoard);
        }
      }

      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH,
        message: 'bot: automated hourly environmental news update',
        content: Buffer.from(updatedContent).toString('base64'),
        sha: sha, branch: 'main'
      });
      console.log('✅ RSS News integrated into Ticker.');
    }
  } catch (err) {
    console.error('❌ RSS Error:', err.message);
  }
}

// Schedule RSS News every 1 hour
cron.schedule('0 * * * *', () => {
  syncRSSToGitHub();
});

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

        // Verify admin (allow both Lead Diver and Initiator)
        const adminRegex = /role:\s*'(?:Lead Diver|Initiator)'.*?telegramId:\s*'([^']+)'/g;
        const adminMatches = [...currentContent.matchAll(adminRegex)];
        const adminChatIds = adminMatches.map(m => m[1]).filter(id => id && id !== 'ADMIN_CHAT_ID' && id !== '');
        
        if (!adminChatIds.includes(adminChatId)) {
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
        await sendTelegramMessage(targetChatId, `🎉 *Access Granted!*\nThe Hinnavaru Blue Initiator has approved your device.\nType /start to see your menu.`);

        // Acknowledge the callback alert (removes loading state on the button)
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, { callback_query_id: callback.id });
      } catch (e) {
        await sendTelegramMessage(adminChatId, `❌ *Error processing approval:* ${e.message}`);
      }
    } else if (data.startsWith('know:')) {
      const key = data.split(':')[1];
      const entry = knowledgeBase.categories[key];
      if (entry) {
        const text = `*${entry.title}*\n\n${entry.text}`;
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`;
        await axios.post(url, {
          chat_id: adminChatId,
          message_id: callback.message.message_id,
          text: text,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[{ text: '⬅️ Back', callback_data: 'menu:info' }]]
          }
        });
      }
    } else if (data === 'menu:main') {
      await showMainMenu(adminChatId, callback.message.message_id);
    } else if (data.startsWith('upload:')) {
      const [_, category, fileId, fileType, ext] = data.split(':');
      const chatId = adminChatId;
      
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
        chat_id: chatId,
        message_id: callback.message.message_id,
        text: `🚀 *Processing ${category.toUpperCase()} Upload...*\nHandshaking with Hinnavaru Digital Archives...`,
        parse_mode: 'Markdown'
      });

      try {
        const fileRes = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
        const filePath = fileRes.data.result.file_path;
        const downloadRes = await axios.get(`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(downloadRes.data);
        
        const timestampMarker = Date.now();
        const fileName = `${category}_${timestampMarker}.${ext}`;

        // Path logic based on category
        const ghPath = category === 'noticeboard' ? `public/notices/${fileName}` : `public/deep-archives/${fileName}`;
        
        await octokit.repos.createOrUpdateFileContents({
          owner: REPO_OWNER, repo: REPO_NAME, path: ghPath,
          message: `bot: ${category} upload by admin`,
          content: fileBuffer.toString('base64'),
          branch: 'main'
        });

        // Update CMS if needed for Live Pulse
        if (category === 'live_pulse') {
          const { data: cmsFile } = await octokit.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH });
          const content = Buffer.from(cmsFile.content, 'base64').toString();
          
          const now = new Date();
          const expiry = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
          const newStory = `\n  { \n    id: 'ST-${timestampMarker}', \n    type: '${fileType}', \n    url: '/deep-archives/${fileName}', \n    guardianId: 'GD-00', \n    timestamp: '${now.toISOString()}', \n    expiryDate: '${expiry.toISOString()}' \n  },`;
          
          const updatedContent = content.replace('export const LAGOON_STORIES = [', 'export const LAGOON_STORIES = [' + newStory);
          
          await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH,
            message: 'bot: updated live stories pulse',
            content: Buffer.from(updatedContent).toString('base64'),
            sha: cmsFile.sha, branch: 'main'
          });
        }

        await sendTelegramMessage(chatId, `✅ *Task Complete!*\nThe visuals are now active in the **${category.replace('_', ' ')}** section.\n\n🙏 *Thank you for your service to the reef. Session Closed.*`);
      } catch (err) {
        await sendTelegramMessage(chatId, `❌ *Upload Error:* ${err.message}`);
      }
    } else if (data === 'menu:info') {
      const buttons = Object.keys(knowledgeBase.categories).map(key => [
        { text: knowledgeBase.categories[key].title, callback_data: `know:${key}` }
      ]);
      buttons.push([{ text: '🏠 Main Menu', callback_data: 'menu:main' }]);
      
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`;
      await axios.post(url, {
        chat_id: adminChatId,
        message_id: callback.message.message_id,
        text: '📘 *HBI Project Intelligence*\nExplore the core pillars of our mission:',
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: buttons }
      });
    } else if (data === 'menu:broadcast') {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
        chat_id: adminChatId,
        message_id: callback.message.message_id,
        text: '📢 *Broadcast Protocol*\n\nTo post a live ticker update:\nType `/ticker your message here` and hit send.',
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: [[{ text: '🏠 Main Menu', callback_data: 'menu:main' }]] }
      });
    } else if (data === 'menu:upload') {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
        chat_id: adminChatId,
        message_id: callback.message.message_id,
        text: '📽️ *Multimedia Archiving*\n\nTo archive a photo/video to the website:\nSimply send the file directly to this chat.\n\n*Limit:* 10MB per file.',
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: [[{ text: '🏠 Main Menu', callback_data: 'menu:main' }]] }
      });
    }
    return;
  }

  // Method to show Main Menu
async function showMainMenu(chatId, messageId = null) {
  const text = `🌊 *Welcome to the Digital Command Center*\nGreetings, Guardian. How shall we protect the blue today?`;
  const buttons = [
    [{ text: '📢 Broadcast Ticker', callback_data: 'menu:broadcast' }],
    [{ text: '📽️ Media Center (Uploads)', callback_data: 'menu:upload' }],
    [{ text: '📘 HBI Intelligence', callback_data: 'menu:info' }],
    [{ text: '📊 Statistics Update', callback_data: 'menu:stats' }],
    [{ text: '📩 View Inbox', callback_data: 'menu:inbox' }]
  ];

  const adminRegex = /role:\s*'(?:Lead Diver|Initiator)'.*?telegramId:\s*'([^']+)'/g;
  const { data: fileData } = await octokit.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: CMS_PATH });
  const content = Buffer.from(fileData.content, 'base64').toString();
  const adminMatches = [...content.matchAll(adminRegex)];
  const adminChatIds = adminMatches.map(m => m[1]);

  if (adminChatIds.includes(chatId.toString())) {
    buttons.push([{ text: '🌀 Trigger GDrive Sync', callback_data: 'manual_sync' }]);
  }

  const endpoint = messageId ? 'editMessageText' : 'sendMessage';
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${endpoint}`;
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: buttons }
  };
  if (messageId) payload.message_id = messageId;
  await axios.post(url, payload);
}

// In callback query handler for manual sync
if (req.body.callback_query && req.body.callback_query.data === 'manual_sync') {
    const callback = req.body.callback_query;
    const chatId = callback.from.id;
    await sendTelegramMessage(chatId, '🌀 *Starting sync...*');
    await syncGoogleDriveToGitHub();
    await sendTelegramMessage(chatId, '✅ *Sync Done.*');
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

    const adminRegex = /role:\s*'(?:Lead Diver|Initiator)'.*?telegramId:\s*'([^']+)'/g;
    const adminMatches = [...currentContent.matchAll(adminRegex)];
    const adminChatIds = adminMatches.map(m => m[1]).filter(id => id && id !== 'ADMIN_CHAT_ID' && id !== '');

    const guardianMatchRegex = new RegExp(`name:\\s*'([^']+)',\\s*role:\\s*'([^']+)',\\s*avatar:\\s*'([^']+)',\\s*telegramId:\\s*'${chatId}'`);
    const guardianMatch = currentContent.match(guardianMatchRegex);

    if (text === '/sync' && adminChatIds.includes(chatId)) {
      await sendTelegramMessage(chatId, '🌀 *Manual Sync Requested...*\nChecking Google Drive for new Archive data...');
      await syncGoogleDriveToGitHub();
      return await sendTelegramMessage(chatId, '✅ *Sync Operation Complete.*\nCheck the Deep Archives section on the website.');
    }

    // Phase 3: Text Commands & Keywords
    const trigger = text.toLowerCase();

    if (trigger === '/start' || trigger === 'menu' || trigger === 'hello') {
      if (guardianMatch) {
         await showMainMenu(chatId);
      } else {
        const welcome = `🌊 *Greetings from the Lagoon.*\nI am the Hinnavaru Blue assistant. Your access level is currently **General Observer**.\n\n*Want to help?* Tap below to view our mission intelligence.`;
        const buttons = [[{ text: '📘 Project Intelligence', callback_data: 'menu:info' }]];
        
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          chat_id: chatId,
          text: welcome,
          parse_mode: 'Markdown',
          reply_markup: { inline_keyboard: buttons }
        });
        
        if (adminChatIds.length > 0) {
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
          const alertPromises = adminChatIds.map(adminId => 
             axios.post(url, { 
              chat_id: adminId, 
              text: `⚠️ *Access Request*\n${senderFirstName} (Chat ID: \`${chatId}\`) is requesting clearance.\nTap a button below to bind them to a profile:`, 
              parse_mode: 'Markdown',
              reply_markup: { inline_keyboard: buttons }
            })
          );
          await Promise.all(alertPromises);
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
        let fileId = '';
        let fileType = '';
        let ext = '';
        
        if (message.photo) {
            fileId = message.photo[message.photo.length - 1].file_id;
            fileType = 'photo';
            ext = 'jpg';
        } else {
            fileId = message.video.file_id;
            fileType = 'video';
            ext = 'mp4';
        }

        const buttons = [
            [{ text: '📸 In Action (Live Pulse)', callback_data: `upload:live_pulse:${fileId}:${fileType}:${ext}` }],
            [{ text: '📂 Deep Archives (Storage)', callback_data: `upload:archive:${fileId}:${fileType}:${ext}` }],
            [{ text: '📎 Notice Board (Banner)', callback_data: `upload:noticeboard:${fileId}:${fileType}:${ext}` }]
        ];

        return await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: '📁 *Visual Target Identity*\nWhere should this intelligence be categorized?',
            parse_mode: 'Markdown',
            reply_markup: { inline_keyboard: buttons }
        });
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
