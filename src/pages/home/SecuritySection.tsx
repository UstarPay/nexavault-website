import { useTranslation } from 'react-i18next';
import type { CardItem, StatItem } from './types';

const iconClasses = ['approval', 'risk', 'audit', 'chain'];

const SecuritySection = () => {
  const { t } = useTranslation();
  const stats = t('security.stats', { returnObjects: true }) as StatItem[];
  const items = t('security.items', { returnObjects: true }) as CardItem[];

  return (
    <section id="security" className="security-redesign">
      <div className="shell security-layout">
        <div className="phone-graphic" aria-hidden="true">
          <div className="phone-card p1" />
          <div className="phone-card p2" />
          <div className="wire-globe">
            <span />
            <span />
            <span />
            <b />
          </div>
        </div>
        <div className="security-copy-panel">
          <span className="security-kicker">
            <i />
            <span>{t('security.kicker')}</span>
          </span>
          <h2>{t('security.title')}</h2>
          <p>{t('security.copy')}</p>
          <div className="security-stats" aria-label={t('security.title')}>
            {stats.map((stat) => (
              <span key={stat.value}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="shell stack icon-row">
        {items.map((item, index) => (
          <article className="stack-row" key={item.title}>
            <span className={`security-icon ${iconClasses[index] || 'approval'}`} aria-hidden="true" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SecuritySection;
