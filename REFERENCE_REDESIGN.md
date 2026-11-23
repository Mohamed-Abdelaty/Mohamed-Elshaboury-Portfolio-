# Authorized reference redesign — historical report

> Superseded by the owner-requested individual design and full media galleries in [GALLERY_AND_IDENTITY.md](GALLERY_AND_IDENTITY.md). The measurements below describe the earlier reference-based iteration.

Completed locally on November 24, 2026 for Mohamed Abdelaty Mohamed Elshaboury.

Reference: https://mariam-gamal-portfolio.vercel.app/

## Investigation before implementation

The actual rendered reference was opened in an isolated Chrome session through Playwright at 1440 × 900, 390 × 844 and 768 × 1024. Initial views, complete pages and individual sections were captured. Navigation, scrolling, hover feedback, typewriter, theme toggle, mobile menu, project detail, project gallery and credential gallery were exercised. The pre-implementation specification is saved locally in ignored `qa/reference/DESIGN_SPEC.md`; screenshots and measured browser data are in the same QA directory.

The design values below were measured from rendered geometry/computed styles where available; motion distances, visual glows and sequencing were additionally estimated from observed transitions. They are not a claim that the reference's original source code was obtained.

| Element | Recreated treatment |
| --- | --- |
| Palette | Near-black navy `#030712`; indigo `#6366f1`, purple `#a855f7` and cyan `#06b6d4`; muted slate text and surfaces |
| Typography | Self-hosted Inter body/UI and Outfit headings; desktop H1 60px/75px, tablet 48px/60px, mobile 36px/45px; section headings 36px desktop and 30px mobile |
| Background | Faint 40px grid, broad indigo/cyan glows and drifting particle connections in the hero |
| Content | Centered layout with 1120px usable desktop content at 1440px; mobile content from x=40 to x=350 at 390px |
| Navigation | Fixed full-width header, transparent at top, blurred navy after scrolling, cyan active item, compact mobile dropdown |
| Hero | Text left / circular visual right on desktop; circle before centered text on smaller screens; 320px circle desktop/tablet and 256px mobile |
| Sections | Centered headings, 80 × 4px gradient underline, generous vertical spacing, outlined 16px-radius cards |
| Skills | Three/two/one-column grid, colored icon blocks, slate pills; expandable owner-specific details |
| Projects | Three desktop columns and one tablet/mobile column, real previews, tags, cyan actions and gallery filters |
| Details | Slate native dialog, sticky header, image zoom, technology tags, case-study text and source action |
| Experience | Alternating cards around a gradient center line; one-sided mobile layout |
| Credentials/contact/footer | Preview-and-caption cards; two-column contact area; brand, back-to-top link and copyright footer |

## Implementation and components

- `App.tsx` composes the reference section order and adds the owner's achievements/leadership section in the same card language. Education and academic project context remain clearly distinguished.
- `Navigation.tsx` implements active sections, scroll state, dark/light themes, mobile expansion, Escape and focus restoration.
- `Hero.tsx`, `SiteBackground.tsx` and `useTypewriter.ts` recreate the introduction, circular composition, typing and particle effects.
- `Skills.tsx` preserves the full skill inventory behind expandable controls while retaining compact reference-style cards.
- `ProjectShowcase.tsx` supplies all four featured projects and a filtered gallery. `ProjectDetail.tsx` retains full descriptions, role, challenge, solution, results, caveats, explorable architecture, enlarged images and next-project navigation.
- `Training.tsx` provides seven credential entries, summary cards, a gallery and text details; no original private certificate is published.
- `SectionHeading.tsx`, `Icon.tsx` and `style.css` provide shared visual primitives, responsive rules and themes.
- `useDialog.ts` manages native modal lifecycle, nested body-scroll locks and trigger-focus restoration. `useReveal.ts` handles progressive section entrances.
- `content.ts`, `data.ts` and `projectStories.ts` retain approved owner facts. The original eight project WebP files are unchanged.
- Metadata, favicon, social graphic, README and handoff documentation now match this design. Inter/Outfit licenses are included in public assets.

## Motion and interactions

Recreated observed behaviors include staggered hero entrances, cycling role text with cyan cursor, floating circular hero visual, subtle particles and connections, heading underline growth, section/card reveals, hover lift and CTA scaling, active navigation and modal entrances.

The implementation uses CSS transitions/keyframes, Intersection Observer and a small canvas, without an animation or 3D library. Common UI transitions are around 300ms; the modal entrance is 250ms. Card reveal stagger is 90ms. Typewriter timing is 75ms per character, 40ms on deletion and a 1.7-second completed-role pause. These are tuned approximations of the observed animation character, not verified source-identical timings. Particles pause when the hero is outside the viewport or the page is hidden.

Reduced motion removes typing, floating, reveals and smooth scrolling while leaving all content available. Native dialogs provide keyboard containment; Escape first fits an enlarged image, then closes the case study. Closing a nested case study returns to its gallery and trigger.

## Visual comparison and refinements

At least two complete screenshot review passes were followed by a final confirmation pass at all three primary viewports.

1. **First comparison:** corrected a background stacking issue that hid the grid; aligned content widths and circular hero geometry; replaced the previous exhibition layout with the reference's cards, spacing, timeline and galleries.
2. **Second comparison:** adjusted hero copy length, title wrapping and vertical rhythm; reduced default skill-card height while preserving every tool and explanatory note through expansion; refined light-theme contrast and narrow-screen reveal distances.
3. **Final confirmation:** verified the settled modal appearance, repeated desktop/mobile/tablet captures and interactions, then checked the compiled Docker version separately. One earlier confirmation run timed out while source formatting was happening; a complete clean rerun passed on all three sizes.

