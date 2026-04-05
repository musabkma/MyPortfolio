(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggle || !nav) return;

  const setOpen = (open) => {
    root.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  const isOpen = () => root.classList.contains("nav-open");

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Close when tapping a link (better UX on mobile).
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) setOpen(false);
  });

  // Close when clicking outside the menu.
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    const target = e.target;
    if (target instanceof Node && (nav.contains(target) || toggle.contains(target))) return;
    setOpen(false);
  });

  // Close on Escape.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // If the layout changes to desktop, force-close.
  const media = window.matchMedia("(max-width: 900px)");
  media.addEventListener("change", (e) => {
    if (!e.matches) setOpen(false);
  });
})();
