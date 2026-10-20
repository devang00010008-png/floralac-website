const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(dir, filename), content.trim());
  console.log(`Generated: ${filename}`);
}

// 1. Fallback Universal Image
writeSvg('fallback-product.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6F0" />
      <stop offset="100%" stop-color="#EBE1D5" />
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#C85A32" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#C85A32" stop-opacity="0" />
    </radialGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3A302A" flood-opacity="0.12" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad)" />
  <circle cx="300" cy="300" r="230" fill="url(#halo)" />
  
  <g filter="url(#softShadow)">
    <circle cx="300" cy="270" r="120" fill="#FFFDF9" stroke="#E2D4C5" stroke-width="2" />
    <!-- Botanical Emblem -->
    <g transform="translate(300, 270)">
      <circle cx="0" cy="-26" r="28" fill="#E28E46" opacity="0.95" />
      <circle cx="-24" cy="0" r="26" fill="#D97249" opacity="0.95" />
      <circle cx="24" cy="0" r="26" fill="#D97249" opacity="0.95" />
      <circle cx="-16" cy="26" r="24" fill="#C85A32" opacity="0.95" />
      <circle cx="16" cy="26" r="24" fill="#C85A32" opacity="0.95" />
      <circle cx="0" cy="4" r="16" fill="#FFF9F2" />
      <circle cx="0" cy="4" r="7" fill="#5B6E4E" />
      <path d="M-40,42 Q0,90 40,42 Q0,60 -40,42 Z" fill="#5B6E4E" opacity="0.9" />
    </g>
  </g>
  
  <text x="300" y="445" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" font-weight="700" fill="#1E1E22" letter-spacing="3">FLORALAC</text>
  <text x="300" y="475" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#5B6E4E" letter-spacing="3">BIO-CIRCULAR CREATION</text>
</svg>
`);

// 2. Trial Sachet Hair Mask
writeSvg('trial-sachet-hair-mask.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgSachet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF8F3" />
      <stop offset="100%" stop-color="#ECE3D8" />
    </linearGradient>
    <linearGradient id="pouchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EFE6DA" />
      <stop offset="50%" stop-color="#E2D4C3" />
      <stop offset="100%" stop-color="#D5C3AF" />
    </linearGradient>
    <filter id="shadowPouch" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#2D231B" flood-opacity="0.14" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgSachet)" />
  
  <!-- Subtle Petals around -->
  <g opacity="0.6">
    <ellipse cx="140" cy="460" rx="20" ry="10" transform="rotate(-25 140 460)" fill="#E28E46" />
    <ellipse cx="460" cy="480" rx="18" ry="9" transform="rotate(35 460 480)" fill="#C85A32" />
    <ellipse cx="490" cy="440" rx="14" ry="7" transform="rotate(-15 490 440)" fill="#D97249" />
    <ellipse cx="110" cy="420" rx="16" ry="8" transform="rotate(45 110 420)" fill="#E28E46" />
  </g>

  <!-- Discovery Sachet Pouch -->
  <g filter="url(#shadowPouch)">
    <rect x="180" y="110" width="240" height="360" rx="16" fill="url(#pouchGrad)" stroke="#C8B59E" stroke-width="2" />
    <!-- Seal crimp texture top and bottom -->
    <line x1="180" y1="130" x2="420" y2="130" stroke="#C8B59E" stroke-width="2" stroke-dasharray="4 2" />
    <line x1="180" y1="450" x2="420" y2="450" stroke="#C8B59E" stroke-width="2" stroke-dasharray="4 2" />
    <!-- Tear notch -->
    <path d="M180,145 L190,150 L180,155 Z" fill="#BFA78C" />
    
    <!-- Botanical Label Card inside -->
    <rect x="205" y="170" width="190" height="250" rx="8" fill="#FFFDF9" stroke="#EADFD5" stroke-width="1.5" />
    
    <!-- Floral Illustration -->
    <g transform="translate(300, 230) scale(0.75)">
      <circle cx="0" cy="-18" r="18" fill="#E28E46" />
      <circle cx="-16" cy="0" r="16" fill="#D97249" />
      <circle cx="16" cy="0" r="16" fill="#D97249" />
      <circle cx="0" cy="18" r="16" fill="#C85A32" />
      <circle cx="0" cy="2" r="9" fill="#FFF9F2" />
      <path d="M-20,24 Q0,50 20,24" stroke="#5B6E4E" stroke-width="3" fill="none" />
    </g>
    
    <text x="300" y="300" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="18" font-weight="700" fill="#1E1E22">FLORALAC</text>
    <text x="300" y="322" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C85A32" letter-spacing="1.5">TRIAL SACHET • 20g</text>
    <text x="300" y="345" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="400" fill="#4A4850">Marigold &amp; Lactic Casein</text>
    <text x="300" y="360" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="400" fill="#6B6875">Restorative Scalp Treatment</text>

    <!-- Eco badge -->
    <rect x="235" y="380" width="130" height="22" rx="11" fill="#EBF0E6" stroke="#5B6E4E" stroke-width="0.8" />
    <text x="300" y="394" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="600" fill="#4A5A3F">100% Bio-Barrier Pouch</text>
  </g>
</svg>
`);

