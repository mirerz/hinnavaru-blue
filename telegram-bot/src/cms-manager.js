const { octokit, REPO_OWNER, REPO_NAME, CMS_PATH } = require('./clients');

const CMSManager = {
  async getCMS() {
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: CMS_PATH
    });
    return {
      content: Buffer.from(data.content, 'base64').toString('utf8'),
      sha: data.sha
    };
  },

  async updateCMS(content, sha, message) {
    return await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: CMS_PATH,
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: 'main'
    });
  },

  getAdmins(cmsContent) {
    const adminRegex = /role:\s*'(?:Lead Diver|Initiator)'.*?telegramId:\s*'([^']+)'/g;
    const matches = [...cmsContent.matchAll(adminRegex)];
    return matches.map(m => m[1]).filter(id => id && id !== 'ADMIN_CHAT_ID' && id !== '');
  },

  getGuardian(cmsContent, chatId) {
    const guardianMatchRegex = new RegExp(`name:\\s*'([^']+)',\\s*role:\\s*'([^']+)',\\s*avatar:\\s*'([^']+)',\\s*telegramId:\\s*'${chatId}'`);
    const match = cmsContent.match(guardianMatchRegex);
    if (match) {
      const [_, name, role, avatar] = match;
      const idMatch = cmsContent.match(new RegExp(`id:\\s*'([^']+)',\\s*name:\\s*'${name}'`));
      return { name, role, avatar, id: idMatch ? idMatch[1] : 'GD-00' };
    }
    return null;
  },

  addTickerEntry(cmsContent, entry) {
    const injectionTarget = 'export const LATEST_BULLETINS = [';
    if (!cmsContent.includes(injectionTarget)) return cmsContent;

    const newEntryStr = `\n  { icon: '${entry.icon}', type: '${entry.type}', text: '${entry.text.replace(/'/g, "\\'")}' },`;
    let updatedContent = cmsContent.replace(injectionTarget, injectionTarget + newEntryStr);

    // Limit to 10 entries
    const boardMatch = updatedContent.match(/export const LATEST_BULLETINS = \[\s*([\s\S]*?)\s*\]/);
    if (boardMatch) {
      let entries = boardMatch[1].split('},').filter(e => e.trim()).map(e => e.trim() + '},');
      if (entries.length > 10) {
        entries = entries.slice(0, 10);
        const newBoard = `export const LATEST_BULLETINS = [\n  ${entries.join('\n  ')}\n]`;
        updatedContent = updatedContent.replace(/export const LATEST_BULLETINS = \[\s*[\s\S]*?\s*\]/, newBoard);
      }
    }
    return updatedContent;
  },

  approveGuardian(cmsContent, targetName, targetChatId) {
    const targetRegex = new RegExp(`(name:\\s*'${targetName}'.*?telegramId:\\s*')([^']*)(')`);
    if (!targetRegex.test(cmsContent)) return null;
    return cmsContent.replace(targetRegex, `$1${targetChatId}$3`);
  },

  updateTransparencyStats(cmsContent, stats) {
    let updatedContent = cmsContent;
    if (stats.active_frames !== undefined) {
      updatedContent = updatedContent.replace(/active_frames:\s*\d+/, `active_frames: ${stats.active_frames}`);
    }
    if (stats.survival_rate !== undefined) {
      updatedContent = updatedContent.replace(/survival_rate:\s*\d+/, `survival_rate: ${stats.survival_rate}`);
      // Also update the human-readable string in REGISTRY_CONTENT (handles variable years or labels)
      updatedContent = updatedContent.replace(/total:\s*"Avg\. Frame Survival:\s*\d+%/ , `total: "Avg. Frame Survival: ${stats.survival_rate}%`);
    }
    if (stats.total_funds !== undefined) {
      updatedContent = updatedContent.replace(/total_funds:\s*'[^']+'/, `total_funds: '${stats.total_funds}'`);
    }
    if (stats.field_allocation !== undefined) {
      updatedContent = updatedContent.replace(/field_allocation:\s*\d+/, `field_allocation: ${stats.field_allocation}`);
    }
    return updatedContent;
  },

  addDocumentToVault(cmsContent, doc) {
    const injectionTarget = 'export const DOCUMENT_VAULTS = [';
    if (!cmsContent.includes(injectionTarget)) return cmsContent;

    const newDocStr = `\n  { icon: '${doc.icon || '📄'}', title: '${doc.title}', type: '${doc.type}', date: '${doc.date}', category: '${doc.category || 'General'}', path: '${doc.path || ''}' },`;
    return cmsContent.replace(injectionTarget, injectionTarget + newDocStr);
  },

  updateFundAllocation(cmsContent, label, pct) {
    // This is trickier with regex, but since the labels are unique, we can target them
    const labelRegex = new RegExp(`({ label: '${label}', pct: )\\d+( })?`);
    if (labelRegex.test(cmsContent)) {
      return cmsContent.replace(labelRegex, `$1${pct}$2`);
    }
    return cmsContent;
  }
};

module.exports = CMSManager;
