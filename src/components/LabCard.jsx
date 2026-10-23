import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Icon from "./Icon";

export default function LabCard({ lab, compact = false }) {
  const { completedLabs } = useApp();
  const isDone = completedLabs.includes(lab.id);

  return (
    <article
      className={`lab-card ${compact ? "lab-card--compact" : ""} ${isDone ? "is-done" : ""}`}
      style={{ "--lab-color": lab.color }}
    >
      <Link to={`/laboratoriya/${lab.id}`} className="lab-card__link">
        <div className="lab-card__top">
          <span className="lab-card__icon">
            <Icon name={lab.icon} size={24} />
          </span>
          <span className="lab-card__number">LAB {String(lab.number).padStart(2, "0")}</span>
          {isDone && (
            <span className="lab-card__done">
              <Icon name="check" size={12} />
              Bajarildi
            </span>
          )}
        </div>
        <h3>{lab.title}</h3>
        <p>{lab.description}</p>
        <div className="lab-card__footer">
          <span>{lab.short}</span>
          <span className="lab-card__cta">
            {isDone ? "Qayta ochish" : "Sinab ko'rish"}
            <Icon name="arrowRight" size={15} />
          </span>
        </div>
      </Link>
    </article>
  );
}
