import { LANGS, LANG_LABEL } from '../data/i18n.js';
import { useLang } from '../i18n/LangContext.jsx';

/* Language toggle — bottom-left corner, mirroring the music button. */
export default function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="lang-switch fixed bottom-6 left-5 z-[70] flex overflow-hidden rounded-full border border-navy/20 bg-paper/95 shadow-[0_10px_30px_-10px_rgba(58,90,124,0.4)]"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-3 py-2 font-serif text-[0.6rem] uppercase tracking-[0.18em] transition-colors sm:text-[0.68rem] ${
            lang === l ? 'bg-navy text-paper' : 'text-stone hover:text-navy'
          }`}
        >
          {LANG_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
