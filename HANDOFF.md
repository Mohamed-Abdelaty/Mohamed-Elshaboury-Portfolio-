# Implementation handoff

## Delivered

Single-page React / TypeScript / Vite portfolio: sticky active navigation and mobile menu; hero and documented credibility strip; four featured projects with native accessible case-study dialogs and image enlargement; about; six skill groups; four accurately distinguished experience entries; E-JUST education; four text-only training credentials; community recognition; language levels; exact owner contact channels; current-year footer. Local favicon, generated 1200Ã—630 social graphic, descriptive SEO and robots file are included. No backend, external fonts or runtime service dependencies.

## Evidence inventory

| Content | Source | Treatment |
| --- | --- | --- |
| Identity, skills, counts, experience, education | `../PORTFOLIO_CONTENT.md` | Approved copy condensed without changing claims. Academic work explicitly labeled. |
| CareFlow IDS | Private `CareFlow-IDS.txt` and supplied dashboard | Kafka/Spark/HDFS pipeline; leakage remediation; held-out evaluation context; raw ingestion count. Dashboard and dossier clean-count discrepancy disclosed. |
| Elshaboury Events | Private `Elshaboury-Events-Platform.txt` and supplied home image | Venue escrow, scoped access, QR ticketing, Express/MySQL/Flask architecture. Feature-vector descriptions kept distinct. No claimed prediction accuracy. |
| CSIT Timetable Engine | Private `CSIT Timetable.txt` and supplied overview image | MRV, forward checking, cohort decomposition, documented 1.47s run. Zero-conflict claim explicitly restricted to intra-cohort checks. |
| CarAgencies | Private `Car-Rental.txt` and supplied screenshot | ASP.NET Core, EF Core, Identity, ownership checks and rental state. Public screenshot derivative hides account/contact details; seed amounts not presented as revenue. |
| Training | Approved content and supplied private certificates | Text-only cards; no original documents published. 97% is a training score. |
| Recognition | Approved copy and source credentials | NASA hackathon participation and independently organized TEDx event contribution. |

Repository URLs for all four projects and the owner GitHub profile returned successfully during web verification on November 23, 2026. LinkedIn rejected automated access (999); its exact owner-confirmed URL is retained, with manual release verification outstanding. Udemy's owner-supplied verification link could not be fetched; no unverified verification button is rendered. Email is the exact supplied mailto address; delivery was not tested by sending mail.

## Optional items / release follow-up

- No approved public-safe rÃ©sumÃ© PDF was supplied. The download CTA is omitted.
- No operational live demo URLs were supplied. No demo buttons are shown.
- No deployed domain is known. Add the actual canonical and absolute social-preview URL after a domain is assigned; test social sharing against that URL.
- No profile photo was supplied. The hero uses an authored CSS illustration.
- No dedicated ChaosFlow dossier was supplied; it appears only as academic experience, without a fabricated fifth case study.
- Some supplied assets have image-generation-style filenames. Those ambiguous files were excluded; only reviewed, clearly named project images are used. Their images serve as supplied interface previews, not independent runtime or performance evidence.
- Original CVs and credentials remain private. This implementation makes no claim that those originals are redacted.

## Deployment

No repository push, upload, registration or deployment was performed. See `README.md` for exact Vercel settings: Vite, `npm ci`, `npm run build`, `dist`, no environment variables, no rewrites. Publish only the reviewed `website/` source tree. Review the supplied deployment guide for the hosting plan's personal/commercial-use distinction.

## Validation

- `npm run build`: passed; Vite generated `dist/` with 29 transformed modules. Main JS is approximately 244 KB / 76.5 KB gzip; CSS approximately 15.7 KB / 4.3 KB gzip.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: all four integrity checks passed. These check supplied links, evaluation caveats, basic accessibility structure and private-file exclusion; they are not browser interaction tests.
- `npm audit`: zero reported vulnerabilities, including development dependencies, after updating Sharp to 0.35.5.
- Local Vite development preview: HTTP 200.
- Production preview: all 14 output files returned HTTP 200 with matching byte sizes.
- Public output reviewed: four optimized previews at two resolutions, authored social PNG, favicon, robots, HTML and compiled JS/CSS. No original PDFs, student identifiers, private text, source-material paths or source maps. The CarAgencies public derivative was visually inspected after masking. Sharp strips source metadata by default.
- CV and all supplied credential PDFs were rendered locally and visually reviewed; TEDx JPEG reviewed. PDF text extraction has an incorrect hidden date layer in the Big Data certificate; the visible date agrees with the approved copy (September 3). Public copy uses month-level dates. No source originals were changed or published.
- The website now has a dedicated Git repository connected to the owner-supplied GitHub repository. The initial remote history contained only README.md. The upload repair prepares all reviewed website files in a local commit. Private source material remains outside this repository; dependencies, Python environment, QA files, build output and environment files are ignored.
- **Unverified:** actual phone/tablet/desktop rendering, browser console, keyboard traversal, active navigation and dialog/image interactions. The connected computer-use tool returned no browsers and no native apps. CSS includes 320px/mobile/tablet/desktop rules and native dialog semantics, but these have not been validated in a rendered browser. Complete this manual release check before publishing.

### Manual browser release check

1. Run `npm run dev`, inspect at 320px, 768px and 1440px, and confirm no horizontal page overflow or clipped controls.
2. Tab through navigation and all project controls; open each case study, enlarge/reduce its image, press Escape, and confirm focus returns to the trigger. Confirm menu opening/closing, section offsets and active states.
3. Check the browser console and network panel, reduced-motion mode, exact email/GitHub/LinkedIn links, and the actual production social preview after setting the domain.


## Git upload repair

The README was rewritten as valid UTF-8 Markdown after mixed UTF-8/UTF-16 content introduced NUL bytes. All website source files and reviewed public assets are included in the repair commit. This repository's Vercel root is ./ because package.json is at the repository root. A GitHub repository page shows documentation; the website runs locally through Vite or on a hosting deployment.
