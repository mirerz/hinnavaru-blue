import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const distDir = path.join(process.cwd(), 'dist');

console.log('🏗️ Starting Manual Git Deployment...');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist folder not found! Build first.');
  process.exit(1);
}

try {
  process.chdir(distDir);
  
  console.log('📦 Initializing temporary git repo in dist...');
  execSync('git init', { stdio: 'inherit' });
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Manual deploy from local build"', { stdio: 'inherit' });
  
  console.log('🌐 Pushing to GitHub gh-pages branch...');
  // Force push to the gh-pages branch of the origin repo
  execSync('git push -f https://github.com/mirerz/hinnavaru-blue.git master:gh-pages', { stdio: 'inherit' });
  
  console.log('🎉 Manual Deployment Successful!');
} catch (err) {
  console.error('❌ Manual Deployment Failed:', err.message);
  console.log('👉 Tip: Check if your git credentials are valid.');
} finally {
  // Clean up the .git folder in dist to avoid confusing the main repo
  const gitDir = path.join(distDir, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }
}
