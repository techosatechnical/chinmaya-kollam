# Chinmaya Schools Multi-Tenant UI & Repository Audit

**Repository:** `chinmaya-kollam` (`chinmaya-web@0.1.0`)  
**Framework:** Next.js `16.3.5` (App Router, Turbopack), React `19.2.8`, TypeScript `^5`, Tailwind CSS `^4` (`@tailwindcss/postcss`), `framer-motion` `^13.4.0`, `ogl` `^1.0.11`, `lucide-react` `^1.47.0`, `react-icons` `^5.7.0`.  
**Audit Date:** 2026-11-26

---

## 1. Baseline Verification Results

### 1.1 Build, Typecheck & Lint (Pre-Refactor Baseline)

| Check | Command | Result | Notes |
| --- | --- | --- | --- |
| Dependencies | `npm.cmd install` | **Passed** | Installed 366 packages (`node_modules/` was absent on initial checkout). |
| Typecheck | `npx.cmd tsc --noEmit` | **Passed** (0 errors) | Clean TypeScript compilation. |
| Production Build | `npm.cmd run build` | **Passed** | Compiled in 8.6s; generated 45/45 static routes (`○`). |
| Lint | `npm.cmd run lint` | **Failed** (exit code 1) | **147 problems (53 errors, 94 warnings)** — primarily `react/no-unescaped-entities`, `@typescript-eslint/no-explicit-any` (in `WarpText.tsx`, `CursorGrid.tsx`, `Navbar.tsx`, `frontrunners/page.tsx`), `prefer-const` (`WarpText.tsx`), `@next/next/no-img-element` warnings, and unused imports (`Mail`, `Phone` in `TopBar.tsx`; `Users` in `management/page.tsx`; `Image` in `chinmaya-blossoms/page.tsx`; `textY`, `op` in `beginning/page.tsx`). |
| Local Dev Server | `npm.cmd run dev` | **Passed** | Served on `http://localhost:3000`. HTTP 200 on `/`, `/about/overview`, `/academics/news`, `/contact`; HTTP 404 on `/academics/child-protection-policy`. |

### 1.2 Baseline Screenshot Capture Blocker

- **Blocker:** Automated browser screenshot capture and live DOM interaction testing via `chrome_devtools` MCP failed because Chrome remote debugging was not active (`Could not find DevToolsActivePort for chrome at C:\Users\anandu\AppData\Local\Google\Chrome\User Data\DevToolsActivePort`).
- **Mitigation:** Every route, component, interactive handler, and asset reference was audited directly from source code, and HTTP status codes were verified against the running Next.js dev server. Visual regression screenshots should be captured once Chrome remote debugging is enabled or Playwright is configured.

---

## 2. Public Route & Component Inventory

Root layout: `app/layout.tsx` (loads `Manrope` and `Urbanist` Google Fonts, `app/globals.css`, and `<CustomCursor />`).  
All 43 `page.tsx` files currently render `<TopBar />`, `<Navbar />`, page-specific sections, and `<Footer />`.

