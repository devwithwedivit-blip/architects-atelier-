# Architects Atelier

Content migration from **Architects Atelier** (`architect atelier/`) into the **MAD** frontend architecture (`mad/www.i-mad.com/`).

## Quick Start

Requires Node.js 18+:

```bash
npm start
# or: node server.mjs
```

Then open [http://localhost:5445](http://localhost:5445).

## Repository Branches

- **`content/architects-atelier`** (migrated site): Complete migrated site featuring rebuilt Architects Atelier vector header/footer logos, SVG favicons, About/Team/Offices/Projects/Articles routes populated from Architects Atelier data, 34 localized original images in `mad/www.i-mad.com/assets/aa/`, the embedded Hero motion logo (`Architects Atelier – Motion Logo.html`), `extracted/` audit/inventory/mapping data, and `server.mjs`.
- **`main`** (baseline): Initial workspace snapshot containing the unmodified MAD baseline capture (`mad/`), read-only source archive (`architect atelier/`), and `extracted/` audit deliverables.

## Directory Structure

- `architect atelier/` — Source Architects Atelier homepage capture and `Architects Atelier – Motion Logo.html` (read-only).
- `extracted/` — Extracted `content.json`, `images.json`, `AUDIT_AND_MAPPING.md`, original images, and verification screenshots.
- `mad/www.i-mad.com/` — Static Next.js build migrated to Architects Atelier.
- `server.mjs` — Zero-dependency local Node HTTP server supporting clean routes, Next.js `/_next/data` JSONs, local `/_next/image` serving, font fallbacks, and local Sanity GROQ queries.
