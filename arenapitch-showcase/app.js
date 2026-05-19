const pitches = [
  {
    title: 'SmartCrate Modular Cooler',
    category: 'Consumer Hardware',
    stage: 'Revenue',
    arena: 'public',
    ask: '$350K',
    equity: '6%',
    votes: 842,
    offers: 4,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    summary: 'A stackable cooler system with swappable battery, dry storage, and event rental inventory tracking.',
  },
  {
    title: 'GridBloom Home Battery',
    category: 'Climate Tech',
    stage: 'Pilot',
    arena: 'public',
    ask: '$1.2M',
    equity: '9%',
    votes: 621,
    offers: 2,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    summary: 'A small-format battery and solar controller for renters, ADUs, and micro-businesses.',
  },
  {
    title: 'PulsePatch Recovery Monitor',
    category: 'Health',
    stage: 'Prototype',
    arena: 'public',
    ask: '$500K',
    equity: '7%',
    votes: 488,
    offers: 1,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    summary: 'A wearable patch for post-surgery recovery tracking with clinician alerts and caregiver summaries.',
  },
  {
    title: 'NDA Room: ThermalPak',
    category: 'Consumer Hardware',
    stage: 'Pilot',
    arena: 'private',
    ask: '$800K',
    equity: '10%',
    votes: 0,
    offers: 3,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=900&q=80',
    summary: 'Invite-only review for patented thermal packaging materials and distribution economics.',
  },
  {
    title: 'NDA Room: CleanLoop',
    category: 'Climate Tech',
    stage: 'Revenue',
    arena: 'private',
    ask: '$2.4M',
    equity: '12%',
    votes: 0,
    offers: 5,
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80',
    summary: 'A water reuse platform for light industrial sites with live private diligence materials.',
  },
  {
    title: 'NDA Room: CareSignal',
    category: 'Health',
    stage: 'Prototype',
    arena: 'private',
    ask: '$650K',
    equity: '8%',
    votes: 0,
    offers: 2,
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80',
    summary: 'A protected pitch room for remote patient monitoring IP, pilots, and reimbursement strategy.',
  },
];

const state = {
  arena: 'public',
  category: 'all',
  stage: 'all',
};

const grid = document.querySelector('#pitch-grid');
const feedTitle = document.querySelector('#feed-title');
const arenaButtons = document.querySelectorAll('[data-arena]');
const categoryFilter = document.querySelector('#category-filter');
const stageFilter = document.querySelector('#stage-filter');
const refreshButton = document.querySelector('#refresh-feed');

function renderPitches() {
  const visible = pitches.filter((pitch) => {
    const arenaMatch = pitch.arena === state.arena;
    const categoryMatch = state.category === 'all' || pitch.category === state.category;
    const stageMatch = state.stage === 'all' || pitch.stage === state.stage;
    return arenaMatch && categoryMatch && stageMatch;
  });

  feedTitle.textContent = state.arena === 'public' ? 'Public Arena' : 'Private Arena';

  grid.innerHTML = visible
    .map(
      (pitch) => `
        <article class="pitch-card">
          <img src="${pitch.image}" alt="${pitch.title} pitch preview" />
          <div class="pitch-body">
            <div class="pitch-meta">
              <span class="pill ${pitch.arena === 'private' ? 'private' : ''}">${pitch.arena}</span>
              <span class="pill">${pitch.stage}</span>
            </div>
            <div>
              <h3>${pitch.title}</h3>
              <p>${pitch.summary}</p>
            </div>
            <div class="pitch-stats">
              <span>${pitch.ask} ask</span>
              <span>${pitch.equity} equity</span>
              <span>${pitch.offers} offers</span>
            </div>
          </div>
        </article>
      `,
    )
    .join('');
}

arenaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.arena = button.dataset.arena;
    arenaButtons.forEach((item) => item.classList.toggle('active', item === button));
    renderPitches();
  });
});

categoryFilter.addEventListener('change', (event) => {
  state.category = event.target.value;
  renderPitches();
});

stageFilter.addEventListener('change', (event) => {
  state.stage = event.target.value;
  renderPitches();
});

refreshButton.addEventListener('click', () => {
  grid.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
  renderPitches();
});

renderPitches();
