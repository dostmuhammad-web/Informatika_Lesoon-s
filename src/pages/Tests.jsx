import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  courseStats,
  lessonsById,
  questionBank,
  questionsByLesson,
  questionsByStage,
  stagesWithLessons,
} from "../data/curriculum";
import { useApp } from "../context/AppContext";
import {
  formatDateTime,
  seededShuffle,
  todayKey,
} from "../utils/helpers";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";
import Quiz from "../components/Quiz";

const modeConfig = {
  kunlik: {
    label: "Kunlik test",
    icon: "calendar",
    color: "#5b7cfa",
    xp: 30,
    count: 10,
    passing: 60,
    timeLimit: 0,
    description: "Har kuni yangilanadigan 10 savol. Bilimni izchil mustahkamlash uchun eng qulay rejim.",
  },
  mavzu: {
    label: "Mavzuli test",
    icon: "book",
    color: "#10b981",
    xp: 30,
    count: 5,
    passing: 60,
    timeLimit: 0,
    description: "Tanlangan bitta dars bo'yicha 5 savol. Mavzuni chuqur tekshirish uchun.",
  },
  bosqich: {
    label: "Bosqich yakuniy testi",
    icon: "test",
    color: "#8b5cf6",
    xp: 80,
    count: 10,
    passing: 60,
    timeLimit: 0,
    description: "Bosqichning turli mavzularidan 10 savol. Bilim poydevori mustahkamligini sinang.",
  },
  aralash: {
    label: "Aralash test",
    icon: "shuffle",
    color: "#06b6d4",
    xp: 50,
    count: 20,
    passing: 60,
    timeLimit: 0,
    description: "Butun kursdan 20 ta tasodifiy savol. Haqiqiy umumiy bilim sinovi.",
  },
  challenge: {
    label: "Vaqtli challenge",
    icon: "timer",
    color: "#f97316",
    xp: 60,
    count: 10,
    passing: 70,
    timeLimit: 180,
    description: "3 daqiqada 10 savol. Tezlik va aniqlikni bir vaqtda sinab ko'ring.",
  },
  xatolar: {
    label: "Xatolar ustida ishlash",
    icon: "refresh",
    color: "#ec4899",
    xp: 20,
    count: 10,
    passing: 60,
    timeLimit: 0,
    description: "Avvalgi testlarda xato qilgan savollaringiz. Xatoni tuzatish — eng tez o'sish yo'li.",
  },
};

const questionById = questionBank.reduce((acc, question) => {
  acc[question.id] = question;
  return acc;
}, {});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
};

