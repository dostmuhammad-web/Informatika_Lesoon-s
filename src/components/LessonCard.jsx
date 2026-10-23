import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Icon from "./Icon";

export default function LessonCard({ lesson, showStage = false, compact = false }) {
  const { completedLessons, favorites, actions } = useApp();
  const isDone = completedLessons.includes(lesson.id);
  const isFavorite = favorites.includes(lesson.id);

  return (
    <article
      className={`lesson-card ${compact ? "lesson-card--compact" : ""} ${isDone ? "is-done" : ""}`}
      style={{ "--stage-color": lesson.stageColor }}
    >
      <Link to={`/dars/${lesson.id}`} className="lesson-card__link">
        <div className="lesson-card__top">
          <span className="lesson-card__number">
            {String(lesson.globalOrder).padStart(2, "0")}
          </span>
          <div className="lesson-card__badges">
            {showStage && (
              <span className="chip chip--stage">
                <span className="chip__dot" style={{ background: lesson.stageColor }} />
                {lesson.stageTitle}
              </span>
            )}
            <span className="chip">
              <Icon name="clock" size={13} />
              {lesson.minutes} daq
            </span>
          </div>
        </div>
        <h3>{lesson.title}</h3>
        <p>{lesson.summary}</p>
        <div className="lesson-card__footer">
          <span className={`lesson-card__status ${isDone ? "is-done" : ""}`}>
            <Icon name={isDone ? "checkCircle" : "play"} size={15} />
            {isDone ? "Tugallangan" : "O'rganish"}
          </span>
          <span className="lesson-card__xp">+{lesson.xp} XP</span>
        </div>
      </Link>
      <button
        type="button"
        className={`lesson-card__favorite ${isFavorite ? "is-active" : ""}`}
        onClick={() => actions.toggleFavorite(lesson.id)}
        aria-label={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        aria-pressed={isFavorite}
      >
        <Icon name="bookmark" size={17} />
      </button>
    </article>
  );
}
