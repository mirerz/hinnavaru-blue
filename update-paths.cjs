const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.json') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

const rootImages = [
  'hero-bg.png', 'Living-L.png', 'Project-Progs.png', 'Adopt-Frame.png', 
  'Blue-Registry.png', 'Born-Lagoon.png', 'hotline-icon.png', 'we-are.png', 
  'planning-cycle.png', 'logo-circle.png', 'logo-island.png',
  'icons.svg', 'CoverBK.webp', 'skipjacii.webp', 'underwater.webp'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace /media-hub/ with /deep-archives/media-hub/
  if (content.includes('/media-hub/')) {
    content = content.replace(/\/media-hub\//g, '/deep-archives/media-hub/');
    changed = true;
  }

  // Collapse redundant deep-archives paths
  if (content.includes('/deep-archives/deep-archives/')) {
    content = content.replace(/\/deep-archives\/deep-archives\//g, '/deep-archives/');
    changed = true;
  }

  // Replace root images
  rootImages.forEach(img => {
    const regex1 = new RegExp(`'/${img}'`, 'g');
    if (regex1.test(content)) {
      content = content.replace(regex1, `'/deep-archives/media-hub/${img}'`);
      changed = true;
    }
    const regex2 = new RegExp(`"/${img}"`, 'g');
    if (regex2.test(content)) {
      content = content.replace(regex2, `"/deep-archives/media-hub/${img}"`);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