| Route | File Path | Rendering Mode | Components / Layout Pattern Used |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Server (imports Client components) | `AnnouncementModal`, `TopBar`, `Navbar`, `Hero`, `VisionMission`, `HistoryAnnouncements`, `LeadershipMessages`, `Categories`, `About` (empty), `RecentNews`, `Testimonials`, `Facilities`, `Footer` |
| `/about` | `app/about/page.tsx` | Server wrapper -> Client | Re-exports `AboutOverview` (`app/about/overview/page.tsx`) |
| `/about/overview` | `app/about/overview/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, `WarpText`, 4 alternating story sections, 4-image campus grid, `Footer` |
| `/about/beginning` | `app/about/beginning/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, parallax hero, `WarpText` ("ORIGIN"), 1985 quote block, 5-chapter timeline, bento campus grid, 4-image gallery, `Footer` |
| `/about/management` | `app/about/management/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, `WarpText` ("MANAGEMENT"), 2 featured leaders, 9 board members grid, `Footer` |
| `/about/principal-desk` | `app/about/principal-desk/page.tsx` | Server | `TopBar`, `Navbar`, dark radial hero, Principal card + Vice Principal card, `Footer` |
| `/about/academic` | `app/about/academic/page.tsx` | Server wrapper -> Client | Re-exports `AcademicsPage` (`app/academics/page.tsx`) |
| `/about/general-info` | `app/about/general-info/page.tsx` | Server | `TopBar`, `Navbar`, dark radial hero, `<iframe>` PDF viewer (`/general%20info.pdf`) + mobile download link, `Footer` |
| `/about/frontrunners` | `app/about/frontrunners/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark radial hero, 3-column alumni testimonial grid + "Read more" modal, `Footer` |
| `/academics` | `app/academics/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, parallax hero + `WarpText` ("ACADEMICS"), CBSE overview card (Reg No. 930434), 5 educational stages + 1 filler card, `Footer` |
| `/academics/downloads` | `app/academics/downloads/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, "Content Coming Soon" placeholder card, `Footer` |
| `/academics/news-letter` | `app/academics/news-letter/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 3-card newsletter grid (1 real PDF, 2 `#` placeholders), `Footer` |
| `/academics/news` | `app/academics/news/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, primary-bg hero, search input + 6 category filter pills, 6-card news grid, `Footer` |
| `/academics/examination` | `app/academics/examination/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, "Content Coming Soon" placeholder card, `Footer` |
| `/academics/photo-gallery` | `app/academics/photo-gallery/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark image hero, sticky year filter bar, masonry columns (12 Unsplash photos) + lightbox modal, `Footer` |
| `/academics/video-gallery` | `app/academics/video-gallery/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark image hero, sticky academic-year filter bar, 10 YouTube video cards + iframe modal, `Footer` |
| `/academics/mentors` | `app/academics/mentors/page.tsx` | Server (renders `motion`? Note: `motion` imported in `mentors/page.tsx` which has `"use client"`) | `TopBar`, `Navbar`, primary-bg hero, 2 leadership cards + 37 teaching faculty cards (DiceBear avatar fallback), `Footer` |
| `/academics/academic-planner` | `app/academics/academic-planner/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, `<object>`/`<iframe>` PDF viewer (`/academic%20planner.pdf`) + download button, `Footer` |
| `/academics/academic-results` | `app/academics/academic-results/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark hero, 3 result flyer cards + lightbox modal, `Footer` |
| `/academics/student-council` | `app/academics/student-council/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, blockquote + prose + 6-role callout box, `Footer` |
| `/academics/chinmaya-blossoms` | `app/academics/chinmaya-blossoms/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col text + photo card, `Footer` |
| `/academics/nep` | `app/academics/nep/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark image hero, 3-image masonry grid + lightbox modal, `Footer` |
| `/academics/school-safety-policy` | `app/academics/school-safety-policy/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, `<object>`/`<iframe>` PDF viewer (`/school%20safety%20policy.pdf`) + download button, `Footer` |
| `/academics/child-protection-policy` | **MISSING (404)** | — | Linked in `Navbar.tsx` line 56, but no route file exists. |
| `/activities` | `app/activities/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 5-card landing grid linking to sub-routes, `Footer` |
| `/activities/sports` | `app/activities/sports/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col text + 2 stock images, `Footer` |
| `/activities/scouts` | `app/activities/scouts/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col 2 stock images + text, `Footer` |
| `/activities/co-curricular` | `app/activities/co-curricular/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col text + 2 stock images, `Footer` |
| `/activities/karate-chess` | `app/activities/karate-chess/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col 2 stock images + text, `Footer` |
| `/activities/arts` | `app/activities/arts/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col text + 2 stock images, `Footer` |
| `/facilities` | `app/facilities/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 6-card landing grid linking to sub-routes, `Footer` |
| `/facilities/library` | `app/facilities/library/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col text + local image, `Footer` |
| `/facilities/smart-class` | `app/facilities/smart-class/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col local image + text, `Footer` |
| `/facilities/labs` | `app/facilities/labs/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark image hero, 5 alternating lab cards (Physics, Chemistry, Biology, Computer, Math), `Footer` |
| `/facilities/kindergarten` | `app/facilities/kindergarten/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col local image + text, `Footer` |
| `/facilities/sports-games` | `app/facilities/sports-games/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col text + 2 local images, `Footer` |
| `/facilities/chinmaya-blossoms` | `app/facilities/chinmaya-blossoms/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 2-col text + local image, `Footer` |
| `/accolades` | `app/accolades/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark image hero, 5-item masonry gallery + lightbox modal, `Footer` |
| `/innovation-hub` | `app/innovation-hub/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, 3-card landing grid (CSRS, AI & Robotics, AI Trained Teachers), `Footer` |
| `/innovation-hub/csrs` | `app/innovation-hub/csrs/page.tsx` | Server | `TopBar`, `Navbar`, dark image hero, "Content Coming Soon" placeholder card, `Footer` |
| `/innovation-hub/ai-robotics` | `app/innovation-hub/ai-robotics/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark image hero, intro card + 6-image masonry gallery + lightbox modal, `Footer` |
| `/innovation-hub/ai-teachers` | `app/innovation-hub/ai-teachers/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, dark image hero, intro card + 3-image grid + lightbox modal, `Footer` |
| `/contact` | `app/contact/page.tsx` | Client (`"use client"`) | `TopBar`, `Navbar`, primary-bg hero, 4 contact info cards, non-functional contact form (`type="button"`), Google Maps `<iframe>`, `Footer` |

---

## 3. Hardcoded School-Specific Values, Data Arrays, Assets & Colour Tokens

### 3.1 Colour Tokens & Brand Palette

Defined in `app/globals.css` (`@theme` block) and hardcoded inline across components/pages:

- **CSS Theme Tokens (`app/globals.css`):**
  - `--color-primary: #0F284A` (deep navy)
  - `--color-secondary: #FF9924` (warm amber-orange)
  - `--color-black: #121214`, `--color-white: #ffffff`, `--color-body: #77726e`, `--color-border: #dddddd`
  - `--color-gray-1`..`--color-gray-8` (`#f9f9f9` .. `#CABAF3`)
