import { wedding } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import { GildedBloom, GoldDecoCorner, FlutterButterfly } from './decor.jsx';
import CoupleIllustration from './CoupleIllustration.jsx';

export default function ClosingMessage() {
  const { t, lang } = useLang();

  return (
    <section
      id="closing"
      className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-24"
    >
      <GildedBloom
        id="closing-spray"
        flip
        className="pointer-events-none absolute -right-16 -top-10 w-[58vw] max-w-[300px] opacity-35 sm:-right-4 sm:w-[26vw]"
      />
      <GoldDecoCorner className="pointer-events-none absolute left-4 top-4 hidden w-16 opacity-70 sm:block" />
      <GoldDecoCorner className="pointer-events-none absolute right-4 bottom-4 hidden w-16 -scale-100 opacity-70 sm:block" />

      <div className="mx-auto max-w-2xl text-center">
        <Reveal preset="scale">
          <FlutterButterfly className="mx-auto h-10 w-10 text-navy/60" speed={1.1} />
        </Reveal>

        <Reveal preset="blur" delay={0.1}>
          <p className="mt-10 font-serif text-2xl italic leading-relaxed text-ink sm:text-3xl">
            “{t.closingMessage}”
          </p>
        </Reveal>

        <Reveal preset="fade-up" delay={0.25}>
          <span className="hairline mt-12" />
          <p className="mt-8 font-script text-4xl text-navy sm:text-5xl">
            {wedding.bride[lang]} &amp; {wedding.groom[lang]}
          </p>
          <p className="mt-4 font-serif text-sm uppercase tracking-widest2 text-stone">{t.dateShort}</p>
        </Reveal>

        <Reveal preset="fade-up" delay={0.35}>
          <CoupleIllustration className="mx-auto mt-12 w-48 sm:w-56" />
        </Reveal>
      </div>
    </section>
  );
}
