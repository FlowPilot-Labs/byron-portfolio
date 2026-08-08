(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);
  const year = document.querySelector("#year");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setMenuOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setMenuOpen(open);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  // Active section highlight
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${id}`
          );
        });
      });
    },
    {
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0.01,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // One-time calm scroll reveals
  const revealNodes = [
    ...document.querySelectorAll(".reveal, .reveal-stagger"),
  ].filter((el) => !el.closest(".hero"));

  if (reduceMotion.matches) {
    revealNodes.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    revealNodes.forEach((el) => revealObserver.observe(el));
  }

  // Subtle header elevation when scrolled
  const onScroll = () => {
    if (!header) return;
    const shadow = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-shadow")
      .trim();
    header.style.boxShadow = window.scrollY > 8 ? shadow || "none" : "none";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Theme: auto by local browser time (day=5 Clean alpine, night=13 Soft steel).
  // Theme picker is hidden in CSS — set AUTO_THEME to false and show .theme-picker to restore manual picking.
  const AUTO_THEME = true;
  const THEME_KEY = "portfolio-theme";
  const themeButtons = [...document.querySelectorAll("[data-theme-pick]")];
  const themeNames = {
    1: "Coastal slate",
    2: "Paper studio",
    3: "Sand & forest",
    4: "Mist blueprint",
    5: "Clean alpine",
    6: "Fog harbor",
    7: "Clay atelier",
    8: "Sage ledger",
    9: "Dusk stone",
    10: "Parchment desk",
    11: "Soft harbor",
    12: "Soft ember",
    13: "Soft steel",
    14: "Soft moss",
    15: "Soft graphite",
  };

  function getAutoThemeId() {
    const hour = new Date().getHours();
    // Local timezone via Date; daytime 6:00–17:59 → 5, else → 13
    return hour >= 6 && hour < 18 ? "5" : "13";
  }

  function applyTheme(id) {
    const themeId = String(id);
    document.documentElement.setAttribute("data-theme", themeId);
    if (!AUTO_THEME) {
      localStorage.setItem(THEME_KEY, themeId);
    }
    themeButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.themePick === themeId);
    });
    onScroll();
  }

  if (AUTO_THEME) {
    applyTheme(getAutoThemeId());
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        applyTheme(getAutoThemeId());
      }
    });
    setInterval(() => applyTheme(getAutoThemeId()), 15 * 60 * 1000);
  } else {
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved && themeNames[saved] ? saved : "11");
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyTheme(btn.dataset.themePick));
  });
})();
