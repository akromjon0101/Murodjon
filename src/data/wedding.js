// Structural wedding config (dates, links, assets). All display text lives in
// src/data/i18n.js so the invitation can switch languages.

export const wedding = {
  // Names per language (keep Latin spelling if you prefer it everywhere).
  bride: { uz: 'Madina', ru: 'Мадина', en: 'Madina' },
  groom: { uz: 'Murodjon', ru: 'Муроджон', en: 'Murodjon' },

  // Ceremony date & time (local). Month is 1-indexed for readability.
  date: { year: 2026, month: 9, day: 10, hour: 15, minute: 0 },

  venue: {
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=SAFINA+to%27yxonasi+Andijon',
    embedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.2286339576485!2d72.63811113113255!3d40.722580174910874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bcfdf05c16752f%3A0x7f4d6d6b4ec4887!2zLCwgU0FGSU5BJycgdG_igJh5eG9uYXNp!5e0!3m2!1sru!2s!4v1788704377469!5m2!1sru!2s',
  },

  // Optional background music. Drop an mp3 at public/music/wedding.mp3
  // (or point this at any hosted URL). Missing files fail gracefully.
  musicSrc: '/music/wedding.mp3',

  // Photo gallery. Drop images at public/gallery/photo-1.jpg … photo-6.jpg
  // (jpg or webp — just match the name). Any that are missing show a soft
  // watercolor placeholder instead, so the section always looks intentional.
  gallery: [
    '/gallery/photo-1.jpg',
    '/gallery/photo-2.jpg',
    '/gallery/photo-3.jpg',
    '/gallery/photo-4.jpg',
    '/gallery/photo-5.jpg',
    '/gallery/photo-6.jpg',
  ],
};

// JS Date for the ceremony (month is 0-indexed for the Date constructor).
export const weddingDate = new Date(
  wedding.date.year,
  wedding.date.month - 1,
  wedding.date.day,
  wedding.date.hour,
  wedding.date.minute,
  0
);

// Initials for the monogram (language-independent).
export const initials = {
  bride: wedding.bride.en[0],
  groom: wedding.groom.en[0],
};
