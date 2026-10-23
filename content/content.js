/* ==========================================================================
   ★ SITE CONTENT — EDIT YOUR TEXT AND LINKS HERE ★

   Every word on the website lives in this file. To change something:
   1. Find the labeled block below (HERO, ABOUT, WORK, CLIENTS, FOOTER).
   2. Change the text between the quote marks "like this".
   3. Save the file and refresh the browser.

   Tips
   - Keep the quote marks and the comma at the end of each line.
   - If your text needs a quote mark inside it, use ’ (curly) instead of '.
   - "lastWord" style fields: that bit of the headline is shown in grey.
   - The browser-tab title and link-preview text are at the top of index.html.
   ========================================================================== */

window.SITE = {

  /* ---------- NAME + NAVIGATION (the floating pill at the top) ---------- */
  name: "Kalpesh Bhavsar",
  shortName: "Kalpesh",
  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Resume", href: "https://drive.google.com/file/d/1EbC-MMGAnHv21h_W7vw9GXn0XmS_KGFw/view?usp=sharing" },
    ],
    button: "Write to me",
  },

  /* ---------- LANDING STRIP (sky with clouds) ---------- */
  hero: {
    label: "Product designer · Apps, SaaS, AR",
    headline: "I take products from zero to live, in a visual language built for their",
    lastWord: "users.",
    line: "Solo designer of the AR app at India Art Fair 2026. Live on iOS and Android.",
  },

  /* ---------- ABOUT ---------- */
  intro: {
    label: "About",
    statement: "Product designer taking apps, SaaS and AR from first sketch to",
    lastWord: "launch.",
    bio: "4+ years designing end to end: research, flows, interaction and visual systems, through to release. Most recently I was the sole designer of the India Art Fair 2026 AR app, and I designed Fyule’s three apps, its web platform and the design system that ties them together. I prototype in code with Claude Code, and I make the design calls myself.",
  },

  /* ---------- WORK (stacked folder cards) ----------
     Each project is one folder. Its tab shows #01, #02... and clicking a tab scrolls to that folder.
     link:  the case study address. Leave it as "" to show "Case study coming soon".
     image: a file from the assets folder, e.g. "assets/optimized/sample-this.jpg".
            While empty, the panel shows its gradient placeholder.
     discipline / role: the two dropdowns. Discipline opens by default; only one opens at a time. */
  work: {
    headline: "Selected",
    lastWord: "work.",
    projects: [
      {
        id: "sample",
        year: "2026 · AR app",
        title: "Sample This!",
        subheading: "Designed an AR app for India Art Fair 2026, bringing a 430 ft facade to life, with a bespoke visual style as an extension of the artwork. Live on iOS & Android.",
        discipline: "AR, Mobile, Visual design",
        role: "Solo product designer, end to end",
        link: "https://kalpeshdesigns.framer.website/iaf-ar-experience",
        image: "", // TODO: add your Sample This image
        // Floating UI card on the panel (placeholder until you add a real screenshot)
        card: {
          title: "Scanning facade",
          status: "Live",
          rows: [["Embroidery layer", "7 / 12"], ["Thread motion", "On"], ["Facade length", "430 ft"]],
          progress: 64,
        },
      },
      {
        id: "fyule",
        year: "Mobile + web · Design system",
        title: "Fyule Video Lab",
        subheading: "Designed 3 mobile apps and a web platform, unified by a comprehensive design system. Live on iOS & Android, 40,000+ downloads collectively.",
        discipline: "Mobile apps, Web platform, Design system",
        role: "Product designer across the apps, web platform and design system", // TODO: confirm wording
        link: "", // TODO: add the Fyule Video Lab case study link
        image: "", // TODO: add your Fyule image
        card: {
          title: "Trump card",
          status: "Level 4",
          rows: [["Creativity", "92"], ["Focus", "78"], ["Teamwork", "85"]],
          progress: 80,
        },
      },
      {
        id: "admin",
        year: "SaaS · Admin tools",
        title: "Fyule Admin Dashboard",
        subheading: "Designed the control layer for admins and school coordinators to manage users, content and data.",
        discipline: "SaaS, Admin dashboard, Data management",
        role: "Product designer for the admin and coordinator tools", // TODO: confirm wording
        link: "", // TODO: add the Fyule Admin Dashboard case study link
        image: "", // TODO: add your Admin Dashboard image
        card: {
          title: "School coordinators",
          status: "Synced",
          rows: [["Active users", "12,480"], ["Content items", "1,236"], ["Pending reviews", "18"]],
          progress: 42,
        },
      },
    ],
    disciplineLabel: "Discipline",
    roleLabel: "My role",
    linkText: "Case study",
    comingSoonText: "Case study coming soon",
  },

  /* ---------- CLIENT LOGOS (slow moving strip) ----------
     name: shown as text until you add a logo file.
     file: a logo from the assets folder, e.g. "assets/logos/india-art-fair.svg" (SVG or PNG). */
  clients: {
    label: "Clients & collaborators",
    logos: [
      { name: "India Art Fair", file: "" }, // TODO: add logo file
      { name: "Fyule", file: "" },          // TODO: add logo file
      // TODO: add more clients here, one per line, in the same format
    ],
  },

  /* ---------- FOOTER (sky, hills and contact) ---------- */
  contact: {
    label: "Contact",
    headline: "Hiring a product designer, or have a project in mind?",
    lastWord: "Write to me.",
    email: "kalpeshb.designs@gmail.com",
    linkedin: "https://www.linkedin.com/in/kalpeshab/",
    resume: "https://drive.google.com/file/d/1EbC-MMGAnHv21h_W7vw9GXn0XmS_KGFw/view?usp=sharing",
  },

  footer: {
    note: "Product designer. Apps, SaaS and AR.",
    contactTitle: "Contact",
    workTitle: "Work",
    wordmark: "Kalpesh",
  },
};
