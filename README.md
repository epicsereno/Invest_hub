# Shark Tank Ideas

A portfolio workspace for Shark Tank-style venture concepts, investor notes, and the ArenaPitch product prototype.

The repository includes pitch documents for 10 remote-work and infrastructure ventures, a static ArenaPitch showcase site, a React/Vite venture dashboard, and a NestJS backend prototype for pitch, deal, user, notification, and analytics flows.

## Live Site

GitHub Pages is configured to publish the static ArenaPitch showcase from `arenapitch-showcase/`.

After GitHub Pages is enabled for this repository with **Source: GitHub Actions**, the site will be available at:

`https://epicsereno.github.io/Invest_hub/`

## Repository Map

- `DASHBOARD.md`: investor-facing overview of the venture portfolio
- `INVESTORS.md`: investor status notes
- `businesses/*/PITCH.md`: individual venture pitch documents
- `arenapitch-showcase/`: static public product showcase for ArenaPitch
- `venture-hub/client/`: React, TypeScript, and Vite dashboard
- `venture-hub/server/`: TypeScript server prototype
- `arenapitch-backend/`: NestJS backend with Prisma schema and modular domain services

## ArenaPitch Showcase

The GitHub Pages deployment uses the static site in `arenapitch-showcase/`.

To preview it locally, open:

`arenapitch-showcase/index.html`

No build step is required for the showcase.

## Venture Hub Client

```bash
cd venture-hub/client
npm install
npm run dev
```

Build the dashboard:

```bash
cd venture-hub/client
npm run build
```

The client build aggregates pitch data from the `businesses/` directory into `venture-hub/client/public/data/ventures.json`.

## Backend Prototype

```bash
cd arenapitch-backend
npm install
npm run start:dev
```

Copy `.env.example` to `.env` before running services that require local configuration.

## GitHub Pages

This repo includes `.github/workflows/pages.yml`.

To publish:

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The workflow uploads `arenapitch-showcase/` as the Pages artifact.
