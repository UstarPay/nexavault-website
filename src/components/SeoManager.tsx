import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

const SeoManager = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const isDocsPage = location.pathname === '/docs';
    const title = isDocsPage ? t('meta.docsTitle') : t('meta.title');
    const description = isDocsPage ? t('meta.docsDescription') : t('meta.description');
    const currentUrl = new URL(location.pathname, window.location.origin).toString();
    document.title = title;
    document.documentElement.lang = i18n.resolvedLanguage || i18n.language;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: currentUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'NexaVault' });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: currentUrl });

    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NexaVault',
      url: currentUrl,
      description,
      brand: 'NexaVault',
    };
    let script = document.getElementById('nexavault-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'nexavault-structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [i18n.language, i18n.resolvedLanguage, location.pathname, t]);

  return null;
};

export default SeoManager;
