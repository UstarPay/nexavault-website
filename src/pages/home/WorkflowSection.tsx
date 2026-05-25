import type { PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { CardItem } from './types';

const handleOrbMove = (event: PointerEvent<HTMLDivElement>) => {
  const orb = event.currentTarget;
  const rect = orb.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;
  orb.style.setProperty('--mx', `${px * 100}%`);
  orb.style.setProperty('--my', `${py * 100}%`);
  orb.style.setProperty('--ry', `${(px - 0.5) * 12}deg`);
  orb.style.setProperty('--rx', `${(0.5 - py) * 10}deg`);
  orb.querySelectorAll<HTMLElement>('.workflow-chip').forEach((chip, index) => {
    const strength = (index + 1) * 8;
    chip.style.setProperty('--tx', `${(px - 0.5) * strength}px`);
    chip.style.setProperty('--ty', `${(py - 0.5) * strength}px`);
  });
};

const resetOrb = (event: PointerEvent<HTMLDivElement>) => {
  const orb = event.currentTarget;
  orb.style.setProperty('--mx', '50%');
  orb.style.setProperty('--my', '50%');
  orb.style.setProperty('--rx', '0deg');
  orb.style.setProperty('--ry', '0deg');
  orb.querySelectorAll<HTMLElement>('.workflow-chip').forEach((chip) => {
    chip.style.setProperty('--tx', '0px');
    chip.style.setProperty('--ty', '0px');
  });
};

const WorkflowSection = () => {
  const { t } = useTranslation();
  const steps = t('workflow.steps', { returnObjects: true }) as CardItem[];

  return (
    <section className="token-section">
      <div className="shell token-grid workflow-grid">
        <div className="workflow-orb" aria-hidden="true" onPointerMove={handleOrbMove} onPointerLeave={resetOrb}>
          <span className="workflow-ring r1" />
          <span className="workflow-ring r2" />
          <span className="workflow-core">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <use href="#nexa-logo-symbol" />
            </svg>
          </span>
          <span className="workflow-chip c1 coin-btc" aria-label="BTC">₿</span>
          <span className="workflow-chip c2 coin-eth" aria-label="ETH"><i aria-hidden="true" /></span>
          <span className="workflow-chip c3 coin-usdt" aria-label="USDT">₮</span>
        </div>
        <div className="allocation workflow-panel">
          <span className="workflow-kicker">{t('workflow.kicker')}</span>
          <h2>{t('workflow.title')}</h2>
          {steps.map((step) => (
            <div className="workflow-item" key={step.title}>
              <b>{step.title}</b>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
