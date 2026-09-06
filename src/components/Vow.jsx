import { wedding } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import Parallax from './Parallax.jsx';
import { LeafSpray, Sparkle } from './decor.jsx';

/* Full-bleed deep-navy interlude — the dramatic contrast beat. */
export default function Vow() {
  const { t, lang } = useLang();

  return (
    <section
      id="vow"
      className="relative isolate overflow-hidden bg-[#2C3E52] px-6 py-24 text-mist sm:py-32"
    >
      <Parallax amount={22} className="pointer-events-none absolute left-0 top-6 w-56 sm:w-80">
        <LeafSpray className="w-full text-mist/25" />
      </Parallax>
      <Parallax amount={-22} className="pointer-events-none absolute right-0 bottom-6 w-56 sm:w-80">
        <LeafSpray className="w-full text-mist/25" flip />
      </Parallax>

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal preset="fade">
          <div className="mb-8 flex items-center justify-center gap-3 text-mist/60">
            <span className="h-px w-10 bg-mist/40" />
            <Sparkle className="h-3 w-3" />
            <span className="h-px w-10 bg-mist/40" />
          </div>
        </Reveal>

        <Reveal preset="blur" duration={1.4}>
          <blockquote className="font-script text-[2.4rem] leading-[1.25] sm:text-6xl">
            {t.romanticLine}
          </blockquote>
        </Reveal>

        <Reveal preset="fade" delay={0.35}>
          <p className="mt-10 font-serif text-sm uppercase tracking-widest2 text-mist/55">
            {wedding.bride[lang]} &nbsp;&amp;&nbsp; {wedding.groom[lang]}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
