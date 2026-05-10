const telegram = require('./telegram');
const knowledgeBase = require('../knowledge_base');

const Menus = {
  async showMainMenu(chatId, isAdmin) {
    const text = `🌊 *Hinnavaru Blue Guardian Command Center*\nGreetings, Guardian. How shall we protect the blue today?\n\n🛠️ *Initiators & Adopters Dashboard*\n\n📸 *Visual Uploads:* Send Photos/Videos to archive them.\n📢 *Broadcast:* Admin command for news.\n📊 *Intelligence:* Stats & NGO Growth.`;
    
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
    const text = `📊 *Statistics Engine (Automated Calculation)*\nSelect a project batch to update metrics.`;
    const buttons = [
      [{ text: '🪸 Adopt: Coral Restoration', callback_data: 'stats:adopt' }],
      [{ text: '🧹 Sweeper: Reef Cleaning', callback_data: 'stats:sweeper' }],
      [{ text: '📚 Edu: Training & Awareness', callback_data: 'stats:edu' }],
      [{ text: '💰 Fund Allocations', callback_data: 'stats:funds' }],
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
  },

  async showRegistrationMenu(chatId) {
    const text = `🌊 *Greetings from the Lagoon.*\nI am the Hinnavaru Blue assistant. Your access level is currently **General Observer**.\n\nPlease select your Guardian tier to begin onboarding:`;
    const buttons = [
      [{ text: '💎 Adopter (Financial Contributor)', callback_data: 'register:Adopter' }],
      [{ text: '🛠️ Initiator (Professional Service)', callback_data: 'register:Initiator' }]
    ];

    await telegram.sendMessage(chatId, text, {
      reply_markup: { inline_keyboard: buttons }
    });
  }
};

module.exports = Menus;
