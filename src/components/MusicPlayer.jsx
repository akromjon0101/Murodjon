import { useLang } from '../i18n/LangContext.jsx';
import { IconMusic, IconPause } from './decor.jsx';

/**
 * Small elegant corner control. Purely presentational — the audio element and
 * all playback logic live in App (so playback can start on the opening gesture
 * and loop from `wedding.musicStart`).
 */
export default function MusicPlayer({ visible, playing, onToggle }) {
  const { t } = useLang();
  if (!visible) return null;

  return (
    <div
      className="mp-fade fixed bottom-6 right-5 z-40"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? t.pauseMusic : t.playMusic}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-navy/40 bg-paper/95 text-navy shadow-[0_10px_30px_-10px_rgba(58,90,124,0.4)] transition-colors hover:bg-navy hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
      >
        <span
          className={`pointer-events-none absolute inset-[-4px] rounded-full border border-dashed border-gold/50 ${
            playing ? 'animate-spin-slow' : ''
          }`}
        />
        {playing ? <IconPause className="h-5 w-5" /> : <IconMusic className="h-5 w-5" />}
      </button>
    </div>
  );
}
