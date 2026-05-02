const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'src', 'data', 'media-manifest.json');
let content = fs.readFileSync(manifestPath, 'utf8');

// Replace /deep-archives/GPDR... with /deep-archives/Focus/GPDR...
content = content.replace(/"\/deep-archives\/GPDR/g, '"/deep-archives/Focus/GPDR');

let manifest = JSON.parse(content);

if (manifest.pdfs) {
  manifest.pdfs = manifest.pdfs.map(pdf => {
    if (pdf.path && pdf.path.includes('/deep-archives/media-hub/')) {
      pdf.path = pdf.path.replace('/deep-archives/media-hub/', '/deep-archives/Docs/');
    }
    return pdf;
  });
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Manifest updated successfully.');
