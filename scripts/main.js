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

  // Scroll reveals (skip hero — CSS handles entrance)
  const revealNodes = [...document.querySelectorAll(".reveal")].filter(
    (el) => !el.closest(".hero")
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealNodes.forEach((el) => revealObserver.observe(el));
  }

  // Subtle header elevation when scrolled
  const onScroll = () => {
    if (!header) return;
    header.style.boxShadow =
      window.scrollY > 8 ? "0 10px 30px rgba(0,0,0,0.25)" : "none";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
