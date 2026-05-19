import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '../../database.json');

const loadDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    return { discussions: [], investments: [] };
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

const saveDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

export const query = {
  discussions: {
    findMany: (filter: any) => {
      const db = loadDB();
      return db.discussions.filter((d: any) => d.ventureId === filter.ventureId);
    },
    create: (data: any) => {
      const db = loadDB();
      db.discussions.push({ ...data, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() });
      saveDB(db);
    },
    count: () => loadDB().discussions.length
  },
  investments: {
    sum: (ventureId: string) => {
      const db = loadDB();
      return db.investments
        .filter((i: any) => i.ventureId === ventureId)
        .reduce((sum: number, i: any) => sum + i.amount, 0);
    },
    create: (data: any) => {
      const db = loadDB();
      db.investments.push({ ...data, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() });
      saveDB(db);
    }
  }
};