// 3. Family Size Hair Mask (250 g)
writeSvg('family-size-hair-mask.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgFamily" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF5EE" />
      <stop offset="100%" stop-color="#E7DBCF" />
    </linearGradient>
    <linearGradient id="amberJar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5C381E" />
      <stop offset="35%" stop-color="#844E27" />
      <stop offset="70%" stop-color="#5C381E" />
      <stop offset="100%" stop-color="#3D2311" />
    </linearGradient>
    <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CBB282" />
      <stop offset="50%" stop-color="#F2E3C4" />
      <stop offset="100%" stop-color="#A68C58" />
    </linearGradient>
    <filter id="jarShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#26170E" flood-opacity="0.22" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgFamily)" />
  
  <!-- Jar shadow and Jar Body -->
  <g filter="url(#jarShadow)">
    <!-- Jar Base -->
    <rect x="150" y="210" width="300" height="250" rx="36" fill="url(#amberJar)" stroke="#3D2311" stroke-width="2" />
    
    <!-- Label -->
    <rect x="175" y="250" width="250" height="170" rx="12" fill="#FFFDF9" stroke="#EADFD5" stroke-width="1.5" />
    
    <!-- Gold Trim on Label -->
    <rect x="183" y="258" width="234" height="154" rx="8" fill="none" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.6" />
    
    <text x="300" y="295" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" font-weight="700" fill="#1E1E22">FLORALAC</text>
    <text x="300" y="320" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#C85A32" letter-spacing="2">FAMILY SIZE • 250 g</text>
    <text x="300" y="348" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="15" font-style="italic" fill="#4A4850">Botanical Scalp &amp; Hair Nectar</text>
    <text x="300" y="372" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#5B6E4E">SACRED MARIGOLD &amp; DAIRY CASEIN</text>
    <text x="300" y="394" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="400" fill="#6B6875">8-12 Intensive Restorative Treatments</text>
    
    <!-- Metallic Gold Cap -->
    <rect x="165" y="150" width="270" height="65" rx="14" fill="url(#goldCap)" stroke="#8C7443" stroke-width="1.5" />
    <line x1="165" y1="185" x2="435" y2="185" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2" />
  </g>
  
  <!-- Scattered botanicals around -->
  <g transform="translate(110, 470) scale(0.8)">
    <circle cx="0" cy="0" r="14" fill="#E28E46" />
    <circle cx="10" cy="12" r="10" fill="#C85A32" />
    <circle cx="-12" cy="8" r="8" fill="#D97249" />
  </g>
  <g transform="translate(490, 480) scale(0.9)">
    <circle cx="0" cy="0" r="16" fill="#C85A32" />
    <circle cx="-12" cy="10" r="11" fill="#E28E46" />
  </g>
