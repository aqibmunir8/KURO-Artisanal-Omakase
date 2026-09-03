# KURO (黒) — 10K Restaurant Media Asset Prompt Book

This document contains all prompts, camera settings, aspect ratios, and export guidelines to generate imagery and video clips for the **KURO Omakase & Fire Craft** website.

Place all generated files directly into the `@assets/` (or `public/assets/`) directory using the exact filenames listed below. The website's smart fallback system will automatically detect when you replace the placeholders with your generated assets.

---

## 📹 Video Generation Prompts (Kling AI / Runway Gen-3 / Luma Dream Machine)

### 1. `hero-bg.mp4`
- **Location**: Hero Section Fullscreen Background Loop
- **Format**: MP4 / H.264 (or WebM), 1080p or 4K, 24/30/60 fps, 5–10s seamless loop, No Audio
- **Prompt**:
  > `Cinematic macro slow motion shot of an authentic Japanese sushi master searing a slice of A5 Miyazaki Wagyu and otoro with glowing binchotan charcoal embers, delicate wisps of fragrant white smoke rising in dark moody ambient restaurant lighting, shallow depth of field, anamorphic lens, 8k resolution, ultra-refined luxury fine dining aesthetic, dark background --no text, watermarks`

### 2. `craft-smoke.mp4`
- **Location**: The Philosophy / Fire Craft Section Background
- **Format**: MP4, 1080p, 5–8s slow motion loop
- **Prompt**:
  > `Dark moody abstract wisp of white smoke swirling gracefully over a pitch black obsidian background with tiny golden embers drifting slowly upward, slow motion 120fps, cinematic studio lighting, elegant, minimalist Japanese luxury --no text`

### 3. `interior-ambient.mp4`
- **Location**: The 12-Seat Experience & Ambience Gallery
- **Format**: MP4, 1080p, 6–10s loop
- **Prompt**:
  > `Smooth slow cinematic gimbal pan across a minimalist luxury Japanese dark stone omakase counter, soft warm spotlighting illuminating dark cypress wood and black textured granite, empty refined atmosphere, architectural digest photography style --no text`

---

## 📸 Culinary & Dish Photography Prompts (Midjourney v6.0 / FLUX.1 Pro)

### 1. `dish-1.jpg` — Signature Otoro Nigiri with Caviar & Gold
- **Target File**: `assets/dish-1.jpg` (or `.webp`)
- **Aspect Ratio**: `--ar 4:5`
- **Prompt**:
  > `Michelin star food photography, single piece of A5 Otoro tuna nigiri sushi brushed with aged nikiri soy glaze, topped with fresh shaved black truffles, imperial oscietra caviar, and edible 24k gold leaf, placed on rough black volcanic stone plate, dramatic side rim lighting, dark moody background, macro lens, 8k, photorealistic --ar 4:5 --v 6.0`

### 2. `dish-2.jpg` — Hokkaido Uni & Charcoal Nori Tartlet
- **Target File**: `assets/dish-2.jpg` (or `.webp`)
- **Aspect Ratio**: `--ar 4:5`
- **Prompt**:
  > `Ultra fine dining food photography, vibrant golden Hokkaido sea urchin uni arranged meticulously with Kaluga caviar on a delicate crispy charcoal nori tartlet, soft directional lighting, dark slate table, extreme close-up, luxury culinary art, high contrast, clean composition --ar 4:5 --v 6.0`

### 3. `dish-3.jpg` — Binchotan Smoked Miyazaki Wagyu A5
- **Target File**: `assets/dish-3.jpg` (or `.webp`)
- **Aspect Ratio**: `--ar 4:5`
- **Prompt**:
  > `Gourmet food photography, perfectly seared rare A5 Miyazaki wagyu beef sliced into medallions, light smoke gently rising, micro wasabi greens, smoked sea salt crystals, dark matte ceramic tableware, dramatic dark lighting, Michelin star presentation --ar 4:5 --v 6.0`

### 4. `dish-4.jpg` — Smoked Dashi & King Crab Consommé
- **Target File**: `assets/dish-4.jpg` (or `.webp`)
- **Aspect Ratio**: `--ar 4:5`
- **Prompt**:
  > `Intricate Japanese culinary dish, King crab leg in crystal-clear clarified amber dashi consommé with floating edible shiso blossoms and gold dust, presented in handcrafted black ceramic bowl, soft warm lighting, ultra high detail --ar 4:5 --v 6.0`

### 5. `dish-5.jpg` — Black Truffle & Foie Gras Chawanmushi
- **Target File**: `assets/dish-5.jpg` (or `.webp`)
- **Aspect Ratio**: `--ar 4:5`
- **Prompt**:
  > `Japanese savory egg custard chawanmushi topped with generous black truffle shavings and dashi gelee, served in a minimalist cast-iron cup on charred cedar board, steam rising, atmospheric dark setting, shallow depth of field --ar 4:5 --v 6.0`

### 6. `dish-6.jpg` — Charcoal Hojicha Smoked Sphere Dessert
- **Target File**: `assets/dish-6.jpg` (or `.webp`)
- **Aspect Ratio**: `--ar 4:5`
- **Prompt**:
  > `Avant-garde dessert, smoked hojicha dark chocolate ganache dome with gold leaf and matcha moss crumb, liquid nitrogen smoke cascading softly onto dark marble plate, artistic fine dining dessert photography --ar 4:5 --v 6.0`

---

## 🏛️ Interior, Ambience & Chef Portrait Prompts

### 1. `chef-portrait.jpg` — Executive Master Chef
- **Target File**: `assets/chef-portrait.jpg`
- **Aspect Ratio**: `--ar 3:4`
- **Prompt**:
  > `Cinematic black and white dramatic portrait of a master Japanese sushi chef holding a traditional hand-forged yanagiba knife, intense focused gaze, wearing bespoke black chef coat, moody studio lighting, chiaroscuro, high contrast, fine art portrait --ar 3:4 --v 6.0`

### 2. `interior-counter.jpg` — The 12-Seat Hinoki Counter
- **Target File**: `assets/interior-counter.jpg`
- **Aspect Ratio**: `--ar 16:9`
- **Prompt**:
  > `Interior architectural photography of an ultra-exclusive 12-seat Omakase restaurant counter, solid dark charred hinoki wood counter, black textured slate walls, warm recessed ambient spotlights, minimalist luxury Japanese aesthetic --ar 16:9 --v 6.0`

### 3. `cocktail-pairing.jpg` — Rare Vintage Sake & Smoke Cocktail
- **Target File**: `assets/cocktail-pairing.jpg`
- **Aspect Ratio**: `--ar 4:5`
- **Prompt**:
  > `High-end mixology craft cocktail in crystal coupe glass with smoke bubble and dehydrated yuzu peel, dark moody cocktail bar setting, ice crystal reflection, gold rim light, luxury hospitality photography --ar 4:5 --v 6.0`

### 4. `craft-fire.jpg` — The Binchotan Charcoal Hearth
- **Target File**: `assets/craft-fire.jpg`
- **Aspect Ratio**: `--ar 16:9`
- **Prompt**:
  > `Macro close-up photography of authentic white Binchotan charcoal glowing intensely with incandescent orange and gold embers, delicate spark particles floating, dark cast-iron robata grill, atmospheric heat shimmer --ar 16:9 --v 6.0`

---

## 🚀 Quick Setup Instructions
1. Generate the assets using Midjourney, FLUX, Kling AI, Luma Dream Machine, or Runway.
2. Save them into `assets/` (and/or `public/assets/`).
3. The site will automatically display them with high-performance responsive loading!
