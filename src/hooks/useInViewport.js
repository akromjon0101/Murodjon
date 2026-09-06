import { useEffect, useRef, useState } from 'react';

/**
 * "Has this element been scrolled into view yet" — combines an
 * IntersectionObserver, a scroll/resize listener, and a polling fallback so
 * content can NEVER get stuck hidden (framer's own useInView / whileInView
 * was doing exactly that under this page).
 *
 * Returns [ref, inView]. Once true, stays true.
 */
export default function useInViewport() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
    };

    const isVisible = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };

    if (isVisible()) {
      reveal();
      return undefined;
    }

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal();
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
      );
      io.observe(el);
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (isVisible()) reveal();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // polling fallback for environments where scroll events / IO are throttled
    const poll = setInterval(() => {
      if (isVisible()) reveal();
    }, 400);

    return () => {
      if (io) io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearInterval(poll);
    };
  }, [inView]);

  return [ref, inView];
}
