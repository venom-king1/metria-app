# Metria Adaptive v6 — implementation verification

Checked on 2026-11-06.

## Passed
- `index.html` inline JavaScript syntax checked using Node.js `--check`.
- Static rendering of **all five tabs** completed in a JavaScript VM with seeded personal records; generated markup includes headings, navigation and non-orphaned action controls.
- **30 calculator and storage assertions**: welcome and local account alternatives; six-stage setup completion; initial plan; daily calorie, macro and step recording; weigh-in; prevention of silent target changes; 7/30-day steps; local persistence; rich multiweek calibration; refusal to calibrate incomplete data; low-BMI cutting guard; legacy Metria profile/diary migration without deleting old storage; offline Swedish/English meal text recognition and quantity parsing; major activity-change safeguard.
- Personal diary is separate from daily totals; optional food estimates cannot silently alter maintenance calculation.
- Data export and import code paths inspected; CSV importer handles calories, macros, steps, and weight in the same CSV.
- Supabase SQL includes row-level security, owner-only select/insert/update/delete policies, and account UID-scoped data access. Supabase credentials are not bundled in the web app.
- App manifest and service-worker files included and archive integrity verified.

## Not verified in this environment
- Browser-driven visual interaction tests and pixel-level screenshot review: local Chromium navigation returned `net::ERR_BLOCKED_BY_ADMINISTRATOR` even for basic test pages. No claim of visually pixel-perfect iPhone rendering.
- Actual iOS Safari/Home Screen installation, wheel touch physics, camera/BarcodeDetector support, Apple OAuth and email OTP, Supabase cloud sync, external barcode API, or App Store native HealthKit connectivity. These need physical/device/provider verification.
- GitHub upload: connector rejected write with HTTP 403 `Resource not accessible by integration`; manually upload files to your repository.

## Important disclaimers
- Mifflin–St Jeor is a starting adult RMR prediction. Activity factors are rough. Maintenance is calibrated only when records are sufficiently complete and plausible.
- 7,700 kcal/kg is a rough short-term energy-equivalent heuristic and does not account for dynamic metabolic adaptation. Weight changes can reflect fluid shifts.
- Offline meal parser is illustrative, not cloud AI, and cannot provide exact calories without product/recipe data. Cloud AI is intentionally not bundled or claimed to be running.
