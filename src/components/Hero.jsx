import { wedding, initials } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import { Monogram, SparkleRule, ArchLine, WatercolorBouquet, GoldDecoCorner } from './decor.jsx';

export default function Hero() {
  const { t, lang } = useLang();
  const bride = wedding.bride[lang];
  const groom = wedding.groom[lang];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-28 pt-20"
    >
      {/* watercolor bouquets framing the hero, top-left & bottom-right */}
      <WatercolorBouquet
        id="hero-bq-l"
        className="pointer-events-none absolute -left-24 -top-16 w-[78vw] max-w-[380px] opacity-50 sm:-left-10 sm:w-[34vw] lg:w-[30vw]"
      />
      <WatercolorBouquet
        id="hero-bq-r"
        flip
        className="pointer-events-none absolute -right-24 -bottom-16 w-[70vw] max-w-[340px] opacity-40 sm:-right-10 sm:w-[30vw] lg:w-[26vw]"
      />

      {/* slim gold editorial corners */}
      <GoldDecoCorner className="pointer-events-none absolute right-5 top-5 hidden w-16 -scale-x-100 opacity-70 sm:block sm:w-20" />
      <GoldDecoCorner className="pointer-events-none absolute left-5 bottom-5 hidden w-16 -scale-y-100 opacity-70 sm:block sm:w-20" />

      {/* soft light behind the names */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[86vw] w-[86vw] max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(253,251,247,0.9), rgba(253,251,247,0) 68%)' }}
      />

      {/* thin arch framing the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-6 mx-auto w-[min(88vw,560px)] text-navy/[0.18]"
      >
        <ArchLine className="h-full w-full" />
      </div>

      <div className="hero-inner relative z-10 mx-auto max-w-2xl text-center">
        <div className="hero-rise" style={{ '--delay': '0.15s' }}>
          <Monogram
            a={initials.bride}
            b={initials.groom}
            className="mx-auto h-16 w-16 text-navy/75 sm:h-20 sm:w-20"
          />
          <p className="mx-auto mt-7 max-w-[15rem] font-serif text-xs uppercase leading-[1.9] tracking-[0.3em] text-stone sm:max-w-sm sm:text-sm">
            {t.invitePhrase}
          </p>
        </div>

        <h1
          className="hero-name mt-8 font-script text-navy"
          style={{ fontSize: 'clamp(2.9rem, 11vw, 6.5rem)', lineHeight: 1.06, '--delay': '0.3s' }}
        >
          <span className="block">{bride}</span>
          <span className="my-1 block font-display text-[0.32em] italic tracking-[0.14em] text-stone">
            {t.and}
          </span>
          <span className="block">{groom}</span>
        </h1>

        <div
          className="hero-rise mt-9 flex items-center justify-center gap-3 text-gold"
          style={{ '--delay': '0.75s' }}
        >
          <span className="h-px w-14 bg-current opacity-60 sm:w-20" />
          <span className="h-1.5 w-1.5 rotate-45 bg-current" />
          <span className="h-px w-14 bg-current opacity-60 sm:w-20" />
        </div>

        <div className="hero-rise mx-auto mt-8 max-w-[17rem] sm:max-w-sm" style={{ '--delay': '0.9s' }}>
          <p className="font-display text-sm uppercase tracking-[0.42em] text-navy sm:text-base">
            {t.monthName}
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px flex-1 bg-gold/80" />
            <span className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-stone sm:text-xs">
              {t.weekday}
            </span>
            <span className="font-display text-[2rem] leading-none text-gold sm:text-4xl">
              {wedding.date.day}
            </span>
            <span className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-stone sm:text-xs">
              {t.time}
            </span>
            <span className="h-px flex-1 bg-gold/80" />
          </div>
          <p className="mt-3 font-display text-sm tracking-[0.32em] text-stone">{t.year}</p>
          <p className="mt-4 font-serif text-sm italic text-stone">
            {t.venueName}, {t.venueLocation}
          </p>
        </div>

        <p
          className="hero-rise mx-auto mt-7 max-w-md font-serif text-xl italic text-stone sm:text-2xl"
          style={{ '--delay': '1.05s' }}
        >
          “{t.romanticLine}”
        </p>

        <SparkleRule width="w-28" className="hero-rise mt-10" />
      </div>

      <div className="hero-scrollcue absolute bottom-7 left-1/2 -translate-x-1/2 text-stone">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