Measured final desktop H1 geometry is x=160, y=262.5, width=633.33 and height=75px, matching the reference's measured position and line box. Desktop hero height is 900px. Tablet hero height is 1116px after refinement. Mobile content width is 310px at 390px; its hero is 1045px tall for the owner's adapted text. These measurements establish selected geometry, not pixel identity across different personal content.

Local evidence: `qa/reference/ours-pass1-*`, `ours-pass2-*`, `ours-final-*`, `ours-final.json`, and `production-*` / `production.json`. QA files are ignored and are not public application assets.

## Responsive and browser validation

Rendered desktop 1440 × 900, mobile 390 × 844 and tablet 768 × 1024 were checked through every section. Additional initial-view checks at 320, 1024 and 1920px covered reduced-motion rendering. The production preview also received a normal-motion section sweep at 320px.

Verified in real Chrome:

- All sections render without horizontal page overflow at the swept viewports.
- The four project previews load; each project detail opens with its actual large image.
- Project filtering, nested gallery/detail navigation, image enlargement, Escape, native modal focus containment and trigger-focus restoration work.
- Training gallery exposes all seven entries and opens text details; nested scroll locking is retained.
- Expanded skills expose the remaining tools and supporting context without page overflow.
- Mobile menu cancellation and section navigation work; active items update.
- Dark/light themes work. Reduced-motion content is immediately available.
- No page errors, console errors or failed resource responses were observed in the production smoke checks.

These are emulated viewport tests in Chrome, not physical-device testing or a Safari/Firefox certification.

## Automated and production checks

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed; 44 modules transformed |
| `npm test` | 12 passed, 0 failed |
| `npm run format:check` | Passed |
| `npm audit --json` | 0 reported vulnerabilities |
| Docker Compose build/start | Healthy on `127.0.0.1:8080` |
| `nginx -t` | Passed |
| Production HTTP/byte-size checks | Root and all 18 emitted files served successfully; checked private/source paths returned 404 |
| Real-Chrome production smoke | Desktop, mobile and narrow-screen checks recorded under `qa/reference/production.json` |

The reference recreation build emitted approximately 267.45KB JavaScript (83.48KB gzip), 39.39KB CSS (8.25KB gzip), and 80.55KB of self-hosted font files. No backend, database, runtime secrets, source maps or private original documents are required.

## Deliberate differences and remaining items

- Owner identity, biography, four projects and credentials replace all reference content. The longer full legal name is in About and the footer; the hero uses a shorter first-name line on desktop to preserve the reference composition, with the surname also shown on mobile.
- An authored ME monogram replaces the reference portrait because no owner profile photo was supplied.
- Email replaces the reference résumé control; résumé download remains absent until a public-safe PDF is approved. No live demo URLs were invented.
- The language switch is omitted because no complete approved translation exists.
- Real email and LinkedIn actions occupy the contact panel instead of a form without a delivery service.
- The fourth project wraps to a centered second desktop row. All four remain in the gallery. Achievements and languages reuse existing card/section patterns.
- The second education-style card describes ChaosFlow as academic work; it does not imply another degree or employment.
- Training covers are authored summaries rather than private certificate scans. Seven entries plus the CV-listed additional-program note remain discoverable.
- Some reference previews had empty image sources during inspection; the owner's real project images load normally.
- Exact text lengths and author-created SVG icon outlines differ. Animation timing is an observed approximation. No claim of pixel identity is made.
- A production hostname is not assigned. Canonical and absolute social-image URLs must be set when one exists.

## Run and review

The refreshed Docker preview is **http://localhost:8080/**, port **8080**.

```powershell
cd D:\My-Portfolio\website
npm ci
npm run build
docker compose up -d --build --wait --wait-timeout 60
```

For development:

```powershell
cd D:\My-Portfolio\website
npm run dev
```

Open `http://127.0.0.1:5173/`, or the port printed by Vite. Use `docker compose down` to stop Docker. Normal builds do not require private source materials.

The redesign remains local: no GitHub push or public hosting deployment was performed. Existing Git history, remote URL and private source originals were preserved.

## Follow-up visual polish — November 24, 2026

At the owner's request for further improvements, three focused additions extend the selected design:

- Compact full-stack, big-data and UI/UX badges around the existing hero circle make the owner's specialties visible immediately.
- Each real project screenshot now sits in an authored interface frame. Subtle accent lighting and a mouse-position highlight provide hover feedback without introducing a new animation dependency. Full-size images remain in the case-study dialog.
- Case studies now include a concise metric/focus summary and a persistent Overview / Engineering / Results navigator. Chapter selection follows scrolling; keyboard activation moves focus to the heading, and reduced-motion mode jumps without animation. The underlying page remains in place. The results chapter is recognized correctly when the dialog reaches its scroll limit.

Real-Chrome checks at 1440, 768, 390 and 320px cover both themes, every section's overflow, all three chapter actions, visible heading placement, focus restoration, unchanged page scroll and absence of console/resource errors. A separate reduced-motion check covers chapter navigation. Evidence is in ignored `qa/reference/polish-*.png` and `polish.json`.

TypeScript, lint, formatting, production build and all 12 existing tests passed again. The updated build emits approximately 270.01KB JavaScript (84.20KB gzip) and 43.69KB CSS (9.11KB gzip). Font and project image assets are unchanged. The Docker preview is refreshed at the same local address; no remote push or public deployment is part of this polish pass.
