import { useTranslation } from 'react-i18next';
import BrandLogo from './BrandLogo';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <a href="/" className="brand-link">
          <BrandLogo />
        </a>
        <div className="footer-links" aria-label={t('footer.linksLabel')}>
          <a href="/docs">{t('footer.apiDocs')}</a>
          <span>{t('footer.note')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
