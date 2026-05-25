import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const points = t('contact.points', { returnObjects: true }) as string[];
  const contactEmail = t('contact.emailAddress');
  const mailSubject = encodeURIComponent(t('contact.mailSubject'));
  const mailtoHref = `mailto:${contactEmail}?subject=${mailSubject}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = mailtoHref;
    }
  };

  return (
    <section id="contact" className="cta subscribe-panel">
      <div className="shell">
        <div className="cta-panel contact-layout">
          <div className="contact-copy">
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.copy')}</p>
            <ul className="contact-points">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="contact-card" aria-label={t('contact.cardAria')}>
            <div className="contact-card-head">
              <span className="contact-kicker">{t('contact.emailLabel')}</span>
              <span className="contact-status">{t('contact.responseTime')}</span>
            </div>
            <a className="contact-email-link" href={mailtoHref}>
              <span className="contact-email-icon" aria-hidden="true">@</span>
              <span className="contact-email-value">{contactEmail}</span>
            </a>
            <p className="contact-card-copy">{t('contact.emailCopy')}</p>
            <div className="contact-actions">
              <a className="primary" href={mailtoHref}>
                <span>{t('contact.emailCta')}</span>
                <span aria-hidden="true">→</span>
              </a>
              <button className="contact-copy-button" type="button" onClick={handleCopyEmail}>
                <span>{copied ? t('contact.copied') : t('contact.copyEmail')}</span>
              </button>
            </div>
            <div className="contact-meta" aria-hidden="true">
              <span>{t('contact.metaOne')}</span>
              <span>{t('contact.metaTwo')}</span>
              <span>{t('contact.metaThree')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