</svg>
`);

// 4. Floral Notebook Cover
writeSvg('floral-notebook-cover.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgNote" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF7F2" />
      <stop offset="100%" stop-color="#E6DC CE" />
    </linearGradient>
    <linearGradient id="leatherCover" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A56E4E" />
      <stop offset="50%" stop-color="#8F5839" />
      <stop offset="100%" stop-color="#79462A" />
    </linearGradient>
    <filter id="noteShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="8" dy="16" stdDeviation="20" flood-color="#2D1C13" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgNote)" />
  
  <!-- Journal Wrap with 3D perspective shadow -->
  <g filter="url(#noteShadow)">
    <!-- Cotton Paper Block Edge -->
    <rect x="185" y="105" width="245" height="390" rx="12" fill="#F4EEE4" stroke="#D7CBBC" stroke-width="1.5" />
    <line x1="422" y1="120" x2="422" y2="480" stroke="#D7CBBC" stroke-width="1" stroke-dasharray="2 3" />
    
    <!-- Bio-leather Front Wrap Cover -->
    <rect x="165" y="95" width="245" height="410" rx="16" fill="url(#leatherCover)" stroke="#63371E" stroke-width="2" />
    
    <!-- Perimeter Stitching -->
    <rect x="175" y="105" width="225" height="390" rx="10" fill="none" stroke="#D7B594" stroke-width="1.5" stroke-dasharray="6 4" />
    
    <!-- Embedded Real Petal Flecks in Leather -->
    <ellipse cx="230" cy="180" rx="12" ry="6" fill="#F4BA44" opacity="0.8" transform="rotate(30 230 180)" />
    <ellipse cx="320" cy="160" rx="8" ry="4" fill="#B3382F" opacity="0.8" transform="rotate(-20 320 160)" />
    <ellipse cx="260" cy="270" rx="14" ry="7" fill="#F4BA44" opacity="0.8" transform="rotate(50 260 270)" />
    <ellipse cx="330" cy="350" rx="10" ry="5" fill="#C85A32" opacity="0.8" transform="rotate(15 330 350)" />
    <ellipse cx="210" cy="380" rx="11" ry="6" fill="#D97249" opacity="0.8" transform="rotate(-40 210 380)" />
    <ellipse cx="280" cy="430" rx="9" ry="5" fill="#B3382F" opacity="0.8" transform="rotate(25 280 430)" />
    
    <!-- Debossed Floralac Insignia -->
    <circle cx="285" cy="290" r="38" fill="none" stroke="#542E19" stroke-width="2.5" />
    <path d="M285,265 C275,280 270,295 285,310 C300,295 295,280 285,265 Z" fill="#542E19" />
    <text x="285" y="345" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="14" font-weight="700" fill="#542E19" letter-spacing="3">FLORALAC</text>

    <!-- Pen Loop on side -->
    <rect x="405" y="270" width="22" height="60" rx="8" fill="#79462A" stroke="#542E19" stroke-width="1.5" />
    
    <!-- Raw bookmark ribbon -->
    <path d="M285,505 L285,545 L295,535 L305,545 L305,505 Z" fill="#C85A32" opacity="0.9" />
  </g>
</svg>
`);

// 5. Floral Tote Bag
writeSvg('floral-tote-bag.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgTote" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6F1" />
      <stop offset="100%" stop-color="#E8DED3" />
    </linearGradient>
    <linearGradient id="toteLeather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B8805E" />
      <stop offset="50%" stop-color="#9C6343" />
      <stop offset="100%" stop-color="#804B2F" />
    </linearGradient>
    <filter id="toteShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#2D1C13" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgTote)" />

  <g filter="url(#toteShadow)">
    <!-- Dual Straps / Handles -->
    <path d="M230,240 C230,100 270,70 300,70 C330,70 370,100 370,240" fill="none" stroke="#7A472E" stroke-width="14" stroke-linecap="round" />
    <path d="M230,240 C230,100 270,70 300,70 C330,70 370,100 370,240" fill="none" stroke="#9C6343" stroke-width="10" stroke-linecap="round" />
    
    <!-- Tote Main Body -->
    <path d="M160,220 L440,220 L410,490 L190,490 Z" fill="url(#toteLeather)" stroke="#683921" stroke-width="2" />
    
    <!-- Top Rim Trim -->
    <rect x="155" y="215" width="290" height="24" rx="6" fill="#804B2F" stroke="#683921" stroke-width="1.5" />
    
    <!-- Brass Handle Anchors & Rivets -->
    <rect x="220" y="225" width="20" height="45" rx="4" fill="#804B2F" stroke="#D4AF37" stroke-width="1.5" />
    <circle cx="230" cy="255" r="4" fill="#D4AF37" />
    <rect x="360" y="225" width="20" height="45" rx="4" fill="#804B2F" stroke="#D4AF37" stroke-width="1.5" />
    <circle cx="370" cy="255" r="4" fill="#D4AF37" />

    <!-- Embedded Petal Textures across the Tote -->
    <ellipse cx="210" cy="320" rx="14" ry="7" fill="#F4BA44" opacity="0.85" transform="rotate(25 210 320)" />
    <ellipse cx="380" cy="300" rx="12" ry="6" fill="#B3382F" opacity="0.85" transform="rotate(-30 380 300)" />
    <ellipse cx="270" cy="400" rx="16" ry="8" fill="#F4BA44" opacity="0.85" transform="rotate(40 270 400)" />
    <ellipse cx="350" cy="420" rx="14" ry="7" fill="#D97249" opacity="0.85" transform="rotate(-15 350 420)" />
    <ellipse cx="240" cy="450" rx="11" ry="5" fill="#B3382F" opacity="0.8" transform="rotate(35 240 450)" />
    
    <!-- Stitched center seam line -->
    <line x1="300" y1="240" x2="300" y2="490" stroke="#DDBEA1" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.7" />
    
    <!-- Embossed Brand Plate -->
    <rect x="260" y="325" width="80" height="30" rx="4" fill="#753F25" stroke="#CBB282" stroke-width="1" />
    <text x="300" y="344" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="11" font-weight="700" fill="#F2E3C4" letter-spacing="1.5">FLORALAC</text>
  </g>
