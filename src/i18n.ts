import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

export const supportedLanguages = ['en', 'zh-CN', 'zh-TW'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const languageStorageKey = 'nexavault.website.language';

const resources = {
  en: { translation: en },
  'zh-CN': { translation: zhCN },
  'zh-TW': { translation: zhTW },
};

function normalizeLanguage(language?: string | null): SupportedLanguage {
  const normalized = (language || '').toLowerCase();
  if (normalized === 'zh-cn' || normalized === 'zh-hans' || normalized.startsWith('zh-hans')) return 'zh-CN';
  if (normalized === 'zh-tw' || normalized === 'zh-hant' || normalized.startsWith('zh-hant')) return 'zh-TW';
  if (normalized.startsWith('zh')) return 'zh-CN';
  return 'en';
}

function getUrlLanguage() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') || params.get('lng');
}

function getStoredLanguage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: normalizeLanguage(getUrlLanguage() || getStoredLanguage() || window.navigator.language),
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (language) => {
  const nextLanguage = normalizeLanguage(language);
  document.documentElement.lang = nextLanguage;
  try {
    window.localStorage.setItem(languageStorageKey, nextLanguage);
  } catch {
    // Language switching should still work when storage is unavailable.
  }
});

document.documentElement.lang = normalizeLanguage(i18n.language);

export function changeWebsiteLanguage(language: SupportedLanguage) {
  void i18n.changeLanguage(language);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

export default i18n;
