# DataDive 5.0 - The Odyssey

DataDive 5.0 is an interactive event website for the Department of Computer Science & Engineering (Data Science). Its theme, **The Odyssey**, combines ancient Greek mythology with futuristic space exploration to present five flagship event arenas happening on **10 September 2026**.

The site is designed as an immersive event guide rather than a static brochure. Visitors can explore the scroll-driven Odyssey journey, compare events, view the event-day timeline, watch event trailers, open detailed event information, register through external forms, and contact the organizing team.

## Event Overview

- **Edition:** DataDive 5.0
- **Theme:** The Odyssey
- **Organizing department:** Department of Computer Science & Engineering (Data Science)
- **Date:** 10 September 2026
- **Venue:** Campus Tech Complex & Data Laboratories
- **Total prize pool:** INR 15,000+
- **Number of arenas:** 5
- **Certificates:** Official verified participation certificates for registered participants

## Flagship Arenas

| Arena | Category | Entry options | Prize pool | Focus |
| --- | --- | --- | --- | --- |
| DataVerse 5.0 | Data and analytics | Solo INR 80, Duo INR 120, Trio INR 150 | INR 3,000 | Data quizzes, cleaning, sorting, charts, and beginner-friendly machine learning concepts |
| VizMinds 3.0 | Power BI and intelligence | Solo INR 80, Duo INR 120, Trio INR 150 | Up to INR 3,000 | Executive dashboards, data visualization, and analytical decision-making |
| Survival Showdown 2.0 | WWE 2K26 esports | Solo INR 50, Duo INR 100 | INR 1,500 | Tag-team gameplay, knockout rounds, live commentary, and a grand finale |
| Game of Bids 2026 | IPL auction and strategy | Team of 2-4: INR 200 | Up to INR 4,000 | Live bidding, an INR 80 Crore purse, squad building, and franchise strategy |
| Founders Gone Wild | Startup ideation and AI | Duo INR 100, Team of 3-5 INR 150 | Up to INR 3,000 | Gamified idea cards, quizzes, AI-assisted ideation, and live startup pitches |

Every event has its own registration link, event coordinators, detailed participation information, and prize details in the website UI.

## Event-Day Schedule

| Act | Time | Event | Location |
| --- | --- | --- | --- |
| Act I | 11:30 AM - 1:00 PM | DataVerse 5.0 | Data Science Computing Suites |
| Act II | 1:45 PM - 3:30 PM | VizMinds 3.0 | Data Lab 3 and Visual Studio |
| Act III | 2:00 PM - 4:00 PM | Founders Gone Wild | Innovation Hub and Pitch Deck Studio |
| Act IV | 3:30 PM - 5:15 PM | Game of Bids 2026 | Seminar Hall B - Auction Floor |
| Act V | 2:00 PM - 4:30 PM | Survival Showdown 2.0 | The Colosseum Arena, Gaming Lab |

## Website Experience

### Main journey

- Full-screen, frame-by-frame Odyssey scroll experience with five mythic stages.
- Theme progression from the Spartan Ember to the Cyber Nexus of Ithaca.
- Animated visual transitions, ambient styling, and synthesized interaction sounds.

### Event discovery

- Event cards organized by data, gaming, strategy, and startup categories.
- Detailed event modals with descriptions, reasons to participate, formats, workshops, registration tiers, prize pools, and coordinator contacts.
- Direct registration buttons connected to the event's Google Form or registration page.

### Trailers page

The trailers view provides a dedicated video experience for all five arenas, including:

- Event trailer playback with play, pause, mute, seek, restart, and fullscreen controls.
- Event thumbnails, highlights, venue, date, prize pool, and registration links.
- Share and copy-link actions for event trailer pages.
- Responsive layouts for desktop and mobile screens.

Open the trailers view with the **Trailers** navigation control or by visiting `#trailers`.

### Team and FAQ section

- Lead mentor and lead coordinator showcase.
- Core team heads for technical, registration, media, documentation, and decoration operations.
- Event coordinator directory with contact numbers and poster lightboxes.
- Frequently asked questions covering eligibility, certificates, multiple-event participation, workshops, and registrations.

## Navigation Hashes

The single-page application uses hash navigation for direct access to views and sections:

- `#hero` - return to the top of the Odyssey journey
- `#timeline` - open the event-day itinerary
- `#events` - browse the flagship arenas
- `#contact-lead-team` - jump to the lead team section
- `#trailers` - open the event trailers view

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4 with the Tailwind Vite plugin
- Motion for UI animation
- Lucide React for interface icons
- HTML5 video for event trailers
- CSS and Web Audio API-based utilities for interaction audio

The application is a client-side frontend. Registration is handled through the external links configured in `src/data/eventsData.ts` and `src/components/TrailersPage.tsx`; no application database or backend server is required to run the website locally.

## Project Structure

```text
.
├── public/
│   └── videos/                 Event trailer videos served as static files
├── event videos/               Source/event video collection
├── src/
│   ├── assets/images/          Logos, event art, and team posters
│   ├── components/             Navigation, sections, modals, and trailer view
│   ├── data/eventsData.ts      Event, team, pricing, and Odyssey stage data
│   ├── utils/audioSynth.ts     Interaction audio helpers
│   ├── App.tsx                 Main view and hash-navigation controller
│   ├── index.css               Global styles and design tokens
│   └── main.tsx                React application entry point
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Run Locally

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The Vite server runs on port `3000` by default and is available at `http://localhost:3000`.

### Validate the project

Run the TypeScript check:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The project produces a static Vite build in `dist/`. Deploy that directory to any static hosting provider that supports single-page applications, such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

For a static host, configure SPA fallback behavior so application routes and hash links load `index.html`. The bundled event videos and image assets are served from `public/` and are included in the production build output.

## Content Updates

To update event details, registration links, pricing, coordinators, colors, or Odyssey stages, edit `src/data/eventsData.ts`. To update trailer metadata or video mappings, edit the `TRAILERS` collection in `src/components/TrailersPage.tsx` and place the corresponding video files in `public/videos/`.

Before publishing content changes, run both `npm run lint` and `npm run build`.

