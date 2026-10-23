import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getLesson,
  getQuestionsForLesson,
  getNextLesson,
  getPreviousLesson,
  getStage,
} from "../data/curriculum";
import { useApp } from "../context/AppContext";
import Breadcrumbs from "../components/Breadcrumbs";
import CodeBlock from "../components/CodeBlock";
import EmptyState from "../components/EmptyState";
import ErrorExercise from "../components/ErrorExercise";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";
import Quiz from "../components/Quiz";
import TopicVisual from "../components/TopicVisual";

const sections = [
  { id: "mohiyat", label: "Mavzu haqida" },
  { id: "asosiy", label: "Asosiy fikrlar" },
  { id: "misol", label: "Hayotiy misol" },
  { id: "amaliyot", label: "Amaliy mashq" },
  { id: "xato", label: "Xatoni toping" },
  { id: "test", label: "Dars testi" },
  { id: "eslatma", label: "Eslatma" },
];

export default function Lesson() {
  const { lessonId } = useParams();
  const lesson = getLesson(lessonId);
  const { completedLessons, favorites, notes, quizHistory, actions, stats } = useApp();
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    actions.viewLesson(lessonId);
  }, [lessonId, actions]);

  useEffect(() => {
    setNote(notes[lessonId] || "");
    setNoteSaved(false);
  }, [lessonId]);

  if (!lesson) {
    return (
      <EmptyState
        icon="book"
        title="Dars topilmadi"
        description="Bu dars mavjud emas yoki manzil o'zgargan. Kurs xaritasidan davom eting."
        actionLabel="Kursga qaytish"
        actionTo="/kurs"
      />
    );
  }

  const stage = getStage(lesson.stageId);
  const isDone = completedLessons.includes(lesson.id);
  const isFavorite = favorites.includes(lesson.id);
  const previous = getPreviousLesson(lesson.id);
  const next = getNextLesson(lesson.id);
  const questions = getQuestionsForLesson(lesson.id);
  const passedLessonTest = quizHistory.some(
    (item) => item.lessonId === lesson.id && item.passed
  );
  const lessonsDoneInStage = stage.lessons.filter((item) => completedLessons.includes(item.id)).length;

  const handleQuizFinish = (result) => {
    actions.recordTest({
      ...result,
      testId: `lesson:${lesson.id}`,
      kind: "lesson",
    });
    if (result.passed && !isDone) {
      actions.completeLesson(lesson.id);
    }
  };

  const saveNote = () => {
    actions.saveNote(lesson.id, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div className="lesson-page" style={{ "--stage-color": lesson.stageColor }}>
      <Breadcrumbs
        items={[
          { label: "To'liq kurs", to: "/kurs" },
          { label: stage.title, to: `/kurs/${stage.id}` },
          { label: `${lesson.order}-dars` },
        ]}
      />

      <header className="lesson-hero">
        <div className="lesson-hero__main">
          <div className="lesson-hero__meta">
            <Link to={`/kurs/${stage.id}`} className="chip chip--stage">
              <span className="chip__dot" style={{ background: stage.color }} />
              {stage.title}
            </Link>
            <span className="chip">{stage.level}</span>
            <span className="chip">{lesson.order}-dars</span>
          </div>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
          <div className="lesson-hero__info">
            <span><Icon name="clock" size={16} /> {lesson.minutes} daqiqa</span>
            <span><Icon name="test" size={16} /> {questions.length} savol</span>
            <span><Icon name="zap" size={16} /> +{lesson.xp} XP</span>
            <span><Icon name="flask" size={16} /> {lesson.practicalTitle}</span>
          </div>
        </div>
        <div className="lesson-hero__actions">
          <button
            type="button"
            className={`button button--ghost ${isFavorite ? "is-active" : ""}`}
            onClick={() => actions.toggleFavorite(lesson.id)}
            aria-pressed={isFavorite}
          >
            <Icon name="bookmark" size={17} filled={isFavorite} />
            {isFavorite ? "Saqlangan" : "Saqlash"}
          </button>
          {isDone ? (
            <Link className="button button--primary" to={next ? `/dars/${next.id}` : "/yutuqlar"}>
              <Icon name="checkCircle" size={17} />
              {next ? "Keyingi dars" : "Kursni yakunlash"}
            </Link>
          ) : (
            <button type="button" className="button button--primary" onClick={() => actions.completeLesson(lesson.id)}>
              <Icon name="check" size={17} />
              Darsni yakunlash
            </button>
          )}
        </div>
      </header>

      <div className="lesson-layout">
        <article className="lesson-content">
          <section id="mohiyat" className="content-card">
            <div className="content-card__head">
              <span className="content-card__index">01</span>
              <div>
                <span className="eyebrow">Nazariy qism</span>
                <h2>Mavzuning mohiyati</h2>
              </div>
            </div>
            <p className="content-card__lead">{lesson.summary}</p>
            <div className="objective-box">
              <span><Icon name="target" size={18} /></span>
              <div>
                <strong>O'quv maqsadi</strong>
                <p>{lesson.objective}</p>
              </div>
            </div>
            <TopicVisual lesson={lesson} large />
          </section>

          <section id="asosiy" className="content-card">
            <div className="content-card__head">
              <span className="content-card__index">02</span>
              <div>
                <span className="eyebrow">Asosiy bilimlar</span>
                <h2>Esda qolishi kerak bo'lgan 3 fikr</h2>
              </div>
            </div>
            <div className="key-points">
              {lesson.points.map((point, index) => (
                <div key={point} className="key-point">
                  <span className="key-point__number">{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="misol" className="content-card">
            <div className="content-card__head">
              <span className="content-card__index">03</span>
              <div>
                <span className="eyebrow">Kundalik hayot</span>
                <h2>Mavzu qayerda uchraydi?</h2>
              </div>
            </div>
            <div className="example-callout">
              <span className="example-callout__mark">“</span>
              <div>
                <p>{lesson.example}</p>
                <span>Hayotiy misol · {lesson.title}</span>
              </div>
            </div>
          </section>

          <section id="amaliyot" className="content-card">
            <div className="content-card__head">
              <span className="content-card__index">04</span>
              <div>
                <span className="eyebrow">Amaliyot</span>
                <h2>{lesson.practical.title}</h2>
              </div>
            </div>

            {lesson.practical.kind === "code" ? (
              <CodeBlock
                title={lesson.practical.title}
                language={lesson.practical.language}
                code={lesson.practical.code}
              />
            ) : (
              <div className="practical-steps">
                {lesson.practical.steps.map((step, index) => (
                  <div key={step} className="practical-step">
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            )}
            {lesson.practical.note && (
              <div className="practical-note">
                <Icon name="info" size={17} />
                <p>{lesson.practical.note}</p>
              </div>
            )}

            <div className="project-brief">
              <div>
                <span className="eyebrow">Mini loyiha</span>
                <h3>Bilimni qo'llang</h3>
                <p>{lesson.project}</p>
              </div>
              <div className="project-brief__note">
                <span className="eyebrow">Uyga vazifa</span>
                <p>{lesson.homework}</p>
              </div>
            </div>
          </section>

          <section id="xato" className="content-card">
            <div className="content-card__head">
              <span className="content-card__index">05</span>
              <div>
                <span className="eyebrow">Tahlil</span>
                <h2>Xatoni toping</h2>
              </div>
            </div>
            <ErrorExercise exercise={lesson.errorExercise} />
          </section>

          <section id="test" className="content-card">
            <div className="content-card__head">
              <span className="content-card__index">06</span>
              <div>
                <span className="eyebrow">Bilimni sinash</span>
                <h2>Dars testi</h2>
              </div>
            </div>
            <p className="content-card__intro">
              {questions.length} savol orqali mavzuni mustahkamlang. 60% dan yuqori natija
              darsni avtomatik yakunlaydi.
            </p>
            <Quiz
              questions={questions}
              title={`${lesson.title} testi`}
              xp={30}
              lessonId={lesson.id}
              stageId={lesson.stageId}
              mode="lesson"
              onFinish={handleQuizFinish}
              exitTo={`/kurs/${stage.id}`}
              exitLabel="Bosqichga qaytish"
              compact
            />
          </section>

          <section id="eslatma" className="content-card">
            <div className="content-card__head">
              <span className="content-card__index">07</span>
              <div>
                <span className="eyebrow">Shaxsiy xotira</span>
                <h2>Eslatma qoldiring</h2>
              </div>
            </div>
            <p className="content-card__intro">
              Muhim fikr, savol yoki o'z misolingizni yozib qo'ying. Eslatma shu brauzerda
              saqlanadi.
            </p>
            <div className="note-editor">
              <textarea
                value={note}
                onChange={(event) => {
                  setNote(event.target.value);
                  setNoteSaved(false);
                }}
                placeholder="Bu dars bo'yicha eslatmangiz..."
                rows={5}
                aria-label="Dars bo'yicha eslatma"
              />
              <div className="note-editor__footer">
                <span>{note.length} belgi</span>
                <button type="button" className="button button--primary button--sm" onClick={saveNote}>
                  <Icon name={noteSaved ? "check" : "note"} size={15} />
                  {noteSaved ? "Saqlandi" : "Eslatmani saqlash"}
                </button>
              </div>
            </div>
          </section>

          <nav className="lesson-pagination" aria-label="Darslar orasida yurish">
            {previous ? (
              <Link to={`/dars/${previous.id}`} className="lesson-pagination__item">
                <Icon name="arrowLeft" size={18} />
                <span>
                  <small>Oldingi dars</small>
                  <strong>{previous.title}</strong>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/dars/${next.id}`} className="lesson-pagination__item lesson-pagination__item--next">
                <span>
                  <small>Keyingi dars</small>
                  <strong>{next.title}</strong>
                </span>
                <Icon name="arrowRight" size={18} />
              </Link>
            ) : (
              <Link to="/yutuqlar" className="lesson-pagination__item lesson-pagination__item--next">
                <span>
                  <small>Kurs yakuni</small>
                  <strong>Yutuqlarni ko'rish</strong>
                </span>
                <Icon name="award" size={18} />
              </Link>
            )}
          </nav>
        </article>

        <aside className="lesson-aside">
          <div className="lesson-aside__sticky">
            <div className="aside-card">
              <div className="aside-card__head">
                <Icon name="route" size={18} />
                <h3>Dars tarkibi</h3>
              </div>
              <nav className="lesson-toc" aria-label="Dars ichidagi bo'limlar">
                {sections.map((section, index) => (
                  <a key={section.id} href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="lesson-status-card">
              <div className="lesson-status-card__head">
                <span>Dars holati</span>
                <strong>{isDone ? "Tugallangan" : "Jarayonda"}</strong>
              </div>
              <div className="lesson-status-card__checks">
                <span className={isDone ? "is-done" : ""}>
                  <Icon name={isDone ? "checkCircle" : "clock"} size={16} />
                  Dars o'rganildi
                </span>
                <span className={passedLessonTest ? "is-done" : ""}>
                  <Icon name={passedLessonTest ? "checkCircle" : "clock"} size={16} />
                  Test muvaffaqiyatli
                </span>
                <span className={isDone ? "is-done" : ""}>
                  <Icon name={isDone ? "checkCircle" : "clock"} size={16} />
                  Amaliyot bajarildi
                </span>
              </div>
              <ProgressBar
                value={isDone ? 100 : passedLessonTest ? 75 : 25}
                color={lesson.stageColor}
                thin
              />
              {!isDone && (
                <button
                  type="button"
                  className="button button--primary button--block button--sm"
                  onClick={() => actions.completeLesson(lesson.id)}
                >
                  <Icon name="check" size={15} />
                  Darsni yakunlash
                </button>
              )}
            </div>

            <div className="aside-card aside-card--mini">
              <span>Bosqich progressi</span>
              <strong>{lessonsDoneInStage} / {stage.lessonCount} dars</strong>
              <ProgressBar
                value={(lessonsDoneInStage / stage.lessonCount) * 100}
                color={stage.color}
                thin
              />
              <Link to={`/kurs/${stage.id}`} className="text-link">
                Bosqichni ko'rish
                <Icon name="arrowRight" size={14} />
              </Link>
            </div>

            <div className="aside-card aside-card--mini">
              <span>Umumiy kurs</span>
              <strong>{stats.completedLessonCount} / {stats.totalLessons} dars</strong>
              <ProgressBar value={stats.overallProgress} thin />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
