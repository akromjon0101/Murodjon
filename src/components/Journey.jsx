import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import { Sparkle, SparkleRule } from './decor.jsx';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function Journey() {
  const { t } = useLang();
  const milestones = t.milestones;

  return (
    <section id="journey" className="relative overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <Reveal preset="fade-up">
          <div className="mb-4 flex items-center justify-center gap-2 text-gold">
            <Sparkle className="h-3 w-3" />
            <p className="heading-eyebrow">{t.journeySubtitle}</p>
          </div>
          <h2 className="font-script text-4xl leading-tight text-navy sm:text-5xl">{t.journeyTitle}</h2>
          <SparkleRule width="w-20" className="mt-6" />
        </Reveal>

        <div className="mt-14">
          {milestones.map((m, i) => (
            <div key={i}>
              {i > 0 && (
                <Reveal preset="fade" duration={0.8}>
                  <div className="journey-rule" aria-hidden="true">
                    <span />
                    <Sparkle className="h-2.5 w-2.5" />
                    <span />
                  </div>
                </Reveal>
              )}
              <Reveal preset="fade-up" delay={0.05} className="journey-step">
                <p className="font-display text-2xl italic text-gold sm:text-3xl">{ROMAN[i]}</p>
                <p className="mt-3 font-serif text-xs uppercase tracking-widest2 text-stone">{m.date}</p>
                <h3 className="mt-1 font-display text-2xl text-navy sm:text-[1.7rem]">{m.title}</h3>
                <p className="mx-auto mt-3 max-w-sm font-serif text-lg italic leading-relaxed text-stone">
                  {m.text}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
