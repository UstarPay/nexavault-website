type BrandLogoProps = {
  compact?: boolean;
};

export const LogoDefs = () => (
  <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="nexaLogoGradient" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f7fff9" />
        <stop offset=".45" stopColor="#6dff8f" />
        <stop offset=".78" stopColor="#18e6ff" />
        <stop offset="1" stopColor="#b383ff" />
      </linearGradient>
      <symbol id="nexa-logo-symbol" viewBox="0 0 64 64">
        <path className="logo-shell" d="M14 48V16h10l17 20V16h9v32H40L23 28v20H14Z" />
        <path className="logo-cut" d="M31 16h8L26 48h-8L31 16Z" />
        <circle className="logo-node" cx="50" cy="16" r="3.5" />
      </symbol>
    </defs>
  </svg>
);

const BrandLogo = ({ compact = false }: BrandLogoProps) => (
  <span className="brand" aria-label="NexaVault">
    <span className="brand-mark" aria-hidden="true">
      <svg className="brand-logo" viewBox="0 0 64 64" role="img">
        <use href="#nexa-logo-symbol" />
      </svg>
    </span>
    {!compact && <span>NexaVault</span>}
  </span>
);

export default BrandLogo;
