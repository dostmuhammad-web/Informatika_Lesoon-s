export default function ProgressBar({
  value = 0,
  color,
  label,
  thin = false,
  showValue = false,
}) {
  const safe = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  return (
    <div className={`progress ${thin ? "progress--thin" : ""}`}>
      {(label || showValue) && (
        <div className="progress__meta">
          {label && <span>{label}</span>}
          {showValue && <strong>{safe}%</strong>}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={safe}
        aria-label={label || "Progress"}
      >
        <span
          className="progress__fill"
          style={{
            width: `${safe}%`,
            background: color
              ? `linear-gradient(90deg, ${color}, ${color}cc)`
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
