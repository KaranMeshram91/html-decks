# HTML Decks

Presentations as code. Slides are plain HTML on top of
[reveal.js](https://revealjs.com), styled by one shared house theme and
versioned in git — so a deck is reviewable, diffable, and deployable like any
other repo.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

**Keys:** arrows = step · `F` = fullscreen · `ESC` = overview · `S` = speaker
notes · `R` = reset saved position · Play button (bottom-right) = autoplay.
The deck remembers where you left off.

## Structure

```
.
├── index.html      # the deck — <section>s with reusable slide types
├── css/theme.css   # house style: change the tokens, every deck re-skins
├── js/deck.js      # reveal config + position memory + Play button
└── CLAUDE.md       # visual language + how to fulfill a "Presentation Request"
```

## Slide types

| Intent                      | Pattern |
|-----------------------------|---------|
| Opening / closing           | gradient `<section>` + `.eyebrow` `.title` `.subtitle` `.byline` |
| The one number that matters | `.tile` → `.tile-number` + `.tile-label` |
| 2–3 key points              | `.section-head` + `ul.big-bullets` |
| Comparison / distribution   | `.bars` with `.bar` (`style="--val: N"`, 0–100) |

## Presentation Request workflow

Don't edit someone else's template. Open an issue/PR with **raw data +
intent** ("4 slides, highlight 73% as a tile, turn this into a bar chart").
An agent reads [`CLAUDE.md`](CLAUDE.md), generates slides in the house style,
and tags you to review. No fonts, no padding wars.

## Deploy

Push to GitHub, then enable **Settings → Pages → Deploy from branch → `main` /
root**. Your deck goes live at `https://<user>.github.io/<repo>/`.
