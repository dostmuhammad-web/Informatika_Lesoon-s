import { Link, useParams } from "react-router-dom";
import {
  getStage,
  getQuestionsForStage,
  stagesWithLessons,
  lessonsByStage,
} from "../data/curriculum";
import { useApp } from "../context/AppContext";
import { percentage } from "../utils/helpers";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import LessonCard from "../components/LessonCard";
import ProgressBar from "../components/ProgressBar";
import StageGlyph from "../components/StageGlyph";

export default function Stage() {
  const { stageId } = useParams();
  const stage = getStage(stageId);
  const { completedLessons, stats } = useApp();

  if (!stage) {
    return (
      <EmptyState
        icon="book"
        title="Bosqich topilmadi"
        description="Havola noto'g'ri bo'lishi mumkin. Kurs xaritasidan kerakli bosqichni tanlang."
        actionLabel="Kursga qaytish"
        actionTo="/kurs"
      />
    );
  }

  const lessons = lessonsByStage[stage.id];
  const done = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const progress = percentage(done, stage.lessonCount);
  const isComplete = done === stage.lessonCount;
  const questions = getQuestionsForStage(stage.id);
  const minutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
  const nextLesson = lessons.find((lesson) => !completedLessons.includes(lesson.id)) || lessons[0];
  const stageIndex = stagesWithLessons.findIndex((item) => item.id === stage.id);
  const previousStage = stagesWithLessons[stageIndex - 1];
  const nextStage = stagesWithLessons[stageIndex + 1];

  return (
    <div className="stage-page">
      <Breadcrumbs
        items={[
          { label: "To'liq kurs", to: "/kurs" },
          { label: `${stage.id}-bosqich` },
        ]}
      />

      <header
        className="stage-hero"
        style={{ "--stage-color": stage.color, "--stage-soft": `${stage.color}18` }}
      >
        <div className="stage-hero__pattern" aria-hidden="true" />
        <div className="stage-hero__main">
          <StageGlyph stage={stage} size="lg" />
          <div className="stage-hero__content">
            <span className="eyebrow">Bosqich {String(stage.id).padStart(2, "0")} · {stage.level}</span>
            <h1>{stage.title}</h1>
            <p>{stage.description}</p>
            <div className="stage-hero__meta">
              <span><Icon name="book" size={16} /> {stage.lessonCount} dars</span>
              <span><Icon name="clock" size={16} /> {minutes} daqiqa</span>
              <span><Icon name="test" size={16} /> {questions.length} savol</span>
              {isComplete && <span className="is-complete"><Icon name="checkCircle" size={16} /> Tugallangan</span>}
            </div>
          </div>
        </div>

        <div className="stage-hero__progress">
          <div className="stage-hero__progress-top">
            <span>Bosqich progressi</span>
            <strong>{progress}%</strong>
          </div>
          <ProgressBar value={progress} color={stage.color} />
          <div className="stage-hero__progress-bottom">
            <span>{done} / {stage.lessonCount} dars tugallandi</span>
            <Link className="button button--primary button--sm" to={`/dars/${nextLesson.id}`}>
              {done ? "Davom etish" : "Boshlash"}
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </header>

      <div className="stage-layout">
        <div className="stage-main">
          <div className="stage-section-head">
            <div>
              <span className="eyebrow">Darslar ketma-ketligi</span>
              <h2>Ushbu bosqichda nimalarni o'rganasiz?</h2>
            </div>
            <span className="chip chip--stage">
              <Icon name="route" size={14} />
              {stage.tagline}
            </span>
          </div>

          <div className="lesson-list">
            {lessons.map((lesson) => {
              const isDone = completedLessons.includes(lesson.id);
              const isNext = nextLesson.id === lesson.id && !isComplete;
              return (
                <div key={lesson.id} className={`lesson-row ${isDone ? "is-done" : ""} ${isNext ? "is-next" : ""}`}>
                  <div className="lesson-row__line" aria-hidden="true" />
                  <span className="lesson-row__number">
                    {isDone ? <Icon name="check" size={16} /> : String(lesson.order).padStart(2, "0")}
                  </span>
                  <div className="lesson-row__body">
                    <div className="lesson-row__meta">
                      <span>{lesson.minutes} daqiqa</span>
                      <span>+{lesson.xp} XP</span>
                      {isNext && <span className="lesson-row__next">Keyingi qadam</span>}
                      {isDone && <span className="lesson-row__done">Tugallangan</span>}
                    </div>
                    <h3><Link to={`/dars/${lesson.id}`}>{lesson.title}</Link></h3>
                    <p>{lesson.summary}</p>
                  </div>
                  <Link className="lesson-row__action" to={`/dars/${lesson.id}`} aria-label={`${lesson.title} darsini ochish`}>
                    <Icon name={isDone ? "refresh" : "arrowRight"} size={18} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="stage-test-card">
            <div className="stage-test-card__icon">
              <Icon name="test" size={26} />
            </div>
            <div className="stage-test-card__body">
              <span className="eyebrow">Bosqich yakuni</span>
              <h3>{stage.title} bo'yicha yakuniy test</h3>
              <p>
                {questions.length} savol orqali bosqichning barcha mavzularini tekshiring.
                O'tish uchun 60% natija kerak.
              </p>
              <div className="stage-test-card__meta">
                <span><Icon name="clipboard" size={14} /> {questions.length} savol</span>
                <span><Icon name="clock" size={14} /> 10 daqiqa</span>
                <span><Icon name="zap" size={14} /> +80 XP</span>
              </div>
            </div>
            <Link
              className="button button--primary"
              to={`/testlar?rejim=bosqich&id=${stage.id}`}
            >
              Testni boshlash
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>

          <div className="stage-nav">
            {previousStage ? (
              <Link to={`/kurs/${previousStage.id}`} className="stage-nav__item">
                <Icon name="arrowLeft" size={17} />
                <span>
                  <small>Oldingi bosqich</small>
                  <strong>{previousStage.title}</strong>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextStage ? (
              <Link to={`/kurs/${nextStage.id}`} className="stage-nav__item stage-nav__item--next">
                <span>
                  <small>Keyingi bosqich</small>
                  <strong>{nextStage.title}</strong>
                </span>
                <Icon name="arrowRight" size={17} />
              </Link>
            ) : (
              <Link to="/yutuqlar" className="stage-nav__item stage-nav__item--next">
                <span>
                  <small>Kurs yakuni</small>
                  <strong>Yutuqlarni ko'rish</strong>
                </span>
                <Icon name="award" size={17} />
              </Link>
            )}
          </div>
        </div>

        <aside className="stage-aside">
          <div className="aside-card">
            <div className="aside-card__head">
              <Icon name="target" size={19} />
              <h3>Bosqich natijasi</h3>
            </div>
            <div className="stage-result">
              <strong>{progress}%</strong>
              <span>{done} / {stage.lessonCount} dars</span>
              <ProgressBar value={progress} color={stage.color} thin />
            </div>
            <ul className="aside-check-list">
              <li><Icon name="checkCircle" size={16} /> Nazariy asoslarni tushunish</li>
              <li><Icon name="checkCircle" size={16} /> Amaliy mashqni bajarish</li>
              <li><Icon name="checkCircle" size={16} /> Testda 60% dan yuqori natija</li>
            </ul>
          </div>

          <div className="aside-card aside-card--project">
            <div className="aside-card__head">
              <Icon name="code" size={19} />
              <h3>Bosqich loyihasi</h3>
            </div>
            <p>{stage.project}</p>
            <div className="aside-label">
              <Icon name="note" size={14} />
              Uyga vazifa
            </div>
            <p className="aside-card__muted">{stage.homework}</p>
          </div>

          <div className="aside-card aside-card--tip">
            <span className="aside-card__icon"><Icon name="brain" size={20} /></span>
            <h3>Esda tuting</h3>
            <p>
              {isComplete
                ? "Bu bosqich tugallangan. Amaliyotni takrorlash uchun istalgan darsga qaytishingiz mumkin."
                : `Bu bosqichda yana ${stage.lessonCount - done} ta dars qoldi. Har bir darsdan keyin 5 savollik testni yeching.`}
            </p>
            <Link to="/panel" className="text-link">
              Progressni ko'rish
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="aside-card aside-card--mini">
            <span>Jami kurs</span>
            <strong>{stats.completedLessonCount} / {stats.totalLessons} dars</strong>
            <ProgressBar value={stats.overallProgress} thin />
          </div>
        </aside>
      </div>
    </div>
  );
}