</svg>
`);

// 6. Floral Sling Bag
writeSvg('floral-sling-bag.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgSling" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6F0" />
      <stop offset="100%" stop-color="#E8DDD1" />
    </linearGradient>
    <linearGradient id="slingLeather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A86E4A" />
      <stop offset="50%" stop-color="#8F5837" />
      <stop offset="100%" stop-color="#734224" />
    </linearGradient>
    <filter id="slingShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#2D1C13" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgSling)" />

  <g filter="url(#slingShadow)">
    <!-- Crossbody Long Strap -->
    <path d="M160,260 C140,80 460,80 440,260" fill="none" stroke="#734224" stroke-width="10" />
    <circle cx="160" cy="260" r="7" fill="#D4AF37" stroke="#734224" stroke-width="2" />
    <circle cx="440" cy="260" r="7" fill="#D4AF37" stroke="#734224" stroke-width="2" />
    
    <!-- Bag Rounded Body -->
    <rect x="170" y="240" width="260" height="230" rx="36" fill="url(#slingLeather)" stroke="#593118" stroke-width="2" />
    
    <!-- Flap with curve -->
    <path d="M170,240 L430,240 L430,340 C430,380 380,410 300,410 C220,410 170,380 170,340 Z" fill="#7D492B" stroke="#593118" stroke-width="2" />
    
    <!-- Flap Stitching -->
    <path d="M182,245 L418,245 L418,335 C418,370 370,398 300,398 C230,398 182,370 182,335 Z" fill="none" stroke="#D4B699" stroke-width="1.5" stroke-dasharray="5 3" />
    
    <!-- Antique Brass Magnetic Lock / Buckle -->
    <rect x="285" y="380" width="30" height="42" rx="6" fill="#D4AF37" stroke="#8C7443" stroke-width="1.5" />
    <circle cx="300" cy="400" r="5" fill="#593118" />

    <!-- Petal Flecks -->
    <ellipse cx="230" cy="300" rx="10" ry="5" fill="#F4BA44" opacity="0.85" transform="rotate(35 230 300)" />
    <ellipse cx="370" cy="290" rx="12" ry="6" fill="#B3382F" opacity="0.8" transform="rotate(-25 370 290)" />
    <ellipse cx="240" cy="440" rx="11" ry="6" fill="#D97249" opacity="0.85" transform="rotate(15 240 440)" />
    <ellipse cx="360" cy="435" rx="13" ry="6" fill="#F4BA44" opacity="0.85" transform="rotate(-40 360 435)" />
  </g>
</svg>
`);

