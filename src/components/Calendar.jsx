import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { wedding } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import { SparkleRule, EucalyptusSprig } from './decor.jsx';

const HEART_FILL =
  'M50 87 C 22 66 9 48 9 31 C 9 17 21 9 33 9 C 43 9 48 15 50 23 C 52 15 57 9 67 9 C 79 9 91 17 91 31 C 91 48 78 66 50 87 Z';
const HEART_LINE_1 =
  'M50 86 C 23 66 10 48 10 31 C 10 17 22 9 34 10 C 43 10 49 16 50 24 C 52 15 58 9 68 9 C 79 10 90 18 90 31 C 90 47 78 65 50 86 Z';
const HEART_LINE_2 =
  'M50 89 C 21 67 8 47 9 30 C 9 16 20 8 33 8 C 44 8 48 15 51 22 C 53 14 59 8 68 8 C 81 8 92 17 91 32 C 91 49 79 67 50 89 Z';

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const lerp = (a, b, t) => a + (b - a) * t;
// map v in [i0,i1] to [o0,o1], clamped
const range = (v, i0, i1, o0, o1) => lerp(o0, o1, clamp01((v - i0) / (i1 - i0)));

/* Progress (0→1) of an element travelling through the viewport:
   0 when its top sits at the viewport bottom, 1 when the element's centre
   reaches the viewport centre. Sampled on a rAF loop from getBoundingClientRect
   so it stays correct regardless of which element actually owns the scroll. */
function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    let last = -1;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const startTop = vh; // section top at the viewport bottom → progress 0
      const endTop = vh * 0.18; // section top near the top of the viewport → progress 1
      const next = clamp01((startTop - r.top) / (startTop - endTop));
      if (Math.abs(next - last) > 0.001) {
        last = next;
        setP(next);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // safety net for environments where scroll events / rAF are throttled
    const id = window.setInterval(compute, 150);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.clearInterval(id);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

export default function Calendar() {
  const { t } = useLang();
  const { year, month, day } = wedding.date; // month 1-indexed
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);

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
    <section ref={sectionRef} id="calendar" className="relative overflow-hidden px-6 py-16 sm:py-24">
      <EucalyptusSprig flip className="pointer-events-none absolute -right-10 top-12 w-40 opacity-35 sm:right-4 sm:w-52" />
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
                  {d === day && <WeddingDay day={d} progress={progress} />}
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

function WeddingDay({ day, progress }) {
  const reduce = useReducedMotion();
  const p = reduce ? 1 : progress;
  const arrived = p >= 0.8;

  // eased flight values
  const travel = clamp01(p / 0.72);
  const x = lerp(-44, 0, travel * travel * (3 - 2 * travel)); // smoothstep
  const rot = p < 0.75 ? lerp(-24, 6, clamp01(p / 0.75)) : lerp(6, -3, clamp01((p - 0.75) / 0.25));
  const scale =
    p < 0.68 ? lerp(0.5, 1.12, clamp01(p / 0.68)) : lerp(1.12, 1, clamp01((p - 0.68) / 0.32));
  const heartOpacity = reduce ? 1 : clamp01(p / 0.08);

  const glow = reduce ? 0.95 : range(p, 0.55, 1, 0, 0.95);
  const fill = reduce ? 0.14 : range(p, 0.72, 1, 0, 0.16);
  const line2 = reduce ? 0.9 : range(p, 0.4, 0.7, 0, 0.9);
  const trail =
    reduce || p <= 0.04
      ? 0
      : p < 0.16
        ? range(p, 0.04, 0.16, 0, 0.7)
        : p < 0.62
          ? 0.65
          : range(p, 0.62, 0.82, 0.65, 0);

  return (
    <div className={`cal-day ${arrived ? 'cal-day--arrived' : ''} ${reduce ? 'cal-day--static' : ''}`}>
      <span className="cal-day__glow" style={{ opacity: glow }} aria-hidden="true" />

      {!reduce && (
        <svg
          className="cal-day__trail"
          viewBox="0 0 320 46"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ opacity: trail, transform: `translateY(-50%) scaleX(${lerp(0.25, 1, travel)})` }}
        >
          <path d="M2 44 C 88 44 150 8 318 12" strokeDasharray="2 5" />
        </svg>
      )}

      <svg
        className="cal-day__heart"
        viewBox="0 0 100 100"
        aria-hidden="true"
        style={{
          opacity: heartOpacity,
          transform: `translateX(${x}vw) rotate(${rot}deg) scale(${scale})`,
        }}
      >
        <path className="cal-day__heart-fill" style={{ fillOpacity: fill }} d={HEART_FILL} />
        <path className="cal-day__heart-line cal-day__heart-line--1" d={HEART_LINE_1} />
        <path
          className="cal-day__heart-line cal-day__heart-line--2"
          style={{ opacity: line2 }}
          d={HEART_LINE_2}
        />
      </svg>

      <span className="cal-day__num font-display">{day}</span>

      {!reduce &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="cal-day__petal"
            style={{ '--a': `${(i / 6) * 360 + 15}deg`, '--d': `${i * 55}ms` }}
            aria-hidden="true"
          />
        ))}
    </div>
  );
}
