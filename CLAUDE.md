# Deck repo — house style & "Presentation Request" workflow

This repo holds HTML presentations built on **reveal.js 5**. Slides are
`<section>` elements inside `.reveal > .slides`. Style lives in
`css/theme.css`; the engine + extras live in `js/deck.js`. Never inline
new styling — extend `theme.css` so every deck stays consistent.

## Visual language (do not drift from this)

- Dark backgrounds (`--bg` `#0b1020`), light ink, blue→teal accent gradient.
- Left-aligned slides, big bold headings (`font-weight: 800`, tight tracking).
- One idea per slide. Bullets: **max three**, each a `.fragment fade-up`.
- Fonts: Inter / system sans. No serif, no clip-art, no drop shadows.

## Reusable slide types (copy these patterns)

| Intent                     | Pattern |
|----------------------------|---------|
| Opening / closing          | `<section data-background-gradient=...>` with `.eyebrow`, `.title`, `.subtitle`, `.byline` |
| The one number that matters| `.tile` → `.tile-number` + `.tile-label` |
| 2–3 key points             | `.section-head` + `ul.big-bullets` with `.fragment fade-up` |
| Comparison / distribution  | `.bars` with `.bar` elements; set `style="--val: N"` (0–100) |

## How to fulfill a Presentation Request (PR)

A request gives **raw data + intent** (e.g. "4 slides, highlight 73% as a
tile, turn this breakdown into a bar chart"). To fulfill it:

1. Pick the matching slide type from the table above.
2. Add `<section>`s to the relevant deck's `index.html` — content only.
3. Use existing classes; if a genuinely new component is needed, add it to
   `theme.css` with a comment, matching the token system.
4. Reply: "Live — run `python3 -m http.server` and open the deck; tell me if
   you're happy."

## Run locally

```
python3 -m http.server 8000   # then open http://localhost:8000
```

Keys: arrows = step · `F` = fullscreen · `ESC` = overview · `S` = notes ·
`R` = reset saved position · Play button = autoplay.
