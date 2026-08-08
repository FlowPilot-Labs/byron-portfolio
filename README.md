# byrzbal.github.io

Personal portfolio for [Byron Baleda](https://github.com/byrzbal) — static HTML/CSS/JS on GitHub Pages.

**Live:** https://byrzbal.github.io

## Structure

```
byrzbal.github.io/
├── index.html                 # Home: hero, work, about, resume, contact
├── projects/
│   └── finden.html            # FinDen case study
├── assets/
│   ├── favicon.svg / .png     # Browser tab icon
│   ├── apple-touch-icon.png   # iOS home-screen icon
│   ├── og-home.png            # Social preview (home)
│   ├── og-finden.png          # Social preview (FinDen)
│   ├── Byron Baleda Resume.pdf
│   ├── resume-print.html
│   └── projects/finden/       # Screenshots + demo video
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
- Source: https://github.com/byrzbal/FinDen (or FlowPilot-Labs org, if that is the public repo)

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
cd ~/AndroidStudioProjects/byrzbal.github.io
python3 -m http.server 5500
```

Open http://127.0.0.1:5500

Or open `index.html` directly in a browser (no server).

## Deploy

1. Push `main` to `byrzbal/byrzbal.github.io`
2. GitHub → Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`
3. Wait a minute, then visit https://byrzbal.github.io
