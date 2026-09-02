# Ayesha — Cinematic Birthday Experience (03 · 09 · 2026)

A bespoke, editorial-grade multi-page digital experience created exclusively for **Ayesha** on **3 September 2026**. Designed with deep obsidian tones, champagne gold accents, fluid scroll choreography, ambient generative audio, and structured placement for **12 curated photographs**.

---

## 📁 Project Directory Structure

```
ayesha-birthday-experience/
├── index.html                  # Semantic, accessible multi-chapter HTML experience
├── README.md                   # Quick start & customization guide
├── css/
│   ├── main.css               # Design tokens, typography, header, navigation, cursor
│   ├── chapters.css           # Custom layouts for Chapters 01 to 06 & photo cards
│   ├── animations.css         # Keyframe choreographies, mask reveals, shimmer effects
│   └── responsive.css         # Mobile-first breakpoints & safe-area insets
├── js/
│   ├── config.js              # Centralized configuration (easy photo & copy editing)
│   ├── app.js                 # Master app orchestrator, custom cursor, lightbox
│   ├── scroll-engine.js       # IntersectionObserver, smooth transitions, keyboard/touch
│   ├── particles.js           # Canvas gold dust & ambient starlight particle engine
│   └── audio.js               # Web Audio API generative ambient harmonic pad
└── assets/
    └── images/                # Designated photo slots (photo-01.jpg .. photo-12.jpg)
```

---

## 📸 How to Add Ayesha's 12 Photos

1. Prepare your 12 photos of Ayesha (in JPG or PNG format).
2. Rename the files as follows and place them inside the `assets/images/` folder:
   - `photo-01.jpg` — Chapter 2: First Impressions (Wide / Lead)
   - `photo-02.jpg` — Chapter 2: Quiet Understanding (Standard portrait)
   - `photo-03.jpg` — Chapter 2: Unexpected Depth (Standard portrait)
   - `photo-04.jpg` — Chapter 3: Her Presence (Portrait showcase)
   - `photo-05.jpg` — Chapter 3: The Grace in Laughter (Portrait showcase)
   - `photo-06.jpg` — Chapter 3: Quiet Confidence (Portrait showcase)
   - `photo-07.jpg` — Chapter 3: Unfiltered Authenticity (Portrait showcase)
   - `photo-08.jpg` — Chapter 4: Shared Perspectives (Tall gallery card)
   - `photo-09.jpg` — Chapter 4: Effortless Comfort (Tall gallery card)
   - `photo-10.jpg` — Chapter 4: Meaning in the Ordinary (Wide gallery card)
   - `photo-11.jpg` — Chapter 6: A Rare Connection (Companion portrait)
   - `photo-12.jpg` — Chapter 6: The Portrait of Ayesha (**Centerpiece Hero Portrait**)

> **Note**: If any photo is missing or yet to be added, the site automatically displays the high-aesthetic gold-embossed SVG placeholders (`photo-01.svg` through `photo-12.svg`), so the experience always looks stunning without broken image icons.

---

## ✍️ Customizing Copy & Letter Text

You can customize any copy directly in [`js/config.js`](file:///home/alarion/.gemini/antigravity/scratch/ayesha-birthday-experience/js/config.js) or by editing the HTML text in [`index.html`](file:///home/alarion/.gemini/antigravity/scratch/ayesha-birthday-experience/index.html).

Key configurable items in `js/config.js`:
- Recipient Name (`Ayesha`)
- Birthday Dates (`03 / 09 / 2026`, `3 September 2026`)
- Photo titles, subtitles, and captions
- Chapter 6 Personal Letter paragraphs, sign-off, and closing wish

---

## 🎵 Ambient Audio & Soundscape

- The website includes a built-in **Generative Web Audio Synthesizer** that plays a warm, velvet-smooth harmonic pad in the background as soon as the user clicks **"Begin Journey"** or toggles the sound button.
- **Custom Soundtrack**: If you'd like to use a specific background song (e.g. an MP3), place the audio file in `assets/audio/soundtrack.mp3` and set `customAudioUrl: "assets/audio/soundtrack.mp3"` inside `js/config.js`.

---

## 🚀 How to Run & Preview

You can preview the website locally using Python's built-in web server:

```bash
cd /home/alarion/.gemini/antigravity/scratch/ayesha-birthday-experience
python3 -m http.server 8080
```

Then open your browser and navigate to:
**`http://localhost:8080`**

---

## 🌐 Deploying & Sharing the Website

Because this is a modern, lightweight static frontend project, you can deploy it for free within 60 seconds using any of the following services:

1. **GitHub Pages**:
   - Create a GitHub repository and push this folder.
   - Go to **Settings > Pages** and select the `main` branch.
2. **Vercel / Netlify / Cloudflare Pages**:
   - Drag and drop the `ayesha-birthday-experience` folder directly onto [Netlify Drop](https://app.netlify.com/drop) or link your GitHub repo.
   - You will instantly get a fast, secure HTTPS link (e.g., `https://ayesha-2026.vercel.app`) to send to Ayesha on her birthday!
