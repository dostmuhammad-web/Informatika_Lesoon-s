import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { percentage } from "../utils/helpers";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";
import StageGlyph from "./StageGlyph";

export default function StageCard({ stage, featured = false }) {
  const { completedLessons } = useApp();
  const done = stage.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const progress = percentage(done, stage.lessonCount);
  const isComplete = done === stage.lessonCount;
  const minutes = stage.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);

  return (
    <article
      className={`stage-card ${featured ? "stage-card--featured" : ""} ${isComplete ? "is-complete" : ""}`}
      style={{ "--stage-color": stage.color, "--stage-soft": `${stage.color}17` }}
    >
      <Link to={`/kurs/${stage.id}`} className="stage-card__link">
        <div className="stage-card__head">
          <StageGlyph stage={stage} />
          <span className="stage-card__level">{stage.level}</span>
        </div>
        <span className="stage-card__eyebrow">Bosqich {String(stage.id).padStart(2, "0")}</span>
        <h3>{stage.title}</h3>
        <p>{stage.description}</p>
        <div className="stage-card__meta">
          <span>
            <Icon name="book" size={15} />
            {stage.lessonCount} dars
          </span>
          <span>
            <Icon name="clock" size={15} />
            {minutes} daq
          </span>
          <span className={isComplete ? "is-complete" : ""}>
            <Icon name={isComplete ? "checkCircle" : "target"} size={15} />
            {isComplete ? "Tugallangan" : `${progress}%`}
          </span>
        </div>
        <ProgressBar value={progress} color={stage.color} thin />
      </Link>
    </article>
  );
}
