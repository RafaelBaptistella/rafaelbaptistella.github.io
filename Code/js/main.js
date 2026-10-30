/* ==========================================================================
   Interactions + motion
   ========================================================================== */

(() => {
  const html = document.documentElement;
  const hasGsap = typeof window.gsap !== "undefined";
  const motion = hasGsap && html.classList.contains("has-motion");
  const isTouch = matchMedia("(hover: none)").matches;
  const EASE = "expo.out";
  const d = (seconds) => (motion ? seconds : 0);

  if (!motion) html.classList.remove("has-motion");

  renderProjects();

  let smoother = null;
  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    if (motion) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        smoothTouch: false,
      });
    }
  }

  initContactMenu();
  initAccordions();
  initPageTransitions();

  if (motion) {
    introHeader();
    document.fonts.ready.then(() => {
      document.querySelectorAll("[data-split]").forEach(revealLines);
      document.querySelectorAll("[data-fade]").forEach(revealBlock);
      ScrollTrigger.refresh();
    });
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }
  if (hasGsap && isTouch) colorCardsInView();

  /* ------------------------------------------------------------------------
     Projects
     ------------------------------------------------------------------------ */

  function renderProjects() {
    const list = document.getElementById("projects");
    if (!list || !window.PROJECTS) return;

    list.innerHTML = window.PROJECTS.map((p) => {
      // Unpublished projects still show their card, just without a link
      const open = p.href ? `<a class="project__link" href="${p.href}">` : `<div class="project__link">`;
      const close = p.href ? "</a>" : "</div>";
      return `
      <article class="project${p.href ? "" : " is-unpublished"}">
        ${open}
          <div class="project__thumb frame" data-fade>
            <div class="project__media">${p.layers.map(frameLayer).join("")}</div>
          </div>
          <div class="project__data">
            <h2 class="project__title" data-split>${p.title}</h2>
            <p class="project__subtitle" data-split>${p.subtitle}</p>
          </div>
        ${close}
      </article>`;
    }).join("");
  }

  // One positioned layer of a thumbnail frame (see projects.js for the fields)
  function frameLayer(l) {
    const style = `--x:${l.x};--y:${l.y};--w:${l.w};--h:${l.h}${l.radius ? `;--r:${l.radius}` : ""}`;
    const cls = `frame__layer${l.shadow ? " has-shadow" : ""}`;
    if (l.logo) {
      return `<span class="${cls} eu-logo" style="${style}" role="img" aria-label="Euristike">
        <img src="assets/projects/euristike-mark.svg" alt=""><span>Euristike<sup>®</sup></span></span>`;
    }
    if (!l.src) return `<div class="${cls} frame__missing" style="${style}"></div>`;
    return `<img class="${cls}" style="${style}" src="${l.src}" alt="${l.alt || ""}" loading="lazy" decoding="async">`;
  }

  // Touch screens have no hover: bring colour in as a card crosses mid-screen.
  function colorCardsInView() {
    document.querySelectorAll(".project").forEach((card) => {
      ScrollTrigger.create({
        trigger: card.querySelector(".project__thumb"),
        start: "top 65%",
        end: "bottom 35%",
        toggleClass: { targets: card, className: "is-active" },
      });
    });
  }

  /* ------------------------------------------------------------------------
     Reveals
     ------------------------------------------------------------------------ */

  function introHeader() {
    gsap.from(".header .logo, .nav > *", {
      autoAlpha: 0,
      y: -14,
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      delay: 0.05,
      clearProps: "transform",
    });
  }

  // Replays `anim` every time `el` scrolls into view (from either direction)
  // and rewinds it once `el` is fully off screen, ready for the next pass.
  // The play positions are clamped to the scrollable range: elements at the very
  // end of the page (the footer on short phone screens) could otherwise get a
  // start point past the maximum scroll and only reveal on overscroll. Clamping
  // pins above-the-fold elements to a start of 0, which never "enters" at the
  // top of the page, so those are played on refresh instead.
  function replayInView(el, anim) {
    const play = () => { if (!anim.progress()) anim.restart(true); };
    const rewind = () => anim.pause(0);
    return [
      ScrollTrigger.create({
        trigger: el,
        start: "clamp(top 92%)",
        end: "clamp(bottom 8%)",
        onEnter: play,
        onEnterBack: play,
        onRefresh: (self) => { if (self.start === 0 && self.scroll() === 0) play(); },
      }),
      ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onLeave: rewind, onLeaveBack: rewind }),
    ];
  }

  // Each line sits in an overflow-hidden mask and slides up into view.
  function revealLines(el) {
    const delay = parseFloat(el.dataset.delay) || 0;
    let triggers = [];

    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        triggers.forEach((t) => t.kill()); // re-split on resize: rebuild against the new lines
        const anim = gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: EASE,
          stagger: 0.09,
          delay,
          paused: true,
        });
        triggers = replayInView(el, anim);
        return anim;
      },
    });
  }

  function revealBlock(el) {
    const media = el.querySelector(".project__media");
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(el, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1.3, ease: EASE, clearProps: "transform" });
    if (media) tl.fromTo(media, { scale: 1.06 }, { scale: 1, duration: 1.8, ease: EASE, clearProps: "transform" }, 0);
    replayInView(el, tl);
  }

  /* ------------------------------------------------------------------------
     Contact menu
     ------------------------------------------------------------------------ */

  function initContactMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.getElementById("contact-menu");
    if (!toggle || !menu) return;
    const items = [...menu.querySelectorAll(".menu__item")];
    let open = false;

    const setOpen = (next, { focus = false } = {}) => {
      if (next === open) return;
      open = next;
      toggle.setAttribute("aria-expanded", String(open));

      if (!hasGsap) {
        menu.style.visibility = open ? "visible" : "hidden";
        menu.style.opacity = open ? "1" : "0";
      } else if (open) {
        gsap.killTweensOf([menu, items]);
        gsap.fromTo(menu, { autoAlpha: 0, y: -6, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: d(0.4), ease: "power3.out" });
        gsap.fromTo(items, { autoAlpha: 0, y: -4 }, { autoAlpha: 1, y: 0, duration: d(0.35), ease: "power3.out", stagger: 0.04, delay: d(0.05) });
      } else {
        gsap.killTweensOf([menu, items]);
        gsap.to(menu, { autoAlpha: 0, y: -4, scale: 0.98, duration: d(0.2), ease: "power2.in" });
      }
      if (open && focus) items[0].focus();
    };

    toggle.addEventListener("click", (e) => setOpen(!open, { focus: e.detail === 0 }));
    items.forEach((item) => item.addEventListener("click", () => setOpen(false)));

    document.addEventListener("click", (e) => {
      if (open && !e.target.closest(".nav__contact")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        toggle.focus();
        return;
      }
      const i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const step = e.key === "ArrowDown" ? 1 : -1;
        items[(i + step + items.length) % items.length].focus();
      }
    });

    menu.addEventListener("focusout", (e) => {
      if (open && !e.currentTarget.parentElement.contains(e.relatedTarget)) setOpen(false);
    });

  }

  /* ------------------------------------------------------------------------
     Accordions
     ------------------------------------------------------------------------ */

  function initAccordions() {
    document.querySelectorAll("[data-accordion]").forEach((acc) => {
      const trigger = acc.querySelector(".accordion__trigger");
      const panel = acc.querySelector(".accordion__panel");
      const inner = panel.firstElementChild;

      trigger.addEventListener("click", () => {
        const expand = trigger.getAttribute("aria-expanded") !== "true";
        trigger.setAttribute("aria-expanded", String(expand));

        if (!hasGsap) {
          panel.hidden = !expand;
          return;
        }
        gsap.killTweensOf([panel, inner]);
        // Content below moves, so scroll-trigger positions are re-measured once it settles
        gsap.to(panel, {
          height: expand ? "auto" : 0,
          duration: d(0.6),
          ease: "power3.inOut",
          onComplete: () => ScrollTrigger.refresh(),
        });
        gsap.to(inner, {
          autoAlpha: expand ? 1 : 0,
          y: expand ? 0 : -6,
          duration: d(expand ? 0.5 : 0.3),
          delay: d(expand ? 0.12 : 0),
          ease: "power2.out",
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     Page transitions — soft fade out before leaving for another page
     ------------------------------------------------------------------------ */

  function initPageTransitions() {
    if (!motion) return;
    const samePage = (url) => url.pathname === location.pathname && url.search === location.search;

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (!link || link.target || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const url = new URL(link.href, location.href);
      if (url.protocol !== location.protocol || url.host !== location.host) return;

      e.preventDefault();
      if (samePage(url)) {
        smoother ? smoother.scrollTo(0, true) : window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      gsap.to("#smooth-wrapper, .header", {
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => (location.href = url.href),
      });
    });

    // Restore when coming back through the bfcache
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) gsap.set("#smooth-wrapper, .header", { clearProps: "opacity,visibility" });
    });
  }
})();
