import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function EmptyState({
  icon = "info",
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <Icon name={icon} size={28} />
      </span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {actionLabel && actionTo && (
        <Link className="button button--primary button--sm" to={actionTo}>
          {actionLabel}
          <Icon name="arrowRight" size={16} />
        </Link>
      )}
      {actionLabel && onAction && (
        <button className="button button--primary button--sm" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
