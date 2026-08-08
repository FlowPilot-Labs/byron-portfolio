# byrzbal.github.io

Personal portfolio site for [byrzbal](https://github.com/byrzbal) — static HTML/CSS/JS, served via GitHub Pages.

**Live:** https://byrzbal.github.io

## Local preview

Does **not** use FinDen’s Vite port (`5173`). Use **5500**:

```bash
cd ~/AndroidStudioProjects/byrzbal.github.io
python3 -m http.server 5500
```

Open http://127.0.0.1:5500

Or open `index.html` directly in a browser (no server).

## Placeholders to replace

Mark these in the HTML with `PLACEHOLDER` comments:

| Item | Where | What to do |
| --- | --- | --- |
| Email | Contact | Done — byrzbal@gmail.com |
| LinkedIn | Contact social links | Done — https://www.linkedin.com/in/byronbaleda/ |
| Resume PDF | `assets/resume.pdf` + Resume CTA | Add PDF; change the disabled “coming soon” control into an `<a class="btn btn-ghost" href="assets/resume.pdf" download>` |
| Resume timeline | `#resume` list | Replace fiction roles/education |
| LedgerLink API | Projects card | Replace with a real project |
| Harbor Ops Console | Projects card | Replace with a real project |

FinDen is the featured real project; GitHub link points at `https://github.com/byrzbal/FinDen` (adjust if the repo path differs).

## Deploy

1. Push `main` to `byrzbal/byrzbal.github.io`
2. GitHub → Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`
3. Wait a minute, then visit https://byrzbal.github.io
