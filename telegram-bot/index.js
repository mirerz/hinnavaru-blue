require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { Readable } = require('stream');

const telegram = require('./src/telegram');
const CMSManager = require('./src/cms-manager');
const Automation = require('./src/automation');
const RSSSync = require('./src/rss-sync');
const Menus = require('./src/menus');
const { getDriveClient, DRIVE_FOLDERS, REPO_OWNER, REPO_NAME, octokit } = require('./src/clients');
const knowledgeBase = require('./knowledge_base');
const PENDING_INPUTS = new Map();

const app = express();
app.use(express.json());

// Initialize Bot Menu Commands
async function initBot() {
  console.log('🤖 Registering Guardian Command Center menu...');
  const commands = [
    { command: 'menu', description: '🌊 Guardian Dashboard' },
    { command: 'ticker', description: '📢 Broadcast Ticker' },
    { command: 'media', description: '📽️ Media Center (Archive/Live)' },
    { command: 'intelligence', description: '📘 HBI Project Intelligence' },
    { command: 'stats', description: '📊 Statistics Update' },
    { command: 'inbox', description: '📩 View Inbox' },
    { command: 'sync', description: '🌀 Trigger Manual Sync' },
    { command: 'start', description: '🔄 Restart Bot' }
  ];
  await telegram.setMyCommands(commands);
}
initBot();

// Cron Jobs
cron.schedule('*/30 * * * *', () => Automation.triggerMediaSync());
cron.schedule('0 * * * *', () => RSSSync.sync());

// Webhook Handler
app.post('/webhook', async (req, res) => {
  res.sendStatus(200);

  try {
    const { message, callback_query } = req.body;

    if (callback_query) return handleCallback(callback_query);
    if (message) return handleMessage(message);
  } catch (error) {
    console.error('Webhook processing error:', error);
  }
});

