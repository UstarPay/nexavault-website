import { useTranslation } from 'react-i18next';

const DevelopersSection = () => {
  const { t } = useTranslation();

  return (
    <section id="developers" className="market-band">
      <div className="shell market-grid">
        <div>
          <h2>{t('developers.title')}</h2>
          <p>{t('developers.copy')}</p>
          <a className="primary" href="#contact">
            {t('developers.cta')}
          </a>
        </div>
        <div className="market-table" aria-hidden="true">
          <div><b>BTC</b><span>$68,420</span><em>+4.20%</em></div>
          <div><b>ETH</b><span>$3,840</span><em>+2.18%</em></div>
          <div><b>USDC</b><span>$1.00</span><em>0.00%</em></div>
          <div><b>SOL</b><span>$182</span><em>+6.44%</em></div>
          <div><b>AVAX</b><span>$41</span><em>+3.12%</em></div>
        </div>
      </div>
    </section>
  );
};

export default DevelopersSection;
