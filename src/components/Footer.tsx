import { useTranslation } from 'react-i18next';
import BrandLogo from './BrandLogo';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <a href="#" className="brand-link">
          <BrandLogo />
        </a>
        <span>{t('footer.note')}</span>
      </div>
    </footer>
  );
};

export default Footer;