// 7. Floral Beads & Charms
writeSvg('floral-beads-charms.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgBeads" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6F0" />
      <stop offset="100%" stop-color="#E8DDD0" />
    </linearGradient>
    <linearGradient id="caseinIvory" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF8" />
      <stop offset="60%" stop-color="#F2E8DC" />
      <stop offset="100%" stop-color="#DECABE" />
    </linearGradient>
    <filter id="beadShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="10" stdDeviation="12" flood-color="#36281D" flood-opacity="0.16" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgBeads)" />

  <!-- Natural Linen Twine Strand -->
  <path d="M80,300 Q300,380 520,300" fill="none" stroke="#C4B09A" stroke-width="4" stroke-dasharray="8 3" />
  
  <!-- 8 Beads arranged along curve -->
  <g filter="url(#beadShadow)">
    <!-- Bead 1 -->
    <g transform="translate(130, 310)">
      <circle cx="0" cy="0" r="28" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="-4" cy="-5" rx="12" ry="6" fill="#F4BA44" opacity="0.85" transform="rotate(30 -4 -5)" />
      <ellipse cx="6" cy="7" rx="8" ry="4" fill="#B3382F" opacity="0.85" transform="rotate(-20 6 7)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
    <!-- Bead 2 -->
    <g transform="translate(180, 328)">
      <circle cx="0" cy="0" r="28" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="5" cy="-7" rx="10" ry="5" fill="#D97249" opacity="0.85" transform="rotate(-40 5 -7)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
    <!-- Bead 3 -->
    <g transform="translate(230, 342)">
      <circle cx="0" cy="0" r="28" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="-6" cy="4" rx="11" ry="6" fill="#F4BA44" opacity="0.85" transform="rotate(15 -6 4)" />
      <ellipse cx="5" cy="-6" rx="9" ry="4" fill="#B3382F" opacity="0.8" transform="rotate(45 5 -6)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
    <!-- Bead 4 (Center Left) -->
    <g transform="translate(280, 350)">
      <circle cx="0" cy="0" r="30" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="0" cy="0" rx="14" ry="7" fill="#F4BA44" opacity="0.85" transform="rotate(-15 0 0)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
    <!-- Bead 5 (Center Right) -->
    <g transform="translate(330, 350)">
      <circle cx="0" cy="0" r="30" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="-4" cy="5" rx="13" ry="6" fill="#B3382F" opacity="0.85" transform="rotate(60 -4 5)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
    <!-- Bead 6 -->
    <g transform="translate(380, 342)">
      <circle cx="0" cy="0" r="28" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="6" cy="-4" rx="11" ry="5" fill="#F4BA44" opacity="0.85" transform="rotate(-30 6 -4)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
    <!-- Bead 7 -->
    <g transform="translate(430, 328)">
      <circle cx="0" cy="0" r="28" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="-5" cy="5" rx="9" ry="5" fill="#D97249" opacity="0.85" transform="rotate(20 -5 5)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
    <!-- Bead 8 -->
    <g transform="translate(480, 310)">
      <circle cx="0" cy="0" r="28" fill="url(#caseinIvory)" stroke="#C8B5A3" stroke-width="1.5" />
      <ellipse cx="4" cy="-5" rx="11" ry="5" fill="#F4BA44" opacity="0.85" transform="rotate(-50 4 -5)" />
      <ellipse cx="-4" cy="6" rx="8" ry="4" fill="#B3382F" opacity="0.8" transform="rotate(10 -4 6)" />
      <circle cx="0" cy="0" r="3" fill="#685646" />
    </g>
  </g>
</svg>
`);

// 8. Botanical Hair Accessories
writeSvg('botanical-hair-accessories.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgHair" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF7F2" />
      <stop offset="100%" stop-color="#EBE0D3" />
    </linearGradient>
    <linearGradient id="pinCasein" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="50%" stop-color="#F2E6D8" />
      <stop offset="100%" stop-color="#DEC7B6" />
    </linearGradient>
    <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="6" dy="14" stdDeviation="16" flood-color="#362518" flood-opacity="0.16" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgHair)" />

  <g filter="url(#pinShadow)">
    <!-- Chignon Hair Pin (Curved U-Pin) -->
    <g transform="translate(180, 80) rotate(-20 100 200)">
      <!-- Prongs -->
      <path d="M80,100 L70,440 C70,460 100,460 100,440 L110,180 L120,440 C120,460 150,460 150,440 L140,100 Z" fill="url(#pinCasein)" stroke="#BFA693" stroke-width="1.5" />
      <!-- Head Floral Crown -->
      <rect x="60" y="60" width="100" height="60" rx="20" fill="url(#pinCasein)" stroke="#BFA693" stroke-width="1.5" />
      <!-- Petal inlays -->
      <ellipse cx="90" cy="90" rx="14" ry="7" fill="#F4BA44" opacity="0.85" transform="rotate(35 90 90)" />
      <ellipse cx="125" cy="85" rx="12" ry="6" fill="#B3382F" opacity="0.85" transform="rotate(-30 125 85)" />
    </g>

    <!-- Botanical Barrette / Slide -->
    <g transform="translate(290, 260) rotate(15)">
      <!-- Brass slide back -->
      <rect x="0" y="30" width="220" height="18" rx="6" fill="#D4AF37" stroke="#9E802A" stroke-width="1" />
      <!-- Top Oval Casein Stone Face -->
      <rect x="-10" y="10" width="240" height="55" rx="27" fill="url(#pinCasein)" stroke="#BFA693" stroke-width="1.5" />
      <!-- Embedded Petals -->
      <ellipse cx="40" cy="38" rx="16" ry="8" fill="#F4BA44" opacity="0.85" transform="rotate(20 40 38)" />
      <ellipse cx="90" cy="35" rx="14" ry="7" fill="#B3382F" opacity="0.85" transform="rotate(-15 90 35)" />
      <ellipse cx="140" cy="40" rx="15" ry="7" fill="#F4BA44" opacity="0.85" transform="rotate(30 140 40)" />
      <ellipse cx="185" cy="36" rx="12" ry="6" fill="#D97249" opacity="0.85" transform="rotate(-25 185 36)" />
    </g>
  </g>
</svg>
`);

