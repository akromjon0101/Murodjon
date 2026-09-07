import { wedding } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import { IconLocation } from './decor.jsx';

export default function Venue() {
  const { t } = useLang();
  const { venue } = wedding;

  return (
    <section id="venue" className="relative overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal preset="fade-up">
          <p className="heading-eyebrow">{t.weddingVenue}</p>
          <div className="mt-5 flex justify-center">
            <span className="loc-pulse relative flex h-12 w-12 items-center justify-center">
              <span className="loc-pulse__ring" aria-hidden="true" />
              <span className="loc-pulse__ring loc-pulse__ring--2" aria-hidden="true" />
              <IconLocation className="relative h-8 w-8 text-navy" />
            </span>
          </div>
          <h2 className="mt-5 font-script text-4xl text-navy sm:text-5xl">{t.venueName}</h2>
          <p className="mt-3 font-serif text-lg tracking-[0.15em] text-stone">{t.venueLocation}</p>
        </Reveal>

        <Reveal preset="blur" delay={0.1}>
          <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-sm border border-cloud shadow-[0_30px_60px_-32px_rgba(58,90,124,0.35)]">
            <div className="relative w-full" style={{ paddingBottom: '66%' }}>
              <iframe
                title={t.venueName}
                src={venue.embedSrc}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </Reveal>

        <Reveal preset="fade" delay={0.2}>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-navy/70 px-8 py-3.5 font-serif text-sm uppercase tracking-widest2 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 active:scale-[0.98]"
          >
            <IconLocation className="h-4 w-4" />
            {t.openInMaps}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
