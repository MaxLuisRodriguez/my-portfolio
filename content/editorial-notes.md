# September 2026 content audit

- Portfolio was fetched and fast-forwarded four commits from GitHub to `61f0665` before changes.
- Primary career source: `max_rodriguez_knowledge_base/Resume/MLR-RESUME-SEP-2026.md`.
- Cross-check: the Physical Intelligence application package flags uncertainty in Bonterra's 20–30 minute time-savings claim. Omitted that figure from the public résumé; described the implemented workflow instead.
- Retained the published report's precise feed-ranking result (0.8339 holdout AUC, fully interacted two-tower) rather than conflating validation and holdout metrics.
- Team research is described as collaborative. Evensong is described as in development, with no unmeasured runtime, release date, or public download claim.
- Publication status, repository URL, DOI, access, and CC0 license come from Max's SDR approval/publication notices. The repository page returned HTTP 200 and contains both FiMo-Klavier and the DOI.
- Local thesis PDF matches the knowledge-base copy byte-for-byte. The illustration on the page is extracted from PDF page 10 and identified as a thesis figure.
- `resume.json` is the shared source for the public HTML and one-page PDF. `scripts/build-resume.py` regenerates both; it does not modify the knowledge base.
- `media-provenance.json` records the exact game capture inputs and processing. Max approved only Ember Market and Glasswood. The hero and downloadable GIF are explicitly labeled slideshows of those two images. Other stills and gameplay clips were removed from the public assets.
- Evensong copy uses literal descriptions of exploration, branching dialogue, and implementation work, grounded in the game README and design documentation. Removed metaphorical taglines from the page, homepage feature, and social metadata.
- Max subsequently requested a boss gameplay preview. Added a 6.5-second timestamp-preserving Warden capture, labeled "(In progress)". Source and encoding details are in `boss-preview-provenance.json`. The previously excluded environment stills and hearth/After clips remain excluded.
- Removed the background slideshow's overlay button. The footer's "Animate background" checkbox controls it, and system reduced-motion preferences still apply.
- Website and game source repositories remain separate. No game source, internal Bonterra documents, or application-package prose is copied into the public output.
- User preferences: direct, natural prose; no em dashes in website copy; "Resume" without accents; introduce the project as "am developing a dark pixel-art adventure game, Evensong." Keep continuous dark section backgrounds and a cinematic visual treatment.
