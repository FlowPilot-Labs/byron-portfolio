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
  let closeShotLightbox = null;

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
    if (event.key === "Escape") {
      if (closeShotLightbox?.()) return;
      setMenuOpen(false);
    }
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

  // Screenshot lightbox — all project pages use `.shot img`
  const shotImages = [...document.querySelectorAll(".shot img")];
  if (shotImages.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.className = "shot-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
      <div class="shot-lightbox__backdrop" data-shot-lightbox-close></div>
      <figure class="shot-lightbox__dialog">
        <button
          type="button"
          class="shot-lightbox__close"
          aria-label="Close image"
          data-shot-lightbox-close
        >&times;</button>
        <img class="shot-lightbox__img" alt="" />
        <figcaption class="shot-lightbox__caption"></figcaption>
      </figure>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector(".shot-lightbox__img");
    const lightboxCaption = lightbox.querySelector(".shot-lightbox__caption");
    const closeBtn = lightbox.querySelector(".shot-lightbox__close");
    let lastFocus = null;

    function openShotLightbox(img) {
      const figure = img.closest(".shot");
      const caption = figure?.querySelector("figcaption");
      lastFocus = document.activeElement;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption?.textContent?.trim() || img.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    closeShotLightbox = () => {
      if (!lightbox.classList.contains("is-open")) return false;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.removeAttribute("src");
      document.body.style.overflow = "";
      if (lastFocus instanceof HTMLElement) {
        lastFocus.focus();
      }
      return true;
    };

    shotImages.forEach((img) => {
      img.classList.add("shot-zoomable");
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      const figure = img.closest(".shot");
      const caption = figure?.querySelector("figcaption");
      const label = caption?.textContent?.trim() || img.alt || "Screenshot";
      img.setAttribute("aria-label", `View larger: ${label}`);

      img.addEventListener("click", () => openShotLightbox(img));
      img.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openShotLightbox(img);
        }
      });
    });

    lightbox.querySelectorAll("[data-shot-lightbox-close]").forEach((el) => {
      el.addEventListener("click", () => closeShotLightbox());
    });
  }
})();
