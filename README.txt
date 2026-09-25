VROTA POJA — CURRENT WEBSITE SNAPSHOT

Production: https://vrotapoja.com/
GitHub: https://github.com/salemko72/vrotapoja
Cloudflare Worker: vrotapoja

This package is based on the Vrota Poja / FIELD GATE site and includes the 2026-09-25 catalogue and price-list update.

Structure:
- wrangler.jsonc
- public/index.html
- public/style.css
- public/script.js
- public/images/*
- public/floorplans/*
- public/fullplans/*
- public/isometric/* (legacy source assets; not displayed)
- public/docs/katalog-stanova-2026-2027-v2.pdf
- public/robots.txt
- public/sitemap.xml
- SOURCE-DATA/* (source PDF and price-list XLSX)
- MIGRATION/*

CURRENT RULES
- New catalogue `Katalog Stanova 2026-2027 v2.pdf` is the apartment-plan source of truth.
- Displayed units: Stan 1 through Stan 13.
- Ground floor: Stan 1–5; 1st floor: Stan 6–9; 2nd floor: Stan 10–13.
- Stan 12 and Stan 13 are SOLD.
- Stan 7, Stan 8, Stan 11 and Stan 12 have two plan variants on their catalogue pages.
- Apartment modal uses full-page high-resolution renders from the new catalogue.
- `POVEĆAJ TLOCRT` opens the new PDF in a new browser tab at the matching page.
- Cjenik popup is generated from `SOURCE-DATA/PRICE LIST - Sept 2026.xlsx` and maps its s/p codes to Stan 1–13.
- Hero cycles six images every 2 seconds with crossfade.
- Location map is used as a background behind the location text.
- Contact has email plus WhatsApp; the WhatsApp number appears once.

For continuation by another AI agent, read `MIGRATION/AI-HANDOFF.md` and `UPDATE-2026-09-25.md`.
