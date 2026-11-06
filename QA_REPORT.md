# Macro v1: verification record

- **58/58 automated Chromium interaction and calculation checks passed.** No JavaScript page errors in that run.
- Six viewport widths tested for horizontal overflow: 320, 375, 393, 430, 768, 1440 px.
- Tested: welcome, name typing, age 16, visible inline wheel click, weight numeric precision to 0.1 kg, six-step onboarding, teenage cutting safeguard, daily calories/macros, independent steps, weight recording, all five tab navigation actions, System/Light/Dark toggles, profile editing, persistence with a new page and seeded local storage, optional diary create/edit/delete/undo/favorites, goal preferences and macro factors.
- Verified adult (age 25) starting formula estimate and a 21-day sample trend, recommendation requiring approval, max 100 kcal per approval, and suppression of immediate repeated approval. Verified previous Metria v6 personal data conversion and retention of previous source storage.
- Actual Chromium screenshots made for first launch, visible wheel, overview and Settings. No real iPhone hardware or Safari remote-debug tests performed.
- **Testing environment limitation:** local navigation is restricted, so page content was loaded into Chromium through `set_content`; local storage in tests used an injected in-memory implementation. This verifies app logic and rendering, not actual Safari/PWA storage durability. Backend/cloud auth is absent by design. GitHub Pages deployment is not yet verified for this version.
- The energy equations are predictive estimates, not validated individual maintenance measurements. For ages 16–18 the app uses NASEM 2023 adolescent EER and does not generate cutting or gaining targets. Adult trend inference can still be unreliable if logging is incomplete or weight fluctuations are pronounced.
