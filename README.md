# Macro — iPhone adaptive calorie planner

This package replaces the previous Metria web app with **Macro**, a white/dark-grey, calculator-first web app. No AI keys, AI meal estimates, or fake cloud sign-in are included. The app works as a local-profile website on GitHub Pages. No external scripts, fonts, CDNs or API calls are necessary for the app.

## What's in the ZIP

Upload these SIX files to the root of your existing repository:

- `index.html` — **the complete app** (styles and app JavaScript included)
- `manifest.webmanifest` — Home Screen web app metadata
- `sw.js` — network-first offline cache
- `apple-touch-icon.png` — 180×180 Home Screen icon
- `icon-192.png`
- `icon-512.png`

`index.html` alone contains the core app, but for the Home Screen name/icon and offline experience to be updated, upload all six.

## Safely update on an iPhone

1. **Before changing the site**, open the existing Metria website/Home Screen app -> Settings -> export a **JSON backup** to Files. Retain this file privately. Safari's website storage and the Home Screen app's storage may not always be shared.
2. Download the Macro ZIP from ChatGPT and extract it in the iPhone **Files** app.
3. Open https://github.com/venom-king1/metria-app signed in as `venom-king1`.
4. Commit the six files into repository **root** on branch `main`. GitHub's browser uploader may refuse overwriting an existing path. To replace an existing file, open it in the GitHub UI and use the edit interface, or delete the old file and commit before uploading the replacement. Keep a copy of the original in Git history, and don't delete the repository or disable Pages.
5. GitHub Pages should deploy automatically if it was configured as **Deploy from a branch -> main -> /(root)**. Check the repository **Actions** tab for the build.
6. Open https://venom-king1.github.io/metria-app/ in **Safari**. The URL remains unchanged even though the app is now named Macro. Safari -> Share -> **Add to Home Screen** -> **Open as Web App** (when available) -> Add.
7. Close and reopen the app if the old version is cached. The new service worker replaces older Metria caches without clearing personal data. **Do not clear Safari website data without exporting a backup first.**

### If GitHub upload fails on iPhone

For `index.html`: delete the old file via its GitHub file menu, commit the deletion, then upload the new **index.html** to the repository root and commit. Repeat only for duplicate filenames. Git history retains previous commits for rollback. Avoid uploading the ZIP itself as the website; upload the extracted files.

## Starting Macro

- Tap **Get started**. The visible scroll-wheel pickers can be scrolled or tapped. They also have a numeric keypad and +/- buttons. Age supports **16–100**; weight can be entered to **0.1 kg** with the keypad.
- Choose a sex-based **energy equation input** or choose **Prefer not to specify** and provide a personal maintenance estimate in step five. This is an equation coefficient input, not an assertion about gender identity.
- Finish six onboarding screens, then use **Log daily totals** to record complete day calories, protein, carbs, fat and steps. You can log steps independently, and morning weights independently.
- The five tabs are Overview / Trends / Plan / Diary / Settings. The Diary is an optional independent manual food notebook. It does **not** replace daily intake totals.
- Settings has System / Light / Dark, profile editing, calorie plan, macro factors, JSON/CSV export and import, and local reset. There is **no cloud account** or remote synchronization in this version.

## What happens to previous Metria data?

Macro uses a new storage key `macro.planner.v1` and **does not remove** the old keys `metria.adaptive.v1` and `metria.app.v1`. If earlier personal data exists in the *same website storage container*, the Welcome screen offers **Import previous Metria data**. It supports previous v6 storage and some older personal v5 records. A previous **v6 JSON backup** can also be restored using **Restore a backup**. Always review imported data for completeness. The old data is left intact.

If the old app was installed separately and has a different storage container, use an exported backup to move records. A new GitHub deployment does not itself transfer records between isolated Safari and PWA storage containers.

## Calorie-estimation methodology and safeguards

- **Ages 16–18:** 2023 U.S. National Academies EER equations for ages 14–18, with the adolescent growth allowance. The app shows a maintenance *estimate*, not a medically prescribed calorie goal. It does not generate weight-cutting or weight-gaining calorie prescriptions and does not interpret BMI using adult thresholds. Youth weight changes should be discussed with a healthcare professional.
- **Ages 19+:** Mifflin–St Jeor estimated resting metabolism × stated activity factor to form an initial maintenance guess. Optional manual estimate override.
- **Adult trend refinement only:** At least eight weigh-ins spanning at least 14 days and 11 *completed* intake days with at least 75% coverage, recent data and plausible weight/energy trends. A rough 7,700 kcal/kg relation is used as a noisy energy-balance heuristic, **not** exact physiology. Estimates blend conservatively with the starting estimate.
- **Steps:** 7-/30-day averages quantify coverage and changes in activity. Steps are not converted into fabricated burn. If sufficient steps data shows a >25% shift in recent activity, new adjustment recommendations pause.
- **Goals:** Adult weekly weight-rate plans are indicative only, with conservative deficit/surplus limits, BMI safeguard for cutting, and optional target date. Weekly calorie changes are limited to 100 kcal per approval and never applied automatically. No equation or log can provide an exact personal maintenance requirement.

Primary references: [2023 Dietary Reference Intakes for Energy](https://www.nationalacademies.org/read/26818/chapter/7); [CDC child and teen BMI guidance](https://www.cdc.gov/bmi/child-teen-calculator/).

## Privacy and limits

Records are stored locally using browser localStorage; clearing site data can delete them. Export JSON backups regularly and keep them private. This is not a medical device. There is no AI, account login, Apple Health integration, or barcode lookup. Those features require separate implementation and testing. Scrolling/interaction QA uses Chromium emulation, not a physical iPhone. `index.html` opened from the iPhone Files preview may display without reliable JavaScript or storage — use the hosted HTTPS GitHub Pages URL in Safari.
