# Macro Studio v2 — QA report

This report covers tests executed on the generated source, rather than unverified claims about real iPhone Safari.

- JavaScript source syntax checked with `node --check`.
- 75 interactive Playwright/Chromium browser assertions passed following fixes to choice/picker event bindings and direct numeric entry precision.
- Onboarding was completed end-to-end: welcome, DOB, sex-equation input, height, exact weight, activity, typical steps, training, weight history, goal, goal weight, pace, macros, optional name and completion.
- Daily calorie/macros/step check-in saved; optional diary food saved; Strategy and Settings navigated; light and dark themes toggled; age-16 weight-loss selection disabled; responsive checks at 320, 360, 375, 390, 430, 768 and 1200px found no horizontal document overflow.
- A separate 28-day simulated adult dataset produced a calibrated estimate and generated a reviewed, capped weekly recommendation; approval stored the new target. The estimated balance chart also rendered without JavaScript page errors.
- Corrected an initial event-binding mismatch, wheel/keypad precision overwrite, a stretched dashboard badge, false zero display for missing values, and 7-day bars that were not filling their tracks. All were retested after correction.
- Both a full set of navigation tests and a synthetic dataset are intentionally separated from end-user records.

## Known limitations and required on-device checks

- Tests were executed with Chromium emulation, not physical iPhone Safari. Browser harness restrictions blocked direct test navigation to localhost or file URLs, so the same self-contained production HTML was rendered into a browser document for interaction testing, with simulated localStorage for persistence checks.
- Cloudflare Pages, user account syncing, actual HealthKit access, and any real nutritional database were **not** deployed/verified. Macro does not claim these capabilities.
- The calorie model is a conservative heuristic using published equation inputs and weight trend; there is no guarantee of accurate individualized maintenance.
- Before replacing an existing site, export its JSON backup. Test first launch, selectors, local persistence after a real Safari close/relaunch, and backup import on the actual phone.
