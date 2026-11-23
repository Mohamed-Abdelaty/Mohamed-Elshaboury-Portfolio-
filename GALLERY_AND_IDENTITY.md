# Complete galleries, mouse-wheel repair and individual design

Updated November 24, 2026. This version implements the owner's latest request for every project's images, reliable mouse scrolling and a distinct visual identity. It supersedes the earlier reference-based composition.

## Complete project media

| Project | Images |
| --- | --- |
| CareFlow IDS | 10 |
| Elshaboury Events | 10 |
| CSIT Timetable Engine | 10 |
| CarAgencies | 7 |
| Total | 37 |

Each project has selectable thumbnails, previous/next controls, a caption and counter, keyboard navigation, horizontal touch swipe, and a separate enlarged viewer. The enlarged viewer fits the whole image initially and offers actual-pixel dimensions with native panning. Escape returns to the case study and its original control; another Escape closes the case study.

The gallery uses the complete supplied image collection, including interface views, heuristic examples, orchestration views and a pipeline illustration. These are owner-supplied project media, not independent runtime or performance verification. Captions preserve the distinction between captured data, simulated/seed states and illustrations. Existing case-study evidence limits remain visible.

## Mouse-wheel defect and repair

The defect was reproduced in real Chrome before editing. With the pointer over the original image container, a 650px wheel movement left the case study at scrollTop **0**. That inner container had `overflow: auto` and `overscroll-behavior: contain`, despite having no scrollable image content. It prevented the movement reaching the case study.

The case study now has one explicit `.case-scrollport` containing its sticky header, gallery and narrative. The fitted image is not a separate scroll container. The thumbnail rail contains horizontal overscroll only and allows vertical movement to reach the parent. Actual-size panning lives in a separate native dialog.

In the regression checks, a 550px wheel movement over the image advances the case study by **550px** at 1440, 768, 390 and 320px. Wheel movement over thumbnails and the header also works. The background page stays in place. Vertical touch gestures scroll the case study; horizontal gestures change the image.

## Individual visual identity

- The circular avatar composition is replaced by a work-led hero: “From interface to infrastructure,” the owner's identity, real project previews and four interactive project selectors.
- A compact ME navigation replaces the full-width reference header.
- Projects lead the page, before the biography, and use a balanced two-column layout with larger images and visible gallery counts.
- Left-aligned headings, quieter background treatment, experience cards and wider case-study panels establish a different composition while retaining the selected navy/violet/cyan palette.
- The social preview uses the current typography and real public project thumbnails.

All nine content areas, four projects, exact contacts, seven training entries, skill inventory, recognition, languages, project repositories and evaluation caveats remain available.

## Asset preparation and privacy

The 37 full-resolution WebP derivatives and 37 thumbnails total approximately 2.61MB. Full images load as selected; thumbnails are small and lazy-loaded. The original four preview pairs remain unchanged.

Public derivatives obscure visible account identifiers, login fields, contact/location details, customer records and vehicle identifiers where necessary. Account-bearing rental headers are cropped. Source originals are unchanged. No CV, certificate original, dossier, environment file or raw source directory is published.

`scripts/prepare-project-gallery.mjs` prepares the reviewed derivatives and writes `src/projectMedia.ts`. `ProjectMediaGallery.tsx` handles gallery and viewer interactions; `ProjectDetail.tsx` owns the single scroll viewport. `identity.css` defines the current composition over the shared primitives in `style.css`. Normal builds need only the prepared public files, not private inputs.

## Validation and preview

TypeScript, lint, build, formatting and all **14 automated tests** passed. Tests include full gallery asset packaging, thumbnail selection/wrapping, nested image-viewer cancellation, focus restoration, project filters, training content and public-output privacy.

Real-Chrome viewport sweeps at 1440, 768, 390 and 320px covered every section without horizontal overflow, both themes, the four project dialogs, chapter navigation and nested gallery/viewer behavior. All 37 full images were selected and decoded on desktop; the first and last image of each project were additionally checked at smaller widths. No page/console/resource errors were observed. Touch-event emulation verified horizontal image swipe, vertical case-study scrolling, reduced motion and mobile menu navigation. This is browser/device emulation, not physical-device testing.

Ignored local evidence is under `qa/reference/gallery-*` and `gallery-validation*.json`; image review records remain in ignored QA files. The build emits approximately 280.26KB JavaScript (86.01KB gzip) and 62.13KB CSS (12.37KB gzip), with the existing self-hosted fonts.

The compiled Docker version also passed desktop and mobile browser checks, including all 37 image decodes on desktop and actual wheel scrolling over image, thumbnails and header. Nginx configuration validation passed; the root and all 92 emitted files returned HTTP 200 with matching byte sizes, while the checked private/source paths returned 404.

The Docker preview is **http://localhost:8080/**, port **8080**. Its Nginx base is pinned to the previously tested digest for reproducible builds. Rebuild with:

```powershell
cd D:\My-Portfolio\website
npm run build
docker compose up -d --build --wait --wait-timeout 60
```

The current work remains local. No GitHub push or public hosting deployment was performed.
