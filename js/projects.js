/* ==========================================================================
   Project list — edit this file to populate the home page.

   title     Card title
   subtitle  Client or context, shown under the title
   tags      Shown uppercase to the right of the title, separated by " • "
   href      Project page (relative to index.html); null = not published yet
   layers    Thumbnail composition, in px of the 720 × 400 Figma frame:
               { src, alt, x, y, w, h, shadow, radius }
             The frame scales as a whole, so positions stay true at every
             breakpoint. `src: null` draws a grey stand-in for a missing image.
             Images exported with their own shadow carry 24px of padding on
             the sides and 14px on top: place them at x − 24, y − 14 and leave
             `shadow` off.
   ========================================================================== */

window.PROJECTS = [
  {
    title: "Euristike Design System",
    subtitle: "My Design System",
    tags: ["Design system", "General"],
    href: "projects/project-01.html",
    layers: [
      { src: "assets/projects/euristike-dash.jpg", alt: "Euristike dashboard built with the design system", x: 45, y: 87, w: 630, h: 354, shadow: true },
      { logo: "euristike", x: 45, y: 32, w: 119, h: 31.3 },
    ],
  },
  {
    title: "Managing shifts inside Brazil’s biggest hospitals",
    subtitle: "Rede D’Or",
    tags: ["Desktop", "Healthcare"],
    href: "projects/project-02.html",
    layers: [
      // Exported with its shadow and corners baked in, hence the wider box and no CSS shadow
      { src: "assets/projects/rededor.png", alt: "Rede D’Or shift management screen", x: 21, y: 36, w: 678, h: 364 },
    ],
  },
  {
    title: "Improving the AI experience for +1M users",
    subtitle: "InnerAI",
    tags: ["Mobile&Desktop", "AI"],
    href: "projects/project-03.html",
    layers: [
      { src: "assets/projects/innerai.jpg", alt: "InnerAI chat interface", x: 45, y: 42, w: 630, h: 408, shadow: true },
    ],
  },
  {
    title: "Making agricultural credit conveyor belt easier",
    subtitle: "Softfocus",
    tags: ["Desktop", "Finance"],
    href: "projects/project-04.html",
    layers: [
      { src: "assets/projects/softfocus.png", alt: "Softfocus credit platform", x: 21, y: 36, w: 678, h: 372 },
    ],
  },
  {
    title: "Solving HR’s problems with a few ‘matches’",
    subtitle: "Harpio",
    tags: ["Mobile&Desktop", "Human resources"],
    href: "projects/project-05.html",
    layers: [
      { src: "assets/projects/harpio.jpg", alt: "Harpio hiring platform", x: 45, y: 42.13, w: 629.65, h: 447.75, shadow: true },
    ],
  },
  {
    title: "Product Design overhaul for healthcare startup",
    subtitle: "Nyx technology",
    tags: ["Mobile", "Healthcare"],
    href: "projects/project-06.html",
    layers: [
      { src: "assets/projects/nyx-1.jpg", alt: "Nyx app screen", x: 48, y: 42, w: 192, h: 519, shadow: true },
      { src: "assets/projects/nyx-2.jpg", alt: "", x: 264, y: 42, w: 192, h: 416, shadow: true },
      { src: "assets/projects/nyx-3.jpg", alt: "", x: 480, y: 42, w: 192, h: 847, shadow: true },
    ],
  },
  {
    title: "Turning dreams into relics",
    subtitle: "My SaaS",
    tags: ["Desktop", "AI"],
    href: "projects/project-07.html",
    layers: [
      { src: "assets/projects/saas-1.jpg", alt: "SaaS app screen", x: 28, y: 42, w: 205, h: 314, shadow: true },
      { src: "assets/projects/saas-2.jpg", alt: "", x: 257, y: 42, w: 205, h: 314, shadow: true },
      { src: "assets/projects/saas-3.jpg", alt: "", x: 486, y: 42, w: 205, h: 314, shadow: true },
    ],
  },
];
