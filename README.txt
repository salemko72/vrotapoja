VROTA POJA — WEBSITE UPDATE

This package is ready for deployment to Cloudflare Workers Static Assets.

Structure:
- wrangler.jsonc
- public/index.html
- public/style.css
- public/script.js
- public/images/*
- public/floorplans/*
- public/isometric/*
- public/docs/katalog-stanova-2027.pdf
- public/robots.txt
- public/sitemap.xml

Update rules:
- The new 2027 apartment catalogue is the source of truth for apartment data and floor plans.
- Existing site layout/tectonics are preserved.
- Apartments are displayed as 9 units: Stan 1, Stan 6, Stan 7, Stan 8, Stan 9, Stan 10, Stan 11, Stan 12, Stan 13.
- Stan 12 and Stan 13 are marked SOLD based on the catalogue pages.
- Stan 7, Stan 8, Stan 11 and Stan 12 include two floor-plan variants shown in the detail modal.
- Each apartment detail includes the classic floor plan, an isometric schematic visual, and a download link to the full catalogue PDF.
- HR/EN language switch is implemented client-side.
- Hero cycles every 2 seconds with crossfade: interior, daytime exterior, bathroom, night exterior.
- Lower building image uses its full natural aspect ratio to avoid the previous top crop.

Deploy only after reviewing the live preview.
