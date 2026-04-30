const telegram = require('./telegram');
const knowledgeBase = require('../knowledge_base');

const Menus = {
  async showMainMenu(chatId, isAdmin) {
    const text = `🌊 *Welcome to the Hinnavaru Blue Initiative Hub*\nGreetings🙏 Guardian👑 How shall we protect the blue today?\n\n🛠️ *Initiators and Guardians experience sharing hub*\n\n\`/ticker <message>\` - Write text broadcast to the live ticker.\n\n📸 🎥 *Upload Visuals:* Simply send a Photo, Video, or Docs to me directly (under 10MB). It will automatically be committed to the Deep Archives and broadcasted to the 'In Action' live UI section!`;
    
    const keyboard = [
      [{ text: '📢 Broadcast Ticker' }],
      [{ text: '📽️ Media Center (Uploads)' }],
      [{ text: '📘 HBI Intelligence' }],
      [{ text: '📊 Statistics Update' }],
      [{ text: '📩 View Inbox' }]
    ];

    if (isAdmin) {
      keyboard.push([{ text: '🌀 Trigger GDrive Sync' }]);
    }

    await telegram.sendMessage(chatId, text, {
      reply_markup: { 
        keyboard: keyboard,
        resize_keyboard: true,
        is_persistent: true
      }
    });
  },

  async showIntelligenceMenu(chatId, isEdit = false, messageId = null) {
    const buttons = Object.keys(knowledgeBase.categories).map(key => [
      { text: knowledgeBase.categories[key].title, callback_data: `know:${key}` }
    ]);
    buttons.push([{ text: '🏠 Main Menu', callback_data: 'menu:main' }]);
    
    const text = '📘 *HBI Project Intelligence Matrix*\nSelect a core pillar to retrieve from the Deep Archives:';
    
    if (isEdit && messageId) {
      await telegram.editMessageText(chatId, messageId, text, {
        reply_markup: { inline_keyboard: buttons }
      });
    } else {
      await telegram.sendMessage(chatId, text, {
        reply_markup: { inline_keyboard: buttons }
      });
    }
  },

  async showStatsMenu(chatId, isEdit = false, messageId = null) {
    const text = `📊 *Transparency Hub Management (Amaanaiy)*\nUpdate real-time survival metrics and fund allocations for the public dashboard.`;
    const buttons = [
      [{ text: '🪸 Update Survival Rate', callback_data: 'stats:survival' }],
      [{ text: '🏗️ Update Active Frames', callback_data: 'stats:frames' }],
      [{ text: '💰 Update Fund Allocations', callback_data: 'stats:funds' }],
      [{ text: '📁 Add Official Document', callback_data: 'stats:add_doc' }],
      [{ text: '🏠 Main Menu', callback_data: 'menu:main' }]
    ];

    if (isEdit && messageId) {
      await telegram.editMessageText(chatId, messageId, text, {
        reply_markup: { inline_keyboard: buttons }
      });
    } else {
      await telegram.sendMessage(chatId, text, {
        reply_markup: { inline_keyboard: buttons }
      });
    }
  }
};

module.exports = Menus;
