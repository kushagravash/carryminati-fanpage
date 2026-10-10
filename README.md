# Carry Archive — CarryMinati Creator Universe

An independent, source-linked fan archive for public CarryMinati and CarryisLive videos. This project is **not affiliated with, operated by, or endorsed by CarryMinati or his team**. It does not rehost videos. Every archive card opens the original YouTube upload.

## Pages

- `/` — **The Hub**: a cinematic editorial story across comedy, creator group appearances, CarryisLive and music.
- `/vault` — **Stream Vault**: curated video links, responsive cards, search, and URL-addressable category filters.
- `/submit` — **Fan Submit**: conditional contribution form for a meme, roast idea, fan message or other submission. The form writes to the project owner's Supabase database only after the user submits; submissions remain private and pending for review.

## Stack and commands

React 18 + TypeScript, Vite 6, React Router, Tailwind CSS 3, Lucide icons and the official `@supabase/supabase-js` client. The lockfile is checked in.

```sh
npm ci
cp .env.example .env.local
# Edit .env.local with your Supabase Project URL and Publishable key
npm run dev
```

The Vite development server uses port `3000`. Make a static production build with `npm run build`; the output directory is `dist/`. `npm run preview` serves that output locally. No Manus-managed backend or database is required.

## Supabase setup

Both additive migrations were applied to the **existing owner-authorized Supabase project** for this preview. For another owner-controlled project or environment:

1. In Supabase, open **Dashboard → SQL Editor → New query**.
2. Run every `.sql` file in `supabase/migrations/` in chronological filename order. First run [`20261009214500_create_fan_submissions.sql`](supabase/migrations/20261009214500_create_fan_submissions.sql) to create `public.fan_submissions`, indexes, RLS and minimal column-scoped anonymous `INSERT`; then run [`20261009220000_tighten_fan_submission_validation.sql`](supabase/migrations/20261009220000_tighten_fan_submission_validation.sql) to require nonblank messages and prevent title/URL fields from crossing contribution types. Both migrations are additive and preserve rows. Neither grants public `SELECT`, `UPDATE` or `DELETE`.
3. In **Project Settings → API**, copy the **Project URL** and **Publishable key** (`sb_publishable_…`). Put these into `.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, and set the same two names in Vercel for Preview and Production.
4. Restart the Vite server after changing local environment values. Submit a clearly identified test entry if needed, confirm it appears in **Table Editor → `fan_submissions`**, then remove only that test entry. Do not make the anon role publicly readable as a shortcut.

The publishable key is designed for the browser and is not an administrative secret. **Never put a Supabase service-role key, database password or other privileged key in `VITE_*`, the repo, or browser code.** The form does not select or return a newly inserted row. The database assigns `id`, `created_at` and the default `status='pending'`; the browser cannot set `status`. Review/manage submissions in the authorized Supabase Dashboard; visitors cannot read other submissions.

The form applies client-side type/length/URL/consent checks and includes a honeypot and duplicate-submit protection. These are basic spam controls, not a promise of bot-proofing or rate limiting. Visitor display names and contributions are stored in the table. The UI explicitly requests consent and warns against personal information, harassment and unlawful content. It does not collect email, phone, address, date of birth, or account credentials.

## Vercel deployment (owner-controlled)

Production deployment has **not** been performed from this project. To deploy under your own Vercel account:

1. Put the exported source in a repo or import the extracted directory in Vercel.
2. Select the Vite preset (or set **Build Command** `npm run build` and **Output Directory** `dist`). Use `npm ci` as the install command.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to the Vercel project environment for Preview and Production. These two values are intentionally browser-visible; add no service-role/database credential.
4. Deploy to your own Vercel project. `vercel.json` rewrites application routes to `index.html`, so `/vault` and `/submit` also work on direct refresh. Test category filtering and the submission form on the deployed preview before promoting it to production.

Do not publish the project via Manus if you intend to use your own Vercel deployment.

## Content, assets and audio

See [`CONTENT_SOURCES.md`](CONTENT_SOURCES.md) for all 26 distinct official video sources. Video thumbnails are fetched from YouTube's thumbnail host and each card links to its specific original upload. If a thumbnail fails, the card falls back to the channel and verified title. No view counts, engagement stats or unverified individual collaboration credits are asserted. The Hub hero now uses the official `MR BEAST PARODY 🤑 Ft. INDIAN CREATORS | CARRYMINATI` thumbnail, with a responsive crop and fallback.

Fonts use Barlow Condensed and DM Sans with system fallbacks. The Hub includes the brief `Toh kaise hai aap log?` clip supplied in the website-update bundle, converted to MP3 at `public/audio/carryminati-intro.mp3`; the default browser path works without another environment variable. Playback begins only after a visitor activates the play control, supports pause, and reports loading, failure and ended states. The site does not synthesize, clone or autoplay speech. The clip was supplied by the project owner; confirm that you have permission to include it in a public deployment. To replace it with another authorized same-site file, set `VITE_SIGNATURE_AUDIO_SRC` to its root-relative public path. If that value is invalid, the control offers an official-channel fallback.

## Project files

- `src/data/videos.ts` — centralized 26-entry official-video archive dataset, verification notes and original links.
- `public/audio/carryminati-intro.mp3` — short user-supplied clip used by the opt-in Hub audio control.
- `src/pages/` — route-level Hub, Vault and Submit UI.
- `src/components/` — shared navigation, card, reveal, audio and footer components.
- `src/lib/` — route metadata, Supabase client and submission insert mapper.
- `public/manus-routes.json` — three-page route manifest.
- `supabase/migrations/` — reproducible additive SQL setup.
- `vercel.json` — SPA route rewrite.
- `plan.md`, `TODO.md` — design/implementation plan and deliverable checklist.

## Verification status

The TypeScript/Vite production build passes. All 26 archive IDs resolve to the expected official uploader, their displayed titles match YouTube metadata, and all 26 thumbnail URLs return HTTP 200. `GET /`, `/vault`, `/submit`, `/manus-routes.json` and `/audio/carryminati-intro.mp3` return HTTP 200 on the preview. The preview showed four music entries, three collaborations, and a `WARRIOR` search result; mobile screenshots show one-column archive cards and the tablet breakpoint shows two columns. The Hub's user-supplied MP3 played to its 1.63-second end only after a visitor click; the button returned to idle. No browser-console messages or desktop horizontal overflow were observed. No production site has been deployed.

### Separate Supabase security-advisor note

The live Security Advisor currently reports two `WARN` findings for the existing function `public.rls_auto_enable()`: the `anon` role and the `authenticated` role can call it through `/rest/v1/rpc/rls_auto_enable` while it runs as `SECURITY DEFINER`. The function is outside these site migrations and was not created or changed here; revoking it could break another project feature. Before production, confirm whether those roles should be able to call it. If that access is not intentional, review the official [anon-function remediation (0028)](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [authenticated-function remediation (0029)](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable), and [Supabase function security guidance](https://supabase.com/docs/guides/database/functions). Do not change the existing function until its intended callers are understood.
