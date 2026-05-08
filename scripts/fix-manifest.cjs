const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MANIFEST_PATH = path.join(__dirname, '..', 'src', 'data', 'media-manifest.json');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (file === 'assets') return;
    if (file.startsWith('.')) return;
    
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function fixManifest() {
  console.log('Crawling public directory:', PUBLIC_DIR);
  const allFiles = getAllFiles(PUBLIC_DIR);
  
  console.log('Total files found:', allFiles.length);

  const relativePaths = allFiles
    .map(f => {
      let rel = path.relative(PUBLIC_DIR, f).replace(/\\/g, '/');
      return '/' + rel;
    })
    .filter(p => {
      const match = p.match(/\.(jpg|jpeg|png|webp|lrv|mp4|pdf)$/i);
      if (p.includes('pulse-update')) {
         console.log('Found pulse-update candidate:', p, 'Match:', !!match);
      }
      return match;
    });

  console.log(`Filtered to ${relativePaths.length} media/doc files.`);

  // Debug: show some Puls paths
  const pulsFiles = relativePaths.filter(p => p.toLowerCase().includes('/puls/'));
  console.log('Puls files found:', pulsFiles.length);
  if (pulsFiles.length > 0) console.log('Sample Puls path:', pulsFiles[0]);

  let manifest = { archives: [], slideshow: [], videos: [], pdfs: [] };
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (e) {
    console.log('Creating new manifest structure.');
  }
  
  manifest.last_sync = new Date().toISOString();
  
  const focusMedia = relativePaths.filter(p => p.toLowerCase().includes('/focus/'));
  const pulsMedia = relativePaths.filter(p => p.toLowerCase().includes('/puls/'));
  const hubMedia = relativePaths.filter(p => p.toLowerCase().includes('/media-hub/'));
  
  manifest.archives = [...focusMedia, ...pulsMedia, ...hubMedia];
  
  manifest.slideshow = focusMedia.filter(p => p.match(/\.(jpg|jpeg|png|webp)$/i)).slice(0, 10);
  if (manifest.slideshow.length === 0) {
    manifest.slideshow = hubMedia.filter(p => p.match(/\.(jpg|jpeg|png|webp)$/i)).slice(0, 5);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('Manifest updated successfully.');
}

fixManifest();
