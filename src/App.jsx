import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from './data/wedding.js';
import OpeningEnvelope from './components/OpeningEnvelope.jsx';
import FloatingDecorations from './components/FloatingDecorations.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Hero from './components/Hero.jsx';
import Journey from './components/Journey.jsx';
import Vow from './components/Vow.jsx';
import Calendar from './components/Calendar.jsx';
import Countdown from './components/Countdown.jsx';
import WeddingInfo from './components/WeddingInfo.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import LangSwitch from './components/LangSwitch.jsx';
import PageBackground from './components/PageBackground.jsx';

const Venue = lazy(() => import('./components/Venue.jsx'));
const ClosingMessage = lazy(() => import('./components/ClosingMessage.jsx'));

const MUSIC_START = Math.max(0, wedding.musicStart || 0);

export default function App() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicOk, setMusicOk] = useState(Boolean(wedding.musicSrc));
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Verify the track is a real audio file before trusting the control.
  useEffect(() => {
    if (!wedding.musicSrc) return undefined;
    let cancelled = false;
    fetch(wedding.musicSrc, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || '';
        if (!cancelled && (!res.ok || !/audio|mpeg|octet-stream/i.test(type))) setMusicOk(false);
      })
      .catch(() => {
        if (!cancelled) setMusicOk(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const seekToStart = useCallback((el) => {
    if (!MUSIC_START) return;
    const apply = () => {
      try {
        if (el.currentTime < MUSIC_START - 0.5) el.currentTime = MUSIC_START;
      } catch {
        /* not seekable yet */
      }
    };
    if (el.readyState >= 1) apply();
    else el.addEventListener('loadedmetadata', apply, { once: true });
  }, []);

  // Called synchronously from the envelope's open click — a real user gesture,
  // so the browser allows playback to begin.
  const startMusic = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    seekToStart(el);
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [seekToStart]);

  const toggleMusic = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) startMusic();
    else {
      el.pause();
      setPlaying(false);
    }
  }, [startMusic]);

  const handleEnded = () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.currentTime = MUSIC_START;
    } catch {
      /* ignore */
    }
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const handleOpen = () => {
    setOpen(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <LangSwitch />
      <OpeningEnvelope onOpen={handleOpen} onIntent={startMusic} />

      {wedding.musicSrc && (
        <audio
          ref={audioRef}
          src={wedding.musicSrc}
          preload="auto"
          onEnded={handleEnded}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      {open && (
        <>
          <PageBackground />
          <ScrollProgress />
          <main className="site-main relative z-10">
            <FloatingDecorations />

            <div className="relative z-10">
              <Hero />
              <Journey />
              <Vow />
              <Calendar />
              <Countdown />
              <Suspense fallback={<div className="py-24" />}>
                <Venue />
                <WeddingInfo />
                <ClosingMessage />
              </Suspense>
            </div>
          </main>
        </>
      )}

      <MusicPlayer visible={open && musicOk} playing={playing} onToggle={toggleMusic} />
    </>
  );
}
