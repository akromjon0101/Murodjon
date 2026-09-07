import { WatercolorBouquet } from './decor.jsx';

/* Fixed decorative background — a warm ivory ground with soft colour washes
   and two watercolor bouquets anchored at opposite corners. Minimal enough
   that content still breathes. */
export default function PageBackground() {
  return (
    <div className="page-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="page-bg__wash" />
      <WatercolorBouquet id="bg1" className="page-bg__bq page-bg__bq--tr" />
      <WatercolorBouquet id="bg2" flip className="page-bg__bq page-bg__bq--bl" />
    </div>
  );
}
