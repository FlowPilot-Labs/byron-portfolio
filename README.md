# byron-portfolio

Personal portfolio for [Byron Baleda](https://github.com/FlowPilot-Labs) — static HTML/CSS/JS on GitHub Pages.

**Repo:** https://github.com/FlowPilot-Labs/byron-portfolio (public)  
**Live:** https://flowpilot-labs.github.io/byron-portfolio/

## Structure

```
byron-portfolio/
├── index.html                 # Home: hero, work, about, resume, contact
├── projects/
│   ├── finden.html            # FinDen case study
│   ├── fleetpilot.html        # FleetPilot case study
│   ├── shiftboard.html        # ShiftBoard case study
│   └── bookpilot-rooms.html   # BookPilot Rooms case study
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
- Live app: https://finden-webapp.pages.dev/
- Local-only (earlier web build): [`projects/finden-local.html`](projects/finden-local.html) — https://finden-old.pages.dev/

**FleetPilot** — local-first trucking management prototype.

- Case study: [`projects/fleetpilot.html`](projects/fleetpilot.html)
- Live app: https://fleetpilot.pages.dev/
- Demo video: [`assets/projects/fleetpilot/FleetPilotDemo.mp4`](assets/projects/fleetpilot/FleetPilotDemo.mp4)

**ShiftBoard** — local-first employee scheduling prototype.

- Case study: [`projects/shiftboard.html`](projects/shiftboard.html)
- Live app: https://shiftboard-app.pages.dev/
- Demo video: [`assets/projects/shiftboard/ShiftBoardDemo.mp4`](assets/projects/shiftboard/ShiftBoardDemo.mp4)

**BookPilot Rooms** — booking and room management for small Philippine accommodations.

- Case study: [`projects/bookpilot-rooms.html`](projects/bookpilot-rooms.html)
- Live app: https://bookpilot-rooms-web.pages.dev/demo?t=bpr-demo-8k2mQn9vL4xR
- Demo video: [`assets/projects/bookpilot-rooms/BookPilotRoomsDemo.mp4`](assets/projects/bookpilot-rooms/BookPilotRoomsDemo.mp4)

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