export default function Tests() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    stats,
    quizHistory,
    completedLessons,
    actions,
  } = useApp();
  const mode = searchParams.get("rejim");
  const targetId = searchParams.get("id");
  const config = modeConfig[mode];

  const [started, setStarted] = useState(false);

  const wrongIds = useMemo(
    () => Array.from(new Set(quizHistory.flatMap((item) => item.wrongQuestionIds || []))),
    [quizHistory]
  );

  const topicLesson = lessonsById[targetId];
  const selectedStage = stagesWithLessons.find((item) => item.id === Number(targetId)) || null;

  const defaultTopic = stats.continueLesson;
  const defaultStage = stagesWithLessons.find((item) => item.id === defaultTopic.stageId);

  const runnerQuestions = useMemo(() => {
    if (!config) return [];
    if (mode === "kunlik") {
      return seededShuffle(questionBank, `daily-${todayKey()}`).slice(0, config.count);
    }
    if (mode === "aralash") {
      return seededShuffle(questionBank, `mixed-${todayKey()}`).slice(0, config.count);
    }
    if (mode === "challenge") {
      return seededShuffle(questionBank, `challenge-${todayKey()}`).slice(0, config.count);
    }
    if (mode === "mavzu") {
      return questionsByLesson[targetId] || [];
    }
    if (mode === "bosqich") {
      return seededShuffle(questionsByStage[Number(targetId)] || [], `stage-${targetId}`).slice(0, config.count);
    }
    if (mode === "xatolar") {
      return wrongIds.map((id) => questionById[id]).filter(Boolean).slice(0, config.count);
    }
    return [];
  }, [config, mode, targetId, wrongIds]);

  useEffect(() => {
    setStarted(false);
  }, [mode, targetId]);

  if (mode) {
    if (!config) {
      return (
        <EmptyState
          icon="test"
          title="Test rejimi topilmadi"
          description="Tanlangan test turi mavjud emas. Testlar markazidan boshqa rejimni tanlang."
          actionLabel="Testlar markazi"
          actionTo="/testlar"
        />
      );
    }

    const testTitle =
      mode === "bosqich" && selectedStage
        ? `${selectedStage.title} yakuniy testi`
        : mode === "mavzu" && topicLesson
          ? `${topicLesson.title} testi`
          : config.label;

    const targetStageId =
      mode === "bosqich"
        ? Number(targetId)
        : mode === "mavzu"
          ? topicLesson?.stageId || null
          : null;

    const handleFinish = (result) => {
      const recurring = ["kunlik", "aralash", "challenge", "xatolar"].includes(mode);
      actions.recordTest({
        ...result,
        testId: `${mode}:${targetId || "all"}:${recurring ? todayKey() : "core"}`,
        kind: mode,
        stageId: targetStageId,
        lessonId: mode === "mavzu" ? targetId : null,
      });
    };

    return (
      <div className="test-runner-page">
        <Breadcrumbs
          items={[
            { label: "Testlar", to: "/testlar" },
            { label: config.label },
          ]}
        />

        <header className="test-runner-head">
          <div className="test-runner-head__main">
            <span className="test-runner-head__icon" style={{ background: `${config.color}18`, color: config.color }}>
              <Icon name={config.icon} size={25} />
            </span>
            <div>
              <span className="eyebrow">{config.label}</span>
              <h1>{testTitle}</h1>
              <p>{config.description}</p>
            </div>
          </div>
          <Link to="/testlar" className="button button--ghost">
            <Icon name="arrowLeft" size={16} />
            Testlar markazi
          </Link>
        </header>

        {mode === "mavzu" && (
          <div className="test-topic-picker">
            <label>
              <span>Mavzuni tanlang</span>
              <select
                value={targetId || ""}
                onChange={(event) =>
                  setSearchParams({ rejim: "mavzu", id: event.target.value })
                }
              >
                <option value="" disabled>Mavzu tanlang</option>
                {stagesWithLessons.map((item) => (
                  <optgroup key={item.id} label={`${item.id}-bosqich · ${item.title}`}>
                    {item.lessons.map((lesson) => (
                      <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <span className="test-topic-picker__hint">
              <Icon name="info" size={14} />
              5 savol · 60% o'tish balli
            </span>
          </div>
        )}

        {!started ? (
          <div className="test-intro">
            <div className="test-intro__visual" style={{ "--test-color": config.color }}>
              <span className="test-intro__icon">
                <Icon name={config.icon} size={38} />
              </span>
              <div className="test-intro__stats">
                <div>
                  <span>Savollar</span>
                  <strong>{runnerQuestions.length}</strong>
                </div>
                <div>
                  <span>O'tish balli</span>
                  <strong>{config.passing}%</strong>
                </div>
                <div>
                  <span>Mukofot</span>
                  <strong>+{config.xp} XP</strong>
                </div>
                {config.timeLimit > 0 && (
                  <div>
                    <span>Vaqt</span>
                    <strong>{formatTime(config.timeLimit)}</strong>
                  </div>
                )}
              </div>
            </div>
            <div className="test-intro__body">
              <span className="eyebrow">Boshlashga tayyormisiz?</span>
              <h2>{testTitle}</h2>
              <p>{config.description}</p>
              <ul className="test-intro__rules">
                <li><Icon name="checkCircle" size={17} /> Har bir savolda faqat bitta to'g'ri javob bor.</li>
                <li><Icon name="checkCircle" size={17} /> Javobni tasdiqlaganingizdan keyin izoh ko'rinadi.</li>
                <li><Icon name="checkCircle" size={17} /> Test yakunida batafsil tahlil olasiz.</li>
                {config.timeLimit > 0 && (
                  <li><Icon name="timer" size={17} /> Vaqt tugashi bilan test avtomatik yakunlanadi.</li>
                )}
              </ul>
              {runnerQuestions.length > 0 ? (
                <button type="button" className="button button--primary button--lg" onClick={() => setStarted(true)}>
                  <Icon name="play" size={17} filled />
                  Testni boshlash
                </button>
              ) : (
                <div className="test-intro__empty">
                  <Icon name="info" size={18} />
                  <span>
                    Bu rejim uchun savollar topilmadi. Avval kamida bitta test topshiring.
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Quiz
            questions={runnerQuestions}
            title={testTitle}
            xp={config.xp}
            passing={config.passing}
            stageId={targetStageId}
            mode={mode}
            timeLimit={config.timeLimit}
            onFinish={handleFinish}
            exitTo="/testlar"
            exitLabel="Testlar markazi"
          />
        )}
      </div>
    );
  }

  const completedCount = completedLessons.length;
  const recent = quizHistory.slice(0, 6);
  const best = stats.bestTest;
  const modes = [
    { key: "kunlik", ...modeConfig.kunlik, to: "/testlar?rejim=kunlik", meta: "10 savol · 30 XP" },
    { key: "mavzu", ...modeConfig.mavzu, to: `/testlar?rejim=mavzu&id=${defaultTopic.id}`, meta: "5 savol · 30 XP" },
    { key: "bosqich", ...modeConfig.bosqich, to: `/testlar?rejim=bosqich&id=${defaultStage.id}`, meta: "10 savol · 80 XP" },
    { key: "aralash", ...modeConfig.aralash, to: "/testlar?rejim=aralash", meta: "20 savol · 50 XP" },
    { key: "challenge", ...modeConfig.challenge, to: "/testlar?rejim=challenge", meta: "3 daqiqa · 60 XP" },
    {
      key: "xatolar",
      ...modeConfig.xatolar,
      to: "/testlar?rejim=xatolar",
      meta: wrongIds.length ? `${Math.min(wrongIds.length, 10)} xato · 20 XP` : "Xatolar yo'q",
      disabled: wrongIds.length === 0,
    },
  ];

  return (
    <div className="tests-page">
      <Breadcrumbs items={[{ label: "Testlar" }]} />

      <header className="page-head">
        <div className="page-head__content">
          <span className="eyebrow">Bilimni sinash markazi</span>
          <h1>Bilasizmi yoki shunchaki tanishmisiz?</h1>
          <p>
            {courseStats.questionCount} savoldan iborat bank, 6 xil test rejimi va har bir xato
            uchun tushunarli izoh. Bilimni doimiy ravishda tekshirib turing.
          </p>
          <div className="page-head__stats">
            <span><Icon name="test" size={16} /> {courseStats.questionCount} savol</span>
            <span><Icon name="clipboard" size={16} /> {quizHistory.length} topshirilgan test</span>
            <span><Icon name="checkCircle" size={16} /> {completedCount} dars asosida</span>
          </div>
        </div>
        <div className="tests-best">
          <span className="tests-best__label">Eng yaxshi natija</span>
          <strong>{best ? `${best.percentage}%` : "—"}</strong>
          <span>{best ? best.title : "Hali test topshirilmagan"}</span>
          <ProgressBar value={best?.percentage || 0} thin />
          <div className="tests-best__split">
            <span><strong>{stats.passedTestCount}</strong> o'tilgan</span>
            <span><strong>{stats.perfectTestCount}</strong> mukammal</span>
          </div>
        </div>
      </header>

      <section className="test-modes">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Test rejimlari</span>
            <h2>O'zingizga mos sinovni tanlang</h2>
          </div>
        </div>
        <div className="test-mode-grid">
          {modes.map((item) => {
            const content = (
              <>
                <div className="test-mode-card__top">
                  <span
                    className="test-mode-card__icon"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    <Icon name={item.icon} size={22} />
                  </span>
                  <span className="test-mode-card__meta">{item.meta}</span>
                </div>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
                <div className="test-mode-card__footer">
                  <span style={{ color: item.color }}>
                    {item.disabled ? "Hozircha mavjud emas" : "Boshlash"}
                  </span>
                  {!item.disabled && <Icon name="arrowRight" size={16} />}
                </div>
              </>
            );

            return item.disabled ? (
              <div key={item.key} className="test-mode-card is-disabled" style={{ "--mode-color": item.color }}>
                {content}
              </div>
            ) : (
              <Link key={item.key} to={item.to} className="test-mode-card" style={{ "--mode-color": item.color }}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="tests-layout">
        <section className="test-history-card">
          <div className="test-history-card__head">
            <div>
              <span className="eyebrow">Faoliyat</span>
              <h2>So'nggi natijalar</h2>
            </div>
            <span className="chip">{quizHistory.length} ta urinish</span>
          </div>
          {recent.length === 0 ? (
            <EmptyState
              icon="test"
              title="Hali test topshirilmagan"
              description="Birinchi testni boshlang va natijangiz shu yerda paydo bo'ladi."
              actionLabel="Kunlik test"
              actionTo="/testlar?rejim=kunlik"
            />
          ) : (
            <div className="test-history-list">
              {recent.map((item) => (
                <div key={item.id} className="test-history-row">
                  <span className={`test-history-row__status ${item.passed ? "is-passed" : "is-failed"}`}>
                    <Icon name={item.passed ? "check" : "close"} size={14} />
                  </span>
                  <div className="test-history-row__title">
                    <strong>{item.title}</strong>
                    <small>{formatDateTime(item.date)} · {Math.round((item.duration || 0) / 60)} daqiqa</small>
                  </div>
                  <div className="test-history-row__score">
                    <strong>{item.percentage}%</strong>
                    <span>{item.score}/{item.total}</span>
                  </div>
                  <div className="test-history-row__bar">
                    <ProgressBar value={item.percentage} thin />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="tests-aside">
          <div className="aside-card aside-card--accent">
            <span className="aside-card__icon"><Icon name="target" size={21} /></span>
            <h3>Testdan maksimal foyda</h3>
            <ul className="aside-check-list">
              <li><Icon name="checkCircle" size={16} /> Avval darsni o'qing, keyin test yeching.</li>
              <li><Icon name="checkCircle" size={16} /> Xato qilgan savol izohini albatta o'qing.</li>
              <li><Icon name="checkCircle" size={16} /> «Xatolar» rejimida zaif mavzularni yoping.</li>
              <li><Icon name="checkCircle" size={16} /> Har kuni 10 savol — barqaror natija.</li>
            </ul>
          </div>

          <div className="aside-card">
            <div className="aside-card__head">
              <Icon name="chart" size={19} />
              <h3>Natijalar statistikasi</h3>
            </div>
            <div className="test-stat-list">
              <div><span>O'rtacha natija</span><strong>{quizHistory.length ? Math.round(quizHistory.reduce((sum, item) => sum + item.percentage, 0) / quizHistory.length) : 0}%</strong></div>
              <div><span>Muvaffaqiyatli</span><strong>{stats.passedTestCount}</strong></div>
              <div><span>Mukammal</span><strong>{stats.perfectTestCount}</strong></div>
              <div><span>Xatolar banki</span><strong>{wrongIds.length}</strong></div>
            </div>
          </div>

          <div className="aside-card aside-card--tip">
            <span className="aside-card__icon"><Icon name="flame" size={20} /></span>
            <h3>Kunlik seriya</h3>
            <p>Bugun test topshirsangiz, {stats.streakCount + 1} kunlik seriya davom etadi.</p>
            <Link to="/testlar?rejim=kunlik" className="text-link">
              Bugungi test
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
