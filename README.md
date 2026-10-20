# Floralac — Bio-Circular Material Studio

> *"Flowers once offered, given a second life."*

Floralac is an eco-luxury Indian sustainable brand concept that binds discarded temple floral waste with dairy casein protein to engineer circular, bio-based consumer products: restorative hair masks, durable floral eco-leather small goods, and artisanal botanical jewelry.

---

## 🌸 Product Catalog (17 Artisanal Creations)

### 1. Hair & Scalp Care
- **Hibiscus & Marigold Scalp-Care Mask** — ₹149 *(Standard 100 g jar & 250 g options)*
- **Casein Repair & Smooth Mask** — ₹149 *(Deep conditioning with hibiscus flavonoids & casein lipids)*
- **Trial Sachet Hair Mask** — ₹29 *(Single-use discovery packet)*
- **Family Size Hair Mask, 250 g** — ₹249 *(Generous apothecary glass tub)*

### 2. Floral Eco-Leather
- **Floral Card Holder** — ₹249 *(4-slot minimalist sleeve with embedded petals)*
- **Floral Wallet** — ₹399 *(Classic bifold with tactile petal grain)*
- **Floral Notebook Cover** — ₹349 *(Refillable A5 journal wrap)*
- **Floral Tote Bag** — ₹999 *(Future product concept pending tensile load-bearing testing)*
- **Floral Sling Bag** — ₹1,499 *(Future product concept pending seam-burst & drop validation)*

### 3. Botanical Jewelry
- **Floral Beads & Charms** — ₹79 *(Pack of 8 hand-rolled casein floral beads)*
- **Botanical Hair Accessories** — ₹99 *(Carved casein hair pin & barrette)*
- **Floral Earrings** — ₹149 *(Geometric drops with brass findings)*
- **Pressed-Flower Pendant** — ₹199 *(Cured casein stone on raw linen cord)*
- **Botanical Brooch** — ₹199 *(Lapel statement pin celebrating traditional floral motifs)*
- **Floral Ring** — ₹199 *(Concept pending skin-contact validation)*
- **Botanical Bangle** — ₹299 *(Concept pending drop-impact testing)*
- **Floral Necklace** — ₹399 *(Artisanal collar necklace pending linkage tensile validation)*

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with tailored botanical color tokens
- **Typography**: Cormorant Garamond (display serif) & Plus Jakarta Sans (body)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Centralized data model with LocalStorage synchronization

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:5173/](http://localhost:5173/).

3. **Verify Build**:
   ```bash
   npm run build
   ```

---

## 🌟 Key Features

- **Official Brand Identity**: Displays the official Floralac logo featuring the circular botanical emblem, sacred marigold & rose artwork, milk-casein cradle, and *"SECOND LIFE MATERIALS"* tagline across the navigation bar, footer, and browser favicon.
- **100% Local Product Assets**: Every product in the 17-item catalog has dedicated local imagery in `public/images/products/` with robust, non-blocking fallback handling.
- **Centralized Catalog**: All 17 products defined in [`src/data/products.ts`](file:///c:/Users/Devang/Florac/src/data/products.ts).
- **Search & Filter**: Real-time search by keyword, ingredient, or product name, with sorting by price, rating, or name.
- **Product Detail Modal**: Deep dive into material composition, craftsmanship origin, and transparent testing status.
- **Synchronized Cart & Checkout**: Slide-out bag with quantity counters, subtotal updates, and simulated order placement.
- **Brand Story & Shared Material Pipeline**: 7-phase circular lifecycle exploring the collection, solar drying, and casein curing.
