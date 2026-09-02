import os

output_dir = "/home/alarion/.gemini/antigravity/scratch/ayesha-birthday-experience/assets/images"
os.makedirs(output_dir, exist_ok=True)

placeholders = [
    {"id": "01", "title": "First Impressions", "subtitle": "A NEW CHAPTER", "color1": "#1c1d24", "color2": "#2d313d", "accent": "#d4af37"},
    {"id": "02", "title": "Quiet Understanding", "subtitle": "MOMENT IN TIME", "color1": "#1a1921", "color2": "#322b3a", "accent": "#c5a880"},
    {"id": "03", "title": "Unexpected Depth", "subtitle": "THE UNPLANNED SPARK", "color1": "#141b1e", "color2": "#24333b", "accent": "#e0c598"},
    {"id": "04", "title": "Her Presence", "subtitle": "TIMELESS & GENUINE", "color1": "#1f1b1a", "color2": "#3b2c28", "accent": "#d4af37"},
    {"id": "05", "title": "The Grace in Laughter", "subtitle": "NATURAL LIGHT", "color1": "#181a20", "color2": "#282d3c", "accent": "#cbb279"},
    {"id": "06", "title": "Quiet Confidence", "subtitle": "EFFORTLESS ELEGANCE", "color1": "#191919", "color2": "#303030", "accent": "#dfba73"},
    {"id": "07", "title": "Unfiltered Authenticity", "subtitle": "REAL & SINCERE", "color1": "#1e171b", "color2": "#3a2732", "accent": "#e5cb9b"},
    {"id": "08", "title": "Shared Perspectives", "subtitle": "THE LITTLE THINGS", "color1": "#151c1c", "color2": "#253b3a", "accent": "#d4af37"},
    {"id": "09", "title": "Effortless Comfort", "subtitle": "SIMPLE HARMONY", "color1": "#1c1822", "color2": "#332644", "accent": "#c5a880"},
    {"id": "10", "title": "Meaning in the Ordinary", "subtitle": "MEMORIES IN MOTION", "color1": "#1d1d1b", "color2": "#3a372f", "accent": "#eed8a1"},
    {"id": "11", "title": "A Rare Connection", "subtitle": "LOOKING FORWARD", "color1": "#17181c", "color2": "#2a2d38", "accent": "#d4af37"},
    {"id": "12", "title": "The Portrait of Ayesha", "subtitle": "03 · 09 · 2026", "color1": "#141416", "color2": "#2c2520", "accent": "#e6c387"}
]

for p in placeholders:
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1333" width="1000" height="1333">
  <defs>
    <linearGradient id="grad_{p['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{p['color1']}" />
      <stop offset="50%" stop-color="{p['color2']}" />
      <stop offset="100%" stop-color="#0c0d10" />
    </linearGradient>
    <radialGradient id="glow_{p['id']}" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="{p['accent']}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="{p['accent']}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1000" height="1333" fill="url(#grad_{p['id']})" />
  <circle cx="500" cy="500" r="450" fill="url(#glow_{p['id']})" />

  <!-- Frame Lines -->
  <rect x="40" y="40" width="920" height="1253" fill="none" stroke="{p['accent']}" stroke-opacity="0.25" stroke-width="1.5" />
  <rect x="56" y="56" width="888" height="1221" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1" />

  <!-- Corner Accents -->
  <path d="M 40 70 L 40 40 L 70 40" fill="none" stroke="{p['accent']}" stroke-width="2.5" />
  <path d="M 960 70 L 960 40 L 930 40" fill="none" stroke="{p['accent']}" stroke-width="2.5" />
  <path d="M 40 1263 L 40 1293 L 70 1293" fill="none" stroke="{p['accent']}" stroke-width="2.5" />
  <path d="M 960 1263 L 960 1293 L 930 1293" fill="none" stroke="{p['accent']}" stroke-width="2.5" />

  <!-- Center Graphic Element -->
  <g transform="translate(500, 500)" text-anchor="middle">
    <circle cx="0" cy="0" r="180" fill="none" stroke="{p['accent']}" stroke-opacity="0.15" stroke-dasharray="4 8" stroke-width="1.5" />
    <circle cx="0" cy="0" r="140" fill="rgba(255,255,255,0.02)" stroke="{p['accent']}" stroke-opacity="0.3" stroke-width="1" />
    
    <!-- Camera/Portrait Silhouette Icon -->
    <path d="M -35 25 C -35 -15, 35 -15, 35 25 Z" fill="none" stroke="{p['accent']}" stroke-width="2" stroke-opacity="0.7" />
    <circle cx="0" cy="-30" r="22" fill="none" stroke="{p['accent']}" stroke-width="2" stroke-opacity="0.7" />
    
    <!-- Number Marker -->
    <text y="75" font-family="serif" font-size="14" fill="{p['accent']}" letter-spacing="6" opacity="0.9">PHOTO {p['id']} OF 12</text>
  </g>

  <!-- Editorial Typographic Layout -->
  <g transform="translate(500, 860)" text-anchor="middle">
    <text font-family="serif" font-size="13" font-weight="400" fill="{p['accent']}" letter-spacing="8" opacity="0.85">{p['subtitle']}</text>
    <text y="50" font-family="serif" font-style="italic" font-size="34" font-weight="300" fill="#ffffff" letter-spacing="2">{p['title']}</text>
    <line x1="-60" y1="90" x2="60" y2="90" stroke="{p['accent']}" stroke-opacity="0.4" stroke-width="1" />
    <text y="130" font-family="sans-serif" font-size="12" fill="#8E929D" letter-spacing="4" text-transform="uppercase">Replace with photo-{p['id']}.jpg</text>
  </g>

  <!-- Header & Footer Tags -->
  <text x="80" y="90" font-family="monospace" font-size="11" fill="{p['accent']}" letter-spacing="3" opacity="0.6">AYESHA · PORTFOLIO</text>
  <text x="920" y="90" font-family="monospace" font-size="11" fill="{p['accent']}" letter-spacing="3" text-anchor="end" opacity="0.6">03.09.2026</text>
  <text x="80" y="1255" font-family="monospace" font-size="10" fill="#8E929D" letter-spacing="2">SERIES REF: 2026.09.03-P{p['id']}</text>
  <text x="920" y="1255" font-family="monospace" font-size="10" fill="#8E929D" letter-spacing="2" text-anchor="end">EDITORIAL ARCHIVE</text>
</svg>"""

    file_path = os.path.join(output_dir, f"photo-{p['id']}.svg")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    # Also create alias photo-{int}.svg
    int_file = os.path.join(output_dir, f"photo-{int(p['id'])}.svg")
    with open(int_file, "w", encoding="utf-8") as f:
        f.write(svg_content)

print("Generated 12 luxury SVG portrait placeholders successfully.")