async function handleCallback(callback) {
  const chatId = callback.from.id.toString();
  const data = callback.data;
  const messageId = callback.message.message_id;

  // 1. Approval Logic
  if (data.startsWith('approve:')) {
    const [_, targetChatId, targetName] = data.split(':');
    const { content, sha } = await CMSManager.getCMS();
    const admins = CMSManager.getAdmins(content);

    if (!admins.includes(chatId)) return telegram.sendMessage(chatId, '⛔ *Permission Denied*');

    await telegram.sendMessage(chatId, `⏳ *Approving ${targetName}...*`);
    const updatedContent = CMSManager.approveGuardian(content, targetName, targetChatId);

    if (!updatedContent) return telegram.sendMessage(chatId, `❌ *Error: Guardian Not Found*`);

    await CMSManager.updateCMS(updatedContent, sha, `bot: admin approved telegram access for ${targetName}`);
    await telegram.sendMessage(chatId, `✅ *Approval Completed!*\n\n**${targetName}** is now linked.\nI will notify them immediately.`);
    await telegram.sendMessage(targetChatId, `🎉 *Access Granted!*\nThe Hinnavaru Blue Initiator has approved your device.\nType /start to see your menu.`);
    await telegram.answerCallbackQuery(callback.id);
  }

  // 2. Knowledge Base
  else if (data.startsWith('know:')) {
    const key = data.split(':')[1];
    const entry = knowledgeBase.categories[key];
    if (entry) {
      await telegram.editMessageText(chatId, messageId, `*${entry.title}*\n\n${entry.text}`, {
        reply_markup: {
          inline_keyboard: [[{ text: '⬅️ Back', callback_data: 'menu:info' }]]
        }
      });
    }
  }

  // 3. Navigation
  else if (data === 'menu:main') {
    const { content } = await CMSManager.getCMS();
    const admins = CMSManager.getAdmins(content);
    await Menus.showMainMenu(chatId, admins.includes(chatId));
  } else if (data === 'menu:info') {
    await Menus.showIntelligenceMenu(chatId, true, messageId);
  }

  // 4. Media Upload
  else if (data.startsWith('upload:')) {
    await handleMediaUpload(callback);
  }

  // 4.5 Registration Flow
  else if (data.startsWith('register:')) {
    const role = data.split(':')[1];
    PENDING_INPUTS.set(chatId, { type: 'register_name', role });
    await telegram.sendMessage(chatId, `You selected *${role}*. Please reply with your full name:`);
  }
  else if (data.startsWith('approve_new:')) {
    const parts = data.split(':');
    const targetChatId = parts[1];
    const targetName = parts[2];
    const targetRole = parts[3];

    const { content, sha } = await CMSManager.getCMS();
    const admins = CMSManager.getAdmins(content);
    if (!admins.includes(chatId)) return;

    const updatedContent = CMSManager.addNewGuardian(content, {
      name: targetName,
      role: targetRole,
      telegramId: targetChatId,
      avatar: targetRole === 'Reef Guardian' ? '🤿' : '💎'
    });

    await CMSManager.updateCMS(updatedContent, sha, `bot: registered new guardian ${targetName}`);
    await telegram.sendMessage(chatId, `✅ *Approved ${targetName} as ${targetRole}*`);
    await telegram.sendMessage(targetChatId, `🎉 *Access Granted!*\nYou are now registered as a **${targetRole}**.\nType /menu to access your dashboard.`);
  }

  // 5. Stats Management
  else if (data.startsWith('stats:')) {
    const action = data.split(':')[1];
    if (action === 'survival') {
      PENDING_INPUTS.set(chatId, { type: 'stats:survival' });
      await telegram.sendMessage(chatId, '🪸 *Update Survival Rate*\nPlease enter the new average survival percentage (e.g., `85`):');
    } else if (action === 'frames') {
      PENDING_INPUTS.set(chatId, { type: 'stats:frames' });
      await telegram.sendMessage(chatId, '🏗️ *Update Active Frames*\nPlease enter the total number of active frames (e.g., `200`):');
    } else if (action === 'funds') {
      // Show allocation sub-menu
      const { content } = await CMSManager.getCMS();
      const allocations = content.match(/FUND_ALLOCATION = \[([\s\S]*?)\]/)[1]
        .match(/label: '([^']+)'/g)
        .map(m => m.match(/'([^']+)'/)[1]);

      const buttons = allocations.map(label => [{ text: label, callback_data: `stats:fund_sel:${label}` }]);
      buttons.push([{ text: '⬅️ Back', callback_data: 'stats:main' }]);

      await telegram.editMessageText(chatId, messageId, '💰 *Select Fund Category to Update:*', {
        reply_markup: { inline_keyboard: buttons }
      });
    } else if (action === 'fund_sel') {
      const label = data.split(':')[2];
      PENDING_INPUTS.set(chatId, { type: 'stats:fund_val', label });
      await telegram.sendMessage(chatId, `💰 *Update Allocation: ${label}*\nPlease enter the new percentage (e.g., \`25\`):`);
    } else if (action === 'add_doc') {
      PENDING_INPUTS.set(chatId, { type: 'stats:add_doc_file' });
      await telegram.sendMessage(chatId, '📁 *Add Official Document*\nPlease upload the document (PDF or Word) you wish to publish to the Transparency Hub.');
    } else if (action === 'doc_cat_sel') {
      const category = data.split(':')[2];
      const pending = PENDING_INPUTS.get(chatId);
      if (!pending) return telegram.sendMessage(chatId, '❌ Session expired.');
      PENDING_INPUTS.delete(chatId);

      await telegram.editMessageText(chatId, messageId, `🚀 *Publishing to Transparency Hub...*`);

      try {
        const file = await telegram.getFile(pending.fileId);
        const buffer = await telegram.downloadFile(file.file_path);
        const drive = getDriveClient();
        
        const res = await drive.files.create({
          requestBody: { name: pending.fileName, parents: [DRIVE_FOLDERS.DOCS] },
          media: { body: Readable.from(buffer) },
          fields: 'id, webViewLink'
        });

        const fileId = res.data.id;
        const webViewLink = res.data.webViewLink;

        // Make public
        await drive.permissions.create({
          fileId: fileId,
          requestBody: { role: 'viewer', type: 'anyone' }
        });

        const { content, sha } = await CMSManager.getCMS();
        const guardian = CMSManager.getGuardian(content, chatId);
        
        const updatedContent = CMSManager.addDocumentToVault(content, {
          title: pending.title,
          category: category,
          type: pending.ext.toUpperCase(),
          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          path: webViewLink,
          icon: '📄'
        });

        await CMSManager.updateCMS(updatedContent, sha, `bot: guardian ${guardian.name} published document ${pending.title}`);
        await telegram.sendMessage(chatId, `✅ *Document Published!*\n\n*Title:* ${pending.title}\n*Category:* ${category}\n*Link:* [View Document](${webViewLink})`, { parse_mode: 'Markdown' });
      } catch (err) {
        await telegram.sendMessage(chatId, `❌ *Publishing Error:* ${err.message}`);
      }
    } else if (action === 'main') {
      await Menus.showStatsMenu(chatId, true, messageId);
    }
    await telegram.answerCallbackQuery(callback.id);
  }
}

