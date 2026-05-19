import express from 'express';
import cors from 'cors';
import path from 'path';
import { getAllPitches } from './services/pitchParser';
import { seedMockData } from './models/seed';
import { query } from './models/db';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Seed data
seedMockData();

const BUSINESSES_DIR = path.join(__dirname, '../../../businesses');

app.get('/api/ventures', (req, res) => {
  try {
    const ventures = getAllPitches(BUSINESSES_DIR);
    
    // Add current funding from JSON DB
    const venturesWithFunding = ventures.map(v => {
      const total = query.investments.sum(v.id);
      return { ...v, currentFunding: total };
    });

    res.json(venturesWithFunding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ventures' });
  }
});

app.get('/api/ventures/:id', (req, res) => {
  const { id } = req.params;
  try {
    const ventures = getAllPitches(BUSINESSES_DIR);
    const venture = ventures.find(v => v.id === id);

    if (!venture) return res.status(404).json({ error: 'Venture not found' });

    const discussions = query.discussions.findMany({ ventureId: id });
    const total = query.investments.sum(id);

    res.json({
      ...venture,
      currentFunding: total,
      discussions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venture details' });
  }
});

app.post('/api/ventures/:id/bite', (req, res) => {
  const { id } = req.params;
  const { investorName, amount, type } = req.body;
  
  try {
    query.investments.create({ ventureId: id, investorName, amount, type });
    res.status(201).json({ message: 'Bite successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to commit bite' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