- **Hardcoded Hex Colours Used Inline Across Components:**
  - `#FF6A00` — Primary bright orange accent (Navbar hover, TopBar commented links, AnnouncementModal active dot & arrow hover, VisionMission icons & quote gradient `rgba(253, 135, 51, ...)`, HistoryAnnouncements ping dot, Categories conic-gradient border, RecentNews calendar icon, Mentors role text, Contact phone icon, Beginning timeline accents).
  - `#DE7129` — Navbar logo badge background (`components/Navbar.tsx:170`).
  - `#385EEC` — Electric royal blue accent (TopBar marquee, Navbar dropdown hover, HistoryAnnouncements "History" underline & gradient, Categories CursorGrid & conic-gradient, RecentNews hover, NewsPage active filter & focus rings, Contact location icon & focus rings).
  - `#004B87` — Deep Chinmaya blue (`HistoryAnnouncements` CTA & WarpText, `LeadershipMessages` heading, `Categories` hover, `RecentNews` badge, `about/overview` WarpText).
  - `#1A457B` — Leadership card background (`LeadershipMessages.tsx:71`, `principal-desk/page.tsx:61,105`).
  - `#02133a` — Dark navy (`beginning/page.tsx`, `management/page.tsx`, `academics/page.tsx`).
  - `#0B1121` — Dark header & Footer background (`Footer.tsx:7`, all inner subpage headers).
  - `#F0F4F8` / `#F5F5F5` — Section backgrounds (`Testimonials.tsx`, `LeadershipMessages.tsx`).
  - Inline CSS `filter` on `Navbar.tsx:194` to tint white logo text orange.

### 3.2 School-Specific Metadata & Identity

