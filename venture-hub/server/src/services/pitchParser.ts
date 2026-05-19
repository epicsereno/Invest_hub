import fs from 'fs';
import path from 'path';
import { Venture } from '../../../shared/types';

export const parsePitch = (filePath: string): Partial<Venture> => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const venture: Partial<Venture> = {
    id: path.basename(path.dirname(filePath)),
    name: lines[0].replace('# ', '').trim(),
    pitch: '',
    problem: '',
    solution: '',
    revenueModel: '',
    fundingGoal: 1000000, // Default
    currentFunding: 0,
    activityScore: Math.floor(Math.random() * 100),
  };

  let currentSection = '';
  for (const line of lines) {
    if (line.startsWith('## The Pitch')) {
      currentSection = 'pitch';
      continue;
    } else if (line.startsWith('## Problem')) {
      currentSection = 'problem';
      continue;
    } else if (line.startsWith('## Solution')) {
      currentSection = 'solution';
      continue;
    } else if (line.startsWith('## Revenue Model')) {
      currentSection = 'revenueModel';
      continue;
    }

    if (currentSection && line.trim()) {
      (venture as any)[currentSection] += line.trim() + ' ';
    }
  }

  // Extract tagline from pitch if possible
  if (venture.pitch) {
    const match = venture.pitch.match(/"([^"]+)"/);
    venture.tagline = match ? match[1] : venture.pitch.substring(0, 100) + '...';
  }

  return venture;
};

export const getAllPitches = (baseDir: string): Venture[] => {
  const ventures: Venture[] = [];
  const directories = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const dir of directories) {
    const pitchPath = path.join(baseDir, dir.name, 'PITCH.md');
    if (fs.existsSync(pitchPath)) {
      ventures.push(parsePitch(pitchPath) as Venture);
    }
  }

  return ventures;
};
