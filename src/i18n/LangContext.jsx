import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, strings } from '../data/i18n.js';

const KEY = 'wedding-lang';
const LangContext = createContext(null);

const DEFAULT_LANG = 'uz';

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && LANGS.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  // Default to Uzbek for everyone; visitors can still switch manually.
  return DEFAULT_LANG;
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: strings[lang] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within <LangProvider>');
  return ctx;
}
