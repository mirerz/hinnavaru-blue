import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const cacheDir = path.join(process.cwd(), 'node_modules', '.cache', 'gh-pages');
const dotGhPages = path.join(process.cwd(), '.gh-pages');

console.log('🚀 Starting Force Deployment Fix...');

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    console.log(`🧹 Removing ${dir}...`);
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Removed ${dir}`);
    } catch (err) {
      console.error(`❌ Failed to remove ${dir}: ${err.message}`);
      console.log('💡 Attempting to rename it first (Windows workaround)...');
      const tempDir = `${dir}_old_${Date.now()}`;
      try {
        fs.renameSync(dir, tempDir);
        console.log(`✅ Renamed to ${tempDir}. You can delete it later.`);
      } catch (renameErr) {
        console.error(`❌ Still failing: ${renameErr.message}`);
      }
    }
  }
}

cleanDir(dotGhPages);
cleanDir(cacheDir);

console.log('📦 Running Build...');
execSync('npm run build', { stdio: 'inherit' });

console.log('🌐 Deploying to GitHub Pages...');
try {
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  console.log('🎉 Deployment Successful!');
} catch (err) {
  console.error('❌ Deployment Failed again.');
  console.log('👉 Tip: Try closing any folder windows pointing to the project or close your Git GUI.');
}
