const { octokit, REPO_OWNER, REPO_NAME } = require('./clients');

const Automation = {
  async triggerMediaSync() {
    console.log('🔄 Triggering GitHub Media Automation Pipeline...');
    try {
      await octokit.actions.createWorkflowDispatch({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        workflow_id: 'media-sync.yml',
        ref: 'main',
      });
      console.log('✅ GitHub Workflow triggered successfully.');
      return true;
    } catch (err) {
      console.error('❌ Trigger Error:', err.message);
      return false;
    }
  }
};

module.exports = Automation;
