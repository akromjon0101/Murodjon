import { useEffect, useMemo, useState } from 'react';
import { weddingDate } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import { SparkleRule, EucalyptusSprig } from './decor.jsx';

function getRemaining(target) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(diff / 1000);
  return {
    done: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown() {
  const { t } = useLang();
  const [time, setTime] = useState(() => getRemaining(weddingDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(weddingDate)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = useMemo(
    () => [
      { label: t.days, value: time.days },
      { label: t.hours, value: time.hours },
      { label: t.minutes, value: time.minutes },
      { label: t.seconds, value: time.seconds },
    ],
    [time, t]
  );

  return (
    <section id="countdown" className="relative overflow-hidden px-6 py-16 sm:py-24">
      <EucalyptusSprig className="pointer-events-none absolute -left-10 top-12 w-40 opacity-35 sm:left-4 sm:w-52" />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal preset="fade-up">
          <p className="heading-eyebrow">{t.countingMoments}</p>
          <SparkleRule width="w-16" className="mt-6" />
        </Reveal>

        {time.done ? (
          <Reveal preset="scale" delay={0.1}>
            <p className="mt-12 font-script text-4xl text-navy sm:text-6xl">{t.todayIsTheDay}</p>
          </Reveal>
        ) : (
          <Reveal preset="fade-up" delay={0.1}>
            {/* thin gold-framed plaque, divided into four */}
            <div className="mx-auto mt-12 flex max-w-md divide-x divide-gold/35 border-y border-gold/55 sm:max-w-lg">
              {units.map((u) => (
                <Unit key={u.label} label={u.label} value={u.value} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Unit({ label, value }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-1 flex-col items-center px-1 py-4 sm:px-2 sm:py-6">
      <span
        key={display}
        className="cd-digit font-display tabular-nums leading-none text-navy [font-size:clamp(1.7rem,8vw,3.4rem)]"
      >
        {display}
      </span>
      <span className="mt-3 whitespace-nowrap font-serif text-[0.5rem] uppercase tracking-[0.18em] text-stone sm:mt-4 sm:text-[0.66rem] sm:tracking-[0.26em]">
        {label}
      </span>
    </div>
  );
}
