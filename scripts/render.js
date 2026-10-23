/* Builds the page from the text in content/content.js.
   You shouldn't need to edit this file to change words — edit content.js instead. */
(function () {
  const S = window.SITE;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  // Make text safe to put into HTML
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const isExternal = (href) => /^https?:/.test(href);
  const linkAttrs = (href) =>
    `href="${esc(href)}"` + (isExternal(href) ? ' target="_blank" rel="noopener"' : "");
  const mail = `mailto:${S.contact.email}`;
  const pad = (n) => String(n).padStart(2, "0");

  // Headline with the last word in grey
  const headline = (text, last, tag = "h2", cls = "display") =>
    `<${tag} class="${cls}">${esc(text)} <span class="muted">${esc(last)}</span></${tag}>`;

  // A set of clouds (shape comes from the #cloud-fluff filter in index.html)
  const clouds = (n, prefix) =>
    Array.from({ length: n }, (_, i) => `<div class="cloud ${prefix}${i + 1}"><div class="cloud__body"></div></div>`).join("");

  /* ---------- Navigation ---------- */
  $("#nav").innerHTML = `
    <nav class="nav__pill" aria-label="Main">
      <a class="nav__brand" href="#top">${esc(S.shortName)}</a>
      ${S.nav.links.map((l) => `<a class="nav__link" ${linkAttrs(l.href)}>${esc(l.label)}</a>`).join("")}
    </nav>
    <a class="btn btn--accent nav__cta" href="${esc(mail)}">${esc(S.nav.button)}</a>`;

  /* ---------- Landing strip: sky + moving clouds ---------- */
  $(".hero").innerHTML = `
    <div class="hero__panel">
      <div class="hero__sky grain" aria-hidden="true"></div>
      <div class="hero__clouds" aria-hidden="true">${clouds(6, "cloud--h")}</div>
      <div class="hero__shade" aria-hidden="true"></div>
      <div class="hero__content">
        <p class="label">${esc(S.hero.label)}</p>
        <h1 class="display display--hero">${esc(S.hero.headline)} <span class="soft">${esc(S.hero.lastWord)}</span></h1>
        <p class="hero__line">${esc(S.hero.line)}</p>
      </div>
    </div>`;

  /* ---------- About ---------- */
  $(".intro").innerHTML = `
    <div class="wrap wrap--narrow center">
      <p class="label">${esc(S.intro.label)}</p>
      ${headline(S.intro.statement, S.intro.lastWord)}
      <p class="lede">${esc(S.intro.bio)}</p>
    </div>`;

  /* ---------- Work: stacked folders ---------- */
  const W = S.work;
  const uiCard = (c) => `
    <div class="ui-card" aria-hidden="true">
      <div class="ui-card__head">
        <span class="ui-card__dot"></span>
        <span class="ui-card__title">${esc(c.title)}</span>
        <span class="ui-card__chip">${esc(c.status)}</span>
      </div>
      <ul class="ui-card__rows">
        ${c.rows.map(([k, v]) => `<li><span>${esc(k)}</span><span class="mono">${esc(v)}</span></li>`).join("")}
      </ul>
      <div class="ui-card__bar"><span style="width:${Number(c.progress) || 0}%"></span></div>
    </div>`;

  // Two dropdowns: Discipline (open by default) and My role. Only one is open at a time.
  const dropdowns = (p) =>
    [
      [W.disciplineLabel, p.discipline],
      [W.roleLabel, p.role],
    ]
      .filter(([, v]) => v)
      .map(([label, value], j) => {
        const id = `${p.id}-dd${j}`;
        const open = j === 0;
        return `
        <div class="dd${open ? " is-open" : ""}">
          <button class="dd__btn" type="button" id="${id}-btn" aria-expanded="${open}" aria-controls="${id}">
            <span>${esc(label)}</span><span class="dd__chev" aria-hidden="true"></span>
          </button>
          <div class="dd__panel" id="${id}" role="region" aria-labelledby="${id}-btn"><div><p>${esc(value)}</p></div></div>
        </div>`;
      })
      .join("");

  // Folder tab outline (after reference Folder-blank: rounded top, sloped curved shoulders)
  const TAB = "M0 52 C13 52 19 46 23 37 L33 13 C37 4 43 0 55 0 H165 C177 0 183 4 187 13 L197 37 C201 46 207 52 220 52";

  const folder = (p, i) => `
    <article class="folder project--${esc(p.id)}" id="f${i + 1}" style="--i:${i}" data-folder="${i}">
      <a class="folder__tab" href="#f${i + 1}" data-folder-link="${i}" aria-label="Case study ${pad(i + 1)}: ${esc(p.title)}">
        <svg class="folder__tab-shape" viewBox="0 0 220 52" preserveAspectRatio="none" aria-hidden="true">
          <path class="folder__tab-fill" d="${TAB} Z"/>
          <path class="folder__tab-line" d="${TAB}"/>
        </svg>
        <span class="folder__num mono">#${pad(i + 1)}</span>
      </a>
      <div class="folder__body">
        <div class="folder__info">
          <p class="label">${esc(p.year)}</p>
          <h3 class="folder__title">${esc(p.title)}</h3>
          <p class="folder__sub">${esc(p.subheading)}</p>
          <div class="folder__dds">${dropdowns(p)}</div>
          ${
            p.link
              ? `<a class="btn btn--accent folder__cta" ${linkAttrs(p.link)}>${esc(W.linkText)} <span aria-hidden="true">↗</span></a>`
              : `<span class="btn btn--ghost btn--off folder__cta">${esc(W.comingSoonText)}</span>`
          }
        </div>
        <div class="folder__panel atmo atmo--${esc(p.id)} grain">
          ${p.image ? `<img class="folder__img" src="${esc(p.image)}" alt="" loading="lazy" decoding="async">` : ""}
          ${uiCard(p.card)}
        </div>
      </div>
    </article>`;

  $(".work").innerHTML = `
    <div class="wrap center section-head">
      ${headline(W.headline, W.lastWord)}
    </div>
    <div class="wrap work__list">${W.projects.map(folder).join("")}</div>`;

  // Dropdowns: opening one closes the other in the same folder
  $$(".folder").forEach((f) => {
    $$(".dd__btn", f).forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".dd");
        const willOpen = !item.classList.contains("is-open");
        $$(".dd", f).forEach((d) => {
          d.classList.remove("is-open");
          $(".dd__btn", d).setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  });

  /* Folder tabs: clicking #01, #02... scrolls (up or down) to the point where that
     folder sits on top of the stack. Sticky folders move, so we measure where each
     one sits in the normal page flow instead. */
  function folderTarget(i) {
    const list = $(".work__list");
    const folders = $$(".folder", list);
    const cs = getComputedStyle(list);
    const gap = parseFloat(cs.rowGap) || 0;
    let y = list.getBoundingClientRect().top + window.scrollY + (parseFloat(cs.paddingTop) || 0);
    for (let j = 0; j < i; j++) y += folders[j].offsetHeight + gap;
    const stick = parseFloat(getComputedStyle(folders[i]).top);
    return Math.max(0, y - (isNaN(stick) ? 80 : stick));
  }
  function goToFolder(i) {
    const y = folderTarget(i);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-folder-link]");
    if (!a) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    goToFolder(Number(a.dataset.folderLink));
  });

  /* ---------- Client logos: slow moving strip ---------- */
  const C = S.clients;
  const logo = (l) =>
    l.file
      ? `<li class="logo"><img src="${esc(l.file)}" alt="${esc(l.name)}" loading="lazy"></li>`
      : `<li class="logo logo--text">${esc(l.name)}</li>`;
  // Repeat the list so the strip is always wider than the screen, then double it for a seamless loop
  let row = [];
  while (row.length < 8) row = row.concat(C.logos);
  const track = row.map(logo).join("");
  $(".clients").innerHTML = `
    <p class="label center">${esc(C.label)}</p>
    <div class="marquee" aria-label="${esc(C.logos.map((l) => l.name).join(", "))}">
      <ul class="marquee__track">${track}</ul>
      <ul class="marquee__track" aria-hidden="true">${track}</ul>
    </div>`;

  /* ---------- Footer: sky, clouds, contact, hills ---------- */
  const K = S.contact;
  const F = S.footer;
  $("#contact").innerHTML = `
    <div class="footer__scene">
      <div class="footer__sky grain" aria-hidden="true"></div>
      <div class="footer__clouds" aria-hidden="true">${clouds(4, "cloud--f")}</div>

      <div class="wrap footer__cta center">
        <p class="label">${esc(K.label)}</p>
        ${headline(K.headline, K.lastWord, "h2", "display display--footer")}
        <div class="footer__actions">
          <a class="btn btn--accent btn--lg" href="${esc(mail)}">${esc(K.email)}</a>
          <a class="btn btn--ghost" ${linkAttrs(K.linkedin)}>LinkedIn ↗</a>
          <a class="btn btn--ghost" ${linkAttrs(K.resume)}>Resume ↗</a>
        </div>
      </div>

      <div class="footer__land">
        <div class="footer__mark" aria-hidden="true">${esc(F.wordmark)}</div>
        <svg class="footer__hills" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBE9C6"/><stop offset="1" stop-color="#B2DFB4"/></linearGradient>
            <linearGradient id="hill-mid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A8DB9A"/><stop offset=".6" stop-color="#9AD3A0"/><stop offset="1" stop-color="#B6DB86"/></linearGradient>
            <linearGradient id="hill-front" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#BCE5A6"/><stop offset=".5" stop-color="#C9E4A0"/><stop offset="1" stop-color="#ADE0B4"/></linearGradient>
          </defs>
          <path fill="url(#hill-back)"  d="M0 120 C200 60 400 50 640 105 C860 155 1080 70 1440 95 L1440 400 L0 400 Z"/>
          <path fill="url(#hill-mid)"   d="M0 175 C260 115 520 140 780 182 C1010 220 1220 150 1440 168 L1440 400 L0 400 Z"/>
          <path fill="url(#hill-front)" d="M0 226 C320 186 660 196 920 220 C1160 242 1320 212 1440 220 L1440 400 L0 400 Z"/>
        </svg>
        <div class="footer__grain" aria-hidden="true"></div>

        <div class="wrap footer__bar">
          <div class="footer__id">
            <p class="footer__name">${esc(S.name)}</p>
            <p class="footer__note">${esc(F.note)}</p>
          </div>
          <div class="footer__col">
            <p class="footer__title">${esc(F.contactTitle)}</p>
            <a href="${esc(mail)}">Email</a>
            <a ${linkAttrs(K.linkedin)}>LinkedIn</a>
            <a ${linkAttrs(K.resume)}>Resume</a>
          </div>
          <div class="footer__col">
            <p class="footer__title">${esc(F.workTitle)}</p>
            ${W.projects.map((p, i) => `<a href="#f${i + 1}" data-folder-link="${i}">${esc(p.title)}</a>`).join("")}
          </div>
          <p class="footer__copy mono">© ${new Date().getFullYear()} ${esc(S.name)}</p>
        </div>
      </div>
    </div>`;
})();
