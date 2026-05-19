import { query } from './db';

export const seedMockData = () => {
  if (query.discussions.count() === 0) {
    // John Doe (Shark) asking questions to Jane Doe (Pitcher) on SmartPipe
    query.discussions.create({
      ventureId: 'smartpipe-diagnostics',
      author: 'John Doe',
      role: 'Shark',
      text: "How do you plan to handle the installation barrier for non-technical homeowners? Even 'clip-on' sensors can be intimidating."
    });

    query.discussions.create({
      ventureId: 'smartpipe-diagnostics',
      author: 'Jane Doe',
      role: 'Pitcher',
      text: "Great question, John. We're partnering with local hardware stores to offer 'SmartPipe Certified' installation for a flat $49 fee, but the app also features an AR guide that has a 95% success rate in our pilots."
    });

    query.investments.create({
      ventureId: 'smartpipe-diagnostics',
      investorName: 'John Doe',
      amount: 250000,
      type: 'Equity'
    });
  }
};
