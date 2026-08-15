import puppeteer from "puppeteer";
import { mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const BASE = "https://bookpilot-rooms-web.pages.dev";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../assets/projects/bookpilot-rooms");
const FRAMES = join(OUT, "_frames");
const EMAIL = "owner@local.test";
const PASSWORD = "password123";
const MP4 = join(OUT, "BookPilotRoomsDemo.mp4");

mkdirSync(OUT, { recursive: true });
rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

async function setReactInput(page, selector, value) {
  await page.evaluate(
    (sel, val) => {
      const input = document.querySelector(sel);
      if (!(input instanceof HTMLInputElement)) return;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(input, val);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    },
    selector,
    value,
  );
}

async function pause(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function snap(page, index) {
  await page.screenshot({ path: join(FRAMES, `${String(index).padStart(4, "0")}.jpg`), type: "jpeg", quality: 85 });
}

const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1280, height: 800 } });
const page = await browser.newPage();

await page.goto(`${BASE}/login`, { waitUntil: "networkidle2", timeout: 60000 });
await setReactInput(page, 'input[autocomplete="username"]', EMAIL);
await setReactInput(page, 'input[autocomplete="current-password"]', PASSWORD);
await page.click('button[type="submit"]');
await page.waitForFunction(() => !window.location.pathname.includes("/login"), { timeout: 60000 });

let i = 0;
const tour = ["/", "/calendar", "/bookings", "/payments"];
for (const path of tour) {
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2", timeout: 60000 });
  await pause(1200);
  for (let f = 0; f < 8; f += 1) {
    await snap(page, i++);
    await pause(400);
  }
}

await browser.close();

const convert = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-framerate",
    "2.5",
    "-i",
    join(FRAMES, "%04d.jpg"),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    MP4,
  ],
  { stdio: "inherit" },
);

rmSync(FRAMES, { recursive: true, force: true });

if (convert.status !== 0) {
  console.error("ffmpeg conversion failed");
  process.exit(1);
}

console.log("saved", MP4);
