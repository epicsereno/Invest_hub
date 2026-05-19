export interface Venture {
  id: string;
  name: string;
  tagline: string;
  pitch: string;
  problem: string;
  solution: string;
  revenueModel: string;
  fundingGoal: number;
  currentFunding: number;
  industry: string;
  activityScore: number; // For the heatmap
}

export interface Comment {
  id: string;
  ventureId: string;
  author: string;
  role: 'Shark' | 'Pitcher' | 'Audience';
  text: string;
  timestamp: string;
}

export interface Investment {
  id: string;
  ventureId: string;
  investorName: string;
  amount: number;
  type: 'Equity' | 'Debt';
  timestamp: string;
}

export interface Persona {
  name: string;
  role: 'Shark' | 'Pitcher';
  bio: string;
  avatar?: string;
}
