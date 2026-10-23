import Icon from "./Icon";

export default function StageGlyph({ stage, size = "md" }) {
  return (
    <span
      className={`stage-glyph stage-glyph--${size}`}
      style={{
        "--stage-color": stage.color,
        "--stage-soft": `${stage.color}1f`,
      }}
      aria-hidden="true"
    >
      <span className="stage-glyph__ring" />
      <Icon name={stage.icon} size={size === "sm" ? 18 : size === "lg" ? 34 : 24} />
      {size === "lg" && <span className="stage-glyph__number">{String(stage.id).padStart(2, "0")}</span>}
    </span>
  );
}
