import { Link } from "react-router-dom";
import { achievements, metricLabels } from "../data/achievements";
import { labs, lessonsById, stagesWithLessons } from "../data/curriculum";
import { useApp } from "../context/AppContext";
import {
  countUnlocked,
  getAchievementMetrics,
  getAchievementProgress,
} from "../utils/achievements";
import {
  formatDateTime,
  formatLongDate,
  getGreeting,
  todayKey,
} from "../utils/helpers";
import Breadcrumbs from "../components/Breadcrumbs";
import Icon from "../components/Icon";
import LessonCard from "../components/LessonCard";
import ProgressBar from "../components/ProgressBar";
import StageGlyph from "../components/StageGlyph";

export default function Dashboard() {
  const {
    stats,
    daily,
    favorites,
    notes,
    quizHistory,
    actions,
  } = useApp();
  const levelProgress = stats.levelProgress;
  const levelRemaining = stats.levelRemaining;

  const metrics = getAchievementMetrics(stats, favorites.length);
  const unlockedCount = countUnlocked(metrics);
  const continueLesson = stats.continueLesson;
  const continueStage = stagesWithLessons.find((stage) => stage.id === continueLesson.stageId);
  const maxWeekly = Math.max(50, ...stats.weekly.map((day) => day.xp));
  const nextAchievements = achievements
    .map((item) => ({ ...item, progress: getAchievementProgress(item, metrics) }))
    .filter((item) => !item.progress.unlocked)
    .sort((a, b) => b.progress.percent - a.progress.percent)
    .slice(0, 4);
  const recentTests = quizHistory.slice(0, 4);
  const noteEntries = Object.entries(notes)
    .map(([lessonId, text]) => ({ lesson: lessonsById[lessonId], text }))
    .filter((item) => item.lesson);
  const dailyPercent = Math.min(100, Math.round((daily.xp / daily.target) * 100));

  return (
    <div className="dashboard-page">
      <Breadcrumbs items={[{ label: "Mening panelim" }]} />

      <header className="dashboard-greeting">
        <div>
          <span className="eyebrow">{formatLongDate()}</span>
          <h1>{getGreeting()}, o'quvchi!</h1>
          <p>Bugungi kichik qadam — ertangi katta natijaning boshlanishi.</p>
        </div>
        <div className="dashboard-greeting__streak">
          <span><Icon name="flame" size={20} /></span>
          <div>
            <strong>{stats.streakCount} kun</strong>
            <small>ketma-ket o'rganish</small>
          </div>
        </div>
      </header>

      <section className="dashboard-hero">
        <div className="dashboard-hero__main">
          <span className="dashboard-hero__level">{stats.level}-daraja</span>
          <h2>{stats.levelTitle}</h2>
          <p>
            Keyingi darajaga {levelRemaining} XP qoldi. Har bir dars sizni maqsadga
            yaqinlashtiradi.
          </p>
          <ProgressBar value={levelProgress} />
          <div className="dashboard-hero__progress-meta">
            <span>{stats.totalXp} XP</span>
            <span>{stats.levelProgress}%</span>
          </div>
        </div>
        <div className="dashboard-hero__daily">
          <div className="dashboard-hero__ring" style={{ "--progress": `${dailyPercent}%` }}>
            <div>
              <strong>{daily.xp}</strong>
              <span>/ {daily.target} XP</span>
            </div>
          </div>
          <div>
            <span className="eyebrow">Bugungi maqsad</span>
            <strong>{dailyPercent >= 100 ? "Bajarildi!" : "Davom eting"}</strong>
            <small>
              {dailyPercent >= 100
                ? "Bugungi maqsad to'liq bajarildi."
                : `${Math.max(0, daily.target - daily.xp)} XP qoldi`}
            </small>
          </div>
        </div>
      </section>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: "#5b7cfa18", color: "#5b7cfa" }}>
            <Icon name="book" size={20} />
          </span>
          <div>
            <span>Umumiy progress</span>
            <strong>{stats.overallProgress}%</strong>
            <small>{stats.completedLessonCount} / {stats.totalLessons} dars</small>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: "#eab30818", color: "#eab308" }}>
            <Icon name="zap" size={20} />
          </span>
          <div>
            <span>Jami XP</span>
            <strong>{stats.totalXp}</strong>
            <small>Bu hafta +{stats.weeklyXp} XP</small>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: "#10b98118", color: "#10b981" }}>
            <Icon name="checkCircle" size={20} />
          </span>
          <div>
            <span>Testlar</span>
            <strong>{stats.testCount}</strong>
            <small>{stats.passedTestCount} muvaffaqiyatli</small>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: "#f9731618", color: "#f97316" }}>
            <Icon name="flame" size={20} />
          </span>
          <div>
            <span>Faol kunlar</span>
            <strong>{stats.activeDayCount}</strong>
            <small>{stats.completedLabCount} laboratoriya</small>
          </div>
        </div>
      </section>

      <div className="dashboard-layout">
        <div className="dashboard-main">
          <section className="dashboard-continue">
            <div className="dashboard-continue__head">
              <div>
                <span className="eyebrow">Davom eting</span>
                <h2>Keyingi darsingiz</h2>
              </div>
              <Link className="text-link" to="/kurs">
                Kurs xaritasi
                <Icon name="arrowRight" size={15} />
              </Link>
            </div>
            <div className="continue-card" style={{ "--stage-color": continueStage.color }}>
              <StageGlyph stage={continueStage} size="lg" />
              <div className="continue-card__body">
                <span>{continueStage.id}-bosqich · {continueLesson.order}-dars</span>
                <h3>{continueLesson.title}</h3>
                <p>{continueLesson.summary}</p>
                <div className="continue-card__meta">
                  <span><Icon name="clock" size={14} /> {continueLesson.minutes} daqiqa</span>
                  <span><Icon name="zap" size={14} /> +{continueLesson.xp} XP</span>
                  <span><Icon name="flask" size={14} /> {continueLesson.practicalTitle}</span>
                </div>
              </div>
              <Link className="button button--primary" to={`/dars/${continueLesson.id}`}>
                Davom etish
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </section>

          <section className="dashboard-chart">
            <div className="dashboard-chart__head">
              <div>
                <span className="eyebrow">Haftalik faollik</span>
                <h2>So'nggi 7 kundagi XP</h2>
              </div>
              <span className="dashboard-chart__total">
                <Icon name="zap" size={15} />
                {stats.weeklyXp} XP
              </span>
            </div>
            <div className="weekly-chart" role="img" aria-label="So'nggi 7 kundagi XP grafigi">
              {stats.weekly.map((day) => (
                <div key={day.key} className={`weekly-chart__day ${day.key === todayKey() ? "is-today" : ""}`}>
                  <span className="weekly-chart__value">{day.xp || ""}</span>
                  <div className="weekly-chart__track">
                    <i style={{ height: `${Math.max(day.xp ? 8 : 2, (day.xp / maxWeekly) * 100)}%` }} />
                  </div>
                  <span className="weekly-chart__label">{day.short}</span>
                  <small>{day.day}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-tests">
            <div className="dashboard-continue__head">
              <div>
                <span className="eyebrow">Natijalar</span>
                <h2>So'nggi testlar</h2>
              </div>
              <Link className="text-link" to="/testlar">
                Barcha testlar
                <Icon name="arrowRight" size={15} />
              </Link>
            </div>
            {recentTests.length === 0 ? (
              <div className="dashboard-empty">
                <Icon name="test" size={22} />
                <div>
                  <strong>Hali test topshirmadingiz</strong>
                  <p>Kunlik test bilan bilimingizni sinab ko'ring.</p>
                </div>
                <Link className="button button--ghost button--sm" to="/testlar?rejim=kunlik">
                  Boshlash
                </Link>
              </div>
            ) : (
              <div className="dashboard-test-list">
                {recentTests.map((item) => (
                  <div key={item.id} className="dashboard-test-row">
                    <span className={`dashboard-test-row__status ${item.passed ? "is-passed" : "is-failed"}`}>
                      <Icon name={item.passed ? "check" : "close"} size={13} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{formatDateTime(item.date)}</small>
                    </div>
                    <strong className="dashboard-test-row__score">{item.percentage}%</strong>
                    <span className="dashboard-test-row__fraction">{item.score}/{item.total}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="dashboard-favorites">
            <div className="dashboard-continue__head">
              <div>
                <span className="eyebrow">Saqlangan</span>
                <h2>Sevimli darslar</h2>
              </div>
              <span className="chip">{favorites.length} ta</span>
            </div>
            {stats.favoriteLessons.length === 0 ? (
              <div className="dashboard-empty">
                <Icon name="bookmark" size={22} />
                <div>
                  <strong>Sevimli darslar yo'q</strong>
                  <p>Dars sahifasidagi «Saqlash» tugmasi bilan qo'shing.</p>
                </div>
              </div>
            ) : (
              <div className="lesson-grid lesson-grid--dashboard">
                {stats.favoriteLessons.slice(0, 2).map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} showStage />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="dashboard-aside">
          <div className="aside-card daily-target-card">
            <div className="aside-card__head">
              <Icon name="target" size={19} />
              <h3>Kunlik maqsad</h3>
            </div>
            <div className="daily-target-card__value">
              <strong>{daily.xp}</strong>
              <span>/ {daily.target} XP</span>
            </div>
            <ProgressBar value={dailyPercent} thin />
            <span className="daily-target-card__label">Maqsadni o'zgartirish</span>
            <div className="daily-target-options">
              {[30, 50, 100, 150].map((target) => (
                <button
                  key={target}
                  type="button"
                  className={daily.target === target ? "is-active" : ""}
                  onClick={() => actions.setDailyTarget(target)}
                >
                  {target} XP
                </button>
              ))}
            </div>
          </div>

          <div className="aside-card">
            <div className="aside-card__head">
              <Icon name="trophy" size={19} />
              <h3>Yutuqlar</h3>
            </div>
            <div className="dashboard-achievements__summary">
              <strong>{unlockedCount}</strong>
              <span>/ {achievements.length} ochildi</span>
            </div>
            <ProgressBar value={(unlockedCount / achievements.length) * 100} thin />
            <div className="achievement-mini-list">
              {nextAchievements.map((item) => (
                <div key={item.id} className="achievement-mini">
                  <span style={{ background: `${item.color}18`, color: item.color }}>
                    <Icon name={item.icon} size={16} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.progress.current} / {item.progress.target} {metricLabels[item.metric]}</small>
                  </div>
                  <span className="achievement-mini__percent">{item.progress.percent}%</span>
                </div>
              ))}
            </div>
            <Link to="/yutuqlar" className="text-link">
              Barcha yutuqlar
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="aside-card aside-card--tip">
            <span className="aside-card__icon"><Icon name="spark" size={20} /></span>
            <h3>Bugungi maslahat</h3>
            <p>
              Yangi mavzuni o'qigandan so'ng darhol test yeching. Tadqiqotlarga ko'ra,
              faol eslab qolish passiv o'qishdan samaraliroq.
            </p>
            <Link to={`/dars/${continueLesson.id}`} className="text-link">
              Darsni ochish
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="aside-card aside-card--mini">
            <span>Laboratoriyalar</span>
            <strong>{stats.completedLabCount} / {labs.length} bajarildi</strong>
            <ProgressBar value={(stats.completedLabCount / labs.length) * 100} thin />
            <Link to="/laboratoriyalar" className="text-link">
              Laboratoriyalar
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </aside>
      </div>

      <section id="eslatmalar" className="dashboard-notes">
        <div className="dashboard-continue__head">
          <div>
            <span className="eyebrow">Shaxsiy</span>
            <h2>Mening eslatmalarim</h2>
          </div>
          <span className="chip">{noteEntries.length} ta</span>
        </div>
        {noteEntries.length === 0 ? (
          <div className="dashboard-empty">
            <Icon name="note" size={22} />
            <div>
              <strong>Eslatmalar hali yo'q</strong>
              <p>Dars sahifasida muhim fikrlarni yozib qo'ying.</p>
            </div>
          </div>
        ) : (
          <div className="notes-grid">
            {noteEntries.map(({ lesson, text }) => (
              <Link key={lesson.id} to={`/dars/${lesson.id}#eslatma`} className="note-card">
                <span className="note-card__stage" style={{ color: lesson.stageColor }}>
                  {lesson.stageTitle}
                </span>
                <strong>{lesson.title}</strong>
                <p>{text}</p>
                <span className="note-card__link">
                  Darsni ochish
                  <Icon name="arrowRight" size={13} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
