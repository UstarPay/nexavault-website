import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeWebsiteLanguage, supportedLanguages, type SupportedLanguage } from '../i18n';

const languageOptions: Record<SupportedLanguage, { label: string; shortLabel: string }> = {
  en: { label: 'English', shortLabel: 'EN' },
  'zh-CN': { label: '简体中文', shortLabel: '简' },
  'zh-TW': { label: '繁體中文', shortLabel: '繁' },
};

function getActiveLanguage(language: string): SupportedLanguage {
  if (language.toLowerCase().startsWith('zh-tw')) return 'zh-TW';
  if (language.toLowerCase().startsWith('zh')) return 'zh-CN';
  return 'en';
}

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeLanguage = getActiveLanguage(i18n.resolvedLanguage || i18n.language);
  const activeOption = languageOptions[activeLanguage];

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function selectLanguage(language: SupportedLanguage) {
    if (language !== activeLanguage) {
      changeWebsiteLanguage(language);
    }
    setIsOpen(false);
  }

  return (
    <div className="language-switch" ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className="language-trigger"
        aria-label={t('nav.currentLanguage', { language: activeOption.label })}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="language-code" aria-hidden="true">
          {activeOption.shortLabel}
        </span>
        <span className="language-current">{activeOption.label}</span>
        <span className="language-caret" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="language-menu" id={menuId} role="listbox" aria-label={t('nav.languageLabel')}>
          {supportedLanguages.map((language) => {
            const option = languageOptions[language];
            const isActive = activeLanguage === language;

            return (
              <button
                type="button"
                key={language}
                className={isActive ? 'is-active' : undefined}
                role="option"
                aria-selected={isActive}
                onClick={() => selectLanguage(language)}
              >
                <span className="language-option-code" aria-hidden="true">
                  {option.shortLabel}
                </span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default LanguageSwitcher;
