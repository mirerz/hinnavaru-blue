import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cmsPath = path.join(__dirname, '../src/data/cms.js');

function extendExpiry() {
  console.log('Reading cms.js...');
  let content = fs.readFileSync(cmsPath, 'utf8');

  // Find the LAGOON_STORIES block
  const lagoonStoriesMatch = content.match(/export const LAGOON_STORIES\s*=\s*\[([\s\S]*?)\]/);
  if (!lagoonStoriesMatch) {
    console.error('Could not find LAGOON_STORIES in cms.js');
    return;
  }

  const storiesBlock = lagoonStoriesMatch[1];
  let updatedStoriesBlock = storiesBlock;

  // Find all expiryDates within this block (supports both single and double quotes)
  const expiryRegex = /expiryDate:\s*['"]([^'"]+)['"]/g;
  let match;
  let updatedCount = 0;

  const now = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(now.getMonth() + 3);

  while ((match = expiryRegex.exec(storiesBlock)) !== null) {
    const fullMatch = match[0];
    const dateStr = match[1];
    const expiryDate = new Date(dateStr);

    // If expiry date is in the past or within the next 30 days, extend it
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays < 30) {
      const quote = fullMatch.includes('"') ? '"' : "'";
      const newExpiryStr = threeMonthsFromNow.toISOString().split('.')[0] + 'Z';
      updatedStoriesBlock = updatedStoriesBlock.replace(fullMatch, `expiryDate: ${quote}${newExpiryStr}${quote}`);
      updatedCount++;
      console.log(`Extended expiry date from ${dateStr} to ${newExpiryStr}`);
    }
  }

  if (updatedCount > 0) {
    content = content.replace(storiesBlock, updatedStoriesBlock);
    fs.writeFileSync(cmsPath, content, 'utf8');
    console.log(`Successfully extended ${updatedCount} expiry dates.`);
  } else {
    console.log('No expiry dates needed extension.');
  }
}

extendExpiry();
