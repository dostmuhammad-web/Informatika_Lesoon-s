import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { stagesWithLessons, courseStats } from "../data/curriculum";
import { useApp } from "../context/AppContext";
import { percentage } from "../utils/helpers";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";
import StageCard from "../components/StageCard";

const levels = [
  { key: "all", label: "Barchasi" },
  { key: "Boshlang'ich", label: "Boshlang'ich" },
  { key: "O'rta", label: "O'rta" },
  { key: "Yuqori", label: "Yuqori" },
];

const levelDescriptions = {
  "Boshlang'ich": "Kompyuter va axborot bilan ishlashning mustahkam poydevori.",
  "O'rta": "Dasturlash, tarmoq, ma'lumotlar va kiberxavfsizlikning amaliy asoslari.",
  Yuqori: "Sun'iy intellekt, ilg'or texnologiyalar va mustaqil loyiha.",
};

export default function Course() {
  const { stats, completedLessons } = useApp();
  const [level, setLevel] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return stagesWithLessons.filter((stage) => {
      const levelMatch = level === "all" || stage.level === level;
      if (!levelMatch) return false;
      if (!clean) return true;
      return (
        stage.title.toLowerCase().includes(clean) ||
        stage.description.toLowerCase().includes(clean) ||
        stage.lessons.some(
          (lesson) =>
            lesson.title.toLowerCase().includes(clean) ||
            lesson.summary.toLowerCase().includes(clean)
        )
      );
    });
  }, [level, query]);

  const groups = ["Boshlang'ich", "O'rta", "Yuqori"]
    .map((name) => ({
      name,
      stages: filtered.filter((stage) => stage.level === name),
    }))
    .filter((group) => group.stages.length > 0);

  return (
    <div className="course-page">
      <Breadcrumbs items={[{ label: "To'liq kurs" }]} />

      <header className="page-head page-head--course">
        <div className="page-head__content">
          <span className="eyebrow">To'liq o'quv dasturi</span>
          <h1>Informatika olamiga to'liq yo'l</h1>
          <p>
            {courseStats.stageCount} bosqich va {courseStats.lessonCount} dars orqali nazariyadan
            amaliyotga, amaliyotdan mustaqil loyihagacha. Har bir qadam aniq va tushunarli.
          </p>
          <div className="page-head__stats">
            <span><Icon name="book" size={16} /> {courseStats.stageCount} bosqich</span>
            <span><Icon name="layers" size={16} /> {courseStats.lessonCount} dars</span>
            <span><Icon name="clock" size={16} /> {Math.round(courseStats.totalMinutes / 60)} soat</span>
            <span><Icon name="flask" size={16} /> 7 laboratoriya</span>
          </div>
        </div>
        <div className="course-progress-card">
          <div className="course-progress-card__ring" style={{ "--progress": `${stats.overallProgress}%` }}>
            <div>
              <strong>{stats.overallProgress}%</strong>
              <span>tugallandi</span>
            </div>
          </div>
          <div>
            <span className="course-progress-card__label">Umumiy progress</span>
            <strong>{stats.completedLessonCount} / {stats.totalLessons} dars</strong>
            <ProgressBar value={stats.overallProgress} thin />
            <Link to={`/dars/${stats.continueLesson.id}`} className="text-link">
              Davom etish
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </div>
      </header>

      <div className="course-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Daraja bo'yicha filtr">
          {levels.map((item) => {
            const count =
              item.key === "all"
                ? stagesWithLessons.length
                : stagesWithLessons.filter((stage) => stage.level === item.key).length;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={level === item.key}
                className={level === item.key ? "is-active" : ""}
                onClick={() => setLevel(item.key)}
              >
                {item.label}
                <span>{count}</span>
              </button>
            );
          })}
        </div>
        <label className="inline-search">
          <Icon name="search" size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bosqich yoki mavzu qidirish..."
            aria-label="Kurs ichida qidirish"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Qidiruvni tozalash">
              <Icon name="close" size={14} />
            </button>
          )}
        </label>
      </div>

      <div className="course-layout">
        <div className="course-main">
          {groups.length === 0 && (
            <EmptyState
              icon="search"
              title="Mos bosqich topilmadi"
              description="Qidiruv so'zini o'zgartiring yoki boshqa darajani tanlang."
              actionLabel="Filtrlarni tozalash"
              onAction={() => {
                setQuery("");
                setLevel("all");
              }}
            />
          )}

          {groups.map((group) => (
            <section key={group.name} className="course-level-section">
              <div className="course-level-head">
                <div>
                  <span className="course-level-head__badge">{group.name}</span>
                  <h2>{group.stages.length} ta bosqich</h2>
                  <p>{levelDescriptions[group.name]}</p>
                </div>
                <span className="course-level-head__line" />
              </div>
              <div className="stage-grid stage-grid--course">
                {group.stages.map((stage) => (
                  <StageCard key={stage.id} stage={stage} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="course-aside">
          <div className="aside-card aside-card--accent">
            <span className="aside-card__icon">
              <Icon name="route" size={21} />
            </span>
            <h3>Qanday o'rganish kerak?</h3>
            <ol className="aside-steps">
              <li><span>01</span>Darsni o'qing va asosiy fikrlarni ajratib oling.</li>
              <li><span>02</span>Amaliy mashqni albatta bajaring.</li>
              <li><span>03</span>5 savollik test bilan bilimni tekshiring.</li>
              <li><span>04</span>Bosqich yakunida loyihani yakunlang.</li>
            </ol>
          </div>

          <div className="aside-card">
            <div className="aside-card__head">
              <Icon name="chart" size={19} />
              <h3>Bosqichlar holati</h3>
            </div>
            <div className="stage-status-list">
              {stagesWithLessons.map((stage) => {
                const done = stage.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
                const isDone = done === stage.lessonCount;
                return (
                  <Link key={stage.id} to={`/kurs/${stage.id}`} className="stage-status">
                    <span className="stage-status__dot" style={{ background: isDone ? stage.color : "var(--border-strong)" }} />
                    <span>{stage.title}</span>
                    <small>{isDone ? "Tayyor" : `${percentage(done, stage.lessonCount)}%`}</small>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="aside-card aside-card--tip">
            <span className="aside-card__icon">
              <Icon name="key" size={20} />
            </span>
            <h3>Kichik maslahat</h3>
            <p>
              Har kuni 1 dars va 1 laboratoriya bajaring. Progressni to'xtatmang — streak
              sizni motivatsiyada ushlab turadi.
            </p>
            <Link to="/testlar?rejim=kunlik" className="text-link">
              Kunlik test
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
