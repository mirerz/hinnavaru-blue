const Parser = require('rss-parser');
const parser = new Parser();
const CMSManager = require('./cms-manager');

const RSSSync = {
  async sync() {
    console.log('📡 Fetching global environmental intelligence...');
    try {
      const feed = await parser.parseURL('https://news.un.org/feed/subscribe/en/news/topic/climate-change/feed/rss.xml');
      const { content, sha } = await CMSManager.getCMS();

      // Pick 2 latest items
      const latestItems = feed.items.slice(0, 2).map(item => ({
        icon: '🌍',
        type: 'Global News',
        text: `${item.title} (${new URL(item.link).hostname})`
      }));

      let updatedContent = content;
      latestItems.forEach(item => {
        if (!content.includes(item.text)) {
          updatedContent = CMSManager.addTickerEntry(updatedContent, item);
        }
      });

      if (updatedContent !== content) {
        await CMSManager.updateCMS(
          updatedContent,
          sha,
          'bot: automated hourly environmental news update'
        );
        console.log('✅ RSS News integrated into Ticker.');
      }
    } catch (err) {
      console.error('❌ RSS Error:', err.message);
    }
  }
};

module.exports = RSSSync;
