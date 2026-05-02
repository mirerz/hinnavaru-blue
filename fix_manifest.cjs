const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'public/deep-archives');
const manifestPath = path.join(rootDir, 'media-hub/manifest.json');
let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === '.git') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const allFiles = walk(rootDir);

manifest.assets.forEach(asset => {
    const matchedFile = allFiles.find(f => path.basename(f) === asset.name);
    if (matchedFile) {
        let relativeUrl = matchedFile.replace(/\\/g, '/');
        // keep everything from /deep-archives/ onwards
        const idx = relativeUrl.indexOf('/deep-archives/');
        if (idx !== -1) {
            asset.url = relativeUrl.substring(idx);
        }
    }
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Manifest updated successfully.');
