# VROTA POJA / FIELD GATE — AI AGENT HANDOFF

**Snapshot:** 2026-09-25
**Project:** Vrota Poja — real-estate micro-site for Stari Grad, Hvar
**Repository:** https://github.com/salemko72/vrotapoja
**Production:** https://vrotapoja.com/
**Cloudflare Worker:** `vrotapoja`
**Workers.dev:** `vrotapoja.jure-tomas.workers.dev`
**Branch:** `main`

## 1. START HERE

This is a plain static HTML/CSS/JavaScript Cloudflare Workers Assets project. No framework, npm dependency tree, or backend.

**Do not redesign the site's visual tectonics unless explicitly asked.** Preserve the minimalist/editorial structure and supplied photography.

Before making changes:
1. Read this file.
2. Read `MIGRATION/PROJECT-STATE.md`.
3. Read `MIGRATION/DEPLOY.md`.
4. Inspect `public/index.html`, `public/style.css`, and `public/script.js`.
5. Treat `public/docs/katalog-stanova-2026-2027-v2.pdf` as the public apartment-plan source.
6. Treat `SOURCE-DATA/PRICE LIST - Sept 2026.xlsx` as the source for the Cjenik popup.

## 2. CURRENT SITE STRUCTURE

1. Sticky header / brand / navigation / HR-EN switch
2. Hero split layout
3. Apartment catalogue with floor filters
4. Bedroom image break
5. Remaining apartment cards
6. Bathroom image break
7. Sold notices
8. Cjenik section with popup
9. Location section with map background
10. Contact section
11. Closing building image + closing copy
12. Footer
13. Apartment detail modal

### Header
Current navigation:
- STANOVI
- CJENIK
- LOKACIJA
- KONTAKT

`O PROJEKTU` has been removed.

### Hero
HR slogan is:
`Moderno stanovanje` / `u srcu povijesti.`

The dash between `stanovanje` and `u srcu` is intentionally removed.
Hero title/slogan typography was reduced by about 10%.

## 3. APARTMENTS — GLOBAL NUMBERING

The web now presents **Stan 1 through Stan 13**, in that order.

- Ground floor: Stan 1–5
- 1st floor: Stan 6–9
- 2nd floor: Stan 10–13

The four newly labelled pages Stan 2–5 still contain original P1–P4 labels in some source-table text. On the website they are intentionally presented as apartments 2–5, because that is the global numbering requested for the new catalogue.

Current website data:

| Stan | Total | Net | Floor | Rooms | Outdoor | Parking | Variants | Status |
|---|---:|---:|---|---|---|---|---|---|
| 1 | 159,90 | 57,58 | Ground | 1 bedroom | Garden / terrace | 1 | — | available |
| 2 | 141,69 | 65,12 | Ground | 1 bedroom | Garden / terrace | 1 | — | available |
| 3 | 120,72 | 66,30 | Ground | 2 bedrooms | Loggias / garden | 1 | — | available |
| 4 | 250,59 | 130,86 | Ground | 3 bedrooms | Large terraces / garden | 2 | — | available |
| 5 | 158,37 | 56,53 | Ground | 1 bedroom | Garden / terrace | 1 | — | available |
| 6 | 64,62 | 47,67 | 1st | 1 bedroom | Terrace / loggia | 1 | — | available |
| 7 | 130,93 | 104,36 | 1st | 2 bedrooms | Large loggias | 2 | 2 | available |
| 8 | 141,44 | 113,49 | 1st | 3 bedrooms | Large loggias | 2 | 2 | available |
| 9 | 52,92 | 37,29 | 1st | 1 bedroom | Terrace / loggia | 1 | — | available |
| 10 | 52,92 | 46,03 | 2nd | 1 bedroom | Terrace / loggia | 1 | — | available |
| 11 | 129,04 | 89,17 | 2nd | 2 bedrooms | Large terraces | 2 | 2 | available |
| 12 | 137,12 | 97,46 | 2nd | 3 bedrooms | Large terraces | 2 | 2 | SOLD |
| 13 | 49,95 | 36,41 | 2nd | 1 bedroom | Terrace / loggia | 1 | — | SOLD |

## 4. NEW CATALOGUE / PDF

Public PDF:
`public/docs/katalog-stanova-2026-2027-v2.pdf`

Source copy:
`SOURCE-DATA/Katalog Stanova 2026-2027 v2.pdf`

PDF page mapping is direct:
- Stan 1 → page 1
- Stan 2 → page 2
- Stan 3 → page 3
- Stan 4 → page 4
- Stan 5 → page 5
- Stan 6 → page 6
- Stan 7 → page 7
- Stan 8 → page 8
- Stan 9 → page 9
- Stan 10 → page 10
- Stan 11 → page 11
- Stan 12 → page 12
- Stan 13 → page 13

`POVEĆAJ TLOCRT` opens this real PDF in a new browser tab with the matching `#page=N` fragment.

The apartment modal displays a full-page high-resolution JPEG render from `public/fullplans/S1.jpg` through `S13.jpg`.

## 5. PLAN PREVIEWS

`public/floorplans/S1.jpg` through `S13.jpg` are new square preview crops generated from the new PDF pages.

The card CSS rotates these previews by 45° and slightly scales them so they read as graphic floor-plan symbols rather than small technical documents.

Legacy isometric assets under `public/isometric/` are not displayed.

## 6. CJENIK

The top navigation item `CJENIK` jumps to a dedicated section immediately after the apartment catalogue and before Location.

The section title is right-aligned and the `OTVORI CJENIK` button opens a styled popup.

Source:
`SOURCE-DATA/PRICE LIST - Sept 2026.xlsx`

The XLSX codes map to global apartment numbers as follows:
- s1 → Stan 1
- p1 → Stan 2
- p2 → Stan 3
- p3 → Stan 4
- p4 → Stan 5
- s2 → Stan 6
- s3 → Stan 7
- s4 → Stan 8
- s5 → Stan 9
- s6 → Stan 10
- s7 → Stan 11
- s8 → Stan 12
- s9 → Stan 13

The popup uses the workbook's `PRICE` column and calculates EUR/m² from `PRICE / total m2 NETTO`. Stan 12 and Stan 13 are shown as SOLD.

## 7. OTHER CURRENT DESIGN DETAILS

- Hero cycles six images every 2 seconds with crossfade.
- Location map `public/images/mapa.png` is a semi-transparent background behind white Location copy.
- Contact has email `jure.tomas@gmail.com` and WhatsApp `+385 98 212 100`; the number appears once.
- Header brand: VROTA POJA / STARI GRAD, HVAR. English brand: FIELD GATE.
- HR/EN language switch is client-side.

## 8. VALIDATION

Current snapshot was checked with:
- `node --check public/script.js` — PASS
- HTML parsed with BeautifulSoup — 13 apartment cards, 4 nav links, Cjenik popup present
- Local `src`/`href` references — no missing local references
- Full-plan renders — S1–S13 present
- Preview renders — S1–S13 present

## 9. DEPLOYMENT

Normal deployment workflow remains:
```powershell
cd C:\VROTA_POJA
git add .
git commit -m "Vrota Poja catalogue and price list update"
git push origin main
```

Cloudflare is connected to the GitHub `main` branch. Do not change DNS or Worker domain configuration just to deploy this static update.
