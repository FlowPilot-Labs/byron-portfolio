# Portfolio handoff — byrzbal.github.io

**Updated:** 2026-08-08  
**Repo:** https://github.com/byrzbal/byrzbal.github.io  
**Live:** https://byrzbal.github.io/  
**Local path:** `/Users/byronbaleda/AndroidStudioProjects/byrzbal.github.io`

Static HTML/CSS/JS portfolio for Byron Baleda, deployed via GitHub Pages from `main` (branch `/` root).

---

## Goal

Side freelance client acquisition. Not SEO-heavy. Clients find Byron via LinkedIn, referrals, or a direct link.

**Intentional choices:**
- Only **one public project** (FinDen). Extra project cards stay in the DOM with `hidden` until ready.
- **No public FinDen source-repo link** — repo is private by design.
- Favicon + Open Graph added for share/tab polish; deep SEO is out of scope.

---

## Structure

```
byrzbal.github.io/
├── index.html                 # Home: hero, work, about, resume, contact
├── projects/finden.html       # FinDen case study
├── assets/
│   ├── favicon.svg / .png
│   ├── apple-touch-icon.png
│   ├── og-home.png / og-finden.png
│   ├── Byron Baleda Resume.pdf
│   ├── resume-print.html      # Source for regenerating the PDF
│   └── projects/finden/       # Screenshots + FinDenDemo.mp4
├── scripts/main.js
├── styles/main.css
├── styles/themes.css
└── README.md
```

---

## Themes

Auto day/night by local time:
- Day (06:00–17:59) → theme `5` (Clean alpine)
- Night → theme `13` (Soft steel)

Theme picker markup exists but is **hidden**. To restore manual picking: see comments in `index.html` / `scripts/main.js` (`AUTO_THEME = false`) and show `.theme-picker` in CSS.

HTML `hidden` is reinforced in CSS (`[hidden] { display: none !important; }`) because `.project-card` / `.btn` `display: flex` otherwise override it.

---

## FinDen case study

Page: `projects/finden.html`

Includes:
- Real summary / problem / solution / architecture writeup
- CSS-variable architecture diagram (adapts to day/night)
- Technologies list
- Screenshots: home, plan, invest, goals
- Demo video (`assets/projects/finden/FinDenDemo.mp4`)
- Live app: https://flowpilot-labs.github.io/FinDen/

Related product monorepo (private / separate):  
`/Users/byronbaleda/AndroidStudioProjects/FinDen`  
Stack overview: Android (Kotlin, Compose, Room) + web (React, TypeScript, Vite, Zustand, localStorage) + shared `design/tokens.json` + planned ASP.NET Core API + GitHub Actions → Pages.

---

## Hidden / restore later

| What | Where | How to restore |
| --- | --- | --- |
| Client Portal + AI Automation cards | `index.html` project grid | Remove `hidden` on those `<article class="project-card">` elements |
| Theme picker | `index.html`, `finden.html`, `scripts/main.js`, `themes.css` | Follow comments; set `AUTO_THEME = false` |

---

## Resume

- Site resume: `#resume` on `index.html` (timeline + bullets)
- Print source: `assets/resume-print.html` (kept in sync with site bullets)
- Downloadable PDF: `assets/Byron Baleda Resume.pdf`

**Regenerate PDF** (after editing `resume-print.html`):

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTML="$HOME/AndroidStudioProjects/byrzbal.github.io/assets/resume-print.html"
PDF="$HOME/AndroidStudioProjects/byrzbal.github.io/assets/Byron Baleda Resume.pdf"
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
cd ~/AndroidStudioProjects/byrzbal.github.io
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

Pages source: branch `main`, `/ (root)`. Status: `gh api repos/byrzbal/byrzbal.github.io/pages`

Contact: byrzbal@gmail.com · LinkedIn `byronbaleda` · GitHub `byrzbal`

---

## Likely next work

1. Unhide / replace placeholder project cards when new case studies are ready
2. Optional: Services / “how I can help” blurb for freelance skimmers
3. Keep LinkedIn aligned with site positioning
4. If resume text changes again → update `index.html` + `resume-print.html` + regenerate PDF