- `app/layout.tsx`: `title: "Chinmaya Vidyalaya Kollam"`, `description: "Providing a strong foundation for students to discover their innate talents and skills."`
- `app/about/principal-desk/page.tsx`: `metadata.description` mentions `"Chinmaya Vidyalaya, Kollam."`
- `app/about/general-info/page.tsx`: `metadata.description` mentions `"Chinmaya Vidyalaya, Kollam."`
- `app/academics/news-letter/page.tsx`: `metadata.description` mentions `"Chinmaya Vidyalaya, Kollam."`
- `components/Navbar.tsx`: Logo images `/logos/CV Kollam white logo.png`, `/logos/CV Kollam text white.png`, `/logos/CV Kollam BLACK.png`.
- `components/Footer.tsx`: `/logos/CV Kollam WHITE.png`, address `"Chinmaya Vidyalaya / Kollam, Kerala"`, email `"info@chinmayakollam.edu.in"`, phone `"+91 0000 000 000"`, copyright `"© 2026 Chinmaya Vidyalaya Kollam. All Rights Reserved."`, `"Powered by techosa.it"`.
- `app/contact/page.tsx`: `"Chinmaya Vidyalaya, Chandanathope, Kollam"`, `"0474 2712571"`, `"chin_kollam@chintvm.edu.in"`, `"Monday - Saturday / 8:30 AM - 4:00 PM"`, Google Maps embed `cid=1689960815386803714` (`ll=8.934493,76.638692`).

### 3.3 Local Data Arrays & Hardcoded Content

| Location | Data / Array | Contents |
| --- | --- | --- |
| `components/TopBar.tsx` | Marquee items (3) | `"Admission open for 2026-27"`, `"Upcoming Event: INFNI Tech Fest"`, `"Annual Arts Fest starting next week"` |
| `components/AnnouncementModal.tsx` | `ADS` (3 items) | Class X & XII 2024-25 flyer, JEE Main Achievers, Sports Ever-Rolling Trophy |
| `components/Hero.tsx` | Video `<source>` | `/video/chinmayaVidyalaya kollam.mp4` |
| `components/VisionMission.tsx` | Vision, Mission, `quotes` (2), AI & Robotics floating blob | Kollam-specific Mission text, 2 Gurudev quotes, `/image/gurudev2.jfif`, link to `/innovation-hub/ai-robotics` |
| `components/HistoryAnnouncements.tsx` | History prose + `announcements` (4) | Chandanathope Kollam history, `/image/about3.webp`, 4 dated announcements (March–June 2026) |
| `components/LeadershipMessages.tsx` | `messages` (2) | Principal `Mrs Nisha S S` (`/mentors/principal.jpeg`), Vice Principal `Mrs Sumutha S` (`/mentors/vice principal.jpeg`) |
| `components/Categories.tsx` | `categories` (8) | 8 quick-link cards to `/academics/*` and `/activities/*` |
| `components/RecentNews.tsx` | `newsList` (6) | 5 local `/news/*` items + 1 Unsplash placeholder (`Science Exhibition 2026`), all `link: "#"` |
| `components/Testimonials.tsx` | `testimonials` (3) | **Template placeholder** data (`eteach-html.vercel.app` images, names Ruhul Amin, Abul Hasem, Abdul Hamid) |
| `components/Facilities.tsx` | `facilities` (6) | Library, Smart Class, Labs, KinderGarten, Sports & Games, Chinmaya Blossoms |
| `app/about/overview/page.tsx` | `sections` (4) + gallery (4) | Kollam-specific founding dates (23 Oct 1985, 1996 Chandanathope) & local images |
| `app/about/beginning/page.tsx` | `chapters` (5) + bento + gallery | 1985–2001 Kollam timeline, 3 Acres at Chandanathope, 2001-2002 awards |
| `app/about/management/page.tsx` | `featured` (2) + `members` (9) | Chairman Sri. R. Suresh Mohan, Secretary Sri. P. Sekharankutty, 9 board members + photos under `/management/*` |
| `app/about/frontrunners/page.tsx` | `testimonials` (3) | 3 Kollam alumni (Dr. Siji Nath S, Dr. Kavya K S, Dr. Anusree M.R) + `/frontrunner/*` |
| `app/academics/page.tsx` | `sections` (5) + CBSE Reg No. | `Reg No. 930434`, 5 educational stages |
| `app/academics/news/page.tsx` | `allNews` (6) | Duplicates `RecentNews.tsx` `newsList` |
| `app/academics/mentors/page.tsx` | `mentors` (39) | 2 leadership + 37 teaching faculty with qualifications |
| `app/academics/photo-gallery/page.tsx` | `photos` (12) | 12 Unsplash stock photos (years 2021–2027) |
| `app/academics/video-gallery/page.tsx` | `videos` (10) | 10 YouTube video IDs grouped by `2026-27`, `2025-26`, `2024-25` |
| `app/academics/news-letter/page.tsx` | `newsletters` (3) | 1 real PDF (`/newsletter-_CV_KOLLAM2024-25.pdf`), 2 `#` placeholders |
| `app/academics/academic-results/page.tsx` | `results` (3) | `/image/acdemic result 1.jpeg`, `2.png`, `3.jpeg` |
| `app/accolades/page.tsx` | `accolades` (5) | 5 images under `/accolades/*` |
| `app/facilities/labs/page.tsx` | `labs` (5) | Physics, Chemistry, Biology, Computer, Mathematics labs |
| `app/innovation-hub/ai-robotics/page.tsx` | `roboticsImages` (6) | 6 images under `/image/*` |
| `app/innovation-hub/ai-teachers/page.tsx` | `teacherImages` (3) | 3 images under `/image/*` |

