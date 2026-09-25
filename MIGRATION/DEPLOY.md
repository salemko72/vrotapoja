# Vrota Poja — Deploy / Recovery

## Normal deploy from an existing clone

```bat
cd C:\VROTA_POJA
git status
git branch
git add .
git commit -m "Vrota Poja update"
git push origin main
```

Cloudflare is expected to deploy from the GitHub `main` branch.

## If starting on a new machine

1. Clone the repository:

```bat
git clone https://github.com/salemko72/vrotapoja.git C:\VROTA_POJA
cd C:\VROTA_POJA
```

2. Confirm branch:

```bat
git branch
```

3. The project is a plain static-assets Worker. `wrangler.jsonc` points to `./public`.

4. Before changing anything, read `MIGRATION/AI-HANDOFF.md`.

## Local verification

JavaScript syntax:

```bat
node --check public\script.js
```

If Wrangler is installed, a local preview can be started with the appropriate Wrangler dev command for the installed version.

## Production checklist

- Homepage loads.
- HR and EN work.
- Apartment filters work.
- Card click opens modal.
- `POVEĆAJ TLOCRT` opens PDF page 2/7/8/9/10/11/12/13/14 for S1–S9 respectively.
- Stan 12 and Stan 13 show SOLD.
- Email and WhatsApp links work.
- Mobile layout works.
- `/sitemap.xml` loads.

## Do not force push

Use ordinary `git push origin main`. Avoid destructive Git operations unless explicitly requested.
