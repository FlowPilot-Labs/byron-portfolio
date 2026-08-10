# byron-portfolio

Personal portfolio for [Byron Baleda](https://github.com/byrzbal) — static HTML/CSS/JS on GitHub Pages.

**Repo:** https://github.com/FlowPilot-Labs/byron-portfolio (private)  
**Live:** https://flowpilot-labs.github.io/byron-portfolio/

## Structure

```
byron-portfolio/
├── index.html                 # Home: hero, work, about, resume, contact
├── projects/
│   ├── finden.html            # FinDen case study
│   ├── fleetpilot.html        # FleetPilot case study
│   └── shiftboard.html        # ShiftBoard case study
├── assets/
│   ├── favicon.svg / .png     # Browser tab icon
│   ├── apple-touch-icon.png   # iOS home-screen icon
│   ├── og-home.png            # Social preview (home)
│   ├── og-finden.png          # Social preview (FinDen)
│   ├── Byron Baleda Resume.pdf
│   ├── resume-print.html
│   └── projects/              # Screenshots + demo media
├── scripts/main.js
└── styles/
    ├── main.css
    └── themes.css
```

## Featured work

**FinDen** — local-first personal finance (Android + web). Case study:
architecture, technologies, screenshots, demo video, and live app link.

- Case study: [`projects/finden.html`](projects/finden.html)
- Live app: https://flowpilot-labs.github.io/FinDen/

**FleetPilot** — local-first trucking management prototype.

- Case study: [`projects/fleetpilot.html`](projects/fleetpilot.html)
- Live app: https://flowpilot-labs.github.io/fleetpilot/
- Demo video: [`assets/projects/fleetpilot/FleetPilotDemo.mp4`](assets/projects/fleetpilot/FleetPilotDemo.mp4)

**ShiftBoard** — local-first employee scheduling prototype.

- Case study: [`projects/shiftboard.html`](projects/shiftboard.html)
- Live app: https://flowpilot-labs.github.io/ShiftBoard/
- Demo video: [`assets/projects/shiftboard/ShiftBoardDemo.mp4`](assets/projects/shiftboard/ShiftBoardDemo.mp4)

Two extra project cards (Client Portal, AI Automation) stay in the DOM with
`hidden` until real case studies are ready. Remove `hidden` on those
`<article class="project-card">` elements in `index.html` to show them.

## Theme

Day/night themes switch automatically by local time (day = Clean alpine `5`,
night = Soft steel `13`). The floating theme picker is kept in the markup but
hidden; see comments in `index.html` / `scripts/main.js` to restore manual
picking.

## Local preview

Does **not** use FinDen’s Vite port (`5173`). Use **5500**:

```bash
cd ~/AndroidStudioProjects/byron-portfolio
python3 -m http.server 5500
```

Open http://127.0.0.1:5500

Or open `index.html` directly in a browser (no server).

## Deploy

1. Push `main` to `FlowPilot-Labs/byron-portfolio`
2. GitHub → Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`
3. Wait a minute, then visit https://flowpilot-labs.github.io/byron-portfolio/
