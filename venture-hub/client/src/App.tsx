import React, { useState, useEffect } from 'react';
import { Rocket, TrendingUp, Users, MessageSquare, Shield, DollarSign, Zap } from 'lucide-react';

interface Venture {
  id: string;
  name: string;
  tagline: string;
  category: string;
  fundingGoal: number;
  currentFunding: number;
  activityScore: number;
  description: string;
}

const App = () => {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'investment' | 'innovation'>('dashboard');

  useEffect(() => {
    // In production, this will fetch from the public/data/ventures.json
    fetch('./data/ventures.json')
      .then(res => res.json())
      .then(data => {
        setVentures(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load ventures:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '10rem' }}>Loading the Tank...</div>;

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>
          VENTURE<span className="gold-text">HUB</span>
        </h1>
        <p style={{ color: 'var(--slate)', fontSize: '1.1rem' }}>The Modern Tank: Aggregating Innovation Across the Infrastructure Ecosystem</p>
        
        <nav style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {(['dashboard', 'investment', 'innovation'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn-bite"
              style={{ 
                background: activeTab === tab ? 'var(--gold-glow)' : 'transparent',
                borderColor: activeTab === tab ? 'var(--gold)' : 'var(--glass-border)',
                color: activeTab === tab ? 'var(--gold)' : 'var(--slate)'
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </header>

      {activeTab === 'dashboard' && <DashboardView ventures={ventures} />}
      {activeTab === 'investment' && <InvestmentView ventures={ventures} />}
      {activeTab === 'innovation' && <InnovationView ventures={ventures} />}

      <Footer />
    </div>
  );
};

const DashboardView = ({ ventures }: { ventures: Venture[] }) => (
  <section className="grid">
    {ventures.map(venture => (
      <div key={venture.id} className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Rocket size={24} className="gold-text" />
          <ActivityHeatmap score={venture.activityScore} />
        </div>
        
        <h3 style={{ marginBottom: '0.5rem' }}>{venture.name}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate)', marginBottom: '1.5rem', height: '3rem', overflow: 'hidden' }}>
          {venture.tagline}
        </p>

        <ProgressBar current={venture.currentFunding} goal={venture.fundingGoal} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--slate)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
              <MessageSquare size={14} /> {Math.floor(Math.random() * 10)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
              <Users size={14} /> {Math.floor(Math.random() * 5)}
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold-glow)', padding: '2px 8px', borderRadius: '10px' }}>
            {venture.category}
          </span>
        </div>
      </div>
    ))}
  </section>
);

const InvestmentView = ({ ventures }: { ventures: Venture[] }) => (
  <section>
    <div className="glass-card" style={{ marginBottom: '2rem', textAlign: 'center', padding: '3rem' }}>
      <DollarSign size={48} className="gold-text" style={{ marginBottom: '1rem' }} />
      <h2 style={{ marginBottom: '1rem' }}>Global Portfolio Metrics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'var(--slate)' }}>Total Funding Goal</h4>
          <h2 className="gold-text">${(ventures.reduce((acc, v) => acc + v.fundingGoal, 0) / 1000000).toFixed(1)}M</h2>
        </div>
        <div>
          <h4 style={{ color: 'var(--slate)' }}>Raised to Date</h4>
          <h2 style={{ color: 'var(--white)' }}>${(ventures.reduce((acc, v) => acc + v.currentFunding, 0) / 1000000).toFixed(1)}M</h2>
        </div>
        <div>
          <h4 style={{ color: 'var(--slate)' }}>Active Ventures</h4>
          <h2 style={{ color: 'var(--white)' }}>{ventures.length}</h2>
        </div>
      </div>
    </div>

    <div className="grid">
      {ventures.sort((a, b) => (b.currentFunding/b.fundingGoal) - (a.currentFunding/a.fundingGoal)).map(venture => (
        <div key={venture.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>{venture.name}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>Valuation Target</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${(venture.fundingGoal * 5 / 1000000).toFixed(1)}M</div>
            </div>
          </div>
          <ProgressBar current={venture.currentFunding} goal={venture.fundingGoal} />
          <button className="btn-bite" style={{ width: '100%', marginTop: '1.5rem' }}>Request Term Sheet</button>
        </div>
      ))}
    </div>
  </section>
);

const InnovationView = ({ ventures }: { ventures: Venture[] }) => {
  const categories = Array.from(new Set(ventures.map(v => v.category)));
  
  return (
    <section>
      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            {cat === 'Infrastructure' && <Zap className="gold-text" />}
            {cat === 'Remote Work' && <Users className="gold-text" />}
            {cat === 'Wellness' && <Shield className="gold-text" />}
            {cat === 'Team' && <TrendingUp className="gold-text" />}
            <h2 style={{ fontSize: '2rem', borderBottom: '2px solid var(--gold)', paddingBottom: '0.5rem' }}>{cat}</h2>
          </div>
          <div className="grid">
            {ventures.filter(v => v.category === cat).map(venture => (
              <div key={venture.id} className="glass-card">
                <h3 style={{ marginBottom: '1rem' }}>{venture.name}</h3>
                <p style={{ color: 'var(--slate)', fontSize: '0.95rem' }}>{venture.tagline}</p>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-navy-light)', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <div className="gold-text" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Innovation Play:</div>
                  Our approach to {cat.toLowerCase()} focuses on hyper-local efficiency and decentralized resilience.
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const ProgressBar = ({ current, goal }: { current: number, goal: number }) => (
  <div style={{ marginBottom: '0.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
      <span style={{ color: 'var(--slate)' }}>Progress</span>
      <span className="gold-text">{Math.round((current / goal) * 100)}%</span>
    </div>
    <div style={{ width: '100%', height: '6px', background: 'var(--bg-navy-light)', borderRadius: '3px' }}>
      <div 
        style={{ 
          width: `${Math.min(100, (current / goal) * 100)}%`, 
          height: '100%', 
          background: 'var(--gold)', 
          borderRadius: '3px',
          boxShadow: '0 0 10px var(--gold-glow)'
        }} 
      />
    </div>
  </div>
);

const ActivityHeatmap = ({ score }: { score: number }) => {
  const cells = Array.from({ length: 12 }, (_, i) => ({
    opacity: (i / 12) < (score / 100) ? (Math.random() * 0.8 + 0.2) : 0.1
  }));

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {cells.map((cell, i) => (
        <div 
          key={i} 
          style={{ 
            width: '8px', 
            height: '8px', 
            background: 'var(--gold)', 
            opacity: cell.opacity,
            borderRadius: '1px'
          }} 
        />
      ))}
    </div>
  );
};

const Footer = () => (
  <div style={{ marginTop: '6rem', padding: '3rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
    <h2 style={{ marginBottom: '1.5rem' }}>Strategic Partners</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', opacity: 0.6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Shield size={20} /> <span>CyberDefend</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Zap size={20} /> <span>PowerGrid</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <TrendingUp size={20} /> <span>ScaleVentures</span>
      </div>
    </div>
    <p style={{ marginTop: '3rem', color: 'var(--slate)', fontSize: '0.8rem' }}>
      © 2025 Shark Tank Innovation Lab. All ventures are currently in stealth mode.
    </p>
  </div>
);

export default App;
