// Ícones de traço do design system (grade 24px, traço 1.75, pontas arredondadas).
// Copie para src/components/Icon/icons.js. Cada valor é o miolo de um <svg viewBox="0 0 24 24">.
// Sem dependência externa: nada de lucide/react-icons (ver react-fundamentos).

const P = (d) => `<path d="${d}"/>`;

export const ICONS = {
  home: P("M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"),
  briefcase:
    '<rect x="3" y="7" width="18" height="13" rx="2"/>' +
    P("M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2") +
    P("M3 13h18"),
  flask:
    P("M9 3h6") +
    P("M10 3v6l-5.6 9.4A1.7 1.7 0 0 0 5.9 21h12.2a1.7 1.7 0 0 0 1.5-2.6L14 9V3") +
    P("M7.2 15h9.6"),
  user: '<circle cx="12" cy="8" r="4"/>' + P("M4 21a8 8 0 0 1 16 0"),
  layers: P("M12 3 2 8l10 5 10-5z") + P("M2 13l10 5 10-5"),
  folder: P("M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"),
  sun:
    '<circle cx="12" cy="12" r="4"/>' +
    P("M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"),
  moon: P("M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"),
  "arrow-up-right": P("M7 17 17 7") + P("M8 7h9v9"),
  "arrow-right": P("M5 12h14") + P("M13 6l6 6-6 6"),
  "arrow-left": P("M19 12H5") + P("M11 6l-6 6 6 6"),
  star: P("M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"),
  clock: '<circle cx="12" cy="12" r="9"/>' + P("M12 7v5l3 2"),
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/>' + P("M3 10h18M8 3v4M16 3v4"),
  "git-branch":
    '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="7" r="2"/>' +
    P("M6 7v10") +
    P("M18 9a6 6 0 0 1-6 6H8"),
  code: P("M8 6l-6 6 6 6") + P("M16 6l6 6-6 6"),
  box: P("M21 8 12 3 3 8v8l9 5 9-5z") + P("M3 8l9 5 9-5") + P("M12 13v8"),
  sparkle: P("M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z") + P("M19 17v4M17 19h4"),
  check: P("M5 12.5 10 17 19 7"),
  "check-check": P("M2 12.5 6.5 17 15 7") + P("M10.5 16 11.5 17 20 7"),
  x: P("M6 6l12 12") + P("M18 6 6 18"),
  "alert-circle": '<circle cx="12" cy="12" r="9"/>' + P("M12 7.5v5") + P("M12 16.5h.01"),
  "alert-triangle":
    P("M10.3 3.9 1.8 18.5a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z") +
    P("M12 9v4") +
    P("M12 17h.01"),
  info: '<circle cx="12" cy="12" r="9"/>' + P("M12 11v5") + P("M12 7.5h.01"),
  refresh:
    P("M20 11a8 8 0 0 0-14.6-4.5L3 9") +
    P("M3 4v5h5") +
    P("M4 13a8 8 0 0 0 14.6 4.5L21 15") +
    P("M21 20v-5h-5"),
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/>' + P("M8 11V7a4 4 0 0 1 8 0v4"),
  "log-out": P("M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3") + P("M16 17l5-5-5-5") + P("M21 12H9"),
  inbox: P("M22 12h-6l-2 3h-4l-2-3H2") + P("M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"),
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/>' + P("M22 7l-10 6L2 7"),
  send: P("M22 2 11 13") + P("M22 2l-7 20-4-9-9-4z"),
  search: '<circle cx="11" cy="11" r="7"/>' + P("M21 21l-4.3-4.3"),
  message: P("M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12z"),
  compass: '<circle cx="12" cy="12" r="9"/>' + P("M16 8l-2 6-6 2 2-6z"),
  menu: P("M4 7h16M4 12h16M4 17h16"),
  "cloud-off":
    P("M2 2l20 20") +
    P("M5.8 8.6A5 5 0 0 0 7 18h10.5") +
    P("M20.7 16.3A4 4 0 0 0 17 10h-.4A7 7 0 0 0 9.3 5.1"),
  gauge: P("M12 14l4-4") + P("M3.3 19a10 10 0 1 1 17.4 0"),
};

export const ICON_NAMES = Object.keys(ICONS);
