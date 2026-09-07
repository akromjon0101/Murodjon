import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding, initials } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import { GoldDecoCorner, SparkleRule, Monogram, Petal } from './decor.jsx';

const OPEN_MS = 2050; // envelope animation → reveal the site
const LEAVE_MS = 1150; // overlay fade / zoom-out → fully unmount

/* Pure-CSS opening animation. Deliberately NO framer-motion here (it was
   freezing under load and crashing on unmount). */
export default function OpeningEnvelope({ onOpen, onIntent }) {
  const { t, lang } = useLang();
  const reduceRef = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const firedRef = useRef(false);
  const [phase, setPhase] = useState('closed'); // closed → opening → leaving → gone

  const handleOpen = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    // Fire synchronously, inside the click's user gesture, so audio can start.
    onIntent?.();
    setPhase((p) => {
      if (p !== 'closed') return p;
      if (reduceRef.current) {
        onOpen();
        return 'gone';
      }
      window.setTimeout(() => {
        onOpen();
        setPhase('leaving');
      }, OPEN_MS);
      return 'opening';
    });
  }, [onOpen, onIntent]);

  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const id = window.setTimeout(() => setPhase('gone'), LEAVE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === 'gone') return null;

  const opening = phase === 'opening' || phase === 'leaving';
  const bride = wedding.bride[lang];
  const groom = wedding.groom[lang];

  return (
    <div
      className={`envelope-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fbf7f0] px-6 ${
        phase === 'closed' ? 'cursor-pointer' : ''
      } ${phase === 'leaving' ? 'envelope-overlay--leaving' : ''}`}
      data-open={opening ? 'true' : 'false'}
      role="button"
      tabIndex={0}
      aria-label={t.openInvitation}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      {wedding.bgPhoto && (
        <>
          <div
            className="env-photo pointer-events-none absolute inset-0"
            style={{ backgroundImage: `url(${wedding.bgPhoto})` }}
          />
          <div className="env-photo-veil pointer-events-none absolute inset-0" />
        </>
      )}
      <GoldDecoCorner className="pointer-events-none absolute left-4 top-4 w-12 opacity-70 sm:w-20" />
      <GoldDecoCorner className="pointer-events-none absolute right-4 top-4 w-12 -scale-x-100 opacity-70 sm:w-20" />
      <GoldDecoCorner className="pointer-events-none absolute left-4 bottom-4 w-12 -scale-y-100 opacity-70 sm:w-20" />
      <GoldDecoCorner className="pointer-events-none absolute right-4 bottom-4 w-12 -scale-100 opacity-70 sm:w-20" />

      <div className="env-stage relative w-full max-w-md">
        <p className="env-eyebrow heading-eyebrow text-center">{t.familiesLine}</p>

        <div className="relative mx-auto mt-6 aspect-[3/2] w-full max-w-sm [perspective:1600px]">
          <div className="env-card absolute inset-x-6 top-3 z-10 rounded-t-[999px] rounded-b-[4px] border border-cloud bg-paper px-5 pb-6 pt-9 text-center shadow-[0_24px_50px_-18px_rgba(58,90,124,0.28)]">
            <Monogram a={initials.bride} b={initials.groom} className="mx-auto h-14 w-14 text-navy/70" />
            <p className="mt-2 font-script text-2xl text-navy">
              {bride} &amp; {groom}
            </p>
            <p className="mt-1 font-serif text-[0.65rem] uppercase tracking-widest2 text-stone">
              {t.dateShort}
            </p>
          </div>

          <div className="absolute inset-0 rounded-[5px] bg-paper shadow-[0_34px_70px_-24px_rgba(58,90,124,0.25)] ring-1 ring-cloud" />
          <div className="absolute inset-0 z-20 overflow-hidden rounded-[5px]">
            <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <path d="M2 198 L150 96 L298 198 Z" fill="#FFFFFF" stroke="#DDE6EF" strokeWidth="1.4" />
              <path d="M2 4 L118 98 M298 4 L182 98" stroke="#E7EEF5" strokeWidth="1.4" />
              <rect x="2" y="2" width="296" height="196" rx="4" stroke="#DDE6EF" strokeWidth="1" />
            </svg>
          </div>

          {/* wax seal — single piece, scales away (no splitting) */}
          <div className="absolute left-1/2 top-1/2 z-40 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
            <span className="env-seal flex h-full w-full items-center justify-center rounded-full bg-navy text-paper">
              <span className="whitespace-nowrap font-script text-lg leading-none tracking-[0.1em]">
                {initials.bride}&thinsp;{initials.groom}
              </span>
            </span>
            <span className="env-seal-pulse" aria-hidden="true" />
          </div>

          {/* flap */}
          <div className="env-flap absolute inset-x-0 top-0 z-30 origin-top">
            <svg viewBox="0 0 300 122" className="h-auto w-full drop-shadow-[0_8px_12px_rgba(58,90,124,0.12)]" aria-hidden="true">
              <path d="M0 0 H300 L150 120 Z" fill="#FFFFFF" stroke="#DDE6EF" strokeWidth="1.4" />
            </svg>
          </div>

          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="env-petal"
              style={{ '--a': `${(i / 10) * 360}deg`, '--d': `${i * 35}ms` }}
              aria-hidden="true"
            >
              <Petal className="h-3 w-3" fill={i % 2 ? '#D9A9AE' : '#9DB8D6'} />
            </span>
          ))}
        </div>

        <div className="env-cta">
          <SparkleRule width="w-24" className="mx-auto mt-9" />
          <h1 className="mt-6 text-center font-script text-4xl text-navy sm:text-5xl">
            {bride} &amp; {groom}
          </h1>
          <p className="mt-2 text-center font-serif text-xs uppercase tracking-widest2 text-stone">
            {t.dateShort}
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-navy/70 px-9 py-3.5 font-serif text-sm uppercase tracking-widest2 text-navy transition-colors duration-500 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
            >
              <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-navy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
              {t.openInvitation}
            </button>
          </div>
          <p className="mt-4 text-center font-serif text-[0.7rem] italic text-stone/70">{t.tapAnywhere}</p>
        </div>
      </div>
    </div>
  );
}
