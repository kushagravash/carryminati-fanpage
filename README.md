# 🎬 Carry Archive — CarryMinati Creator Universe

Carry Archive is an independent fan-made archive of the many sides of **CarryMinati (Ajey Nagar)**—comedy and roasts, creator collaborations, gaming, music, and the moments where those worlds meet. It connects visitors to selected original uploads rather than rehosting videos.

**🌐 Live Website:** [carryminati-fanpage.vercel.app](https://carryminati-fanpage.vercel.app)

> An independent fan project—not affiliated with or endorsed by CarryMinati or his team.

Explore the [CarryMinati channel](https://www.youtube.com/@CarryMinati), [CarryisLive](https://www.youtube.com/@CarryisLive), or [official link hub](https://linktr.ee/ajeynagar).

## ✨ Explore the Archive

- **🏠 The Hub (`/`)** — An editorial, scroll-led introduction to CarryMinati’s comedy, shared creator scenes, CarryisLive and music. A signature-audio button plays the brief supplied line only when a visitor taps **Play**; it can be paused and never autoplays.
- **🎞️ Stream Vault (`/vault`)** — **26 distinct source-linked uploads** across roasts and sketches, collaborations and group appearances, gaming, and music. Browse by category, search titles and descriptions, and open each original YouTube video.
- **💬 Fan Submit (`/submit`)** — Share a meme, roast idea, fan message, or other contribution. Fields change by contribution type; the form validates required text, URLs and consent before sending. Submissions are stored in the project owner’s Supabase inbox for review—not published automatically.

## 🎨 Design Philosophy

The site pairs cinematic creator imagery and bold editorial type with an archive-first layout. Its charcoal, warm-paper and vermilion palette lets authentic source thumbnails carry the color. Collaboration and group moments have a place alongside solo work, while filters, source links and the submission form serve a clear purpose rather than adding interface noise.

## 🧰 Built With

React 18 · TypeScript · Vite 6 · Tailwind CSS 3 · React Router · Lucide · Supabase JavaScript client

## ⚙️ Run Locally

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Before using the submission backend, add your own Supabase **Project URL** and **Publishable key** to `.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. These browser-facing values are expected in client code; **never** use a service-role key, database password, or other privileged secret in `VITE_*` variables or the repository.

Create a production build with `npm run build`; Vite writes it to `dist/`. Use `npm run preview` to serve that build locally.

## 🗄️ Supabase Setup

In the **existing Supabase project you intend this site to use**, open **Dashboard → SQL Editor** and run the migrations in filename order:

1. [`20261009214500_create_fan_submissions.sql`](supabase/migrations/20261009214500_create_fan_submissions.sql) creates `public.fan_submissions` and its initial validation and access policy.
2. [`20261009220000_tighten_fan_submission_validation.sql`](supabase/migrations/20261009220000_tighten_fan_submission_validation.sql) adds stricter nonblank and type-specific payload checks.

Both migrations are additive. Row-level security gives anonymous visitors constrained **INSERT only**; the database assigns each record a `pending` status, and visitors cannot read, update, or delete submissions. The owner reviews the inbox in Supabase. Basic honeypot and duplicate-submit protections are included, but they are not a guarantee against spam. The form collects a display name and contribution—not email, phone, address, or account credentials—and asks visitors not to send private personal information.

## 🚀 Deployment

Import the source into your Vercel project with `npm ci` as the install command, `npm run build` as the build command, and `dist/` as the output directory. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel for the environments you use. [`vercel.json`](vercel.json) rewrites page paths to the app shell for direct route refreshes.

The supplied live URL responded successfully when checked, but its **production Supabase form/backend has not been independently verified**. The preview form was tested against the owner-authorized Supabase project; its marked test record was removed afterward. Deployment and environment configuration remain under the site owner’s control.

## 📂 Project Structure

```text
src/data/videos.ts                   verified video catalogue and source links
src/pages/                            Hub, Vault and Fan Submit routes
src/components/                       navigation, cards, reveals, audio and footer
src/lib/                              Supabase client and submission mapping
public/audio/carryminati-intro.mp3    supplied click-to-play audio asset
supabase/migrations/                  additive submission-table setup
.env.example                          browser-safe configuration template
vercel.json                           SPA route rewrite
```

## 🔎 Maintainer Notes

- **Audio rights:** the brief clip in `public/audio/carryminati-intro.mp3` was supplied with the project update. Confirm permission for public distribution before deploying it. It does not autoplay or use generated/imitated speech. `VITE_SIGNATURE_AUDIO_SRC` is an optional override for another authorized, same-site audio file.
- **Existing Supabase warnings:** the project’s Security Advisor reported that the separate `public.rls_auto_enable()` function runs as `SECURITY DEFINER` and is callable by `anon` and `authenticated`. This function is outside the site migrations and was left unchanged because it may serve other project features. Review its intended access before production: [anon finding 0028](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [authenticated finding 0029](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable), and [Supabase function security guidance](https://supabase.com/docs/guides/database/functions).
