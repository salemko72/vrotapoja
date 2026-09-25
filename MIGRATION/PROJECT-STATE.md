# Vrota Poja — Project State Snapshot

Date: 2026-09-25

## Repository / deployment
- GitHub: `salemko72/vrotapoja`
- Branch: `main`
- Production domain: `https://vrotapoja.com/`
- Cloudflare Worker: `vrotapoja`
- Static assets directory: `./public`

## Current package
This snapshot contains the 2026-09-25 apartment catalogue and price-list update.

## Core files
- `public/index.html` — page structure, apartment data, SEO metadata, JSON-LD and price-list popup markup
- `public/style.css` — styling, responsive layout, rotated/cropped plan previews and price-list popup
- `public/script.js` — translations, filters, apartment modal, PDF-page mapping, price-list popup and hero loop
- `public/docs/katalog-stanova-2026-2027-v2.pdf` — new public apartment catalogue
- `SOURCE-DATA/Katalog Stanova 2026-2027 v2.pdf` — source copy
- `SOURCE-DATA/PRICE LIST - Sept 2026.xlsx` — source price list
- `public/robots.txt`
- `public/sitemap.xml`
- `wrangler.jsonc`

## Apartment mapping
The new catalogue is presented on the web as Stan 1–13.
- pages 1–5: Stan 1–5, ground floor
- pages 6–9: Stan 6–9, 1st floor
- pages 10–13: Stan 10–13, 2nd floor

The internal source codes are S1–S9 for the original apartment series and P1–P4 for the four newly labelled apartment pages, but the website intentionally presents the global apartment numbering Stan 1–13.

## Price-list mapping
The XLSX source uses these codes:
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

The public popup uses the `PRICE` column from the XLSX and calculates EUR/m² from that price divided by the XLSX `total m2 NETTO` value.

## Current design state
- `O PROJEKTU` removed from navigation.
- `CJENIK` added after `STANOVI`.
- Cjenik section is before Location and opens a styled popup.
- Hero slogan no longer has the dash between `stanovanje` and `u srcu`.
- Hero title/slogan typography reduced by about 10%.
- Apartment card preview images are new square crops and are rotated 45° in CSS.
- Sold: Stan 12 and Stan 13.
- Modal uses full-page renders from the new catalogue.
- `POVEĆAJ TLOCRT` opens the real new PDF in a new tab at the matching page.
- Header brand: VROTA POJA / STARI GRAD, HVAR; English brand: FIELD GATE.

## Validation
- `node --check public/script.js` passes.
- HTML parsed with BeautifulSoup: 13 apartment cards, 4 nav links, price modal present.
- All local `src`/`href` references resolve.
- Full-plan renders exist for S1–S13.
- Preview renders exist for S1–S13.


## 2026-09-25 visual update after v11
- Apartment card floorplan previews are now heavily cropped (`scale(3)`) and alternate between +30° and -30° rotations.
- Cjenik section heading is left-aligned.
- Cjenik section uses `public/images/cjenik-bg.jpg` as its background.
