import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  linkLabel = "Barchasi",
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {link && (
        <Link className="text-link" to={link}>
          {linkLabel}
          <Icon name="arrowRight" size={16} />
        </Link>
      )}
    </div>
  );
}
