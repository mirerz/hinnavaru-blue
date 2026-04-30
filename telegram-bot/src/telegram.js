const axios = require('axios');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const telegram = {
  async sendMessage(chatId, text, options = {}) {
    try {
      return await axios.post(`${BASE_URL}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        ...options
      });
    } catch (error) {
      console.error('Telegram sendMessage Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async editMessageText(chatId, messageId, text, options = {}) {
    try {
      return await axios.post(`${BASE_URL}/editMessageText`, {
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: 'Markdown',
        ...options
      });
    } catch (error) {
      console.error('Telegram editMessageText Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async answerCallbackQuery(callbackQueryId, options = {}) {
    try {
      return await axios.post(`${BASE_URL}/answerCallbackQuery`, {
        callback_query_id: callbackQueryId,
        ...options
      });
    } catch (error) {
      console.error('Telegram answerCallbackQuery Error:', error.response?.data || error.message);
    }
  },

  async getFile(fileId) {
    try {
      const { data } = await axios.get(`${BASE_URL}/getFile?file_id=${fileId}`);
      return data.result;
    } catch (error) {
      console.error('Telegram getFile Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async downloadFile(filePath) {
    try {
      const { data } = await axios.get(`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`, {
        responseType: 'arraybuffer'
      });
      return Buffer.from(data);
    } catch (error) {
      console.error('Telegram downloadFile Error:', error.message);
      throw error;
    }
  },

  async setMyCommands(commands) {
    try {
      return await axios.post(`${BASE_URL}/setMyCommands`, { commands });
    } catch (error) {
      console.error('Telegram setMyCommands Error:', error.response?.data || error.message);
    }
  }
};

module.exports = telegram;