// 9. Botanical Brooch
writeSvg('botanical-brooch.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgBrooch" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6EF" />
      <stop offset="100%" stop-color="#E8DDD0" />
    </linearGradient>
    <linearGradient id="broochCasein" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="50%" stop-color="#F3E7D9" />
      <stop offset="100%" stop-color="#DEC8B6" />
    </linearGradient>
    <filter id="broochShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="16" stdDeviation="20" flood-color="#2D1C12" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgBrooch)" />

  <g filter="url(#broochShadow)" transform="translate(300, 300)">
    <!-- Brass Bezel Ring -->
    <circle cx="0" cy="0" r="145" fill="#D4AF37" stroke="#A88B32" stroke-width="2" />
    <circle cx="0" cy="0" r="138" fill="none" stroke="#66501A" stroke-width="1.5" stroke-dasharray="4 3" />
    
    <!-- Central Carved Flower Petal Silhouette in Casein -->
    <circle cx="0" cy="0" r="130" fill="url(#broochCasein)" />

    <!-- Sculpted Petals with embedded marigold fragments -->
    <g>
      <!-- Petal 1 -->
      <path d="M0,0 C-35,-80 35,-80 0,0" fill="#E28E46" opacity="0.85" />
      <!-- Petal 2 -->
      <path d="M0,0 C80,-35 80,35 0,0" fill="#C85A32" opacity="0.85" />
      <!-- Petal 3 -->
      <path d="M0,0 C35,80 -35,80 0,0" fill="#E28E46" opacity="0.85" />
      <!-- Petal 4 -->
      <path d="M0,0 C-80,35 -80,-35 0,0" fill="#C85A32" opacity="0.85" />
      
      <!-- Real Embedded Rose & Marigold flakes -->
      <ellipse cx="-40" cy="-40" rx="14" ry="7" fill="#B3382F" opacity="0.9" transform="rotate(45 -40 -40)" />
      <ellipse cx="40" cy="-40" rx="16" ry="8" fill="#F4BA44" opacity="0.9" transform="rotate(-30 40 -40)" />
      <ellipse cx="40" cy="40" rx="14" ry="7" fill="#B3382F" opacity="0.9" transform="rotate(30 40 40)" />
      <ellipse cx="-40" cy="40" rx="15" ry="7" fill="#F4BA44" opacity="0.9" transform="rotate(-45 -40 40)" />

      <!-- Center Brass Stamen Core -->
      <circle cx="0" cy="0" r="28" fill="#D4AF37" stroke="#8A6E24" stroke-width="1.5" />
      <circle cx="0" cy="0" r="12" fill="#5C4714" />
    </g>
  </g>
</svg>
`);

// 10. Floral Ring
writeSvg('floral-ring.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF5EE" />
      <stop offset="100%" stop-color="#E8DC CE" />
    </linearGradient>
    <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0C988" />
      <stop offset="50%" stop-color="#C29F52" />
      <stop offset="100%" stop-color="#9C792E" />
    </linearGradient>
    <linearGradient id="stoneCasein" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="50%" stop-color="#F4EAE0" />
      <stop offset="100%" stop-color="#DFCBBF" />
    </linearGradient>
    <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#281A10" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgRing)" />

  <g filter="url(#ringShadow)" transform="translate(300, 310)">
    <!-- Ring Band (Perspective Oval) -->
    <ellipse cx="0" cy="60" rx="90" ry="75" fill="none" stroke="url(#brassGold)" stroke-width="26" />
    <ellipse cx="0" cy="60" rx="90" ry="75" fill="none" stroke="#876823" stroke-width="2" />
    
    <!-- Signet Bezel Setting (Top Mount) -->
    <ellipse cx="0" cy="-60" rx="95" ry="70" fill="url(#brassGold)" stroke="#876823" stroke-width="2" />
    
    <!-- Cured Floral Casein Stone Cabochon -->
    <ellipse cx="0" cy="-60" rx="82" ry="58" fill="url(#stoneCasein)" stroke="#C8B5A3" stroke-width="1.5" />
    
    <!-- Embedded Dried Petals inside Stone -->
    <g transform="translate(0, -60)">
      <ellipse cx="-15" cy="-8" rx="22" ry="11" fill="#F4BA44" opacity="0.9" transform="rotate(-25 -15 -8)" />
      <ellipse cx="18" cy="8" rx="18" ry="9" fill="#B3382F" opacity="0.85" transform="rotate(35 18 8)" />
      <ellipse cx="5" cy="-18" rx="14" ry="7" fill="#E28E46" opacity="0.85" transform="rotate(10 5 -18)" />
      <ellipse cx="-8" cy="18" rx="12" ry="6" fill="#D97249" opacity="0.8" transform="rotate(-40 -8 18)" />
    </g>
  </g>
</svg>
`);

