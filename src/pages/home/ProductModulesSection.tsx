import { useTranslation } from 'react-i18next';
import type { ProductItem } from './types';

const ProductModulesSection = () => {
  const { t } = useTranslation();
  const items = t('products.items', { returnObjects: true }) as ProductItem[];

  return (
    <section id="products" className="scale-section">
      <div className="shell">
        <div className="scale-title">
          <span>{t('products.kicker')}</span>
          <h2>{t('products.title')}</h2>
          <p>{t('products.copy')}</p>
        </div>
        <div className="product-grid feature-strip">
          {items.map((item) => (
            <article className="product-card" key={item.title}>
              <div>
                <div className="glyph" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <div className="tag-list">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductModulesSection;
