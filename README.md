# Max Rodriguez — Portfolio

Personal portfolio for Max Rodriguez: machine learning engineer, AI researcher, Stanford
Symbolic Systems honors graduate, and Computer Science M.S. student.

**Live site:** [max-rodriguez-portfolio.vercel.app](https://max-rodriguez-portfolio.vercel.app)

## What is here

- Evidence-led case studies for LLM-agent reinforcement learning, multimodal piano feedback,
  scalable recommendation, and compact-model reasoning.
- A responsive experience and research archive.
- A publication feature linking FiMo-Klavier to its Stanford repository record and DOI.
- A dedicated Evensong page at `/evensong/` with in-game imagery, lightweight motion, and development context.
- A web résumé at `/resume.html` and one-page download at `/Max-Rodriguez-Resume.pdf`.
- Deployment configurations for both Vercel (root path) and GitHub Pages (`/my-portfolio/`).
- Accessible navigation, reduced-motion support, structured metadata, and no non-functional
  contact form.

## Stack

- React 19
- TypeScript
- Vite
- Custom CSS with no UI or animation runtime dependencies

## Local development

```bash
npm install
npm run dev
```

The local site runs at the URL printed by Vite, normally `http://localhost:5173`.

## Quality checks

```bash
npm run check
```

This runs TypeScript, ESLint, and a production build.

## Builds and deployment

Vercel uses the standard root-path build:

```bash
npm run build
```

GitHub Pages needs the repository subpath and is built by the workflow with:

```bash
npm run build:github
```

Pushing `main` triggers the GitHub Pages workflow. Vercel deployment requires the Vercel
project to be connected to this repository or a manual authenticated deployment.

## Content notes

Portfolio claims are grounded in Max's September 2026 knowledge base, research reports, and SDR publication notices. Internal
Bonterra material is intentionally represented only at a high level. Academic team projects are
described as collaborative work.

Self-hosted Inter and Newsreader font licenses are included in `licenses/`.

## Updating the résumé and media

Edit `content/resume.json`, then run `python scripts/build-resume.py` with ReportLab installed.
This generates the matching HTML and PDF. Game assets are prepared with
`scripts/prepare-media.py --game PATH --thesis PATH` using pypdf and imageio-ffmpeg;
the original game files are read-only inputs. See `content/media-provenance.json` and
`content/editorial-notes.md` for source details.

After the standard production build, `node scripts/verify-site.mjs` checks local links,
anchors, assets, and rendered page structure without a browser. After `npm run build:github`,
run `node scripts/verify-site.mjs --github` to check the repository base path.
