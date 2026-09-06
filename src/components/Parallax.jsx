import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Wraps children in an element that drifts vertically as it passes through the
 * viewport. This component never unmounts in normal use, so framer-motion's
 * unmount bug can't bite it.
 *
 * `amount`  — total vertical travel in px (negative = moves up).
 * `fade`    — when true, also fades out as the element leaves upward.
 */
export default function Parallax({ children, amount = 60, fade = false, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    fade ? [1, 1, 0.4, 0.1] : [1, 1, 1, 1]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y, opacity }}>{children}</motion.div>
    </div>
  );
}
