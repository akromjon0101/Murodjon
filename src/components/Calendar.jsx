import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { wedding } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import useInViewport from '../hooks/useInViewport.js';
import { SparkleRule } from './decor.jsx';

export default function Calendar() {
  const { t } = useLang();
  const { year, month, day } = wedding.date; // month 1-indexed

  const cells = useMemo(() => {
    const first = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // Monday-start
    const arr = [];
    for (let i = 0; i < lead; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [year, month]);

  return (
    <section id="calendar" className="relative px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <Reveal preset="fade-up">
          <p className="heading-eyebrow">{t.saveTheDate}</p>
          <h2 className="mt-4 font-display text-3xl tracking-[0.15em] text-navy sm:text-4xl">
            {t.monthName} {t.year}
          </h2>
          <SparkleRule width="w-16" className="mt-6" />
        </Reveal>

        <Reveal preset="scale" delay={0.1}>
          <div className="mt-10 rounded-sm border border-cloud bg-paper p-5 shadow-[0_25px_50px_-28px_rgba(58,90,124,0.28)] sm:p-8">
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {t.weekdaysShort.map((w, i) => (
                <div
                  key={i}
                  className="pb-3 font-serif text-[0.7rem] uppercase tracking-[0.16em] text-stone sm:text-xs"
                >
                  {w}
                </div>
              ))}

              {cells.map((d, i) => (
                <div key={i} className="relative flex aspect-square items-center justify-center">
                  {d && d !== day && (
                    <span className="font-serif text-base text-ink/75 sm:text-lg">{d}</span>
                  )}
                  {d === day && <WeddingDay day={d} />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal preset="fade" delay={0.2}>
          <p className="mt-8 font-serif text-lg italic text-stone">
            {t.dateLong} · {t.time}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WeddingDay({ day }) {
  const reduce = useReducedMotion();
  const [ref, active] = useInViewport();
  const on = active || reduce;

  return (
    <div ref={ref} className={`cal-day ${on ? 'cal-day--in' : ''}`}>
      <span className="cal-day__glow" aria-hidden="true" />

      {/* a sketchy hand-drawn heart — two offset pen strokes */}
      <svg className="cal-day__heart" viewBox="0 0 100 100" aria-hidden="true">
        <path
          className="cal-day__heart-fill"
          d="M50 87 C 22 66 9 48 9 31 C 9 17 21 9 33 9 C 43 9 48 15 50 23 C 52 15 57 9 67 9 C 79 9 91 17 91 31 C 91 48 78 66 50 87 Z"
        />
        <path
          className="cal-day__heart-line cal-day__heart-line--1"
          pathLength="1"
          d="M50 86 C 23 66 10 48 10 31 C 10 17 22 9 34 10 C 43 10 49 16 50 24 C 52 15 58 9 68 9 C 79 10 90 18 90 31 C 90 47 78 65 50 86 Z"
        />
        <path
          className="cal-day__heart-line cal-day__heart-line--2"
          pathLength="1"
          d="M50 89 C 21 67 8 47 9 30 C 9 16 20 8 33 8 C 44 8 48 15 51 22 C 53 14 59 8 68 8 C 81 8 92 17 91 32 C 91 49 79 67 50 89 Z"
        />
      </svg>

      <span className="cal-day__num font-display">{day}</span>

      {!reduce &&
        [0, 1, 2, 3, 4].map((p) => (
          <span
            key={p}
            className="cal-day__petal"
            style={{ '--a': `${(p / 5) * 360 + 12}deg`, '--d': `${p * 60}ms` }}
            aria-hidden="true"
          />
        ))}
    </div>
  );
}
