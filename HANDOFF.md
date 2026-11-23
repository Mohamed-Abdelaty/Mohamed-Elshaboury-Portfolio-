# Portfolio handoff

Updated November 24, 2026. This document describes the current individual design, full galleries and scroll repair; it replaces historical iteration notes.

## Delivered

A static React / TypeScript / Vite portfolio with all nine requested content areas, the owner's four featured projects, seven training entries, six expandable skill groups, accurate recognition and language levels. The full legal name is Mohamed Abdelaty Mohamed Elshaboury; the public wordmark is Mohamed Elshaboury.

The current version follows the owner's latest request for an individual visual identity. It uses a work-led hero with four selectable previews, a compact ME navigation, a balanced two-column project grid, left-aligned section headings and experience cards. The earlier authorized-reference investigation remains recorded in `REFERENCE_REDESIGN.md` as historical implementation evidence.

All 37 supplied project images are available through per-project galleries. Captions distinguish interface views, heuristic examples, architecture illustration and simulated/seed states. Sensitive fields are obscured in public derivatives; original inputs remain unchanged. The old four preview pairs remain available as reviewed assets.

The mouse-wheel defect was reproduced over the old non-scrolling image container: `overscroll-behavior: contain` absorbed wheel movement while the enclosing case study remained at scrollTop 0. The case study now has one explicit scroll viewport containing its header, gallery and text. Full-size image panning uses a separate native dialog. See [GALLERY_AND_IDENTITY.md](GALLERY_AND_IDENTITY.md).

## Evidence and public treatment

| Content | Source | Treatment |
| --- | --- | --- |
| Identity, skills, counts, education and experience | `../PORTFOLIO_CONTENT.md`, existing application and supplied CV | Approved facts retained. Academic work and training are distinguished from employment. The latest owner-supplied full name and contacts take precedence. |
| CareFlow IDS | Private project dossier and supplied dashboard | Raw and cleaned flow counts retain their dataset context. Dashboard/dossier snapshot discrepancy is disclosed. Held-out F1 is an evaluation result, not a production guarantee. Heuristic scoring and microbatch ML are distinguished. |
| Elshaboury Events | Private project dossier and supplied interface | Endpoint, table and page counts preserved. The broader feature assembly and primary model vector are distinguished. Seed accounts are simulated; no unsupported prediction accuracy is claimed. |
| CSIT Timetable Engine | Private project dossier and supplied overview | MRV, forward checking and documented scheduling run preserved. Zero-conflict claim is explicitly intra-cohort; global cross-cohort conflict freedom is not established. |
| CarAgencies | Private project dossier and supplied screenshot | ASP.NET Core, EF Core, Identity and rental workflows retained. Reviewed screenshot derivative hides account/contact details. Seed amounts are not revenue. |
| Training | Approved content, supplied private credentials and CV | Seven text entries. Four have supplied training certificates; other entries are labeled CV-listed where applicable. 97% is an NTI training score. Original documents are not public. |
| Recognition | Approved copy and supplied credentials/CV | NASA participation, independently organized TEDx contribution and CV-listed ISEIC Creative Award. No winner or employment claims are inferred. |

The original CV and supplied credential PDFs were rendered privately and visually reviewed. The Big Data certificate's hidden text layer has an incorrect date; its visible date agrees with September 3 in the approved content. Public dates follow the confirmed visible information. Source originals were not altered.

All four existing project repository URLs and the owner GitHub profile were previously verified during this work. LinkedIn rejected automated fetching; the exact owner-supplied URL is retained. Email is a functional mailto link; no test email was sent. An inaccessible Udemy verification URL is omitted rather than represented as verified.

## Privacy and assets

Only the reviewed WebP project derivatives/thumbnails, authored favicon/social graphic and font licenses are public. Private originals and QA captures remain outside public output and ignored by Git. Reference identity, photographs, projects, contacts and credential scans were not copied into the application or public assets.

The hero uses the owner's actual project media. No portrait photograph or reference identity asset is used. Credential preview graphics are intentional text summaries, not fabricated certificate scans. Inter and Outfit are self-hosted; their SIL Open Font Licenses are included under `public/licenses/`.

## Validation

TypeScript, ESLint, production build, formatting checks and all 14 automated tests pass. Real-Chrome browser checks cover desktop, tablet and mobile, project galleries/details, keyboard focus, Escape, image enlargement, themes, mobile navigation, loaded images and page overflow. Additional widths and reduced-motion behavior are covered in the redesign report.

The Docker preview serves the compiled static site at **http://localhost:8080/**. See the README for exact rebuild and stop commands. Local browser QA is not a claim of physical-device or universal browser testing.

## Release state and follow-up

The current redesign is local. No remote push or public hosting deployment was performed. Existing Git history and the owner-supplied remote are preserved.

There is no approved public résumé, supplied live demo, complete Arabic translation or contact-form delivery backend. Their corresponding controls are omitted or replaced with functional direct-contact actions. No additional degree or fifth featured project is invented; ChaosFlow is identified as academic work.

No deployed domain is assigned. Set a verified canonical and absolute social-image URL after deployment, then check the resulting public URL and social sharing. Vercel uses Vite, root `./`, install `npm ci`, build `npm run build`, output `dist`, no environment variables and no anchor-route rewrites. Deployment remains subject to the owner's explicit instruction.