### 3.4 `public/` Asset Inventory

- **PDFs (4):** `/academic planner.pdf`, `/general info.pdf`, `/newsletter-_CV_KOLLAM2024-25.pdf`, `/school safety policy.pdf`
- **Video (1):** `/video/chinmayaVidyalaya kollam.mp4`
- **Logos (5):** `/logos/CV Kollam BLACK.png`, `CV Kollam text white.png`, `CV Kollam white logo.png`, `CV Kollam WHITE.png`, `kollogo.png` (unused)
- **Accolades (5):** `/accolades/*`
- **Facilities (11):** `/facilities/*` (plus `/labs/*` which duplicates 4 lab photos unused by `labs/page.tsx`)
- **Frontrunners (3):** `/frontrunner/*`
- **Gallery (4):** `/gallery/*` (`githa jayanthy.jpg`, `thiruvatira.jpg`, `UKG convocation.jpg`, `UKG convocation1.jpg` — currently unused in `photo-gallery/page.tsx`)
- **Management (10):** `/management/*`
- **Mentors (2):** `/mentors/*`
- **News (5):** `/news/*`
- **General Images (31):** `/image/*`

---

## 4. Interactive Behaviour Audit

- **AnnouncementModal (`components/AnnouncementModal.tsx`):** Opens on mount (`isOpen = true`), locks `body` scroll, auto-advances every 5s (pauses on hover), supports Prev/Next buttons, pagination dots, backdrop click, and `Escape` / `ArrowLeft` / `ArrowRight` keyboard controls.
- **TopBar (`components/TopBar.tsx`):** CSS marquee (`25s linear infinite`), pauses on hover. Hidden on `< md`.
- **Navbar (`components/Navbar.tsx`):** Desktop hover dropdowns; scroll listener (`scrollY > 80` collapses navbar into a floating top-right hamburger button; `< 40` restores full bar); click-outside & `Escape` collapse; mobile full-screen drawer with expandable accordion submenus.
- **VisionMission (`components/VisionMission.tsx`):** Auto-advancing 5s quote slider with Prev/Next/dot controls; draggable floating "AI & Robotics" blob (`framer-motion` `drag` with viewport constraints and `stopPropagation` on inner `<Link>`).
- **LeadershipMessages (`components/LeadershipMessages.tsx`):** Clicking either card opens a detail modal with full message; backdrop click or `X` closes.
- **Categories & HistoryAnnouncements:** `CursorGrid` HTML5 canvas interactive grid; `WarpText` WebGL (`ogl`) shader text distortion on hover/pointer; infinite vertical scroll on announcements.
- **RecentNews & Testimonials:** Horizontal infinite `framer-motion` marquee (`RecentNews` desktop/mobile, `Testimonials` mobile). Note: `Testimonials` desktop Prev/Next arrow buttons have **no `onClick` handlers**.
- **Lightboxes:** `frontrunners`, `photo-gallery`, `video-gallery` (YouTube iframe), `academic-results`, `nep`, `accolades`, `ai-robotics`, `ai-teachers` all implement click-to-zoom modals.
- **Contact Form (`app/contact/page.tsx`):** Uncontrolled inputs, `<button type="button">` with **no submit handler or backend**.

