import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';
import { IconCalendar, IconClock, IconVenue, IconLocation, SparkleRule } from './decor.jsx';

export default function WeddingInfo() {
  const { t } = useLang();

  const cards = [
    { icon: IconCalendar, label: t.labelDate, value: t.dateLong },
    { icon: IconClock, label: t.labelTime, value: t.time },
    { icon: IconVenue, label: t.labelVenue, value: t.venueName },
    { icon: IconLocation, label: t.labelLocation, value: t.venueLocation },
  ];

  return (
    <section id="info" className="relative px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal preset="fade-up">
          <p className="heading-eyebrow">{t.weddingInfo}</p>
          <SparkleRule width="w-16" className="mt-6" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {cards.map(({ icon: Icon, label, value }, i) => (
            <Reveal
              key={label}
              preset={i % 2 === 0 ? 'slide-left' : 'slide-right'}
              delay={i * 0.08}
              duration={0.9}
              className="flex flex-col items-center rounded-sm border border-cloud bg-paper px-5 py-9 shadow-[0_18px_44px_-28px_rgba(58,90,124,0.3)]"
            >
              <Icon className="h-9 w-9 text-navy/70" />
              <span className="mt-5 font-serif text-[0.7rem] uppercase tracking-widest2 text-stone">
                {label}
              </span>
              <span className="mt-2 font-display text-lg text-navy">{value}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
