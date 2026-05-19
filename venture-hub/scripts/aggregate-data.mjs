import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUSINESSES_DIR = path.resolve(__dirname, '../../businesses');
const OUTPUT_FILE = path.resolve(__dirname, '../client/public/data/ventures.json');

function parsePitch(content, id) {
  const lines = content.split('\n');
  const name = lines[0].replace('# ', '').trim();
  const taglineMatch = content.match(/## The Pitch\n"(.*)"/);
  const tagline = taglineMatch ? taglineMatch[1] : '';
  
  // Extract category based on ID or content
  let category = 'General';
  if (['smartpipe-diagnostics', 'hvac-as-a-service', 'ameripipe-national'].includes(id)) category = 'Infrastructure';
  if (['codecollab-vr', 'synctime', 'privacyshield'].includes(id)) category = 'Remote Work';
  if (['zenworkspace', 'microlease-offices'].includes(id)) category = 'Wellness';
  if (['skillswap-remote', 'remoteteam-bond'].includes(id)) category = 'Team';

  // Mock some financial data as it's not in the PITCH.md yet
  const fundingGoal = 500000 + (Math.random() * 2000000);
  const currentFunding = Math.random() * fundingGoal;

  return {
    id,
    name,
    tagline,
    category,
    fundingGoal: Math.round(fundingGoal),
    currentFunding: Math.round(currentFunding),
    activityScore: Math.floor(Math.random() * 100),
    description: tagline
  };
}

const ventures = [];
const dirs = fs.readdirSync(BUSINESSES_DIR);

for (const dir of dirs) {
  const pitchPath = path.join(BUSINESSES_DIR, dir, 'PITCH.md');
  if (fs.existsSync(pitchPath)) {
    const content = fs.readFileSync(pitchPath, 'utf-8');
    ventures.push(parsePitch(content, dir));
  }
}

// Ensure directory exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(ventures, null, 2));
console.log(`Aggregated ${ventures.length} ventures into ${OUTPUT_FILE}`);