---

## 5. Shared vs. Tenant-Specific Content Classification

- **Genuinely Shared Across All Six Chinmaya Schools (Code / Shared Defaults):**
  - Overall page layouts, section order, typography (`Manrope`, `Urbanist`), animations, interactive components (`Navbar`, `Hero`, `VisionMission`, `HistoryAnnouncements`, `LeadershipMessages`, `Categories`, `RecentNews`, `Testimonials`, `Facilities`, `Footer`, subpage templates).
  - Structural navigation taxonomy (with per-school visibility toggles so a school can hide sections it doesn't have, e.g., Innovation Hub or Chinmaya Blossoms).
  - Chinmaya Vision Programme (CVP) framing & Pujya Gurudev Swami Chinmayananda quotes (overridable per school if desired, not assumed identical without confirmation).
- **Strictly Tenant-Specific (Stored in Firestore per `schoolId`):**
  - School identity: name, short name, campus location, affiliation/reg number, SEO metadata, canonical domain.
  - Theme tokens: primary, secondary, accent, dark header/footer, contrast colours.
  - Logos, hero video/image, Gurudev/campus imagery, PDFs (Academic Planner, General Info, Newsletters, Safety Policy, Child Protection Policy).
  - Contact details (address, phone, email, working hours, Google Maps embed URL, social links).
  - Top-bar ticker items, announcement modal flyers, dated announcements, news items, leadership messages, management board, mentors/faculty, alumni frontrunners, accolades, photo albums, video gallery, educational stages, facilities, activities, and innovation hub items.

---

## 6. Broken Links, Placeholders, Missing Assets & Accessibility Issues

1. **Broken Route (404):** `/academics/child-protection-policy` is linked in `Navbar.tsx:56` but has no page file.
2. **Template Placeholder Content:**
   - `components/Testimonials.tsx`: Uses `eteach-html.vercel.app` images and placeholder names ("Ruhul Amin", "Abul Hasem", "Abdul Hamid").
   - `components/Footer.tsx`: Uses placeholder phone `+91 0000 000 000` and email `info@chinmayakollam.edu.in` (conflicts with `contact/page.tsx` `0474 2712571` and `chin_kollam@chintvm.edu.in`), plus `#` links for social icons, Terms, Privacy, and `techosa.it`.
   - `components/About.tsx`: Empty placeholder component rendered on homepage.
   - `app/academics/photo-gallery/page.tsx`: Uses 12 Unsplash stock photos (and a `2027` year filter) instead of the 4 real photos in `public/gallery/`.
   - `app/academics/news-letter/page.tsx`: Items 2 and 3 have `pdfLink: "#"`.
   - `RecentNews.tsx` & `academics/news/page.tsx`: All 6 items have `link: "#"`; item 6 ("Science Exhibition 2026") uses an Unsplash image.
   - `academics/downloads`, `academics/examination`, `innovation-hub/csrs`: "Content Coming Soon" pages.
3. **Non-Functional UI Controls:**
   - `app/contact/page.tsx`: Submit button is `type="button"` with no handler.
   - `components/Testimonials.tsx`: Desktop Prev/Next buttons have no `onClick` handlers.
4. **Accessibility & Performance Notes:**
   - Icon-only modal close buttons in `LeadershipMessages`, `frontrunners`, `photo-gallery`, `video-gallery`, `academic-results`, `nep`, `accolades`, `ai-robotics`, `ai-teachers` lack `aria-label`.
   - `CustomCursor.tsx` attaches hover listeners only on initial mount (`[]` deps) and won't bind to dynamically rendered/route-changed elements.
   - Many pages use raw `<img>` instead of `next/image` (94 ESLint warnings).

---

## 7. Route-to-Firestore Content Mapping & Migration Order

### 7.1 Firestore Schema (`schools/{schoolId}/...`)

- `schools/{schoolId}` — Identity, domain(s), status (`published` | `draft`), theme tokens, branding/logos, contact info, social links, navigation visibility config, homepage section toggles & texts (Hero, Vision/Mission, Gurudev quotes, Origin summary, Leadership messages, Categories, Facilities, Footer), SEO defaults.
- `schools/{schoolId}/pages/{pageId}` — Rich page data for `about-overview`, `about-beginning`, `academics-overview`, `student-council`, `chinmaya-blossoms`, `downloads`, `examination`, `nep`, `activities-*`, `facilities-*`, `innovation-*`, `child-protection-policy`.
- `schools/{schoolId}/announcements/{id}` — TopBar ticker items, AnnouncementModal flyers, and HistoryAnnouncements dated items (distinguished by `kind`: `ticker` | `modal` | `board`).
- `schools/{schoolId}/news/{id}` — News & updates (homepage `RecentNews` queries `featured == true` or latest published; `/academics/news` lists all published).
- `schools/{schoolId}/people/{id}` — `kind`: `management-featured` | `management-member` | `mentor-leadership` | `mentor-faculty` | `frontrunner` | `testimonial`.
- `schools/{schoolId}/documents/{id}` — `kind`: `general-info` | `academic-planner` | `safety-policy` | `child-protection-policy` | `newsletter` | `download`.
- `schools/{schoolId}/albums/{id}` — Photo gallery items (with `year`, `category`, `imageUrl`, `title`).
- `schools/{schoolId}/videos/{id}` — Video gallery items (with `youtubeId`, `academicYear`, `title`).
- `schools/{schoolId}/accolades/{id}` — Accolades & academic result flyers (`kind`: `accolade` | `academic-result`).
- `schools/{schoolId}/submissions/{id}` — Private contact form submissions (write-only from public API with validation/rate-limiting; readable only by authorized admins).
- `admins/{uid}` — Admin role (`super_admin` | `school_admin`), `assignedSchoolIds: string[]`, email, displayName.

### 7.2 Proposed Migration Order

1. **Stage 1 (Done):** Complete source, route, content, and visual audit (`docs/ui-audit.md`).
2. **Stage 2:** Introduce TypeScript domain types (`lib/types/school.ts`), Zod/runtime validation, and a Kollam static data adapter (`lib/data/kollam-seed.ts`) while keeping the UI identical.
3. **Stage 3:** Implement centralized server-only tenant resolver (`lib/tenant.ts`) for all 6 hostnames + local dev mapping + 404 for unknown hosts, and CSS custom property theme tokens (`app/globals.css`).
4. **Stage 4:** Set up Firebase Admin & Client SDKs (`lib/firebase/admin.ts`, `lib/firebase/client.ts`), Firestore security rules, and repeatable non-destructive Kollam seed/migration script with dry-run & review report.
5. **Stage 5:** Refactor all audited public routes and components to consume tenant-scoped Firestore data (with graceful fallback/empty states for missing optional sections and zero cross-tenant leakage).
6. **Stage 6:** Build `/admin` dashboard with Firebase Auth, `super_admin` / `school_admin` RBAC, server-verified mutations, and content/media management + contact submission handling.
7. **Stage 7:** Configure tenant-scoped caching (`revalidateTag`), dynamic SEO metadata, `sitemap.ts`, `robots.ts`, `.env.example`, and multi-project Vercel / Firebase deployment docs.
8. **Stage 8:** Run full verification (`tsc`, `eslint`, unit/emulator authorization tests, production `next build`).
