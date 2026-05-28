import { useTranslation } from 'react-i18next';
import BrandLogo from './BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'products', href: '/#products' },
  { key: 'security', href: '/#security' },
  { key: 'developers', href: '/#developers' },
  { key: 'useCases', href: '/#use-cases' },
];

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="topbar">
      <nav className="nav shell" aria-label={t('meta.navLabel')}>
        <a href="/" className="brand-link">
          <BrandLogo />
        </a>

        <div className="nav-links" aria-label={t('meta.navLabel')}>
          {navItems.map((item) => (
            <a key={item.key} href={item.href}>
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <LanguageSwitcher />
          <a className="secondary nav-secondary" href="/#products">
            {t('nav.viewProducts')}
          </a>
          <a className="primary nav-primary" href="/#contact">
            <span>{t('nav.demo')}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
