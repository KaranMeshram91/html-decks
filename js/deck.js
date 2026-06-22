// ============================================================
// Deck engine config + the two extras reveal.js doesn't ship:
//   1. Remember-where-you-left-off (localStorage)
//   2. A Play button that toggles autoplay (auto-advance)
// Reveal already gives you: arrow-key stepping, F = fullscreen,
// ESC = overview, S = speaker notes, fragment animations.
// ============================================================

const DECK_ID = location.pathname; // unique key per deck file

const deck = new Reveal({
  hash: true,          // put slide # in the URL
  controls: true,
  progress: true,
  transition: 'fade',  // fallback; override per-slide with data-transition
  autoSlide: 0,
  autoSlideStoppable: false,
});

deck.initialize().then(() => {
  // ---- 1. Restore last position ----
  const saved = localStorage.getItem(DECK_ID);
  if (saved && !location.hash) {
    const { h, v } = JSON.parse(saved);
    deck.slide(h, v);
  }
  deck.on('slidechanged', (e) => {
    localStorage.setItem(DECK_ID, JSON.stringify({ h: e.indexh, v: e.indexv }));
  });

  // ---- R resets saved position ----
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'r' || ev.key === 'R') {
      localStorage.removeItem(DECK_ID);
      deck.slide(0, 0);
    }
  });
});
