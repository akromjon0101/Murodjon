import { Suspense, lazy, useEffect, useState } from 'react';
import OpeningEnvelope from './components/OpeningEnvelope.jsx';
import FloatingDecorations from './components/FloatingDecorations.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Hero from './components/Hero.jsx';
import Journey from './components/Journey.jsx';
import Gallery from './components/Gallery.jsx';
import Vow from './components/Vow.jsx';
import Calendar from './components/Calendar.jsx';
import Countdown from './components/Countdown.jsx';
import WeddingInfo from './components/WeddingInfo.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import LangSwitch from './components/LangSwitch.jsx';
import PageBackground from './components/PageBackground.jsx';

const Venue = lazy(() => import('./components/Venue.jsx'));
const ClosingMessage = lazy(() => import('./components/ClosingMessage.jsx'));

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <LangSwitch />
      <OpeningEnvelope onOpen={handleOpen} />

      {open && (
        <>
          <PageBackground />
          <ScrollProgress />
          <main className="site-main relative z-10">
            <FloatingDecorations />

            <div className="relative z-10">
              <Hero />
              <Journey />
              <Gallery />
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

      <MusicPlayer enabled={open} />
    </>
  );
}
