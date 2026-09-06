import useInViewport from '../hooks/useInViewport.js';

/**
 * Scroll-reveal wrapper — pure CSS transitions toggled by a plain
 * IntersectionObserver. No framer-motion here: framer's in-view animations
 * were freezing mid-transition under this page's animation load. CSS
 * transitions cannot get stuck.
 */
export default function Reveal({
  children,
  preset = 'fade-up',
  delay = 0,
  duration = 1.1,
  className = '',
  as: Tag = 'div',
}) {
  const [ref, inView] = useInViewport();

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${preset} ${inView ? 'reveal--in' : ''} ${className}`}
      style={{ transitionDuration: `${duration}s`, transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
