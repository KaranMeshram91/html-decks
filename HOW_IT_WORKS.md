# How to Turn Any README into a Presentation

This repo uses Claude + reveal.js to convert any Markdown file into a
live HTML slide deck — no PowerPoint, no Figma, no export.

---

## How to use it (3 steps)

### Step 1 — Drop your MD file into this repo

Put your README or any Markdown file here:
```
KaranClaude/YOUR_FILE.md
```

### Step 2 — Tell Claude what you want

Open Claude Code in this folder and say something like:

```
Read YOUR_FILE.md and make a deck from it
```

Or with a constraint:

```
Read YOUR_FILE.md and make a 5-slide deck from it
```

Claude will create a new file like `your-file.html` in the same folder.

### Step 3 — Run it

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/your-file.html` in your browser.
Arrow keys to navigate. `F` for fullscreen. `ESC` for overview.

---

## What Claude does internally

When you say "make a deck from this README", Claude follows the rules in
`CLAUDE.md` to do this in order:

```
YOUR_FILE.md
     │
     ▼
1. READ & DISTILL
   Claude reads the whole file.
   It extracts: the one core point, key stats, features, comparisons,
   flows, timelines — ignoring filler text and verbose headings.
     │
     ▼
2. MAP TO SLIDE TYPES
   Each piece of content gets matched to a visual pattern:

   Big number / stat      →  .tile (giant gradient number)
   Key points / features  →  .big-bullets (3 max, animate in)
   System diagram         →  .arch (layered boxes)
   Step-by-step process   →  .flow (numbered steps + connector line)
   Roadmap / history      →  .timeline (dots: done / now / future)
   Feature comparison     →  .compare (table with ✅ ⚠️ ❌ cells)
   Data distribution      →  .bars (pure CSS bar chart)
   Opening / closing      →  gradient section with .title .subtitle
     │
     ▼
3. APPLY SLIDE COUNT (if you gave one)
   Title + closing = 2 slides (always kept).
   Remaining slots filled with highest-impact content first:
   most surprising stat > clearest value prop > supporting detail.
   Related points get merged into one bullet slide rather than cut.
     │
     ▼
4. ASSIGN TRANSITIONS
   Each slide type gets a specific reveal.js transition:

   Title      →  zoom-in slide-out (slow)
   Tile       →  fade
   Bullets    →  slide
   Arch/Flow  →  slide or convex
   Timeline   →  slide
   Comparison →  concave
   Bar chart  →  convex (fast)
   Closing    →  fade (slow)
     │
     ▼
5. WRITE THE HTML
   Claude writes a new <name>.html file using:
   - reveal.js 5 (from CDN, no install needed)
   - css/theme.css  →  all visual styles live here
   - js/deck.js     →  position memory + keyboard controls
   No inline styles. No new CSS files. Everything reuses what's here.
```

---

## Where each thing lives

| File | What it does |
|------|-------------|
| `css/theme.css` | All visual components — edit this to change look |
| `js/deck.js` | Reveal.js config, position memory, keyboard shortcuts |
| `CLAUDE.md` | The rules Claude follows to build decks |
| `index.html` | Demo deck (QA / Context Engineering) |
| `ai-agents-2026.html` | Example: built from a web article README |
| `agentos.html` | Example: built from a complex technical README |

---

## Slide types you can trigger

Mention these in your README or ask for them explicitly:

| Say this in your README | Claude builds this |
|---|---|
| A percentage or big number | `.tile` — giant gradient stat |
| A list of features or points | `.big-bullets` — 3 items, animate in |
| A layered system / stack | `.arch` — boxes grouped by layer |
| A step-by-step process | `.flow` — numbered steps with line |
| A roadmap or version history | `.timeline` — dots with done/now/future |
| A feature comparison table | `.compare` — coloured ✅/⚠️/❌ table |
| A breakdown with percentages | `.bars` — CSS bar chart |

---

## Tips

- **"Make it 4 slides"** — Claude trims to the 2 most important content
  slides and keeps title + closing. Good for executive summaries.

- **"Make it detailed"** — Claude uses more slide types and keeps more
  content. Good for technical walkthroughs.

- **Multiple decks** — each `.html` file is its own independent deck.
  They all share the same `css/theme.css` so restyling one line
  updates every deck at once.

- **To change the look** — edit `css/theme.css`. The design tokens at
  the top (`--accent`, `--bg`, `--ink`) control the whole colour system.
