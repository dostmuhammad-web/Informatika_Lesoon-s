import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Sahifa yo'li">
      <Link to="/">
        <Icon name="home" size={14} />
        Bosh sahifa
      </Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="breadcrumbs__item">
          <Icon name="chevronRight" size={12} />
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
