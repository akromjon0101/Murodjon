import { useState } from 'react';
import { wedding } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import { SparkleRule, EucalyptusSprig, GildedBloom } from './decor.jsx';

/* Rounded photo cards with a script caption — like keepsake prints laid on the
   table. Missing images fall back to a soft watercolor panel so the section
   always looks finished. Drop files at public/gallery/photo-1.jpg … */

function Card({ src, caption, index }) {
  const [failed, setFailed] = useState(false);

  return (
    <Reveal
      preset={index % 2 === 0 ? 'fade-up' : 'scale'}
      delay={(index % 3) * 0.08}
      duration={0.9}
      className="gallery-card group relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white/70 bg-mist shadow-[0_30px_60px_-32px_rgba(58,90,124,0.45)]"
    >
      {!failed ? (
        <>
          <img
            src={src}
            alt={caption}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
            style={{
              background:
                'linear-gradient(to top, rgba(42,62,82,0.55), rgba(42,62,82,0) 100%)',
            }}
          />
          <span
            className="absolute bottom-5 left-6 font-script text-2xl text-white sm:text-[1.65rem]"
            style={{ textShadow: '0 1px 10px rgba(42,62,82,0.5)' }}
          >
            {caption}
          </span>
        </>
      ) : (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                'linear-gradient(150deg, #eef3f8 0%, #f6edef 55%, #f3ebe0 100%)',
            }}
          >
            <GildedBloom id={`gallery-ph-${index}`} className="w-[86%] opacity-80" />
          </span>
          <span className="absolute bottom-5 left-6 font-script text-2xl text-navy/70 sm:text-[1.65rem]">
            {caption}
          </span>
        </>
      )}
    </Reveal>
  );
}

export default function Gallery() {
  const { t } = useLang();
  const photos = wedding.gallery || [];
  if (!photos.length) return null;

  const captions = t.galleryCaptions || [];

  return (
    <section id="gallery" className="relative overflow-hidden px-6 py-16 sm:py-24">
      <EucalyptusSprig className="pointer-events-none absolute -left-10 top-12 w-40 opacity-35 sm:left-4 sm:w-52" />
      <EucalyptusSprig
        flip
        className="pointer-events-none absolute -right-10 bottom-12 w-40 opacity-35 sm:right-4 sm:w-52"
      />

      <div className="mx-auto max-w-5xl text-center">
        <Reveal preset="fade-up">
          <p className="heading-eyebrow">{t.galleryEyebrow}</p>
          <h2 className="mt-4 font-script text-4xl text-navy sm:text-5xl">{t.galleryTitle}</h2>
          <SparkleRule width="w-16" className="mt-6" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {photos.map((src, i) => (
            <Card key={src} src={src} caption={captions[i] || ''} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
