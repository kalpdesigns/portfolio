/* Scroll motion. Uses GSAP + ScrollTrigger, and Lenis for smooth scrolling.
   - Desktop: sky fades into the page, folders stack (CSS sticky), UI cards lag behind their panels.
   - Phones: simple fade-ups, no sticking.
   - "Reduce motion" setting on: no animation at all.
   The clouds and the logo strip move with plain CSS animations (see style.css). */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return; // CDN didn't load: page stays static
  gsap.registerPlugin(ScrollTrigger);

  // One easing curve for the whole site (same as --ease in style.css: ease-out cubic).
  // Scroll-linked (scrubbed) motion is linear so it tracks the smooth-scroll glide exactly.
  gsap.defaults({ ease: "power3.out" });

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const root = document.documentElement;

  /* ---------- Shared helpers ---------- */
  function fadeUp(targets) {
    $$(targets).forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 1.1,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }

  // Sky fades out smoothly as you scroll down through the landing strip
  function skyFade() {
    const st = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero__sky", { opacity: 0, ease: "none", scrollTrigger: st });
    gsap.to(".hero__clouds", { yPercent: 20, opacity: 0, ease: "none", scrollTrigger: { ...st } });
  }

  const mm = gsap.matchMedia();

  /* ---------- Desktop ---------- */
  mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
    root.classList.add("motion");

    // 0. Smooth scrolling: the wheel glides instead of jumping, and drives every animation
    let lenis = null;
    const raf = (time) => lenis.raf(time * 1000);
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || !lenis) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -20, duration: 1.4 });
    };
    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      window.__lenis = lenis; // used by the folder tabs in render.js
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      document.addEventListener("click", onAnchor);
    }

    // 1. Landing strip: sky fades into the cream page; clouds drift down slower than the page
    skyFade();
    gsap.to(".hero__content", {
      y: -80, opacity: 0.4, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    // 2. Work: folders stick and stack in CSS (position: sticky), like files dropped on a pile.
    //    Each folder's floating UI card catches up with its panel as the folder slides in.
    const folders = $$(".folder");
    const stickTop = (el) => parseFloat(getComputedStyle(el).top) || 0;
    folders.forEach((f) => {
      gsap.fromTo($(".ui-card", f), { y: 140 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: f, start: "top bottom", end: () => `top ${stickTop(f)}px`, scrub: true },
      });
    });

    // 3. Gentle fade-ups for everything else
    fadeUp(".intro .wrap, .work .section-head, .clients, .footer__cta");

    // Undo if the screen gets narrow or motion gets turned off
    return () => {
      root.classList.remove("motion");
      if (lenis) {
        gsap.ticker.remove(raf);
        document.removeEventListener("click", onAnchor);
        lenis.destroy();
        window.__lenis = null;
      }
    };
  });

  /* ---------- Phones: simple fade-ups, no sticking ---------- */
  mm.add("(max-width: 860px) and (prefers-reduced-motion: no-preference)", () => {
    skyFade();
    fadeUp(".intro .wrap, .section-head, .folder, .clients, .footer__cta");
  });

  // Recalculate positions once web fonts have loaded (they change text heights)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
