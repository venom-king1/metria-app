# Metria Adaptive v6 — iPhone / GitHub Pages

## What it does
Metria is a **calorie-maintenance calculator**, not a mandatory food diary. Daily energy/macros/steps are recorded directly from Overview. The optional Food Diary is fully separate and never updates the calibrated calorie engine.

Features: welcome + guest and optional login; 6-stage onboarding; System/Light/Dark; numeric wheel + keypad; goal and target date; weight charts; weekly/monthly steps; at least 14 days to calibrate; human-approved weekly adjustment recommendations and deliberate manual target changes; JSON export/import and CSV import/export; offline food phrase estimation, editable meals, favorites and recipes; EAN/UPC lookup when network is available; optional Supabase Auth + cloud snapshot sync (not preconfigured); PWA icons and service worker.

## Update your existing GitHub Pages repository
1. **Back up your existing Metria first** via its Settings → Export JSON. Keep the backup private. Save screenshots if you need an additional record.
2. Extract the ZIP locally.
3. Go to your existing repo https://github.com/venom-king1/metria-app on Safari (signed in). Upload `index.html`, `sw.js`, `manifest.webmanifest`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` **to repository root**. Replace existing files, don't upload them inside a subfolder. GitHub's mobile uploader may refuse a duplicate `index.html`; replace its contents using the GitHub file editor or remove and recommit the old file before uploading the new file.
4. Commit to `main`; let GitHub Pages deploy. Existing Pages should remain configured to **Deploy from a branch → main → /(root)**.
5. Open https://venom-king1.github.io/metria-app/ in Safari. If an old service worker is cached, refresh/reopen, or inspect Safari > Settings > Advanced > Website Data as a last resort **only after exporting backups**. Never clear site data casually.
6. Safari Share → Add to Home Screen → Open as Web App (when offered) → Add.

### Prior data / preservation
- This version stores data under **`metria.adaptive.v1`**, intentionally leaving the old **`metria.app.v1`** untouched.
- On first launch choose **Import previous Metria device data** if that storage still exists in the *same browser/site context*. Existing old diary-based calorie totals are migrated to daily totals (marked for verification); original source remains untouched. If you want a clean start, choose guest and follow onboarding.
- Safari and Home Screen PWA may have different storage containers. Export/import backups explicitly to transfer between them. Do not assume automatic sharing.
- The old JSON backup is **not** automatically accepted as a v6 backup. Use the old-storage migration on the same origin, or export old data and keep it as an archival backup.

## Using the planner accurately
- At setup, Mifflin–St Jeor *predicts* resting energy for adults. A user-selected activity factor estimates maintenance. A custom override is optional.
- After at least 8 weigh-ins spanning ≥13 days and ≥11 completed intake records within that same span (≥72% coverage), if records are recent and observed maintenance is plausible, the estimator blends baseline and observed intake-weight trend.
- A roughly 7,700 kcal per kg relationship is **not a precise metabolic model**. Unlogged meals, inconsistent weigh-ins, scale swings, and activity changes can mislead. Weekly adjustment suggestions are capped at ±150 kcal per approval, must be meaningful and require a user action. If the latest seven-day step average differs by more than 25% from the preceding weeks (with sufficient data), the app suspends automatic review suggestions while activity is unstable. The app does **not** automatically prescribe a new calorie target every day.
- Track 7- and 30-day step averages to assess activity stability; do not add step calories to activity-factor estimates.
- Cutting has conservative BMI / minimum-target guards. These are not medical judgments.
- Goal rates and dates are planning preferences, not guarantees. Do not use estimates for medical or eating-disorder treatment.

## Optional real account + cloud sync: NOT TURNED ON by default
1. Create your own Supabase project at https://supabase.com/.
2. In its **SQL Editor**, run `supabase_schema.sql` to create a user-scoped snapshot table and four restrictive RLS policies.
3. Configure Authentication → URL Configuration: Site URL `https://venom-king1.github.io/metria-app/`, Redirect URLs include that exact URL. Enable email/OTP in Supabase Auth; configure SMTP as needed for real email delivery.
4. To use Sign in with Apple, separately configure an Apple Developer Services ID, domain, callback and the Apple provider in Supabase. Apple's provider setup has external prerequisites; no Apple login has been verified until completed.
5. In Metria → Settings → Cloud connection, enter your **Supabase project URL** and **publishable / anon API key**. This key is intended to be public, but must never be the `service_role` or secret key. The app imports the Supabase client library only when configured and online.
6. Use the account menu to send a one-time email sign-in link, or Apple sign-in after enabling the provider.
7. Upload a cloud snapshot explicitly via Settings → Cloud sync → Upload. An authenticated user can also delete their cloud snapshot from Settings; this does not delete their Supabase Auth account. Restore is an explicit destructive replacement action requiring confirmation. Optional automatic backups are last-write-wins; if you use multiple devices, first download the newer cloud backup and avoid editing offline on both devices concurrently.

Cloud data lives in `metria_snapshots`, with auth.uid() RLS. SQL must be deployed; an authenticated session alone is not enough. No Supabase project or API account is included in this ZIP. This is not a guarantee of production security; audit your RLS and deployment.

## Optional food diary
- Text estimates are based on a tiny offline food database. It is **not real AI** and cannot know exact preparation, oil, brands or sauces. Estimates require explicit review.
- Barcode lookup uses Open Food Facts *only after you request it* and requires network. The browser camera scanner is experimental and may be unavailable; manual EAN/UPC entry is the fallback. Review product labels.
- Neither the barcode database nor AI is connected to the calculator. The calculator uses only the confirmed daily totals.

## Known limits
- No direct Apple HealthKit/Watch synchronization from GitHub Pages. Apple Shortcuts/CSV import is the current bridge.
- Cloud AI nutrition inference is intentionally not enabled; do not put any private API keys in this public repo.
- Remote Supabase login, external barcode queries and Safari Home Screen behavior require real-world verification after provider setup.
- Deleting local data does not delete the cloud account; cloud-backup deletion is a separate operation. Full deletion of a Supabase Auth identity requires a secured provider-side account deletion workflow.
- LocalStorage alone is not a durable backup. Export JSON periodically.

## Sources
- Mifflin et al., 1990, adult REE equation: https://pubmed.ncbi.nlm.nih.gov/2305711/
- NIH/NIDDK Body Weight Planner: https://www.niddk.nih.gov/bwp
- Supabase Redirect URLs: https://supabase.com/docs/guides/auth/redirect-urls
- Supabase Apple sign-in: https://supabase.com/docs/guides/auth/social-sign-in/auth-apple
- Supabase row-level security: https://supabase.com/docs/guides/database/postgres/row-level-security
