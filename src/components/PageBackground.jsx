import { WatercolorSpray } from './decor.jsx';

/* Fixed decorative background — a warm ivory ground with two soft, well-
   separated colour washes and one large, very faint watercolor branch.
   Deliberately minimal so the content breathes. */
export default function PageBackground() {
  return (
    <div className="page-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="page-bg__wash" />
      <WatercolorSpray id="bg" className="page-bg__spray page-bg__spray--tr" />
      <WatercolorSpray id="bg2" flip className="page-bg__spray page-bg__spray--bl" />
    </div>
  );
}
