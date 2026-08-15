import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://bookpilot-rooms-web.pages.dev";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../assets/projects/bookpilot-rooms");
const EMAIL = "owner@local.test";
const PASSWORD = "password123";

mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "dashboard.png", path: "/", wait: 2000 },
  { name: "calendar.png", path: "/calendar", wait: 2500 },
  { name: "bookings.png", path: "/bookings", wait: 2500 },
  { name: "payments.png", path: "/payments", wait: 2500 },
];

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

const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1280, height: 800 } });
const page = await browser.newPage();

await page.goto(`${BASE}/login`, { waitUntil: "networkidle2", timeout: 60000 });
await page.waitForSelector('input[autocomplete="username"]', { timeout: 30000 });
await setReactInput(page, 'input[autocomplete="username"]', EMAIL);
await setReactInput(page, 'input[autocomplete="current-password"]', PASSWORD);
await page.click('button[type="submit"]');
await page.waitForFunction(() => !window.location.pathname.includes("/login"), { timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

for (const shot of shots) {
  await page.goto(`${BASE}${shot.path}`, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, shot.wait));
  await page.screenshot({ path: join(OUT, shot.name), fullPage: false });
  console.log("saved", shot.name);
}

await browser.close();
