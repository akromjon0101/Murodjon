# Electronic Wedding Invitation

A premium, cinematic digital wedding invitation — closed envelope opening
animation, hero, animated September 2026 calendar, live countdown, venue map,
information cards and a romantic closing message.

Built with **React + Vite + Tailwind CSS + Framer Motion**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Personalise

Everything text-related lives in **`src/data/wedding.js`**:

| Field | Meaning |
| --- | --- |
| `bride`, `groom` | Names shown throughout |
| `date` | `{ year, month, day, hour, minute }` — drives the calendar **and** the live countdown |
| `dateLabelLong` / `dateLabelShort` | How the date reads in copy |
| `timeLabel` | Ceremony time |
| `venue.name`, `venue.location` | Venue text |
| `venue.embedSrc` | Google Maps `<iframe>` embed URL |
| `venue.mapsUrl` | Where the “Open in Google Maps” button links |
| `journey` | “Bizning Yo‘limiz” / Our Journey — `title`, `subtitle` and a `milestones[]` array (`date`, `title`, `text`) |
| `romanticLine`, `closingMessage` | The romantic phrases |
| `musicSrc` | Background music file (see below) |

The countdown automatically switches to **“Today is the day! ❤️”** once the
target date/time passes.

## Background music

Drop an mp3 at `public/music/wedding.mp3` (path configurable via `musicSrc`).
If the file is missing, the music button hides itself — nothing breaks.
Autoplay is never forced; playback starts only on the user's tap.

## Structure

```
src/
├── components/
│   ├── OpeningEnvelope.jsx   closed envelope + open animation
│   ├── Hero.jsx              couple names + parallax + arch frame
│   ├── Journey.jsx           "Bizning Yo‘limiz" love-story timeline
│   ├── Calendar.jsx          animated September 2026 calendar
│   ├── Countdown.jsx         live countdown timer
│   ├── Venue.jsx             venue + responsive Google Map (lazy)
│   ├── WeddingInfo.jsx       information cards
│   ├── MusicPlayer.jsx       corner music toggle
│   ├── FloatingDecorations.jsx  petals / leaves / butterflies / particles
│   ├── Reveal.jsx            reusable scroll-reveal wrapper
│   ├── ClosingMessage.jsx    romantic closing (lazy)
│   └── decor.jsx             inline SVG florals + line icons
├── data/wedding.js           ← all editable content
├── App.jsx
├── main.jsx
└── index.css
```

## Notes

- Respects `prefers-reduced-motion` (animations collapse, envelope opens instantly).
- Palette: `#FFFFFF #F8F6F2 #E8E5DF #1A1A1A #777777`.
- Fonts: Cormorant Garamond, Playfair Display, Great Vibes (Google Fonts).
- `Venue` and `ClosingMessage` are lazy-loaded; the map iframe is `loading="lazy"`.
