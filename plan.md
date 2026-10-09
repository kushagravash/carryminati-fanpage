# Implementation plan — CarryMinati Creator Universe

## Scope and sequence
Build a three-route React/Vite fan site: `/` The Hub, `/vault` Stream Vault, and `/submit` Fan Submit. Source research is limited to official public CarryMinati and CarryisLive pages and verified official video destinations; the archive will favor actual creator/collaboration material and represent comedy, gaming, music and ensemble work. Implement layout/data/navigation first, then Hub, Vault, form, restrained interactions, Supabase integration, and QA/build. The production site will be deployed by the owner to their Vercel account; do not publish production through Manus.

## Design system
- **Design movement:** contemporary creator-culture editorial, mixing campaign-scale portrait/video imagery with the clarity of a modern archive.
- **Core principles:** (1) content is the identity, not decorative effects; (2) editorial contrast and asymmetry; (3) unmistakable but restrained red accents; (4) accessible, fast, touch-first controls.
- **Color philosophy:** charcoal `#111114` and graphite `#202024` establish a cinematic frame; warm white `#F5F3EF` keeps type human and legible; concrete `#99958F` supports metadata; vermilion `#C54432` provides deliberate energy; warm gold `#D5A13C` appears only if a real source image warrants it.
- **Layout paradigm:** long-form, left/right offset editorial story on the Hub; compact utility-led archive with a clear featured entry on Vault; narrow, practical form column on Submit. Avoid repetitive centered-card grids.
- **Signature elements:** a vermilion index/section marker; strong vertical rules and oversized condensed display numerals; video-thumbnail frames with restrained corner/caption treatment.
- **Interaction philosophy:** users stay in control—menu opens clearly, filter changes immediately, cards link directly to source, and form success only follows a real database acknowledgement.
- **Animation:** short opacity/translate reveals on selected Hub sections via Intersection Observer, brief hover/focus thumbnail crop, and a purposeful navigation overlay. No scroll hijacking or autoplay; respect `prefers-reduced-motion`.
- **Typography:** Barlow Condensed for display headings paired with DM Sans for interface/body copy; use tight, legible line breaks and a clear scale hierarchy.
- **Brand essence:** an unofficial editorial fan archive for viewers who follow CarryMinati’s many creator modes; **expressive, sharp, communal**.
- **Brand voice:** concise labels and source-aware descriptions; never imitate CarryMinati or imply official operation. Example lines: “Roasts, rooms, and live moments.” / “Find the original. Keep the context.”
- **Wordmark & logo:** use a typographic “CARRY / ARCHIVE” lockup and a small index-bar motif, clearly labelled as an independent fan project rather than an official logo.
- **Signature brand color:** vermilion `#C54432`, used as an editorial marker rather than an all-over glow.

## Application architecture and files
- `src/data/videos.ts`: curated records (verified title, channel, category, original URL/video ID, thumbnail URL, collaborators only when verified, and source notes).
- `src/pages/Hub.tsx`, `Vault.tsx`, `Submit.tsx`: page-level composition for the three routes.
- `src/components/`: shared navigation overlay, archive/video cards, feature sections, audio control (genuine local asset only), and conditional submission form.
- `src/lib/supabase.ts`, `src/lib/submissions.ts`: browser-safe Supabase client and normalized per-type insert mapping; no service-role credential or fake persistence.
- `supabase/migrations/`: additive `public.fan_submissions` schema, RLS and minimum anonymous INSERT privileges.
- `public/manus-routes.json`: explicit route manifest; `vercel.json`: static SPA rewrite for direct route refresh.
- Root documentation/config: `README.md`, `.env.example`, `.gitignore`, `package.json`, `vite.config.ts`, `tailwind.config.js`, `app.config.ts`.

## Backend and delivery constraints
Use the owner-authorized Supabase account only. Select an existing project; never create another project or silently substitute storage. The table captures display name, contribution type, optional title/message/content URL, generated timestamp/id, and database-owned `pending` status. RLS grants anonymous visitors only constrained INSERT, without SELECT/UPDATE/DELETE. The app reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from local/Vercel env configuration, omits privileged fields, and reports success only on a successful insert response. A real preview insertion and authorized record inspection can verify Supabase persistence; actual Vercel deployment and deployed submission remain the owner’s step. No genuine, licensed CarryMinati voice clip is in the workspace, so audio is an honest non-playing fallback until supplied.