async function handleMessage(message) {
  const chatId = message.chat.id.toString();
  const text = (message.text || '').trim().toLowerCase();
  const senderName = message.from.first_name || 'Guardian';

  const { content, sha } = await CMSManager.getCMS();
  const admins = CMSManager.getAdmins(content);
  const guardian = CMSManager.getGuardian(content, chatId);

  // Authentication check for non-start/menu commands
  if (!guardian && !['/start', 'menu', '/menu', 'hello'].includes(text)) {
    return telegram.sendMessage(chatId, '⛔ *Unauthorized*\nYou are not a registered Guardian.');
  }

  // 1. Basic Commands
  if (['/start', 'menu', '/menu', 'hello'].includes(text)) {
    if (guardian) {
      await Menus.showMainMenu(chatId, admins.includes(chatId));
    } else {
      await handleUnregisteredUser(chatId, senderName, content, admins);
    }
  }

  // 2. Ticker Update
  else if (message.text && message.text.startsWith('/ticker ')) {
    const updateText = message.text.replace('/ticker ', '').trim();
    if (updateText.length < 5) return telegram.sendMessage(chatId, '❌ Update text too short.');

    await telegram.sendMessage(chatId, `⏳ *Updating Website...*\nAuthenticating as ${guardian.name}...`);
    const updatedContent = CMSManager.addTickerEntry(content, {
      icon: guardian.avatar,
      type: 'Guardian Log',
      text: updateText
    });

    await CMSManager.updateCMS(updatedContent, sha, `bot: guardian ${guardian.name} live update`);
    await telegram.sendMessage(chatId, `✅ *Success! Update Committed.*\n\n*${guardian.name} (${guardian.role})*\n"${updateText}"\n\nLive on site in 60s.`);
  }

  // 3. Media Center / Pending File Uploads
  else if (message.photo || message.video || message.document) {
    const caption = (message.caption || '').toLowerCase();
    const matchAdopt = caption.match(/#adopt(\d+)/);
    const matchSweep = caption.match(/#sweep(\d+)/);
    const matchEdu = caption.match(/#edu(\d+)/);

    let targetFolder = null;
    if (matchAdopt) {
       targetFolder = `Adoption${matchAdopt[1]}`;
    } else if (matchSweep) {
       targetFolder = `SweepersEffort${matchSweep[1]}`;
    } else if (matchEdu) {
       targetFolder = `EduAwareRound${matchEdu[1]}`;
    }

    if (targetFolder) {
      await telegram.sendMessage(chatId, `⏳ *Hashtag Detected.*\nRouting media directly to **${targetFolder}**...`);
      await handleDirectHashtagUpload(message, targetFolder, guardian, chatId);
    } else if (PENDING_INPUTS.has(chatId) && PENDING_INPUTS.get(chatId).type === 'stats:add_doc_file') {
      const fileId = message.document?.file_id || message.photo?.[0].file_id; // Support photos as docs too
      const ext = message.document?.file_name?.split('.').pop() || 'jpg';
      const fileName = `doc_${Date.now()}.${ext}`;
      
      PENDING_INPUTS.set(chatId, { type: 'stats:add_doc_title', fileId, fileName, ext });
      await telegram.sendMessage(chatId, '✅ *Document Received.*\nPlease enter the **Title** for this document (e.g., "Annual Impact Report 2026"):');
    } else {
      await showMediaOptions(chatId, message);
    }
  }

  // 4. Other Menus
  else if (text === '📘 hbi intelligence' || text === '/intelligence') {
    await Menus.showIntelligenceMenu(chatId);
  } else if (text === '🌀 trigger gdrive sync' || text === '/sync') {
    if (admins.includes(chatId)) {
      await telegram.sendMessage(chatId, '🌀 *Initiating Sync Pipeline...*');
      const success = await Automation.triggerMediaSync();
      await telegram.sendMessage(chatId, success ? '✅ *Sync Triggered!* Process takes ~2m.' : '❌ *Sync Failed*');
    } else {
      await telegram.sendMessage(chatId, '⛔ *Unauthorized*');
    }
  } else if (text === '📊 statistics update' || text === '/stats') {
    await Menus.showStatsMenu(chatId);
  } else if (PENDING_INPUTS.has(chatId)) {
    const pending = PENDING_INPUTS.get(chatId);
    PENDING_INPUTS.delete(chatId);

    if (pending.type === 'register_name') {
      const newName = message.text.trim();
      await telegram.sendMessage(chatId, `⏳ *Registration sent for approval.* We will notify you once an admin verifies your identity.`);
      for (const adminId of admins) {
        await telegram.sendMessage(adminId, `⚠️ *New Registration Request*\nName: ${newName}\nRole: ${pending.role}\nChat ID: \`${chatId}\``, {
          reply_markup: { inline_keyboard: [[{ text: '✅ Approve', callback_data: `approve_new:${chatId}:${newName}:${pending.role}` }, { text: '❌ Reject', callback_data: 'ignore' }]] }
        });
      }
    }
    else if (pending.type === 'stats:survival') {
      const val = parseInt(text);
      if (isNaN(val) || val < 0 || val > 100) return telegram.sendMessage(chatId, '❌ Invalid percentage. Please send a number between 0 and 100.');
      
      await telegram.sendMessage(chatId, `⏳ *Committing Survival Data...*`);
      const updatedContent = CMSManager.updateTransparencyStats(content, { survival_rate: val });
      await CMSManager.updateCMS(updatedContent, sha, `bot: guardian ${guardian.name} updated survival rate to ${val}%`);
      await telegram.sendMessage(chatId, `✅ *Survival Rate Updated to ${val}%*`);
    } 
    else if (pending.type === 'stats:frames') {
      const val = parseInt(text);
      if (isNaN(val) || val < 0) return telegram.sendMessage(chatId, '❌ Invalid frame count.');
      
      await telegram.sendMessage(chatId, `⏳ *Committing Frame Data...*`);
      const updatedContent = CMSManager.updateTransparencyStats(content, { active_frames: val });
      await CMSManager.updateCMS(updatedContent, sha, `bot: guardian ${guardian.name} updated active frames to ${val}`);
      await telegram.sendMessage(chatId, `✅ *Active Frames Updated to ${val}*`);
    }
    else if (pending.type === 'stats:add_doc_title') {
      const title = message.text;
      PENDING_INPUTS.set(chatId, { ...pending, type: 'stats:add_doc_cat', title });
      
      const buttons = [
        [{ text: '🏛️ Admin', callback_data: 'stats:doc_cat_sel:Admin' }],
        [{ text: '🌱 Awareness', callback_data: 'stats:doc_cat_sel:Awareness' }],
        [{ text: '🔬 Scientific', callback_data: 'stats:doc_cat_sel:Scientific' }]
      ];
      await telegram.sendMessage(chatId, `📝 *Document: ${title}*\nSelect the category for this document:`, {
        reply_markup: { inline_keyboard: buttons }
      });
    }
    else if (pending.type === 'stats:fund_val') {
      const val = parseInt(text);
      if (isNaN(val) || val < 0 || val > 100) return telegram.sendMessage(chatId, '❌ Invalid percentage.');
      
      await telegram.sendMessage(chatId, `⏳ *Committing Allocation Data...*`);
      const updatedContent = CMSManager.updateFundAllocation(content, pending.label, val);
      await CMSManager.updateCMS(updatedContent, sha, `bot: guardian ${guardian.name} updated ${pending.label} allocation to ${val}%`);
      await telegram.sendMessage(chatId, `✅ *${pending.label} Allocation Updated to ${val}%*`);
    }
  } else if (text === '📩 view inbox') {
    await telegram.sendMessage(chatId, '📩 *View Inbox*\nFeature coming soon.');
  } else {
    await telegram.sendMessage(chatId, `🛠️ *Guardian Dashboard: ${guardian.name}*\n\nUse the buttons below or type \`/ticker <message>\`.`);
  }
}

async function handleUnregisteredUser(chatId, name, cmsContent, admins) {
  const welcome = `🌊 *Greetings from the Lagoon.*\nI am the Hinnavaru Blue assistant. Your access level is currently **General Observer**.\n\nPlease select a role to register:`;
  await telegram.sendMessage(chatId, welcome, {
    reply_markup: { 
      inline_keyboard: [
        [{ text: '🤿 Reef Guardian (Volunteer)', callback_data: `register:Reef Guardian` }],
        [{ text: '💎 Guardian (Financial Contributor)', callback_data: `register:Guardian` }]
      ] 
    }
  });
}

async function showMediaOptions(chatId, message) {
  let fileId, fileType, ext;
  if (message.photo) {
    fileId = message.photo[message.photo.length - 1].file_id;
    fileType = 'photo';
    ext = 'jpg';
  } else if (message.video) {
    fileId = message.video.file_id;
    fileType = 'video';
    ext = 'mp4';
  } else if (message.document) {
    fileId = message.document.file_id;
    fileType = 'document';
    ext = message.document.file_name?.split('.').pop() || 'pdf';
  }

  const buttons = [
    [{ text: '📸 Live Pulse (Lagoon Story)', callback_data: `upload:live_pulse:${fileId}:${fileType}:${ext}` }],
    [{ text: '🗂️ Deep Archives (Images)', callback_data: `upload:archive:images:${fileId}:${fileType}:${ext}` }],
    [{ text: '📹 Deep Archives (Videos)', callback_data: `upload:archive:vids:${fileId}:${fileType}:${ext}` }],
    [{ text: '📄 Deep Archives (Docs)', callback_data: `upload:archive:docs:${fileId}:${fileType}:${ext}` }],
    [{ text: '📎 Notice Board', callback_data: `upload:noticeboard:${fileId}:${fileType}:${ext}` }]
  ];

  await telegram.sendMessage(chatId, '📁 *Visual Target Identity*\nWhere should this intelligence be categorized?', {
    reply_markup: { inline_keyboard: buttons }
  });
}

async function handleMediaUpload(callback) {
  const chatId = callback.from.id.toString();
  const parts = callback.data.split(':');
  const category = parts[1];
  const isDeepArchive = category === 'archive';
  
  let subCat, fileId, fileType, ext;
  if (isDeepArchive) {
    const [_, __, s, f, t, e] = parts;
    subCat = s; fileId = f; fileType = t; ext = e;
  } else {
    const [_, __, f, t, e] = parts;
    fileId = f; fileType = t; ext = e;
  }

  await telegram.editMessageText(chatId, callback.message.message_id, `🚀 *Processing ${category.toUpperCase()} Upload...*`);

  try {
    const file = await telegram.getFile(fileId);
    const buffer = await telegram.downloadFile(file.file_path);
    const fileName = `${category}_${Date.now()}.${ext}`;

    if (isDeepArchive || category === 'live_pulse') {
      const drive = getDriveClient();
      let folderId = DRIVE_FOLDERS.ROOT;
      const effectiveSub = category === 'live_pulse' ? (fileType === 'photo' ? 'images' : 'vids') : subCat;
      
      if (effectiveSub === 'images') folderId = DRIVE_FOLDERS.IMAGES;
      else if (effectiveSub === 'vids') folderId = DRIVE_FOLDERS.VIDS;
      else if (effectiveSub === 'docs') folderId = DRIVE_FOLDERS.DOCS;

      await drive.files.create({
        requestBody: { name: fileName, parents: [folderId] },
        media: { body: Readable.from(buffer) },
      });

      await telegram.sendMessage(chatId, `✅ *Success! Media Archived.*\n🔄 *Initiating Website Integration...*`);
      await Automation.triggerMediaSync();
    } else {
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER, repo: REPO_NAME, path: `public/notices/${fileName}`,
        message: `bot: noticeboard asset upload`,
        content: buffer.toString('base64'),
        branch: 'main'
      });
      await telegram.sendMessage(chatId, `✅ *Task Complete!* Asset stored in repository.`);
    }
    await telegram.answerCallbackQuery(callback.id);
  } catch (err) {
    await telegram.sendMessage(chatId, `❌ *Upload Error:* ${err.message}`);
  }
}

async function handleDirectHashtagUpload(message, folderName, guardian, chatId) {
  let fileId, fileType, ext;
  if (message.photo) {
    fileId = message.photo[message.photo.length - 1].file_id;
    fileType = 'photo';
    ext = 'jpg';
  } else if (message.video) {
    fileId = message.video.file_id;
    fileType = 'video';
    ext = 'mp4';
  } else if (message.document) {
    fileId = message.document.file_id;
    fileType = 'document';
    ext = message.document.file_name?.split('.').pop() || 'pdf';
  } else {
    return telegram.sendMessage(chatId, '❌ Unsupported file type.');
  }

  try {
    const file = await telegram.getFile(fileId);
    const buffer = await telegram.downloadFile(file.file_path);
    const fileName = `${folderName}_${Date.now()}.${ext}`;

    const drive = getDriveClient();

    // 1. Check if folder exists
    const res = await drive.files.list({
      q: `name='${folderName}' and '${DRIVE_FOLDERS.ROOT}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      spaces: 'drive'
    });

    let targetFolderId;
    if (res.data.files.length > 0) {
      targetFolderId = res.data.files[0].id;
    } else {
      // 2. Create if not exists
      const folderRes = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [DRIVE_FOLDERS.ROOT]
        },
        fields: 'id'
      });
      targetFolderId = folderRes.data.id;
    }

    // 3. Upload to target folder
    await drive.files.create({
      requestBody: { name: fileName, parents: [targetFolderId] },
      media: { body: Readable.from(buffer) },
    });

    await telegram.sendMessage(chatId, `✅ *Success! Media Archived into ${folderName}.*\n🔄 *Initiating Website Integration...*`);
    await Automation.triggerMediaSync();

  } catch (err) {
    await telegram.sendMessage(chatId, `❌ *Hashtag Upload Error:* ${err.message}`);
  }
}

app.get('/', (req, res) => res.send('Hinnavaru Guardian Bot Online'));
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Bot running on port ${port}`));
