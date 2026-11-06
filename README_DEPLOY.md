# Macro Studio v2 — Installation and safe updates

Macro is a static, self-contained iPhone-first calorie planning web app. This package has no AI, tracking services, or API keys. It is not affiliated with MacroFactor. The layout is original, inspired by the user's visual references.

## Important: protect your existing data

Before updating your old Macro/Metria site, open **More / Settings → Download complete backup** (or Export JSON) and save the JSON privately to **Files**. Browser storage does **not** automatically migrate between domains, even when both domains show the same application. Do not clear Safari data or uninstall the original site until the new installation has your records.

On the first launch, choose **Import a backup file** to restore the JSON, or **Restore previous device data** when migrating from an older version on the **same website origin**. Legacy imports automatically preserve the previous storage key; they are not destructive to the original records. Review the converted date of birth and activity level because older versions sometimes stored age rather than a full birth date.

## Cloudflare Pages with existing GitHub repository (recommended)

1. Back up your existing Macro data.
2. Upload the six production files from this folder into the **root** of your GitHub repo `venom-king1/metria-app`, replacing old files of the same names: `index.html`, `manifest.webmanifest`, `sw.js`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`. GitHub's web uploader may reject exact duplicates; use GitHub's editor for `index.html` or delete + commit the old file before uploading the replacement. No server-side code is needed.
3. In Cloudflare **Workers & Pages**, create a **Pages** project, choose **Connect to Git**, select `venom-king1/metria-app`, production branch `main`, no framework preset, build command `exit 0` (or blank for no build), and output directory `.`. If you already connected a Cloudflare Pages project to this repository, pushing to `main` should trigger an update; do not create a second project unnecessarily.
4. Open the actual `*.pages.dev` address from Cloudflare's successful deployment details. The old `macrotracker.se` address will not work until you register that domain and configure DNS.
5. In iPhone Safari open that `pages.dev` link → Share → **Add to Home Screen** → choose **Open as Web App** if offered → Add. Home Screen widgets, Apple HealthKit and automatic iCloud sync are not provided by this static site.

GitHub Pages also works if its service is publishing successfully. The production website must serve `index.html` from the repository root.

## Storage, calculations and limitations

- All user records are saved in this browser's `localStorage` under `macro.studio.v2`. JSON export and CSV export/import are included. A browser data reset can delete local logs.
- Birth date / sex-based energy-equation input, height, weight and overall activity are collected in onboarding. Adults 19+ start with Mifflin–St Jeor resting-energy prediction × assumed activity. Ages 16–18 use the 2005 DRI estimated-energy-requirement equations, with automatic weight-loss/gain prescriptions disabled.
- After enough complete calorie logs and weigh-ins over an aligned 14–28-day period, the calculator blends an observed trend estimate with its formula prior, limiting the magnitude of weekly changes. Water, menstrual cycle, medication changes, diet transitions, incomplete food logging and other factors can make the estimate inaccurate. No algorithm in the app measures actual metabolism or body fat.
- The application does **not** read Apple Health directly: ordinary web pages cannot access iOS HealthKit. Real Health integration requires an iOS app/bridge or explicit exports. No external AI service or barcode nutrition database is included.
- The **Food diary** is optional and does not automatically modify daily calculator inputs. A user may explicitly copy the food totals to a day and then mark the day complete.

## Sources

- Mifflin et al. (1990), [original resting energy expenditure equation](https://pubmed.ncbi.nlm.nih.gov/2305711/).
- Health Canada, [DRI estimated energy requirements for 9–18-year-olds](https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/reference-guide-understanding-using-data-2015.html).
- [Cloudflare Pages static HTML deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

**No warranty of exact calorie targets or error-free operation is made.** These are estimates to be reviewed with longer-term data and, where appropriate, qualified care professionals.
