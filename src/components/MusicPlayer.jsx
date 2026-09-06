import { useEffect, useRef, useState } from 'react';
import { wedding } from '../data/wedding.js';
import { useLang } from '../i18n/LangContext.jsx';
import { IconMusic, IconPause } from './decor.jsx';

/**
 * Small elegant corner control (pure CSS, no animation library). Never
 * force-plays — autoplay is gated by the browser. Hides itself if the audio
 * file is missing or fails.
 */
export default function MusicPlayer({ enabled }) {
  const { t } = useLang();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return undefined;
    const onErr = () => setAvailable(false);
    el.addEventListener('error', onErr);
    return () => el.removeEventListener('error', onErr);
  }, [enabled]);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
      setPlaying(false);
    }
  };

  if (!enabled || !available) return null;

  return (
    <div
      className="mp-fade fixed bottom-6 right-5 z-40"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <audio ref={audioRef} src={wedding.musicSrc} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
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
