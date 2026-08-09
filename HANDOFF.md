# Portfolio handoff — byron-portfolio

**Updated:** 2026-08-09  
**Repo:** https://github.com/FlowPilot-Labs/byron-portfolio (private)  
**Live:** https://flowpilot-labs.github.io/byron-portfolio/  
**Local path:** `/Users/byronbaleda/AndroidStudioProjects/byron-portfolio`

Static HTML/CSS/JS portfolio for Byron Baleda, deployed via GitHub Pages from `main` (branch `/` root). Repo is private; Pages site is public.

---

## Goal

Side freelance client acquisition. Not SEO-heavy. Clients find Byron via LinkedIn, referrals, or a direct link.

**Intentional choices:**
- Featured projects: FinDen and FleetPilot. Extra project cards stay in the DOM with `hidden` until ready.
- **No public FinDen source-repo link** — repo is private by design.
- Favicon + Open Graph added for share/tab polish; deep SEO is out of scope.

---

## Structure

```
byron-portfolio/
├── index.html                 # Home: hero, work, about, resume, contact
├── projects/finden.html       # FinDen case study
├── projects/fleetpilot.html   # FleetPilot case study
├── assets/
│   ├── favicon.svg / .png
│   ├── apple-touch-icon.png
│   ├── og-home.png / og-finden.png
│   ├── Byron Baleda Resume.pdf
│   ├── resume-print.html      # Source for regenerating the PDF
│   └── projects/              # Screenshots + demo media
├── scripts/main.js
├── styles/main.css
├── styles/themes.css
└── README.md
```

---

## Resume

- Site resume: `#resume` on `index.html` (timeline + bullets)
- Print source: `assets/resume-print.html` (kept in sync with site bullets)
- Downloadable PDF: `assets/Byron Baleda Resume.pdf`

**Regenerate PDF** (after editing `resume-print.html`):

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTML="$HOME/AndroidStudioProjects/byron-portfolio/assets/resume-print.html"
PDF="$HOME/AndroidStudioProjects/byron-portfolio/assets/Byron Baleda Resume.pdf"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML"
```

Recent experience bullets updated for:
- Tribal Group — Development Team Lead
- Tribal Group — Senior Software Developer
- Lendsoft — Team Lead
- Condor — Software Programmer
- Pointwest — .NET Software Engineer

---

## Local preview

Port **5500** (not FinDen Vite `5173`):

```bash
cd ~/AndroidStudioProjects/byron-portfolio
python3 -m http.server 5500
```

Open http://127.0.0.1:5500

---

## Deploy

```bash
git add -A
git commit -m "Your message"
git push origin main
```

Pages source: branch `main`, `/ (root)`. Status: `gh api repos/FlowPilot-Labs/byron-portfolio/pages`

Contact: byrzbal@gmail.com · LinkedIn `byronbaleda` · GitHub `byrzbal`

---

## Likely next work

1. Unhide / replace placeholder project cards when new case studies are ready
2. Optional: Services / “how I can help” blurb for freelance skimmers
3. Keep LinkedIn aligned with site positioning
4. If resume text changes again → update `index.html` + `resume-print.html` + regenerate PDF
