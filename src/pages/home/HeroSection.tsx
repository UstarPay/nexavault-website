import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero deck-hero">
      <div className="shell hero-grid deck-hero-grid">
        <div className="deck-hero-copy">
          <span className="eyebrow">
            <i className="pulse" />
            <span>{t('hero.eyebrow')}</span>
          </span>
          <h1>NexaVault</h1>
          <p className="hero-copy">{t('hero.copy')}</p>
          <div className="hero-actions">
            <a className="primary" href="#contact">
              <span>{t('hero.primary')}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="secondary" href="#developers">
              {t('hero.secondary')}
            </a>
          </div>
          <div className="metrics" aria-label={t('hero.metricsLabel')}>
            <div className="metric">
              <strong>$84B+</strong>
              <span>{t('hero.assets')}</span>
            </div>
            <div className="metric">
              <strong>420+</strong>
              <span>{t('hero.networks')}</span>
            </div>
            <div className="metric">
              <strong>99.99%</strong>
              <span>{t('hero.uptime')}</span>
            </div>
          </div>
        </div>

        <div className="hero-crypto-art" aria-label={t('hero.visualLabel')}>
          <div className="coin-orbit" aria-hidden="true">
            <span className="orbital o1">B</span>
            <span className="orbital o2">E</span>
            <span className="orbital o3">$</span>
          </div>
          <div className="vault-stack" aria-hidden="true">
            <span className="vault-layer" />
            <span className="vault-layer" />
            <span className="vault-layer" />
            <span className="vault-symbol">₿</span>
          </div>
          <div className="floating-console">
            <div className="console-row">
              <span>{t('hero.node1')}</span>
              <b>{t('hero.live')}</b>
            </div>
            <div className="console-row">
              <span>{t('hero.node2')}</span>
              <b>99.99%</b>
            </div>
            <div className="console-row">
              <span>{t('hero.node3')}</span>
              <b>420+</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
