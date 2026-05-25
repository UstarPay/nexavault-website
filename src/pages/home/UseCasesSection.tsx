import type { PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { CardItem } from './types';

const handleCardMove = (event: PointerEvent<HTMLElement>) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;
  card.style.setProperty('--mx', `${px * 100}%`);
  card.style.setProperty('--my', `${py * 100}%`);
  card.style.setProperty('--ry', `${(px - 0.5) * 9}deg`);
  card.style.setProperty('--rx', `${(0.5 - py) * 7}deg`);
};

const resetCard = (event: PointerEvent<HTMLElement>) => {
  const card = event.currentTarget;
  card.style.setProperty('--mx', '50%');
  card.style.setProperty('--my', '0%');
  card.style.setProperty('--rx', '0deg');
  card.style.setProperty('--ry', '0deg');
};

const UseCasesSection = () => {
  const { t } = useTranslation();
  const items = t('cases.items', { returnObjects: true }) as CardItem[];

  return (
    <section id="use-cases" className="social-proof">
      <div className="shell">
        <div className="section-head case-head">
          <span>{t('cases.kicker')}</span>
          <h2>{t('cases.title')}</h2>
          <p>{t('cases.copy')}</p>
        </div>
        <div className="use-cases review-grid">
          {items.map((item) => (
            <article className="case" key={item.title} onPointerMove={handleCardMove} onPointerLeave={resetCard}>
              <div className="stars">★★★★★</div>
              <div className="case-top">
                <h3>{item.title}</h3>
                <span className="arrow" aria-hidden="true">↗</span>
              </div>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