// 11. Botanical Bangle
writeSvg('botanical-bangle.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgBangle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6F0" />
      <stop offset="100%" stop-color="#E8DDD1" />
    </linearGradient>
    <linearGradient id="bangleCasein" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="40%" stop-color="#F2E6D8" />
      <stop offset="100%" stop-color="#DFCAB9" />
    </linearGradient>
    <filter id="bangleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="8" dy="18" stdDeviation="24" flood-color="#362215" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgBangle)" />

  <g filter="url(#bangleShadow)" transform="translate(300, 300)">
    <!-- Continuous Cast Casein Bangle Torus Shape -->
    <!-- Outer Rim -->
    <ellipse cx="0" cy="0" rx="190" ry="140" fill="none" stroke="url(#bangleCasein)" stroke-width="48" />
    <ellipse cx="0" cy="0" rx="190" ry="140" fill="none" stroke="#CBB4A1" stroke-width="1.5" />
    <!-- Inner Rim Highlight -->
    <ellipse cx="0" cy="0" rx="166" ry="116" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.6" />
    <ellipse cx="0" cy="0" rx="214" ry="164" fill="none" stroke="#B89F8A" stroke-width="1" stroke-opacity="0.5" />

    <!-- Suspended Flower Petals along the circumference -->
    <!-- Top Arc Petals -->
    <ellipse cx="-100" cy="-125" rx="18" ry="8" fill="#F4BA44" opacity="0.85" transform="rotate(-30 -100 -125)" />
    <ellipse cx="0" cy="-140" rx="22" ry="9" fill="#B3382F" opacity="0.85" transform="rotate(10 0 -140)" />
    <ellipse cx="110" cy="-125" rx="19" ry="8" fill="#F4BA44" opacity="0.85" transform="rotate(35 110 -125)" />
    <!-- Bottom Arc Petals -->
    <ellipse cx="-120" cy="115" rx="20" ry="9" fill="#D97249" opacity="0.85" transform="rotate(40 -120 115)" />
    <ellipse cx="0" cy="140" rx="24" ry="10" fill="#F4BA44" opacity="0.9" transform="rotate(-15 0 140)" />
    <ellipse cx="120" cy="115" rx="20" ry="9" fill="#B3382F" opacity="0.85" transform="rotate(-35 120 115)" />
    <!-- Side Petals -->
    <ellipse cx="-190" cy="0" rx="20" ry="9" fill="#F4BA44" opacity="0.85" transform="rotate(80 -190 0)" />
    <ellipse cx="190" cy="0" rx="20" ry="9" fill="#B3382F" opacity="0.85" transform="rotate(-80 190 0)" />
  </g>
</svg>
`);

// 12. Floral Necklace
writeSvg('floral-necklace.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgNecklace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF5EE" />
      <stop offset="100%" stop-color="#E8DDD0" />
    </linearGradient>
    <linearGradient id="tileCasein" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="50%" stop-color="#F2E6D8" />
      <stop offset="100%" stop-color="#DEC6B4" />
    </linearGradient>
    <filter id="neckShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#2D1C12" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bgNecklace)" />

  <!-- Linen Suspended Cord -->
  <path d="M120,100 C150,300 450,300 480,100" fill="none" stroke="#C4B09A" stroke-width="4" stroke-dasharray="8 3" />
  
  <g filter="url(#neckShadow)">
    <!-- Tile 1 (Left Far) -->
    <g transform="translate(180, 240) rotate(-25)">
      <circle cx="0" cy="0" r="6" fill="#D4AF37" />
      <rect x="-24" y="8" width="48" height="65" rx="8" fill="url(#tileCasein)" stroke="#C8B3A1" stroke-width="1.5" />
      <ellipse cx="0" cy="40" rx="14" ry="7" fill="#F4BA44" opacity="0.85" transform="rotate(30 0 40)" />
    </g>

    <!-- Tile 2 (Left Mid) -->
    <g transform="translate(235, 290) rotate(-12)">
      <circle cx="0" cy="0" r="7" fill="#D4AF37" />
      <rect x="-28" y="10" width="56" height="85" rx="10" fill="url(#tileCasein)" stroke="#C8B3A1" stroke-width="1.5" />
      <ellipse cx="-4" cy="50" rx="16" ry="8" fill="#B3382F" opacity="0.85" transform="rotate(-20 -4 50)" />
    </g>

    <!-- Tile 3 (Center Anchor - Largest) -->
    <g transform="translate(300, 310)">
      <circle cx="0" cy="0" r="8" fill="#D4AF37" />
      <rect x="-34" y="12" width="68" height="110" rx="12" fill="url(#tileCasein)" stroke="#C8B3A1" stroke-width="1.5" />
      <!-- Embedded Sacred Lotus & Marigold Flecks -->
      <ellipse cx="0" cy="55" rx="20" ry="10" fill="#F4BA44" opacity="0.9" transform="rotate(25 0 55)" />
      <ellipse cx="0" cy="85" rx="16" ry="8" fill="#B3382F" opacity="0.85" transform="rotate(-30 0 85)" />
      <circle cx="0" cy="100" r="5" fill="#D97249" />
    </g>

    <!-- Tile 4 (Right Mid) -->
    <g transform="translate(365, 290) rotate(12)">
      <circle cx="0" cy="0" r="7" fill="#D4AF37" />
      <rect x="-28" y="10" width="56" height="85" rx="10" fill="url(#tileCasein)" stroke="#C8B3A1" stroke-width="1.5" />
      <ellipse cx="4" cy="50" rx="16" ry="8" fill="#F4BA44" opacity="0.85" transform="rotate(20 4 50)" />
    </g>

    <!-- Tile 5 (Right Far) -->
    <g transform="translate(420, 240) rotate(25)">
      <circle cx="0" cy="0" r="6" fill="#D4AF37" />
      <rect x="-24" y="8" width="48" height="65" rx="8" fill="url(#tileCasein)" stroke="#C8B3A1" stroke-width="1.5" />
      <ellipse cx="0" cy="40" rx="14" ry="7" fill="#B3382F" opacity="0.85" transform="rotate(-30 0 40)" />
    </g>
  </g>
</svg>
`);

console.log('All 12 product SVGs successfully created!');
