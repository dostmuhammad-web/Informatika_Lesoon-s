import { Link } from "react-router-dom";

export default function Logo({ compact = false, link = true }) {
  const content = (
    <span className={`brand ${compact ? "brand--compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="presentation">
          <defs>
            <linearGradient id="brand-gradient" x1="4" y1="4" x2="44" y2="44">
              <stop offset="0" stopColor="#7c8cff" />
              <stop offset="0.52" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="42" height="42" rx="13" fill="url(#brand-gradient)" />
          <path
            d="M16 32V17.5h3.6l4.4 7.2 4.4-7.2H32V32h-3.2v-9.2l-4.4 6.9h-.8l-4.4-6.9V32H16z"
            fill="#07101f"
          />
          <circle cx="35.5" cy="13.5" r="3" fill="#07101f" opacity="0.9" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-text">
          <strong>INFORMATIKA</strong>
          <span>OLAMI</span>
        </span>
      )}
    </span>
  );

  if (!link) return content;

  return (
    <Link to="/" className="brand-link" aria-label="Informatika olami bosh sahifasi">
      {content}
    </Link>
  );
}
