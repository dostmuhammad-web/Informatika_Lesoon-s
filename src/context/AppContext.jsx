import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  labs,
  lessons,
  stagesWithLessons,
  lessonsById,
} from "../data/curriculum";
import {
  levelInfo,
  percentage,
  todayKey,
  dateKeyOffset,
  getWeekDays,
} from "../utils/helpers";

const STORAGE_KEY = "informatika-olami-v1";

const AppContext = createContext(null);

const getDefaultState = () => ({
  completedLessons: [],
  completedLabs: [],
  quizHistory: [],
  xp: 0,
  rewards: {},
  xpLog: [],
  streak: { count: 0, lastDay: null },
  daily: {
    date: todayKey(),
    xp: 0,
    target: 50,
    lessons: 0,
    tests: 0,
    labs: 0,
  },
  favorites: [],
  notes: {},
  theme: "light",
  lastLessonId: null,
  lastActiveAt: null,
  notice: null,
});

const loadState = () => {
  if (typeof window === "undefined") return getDefaultState();
  const fallbackTheme =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...getDefaultState(), theme: fallbackTheme };
    }
    const parsed = JSON.parse(raw);
    const defaults = getDefaultState();
    const loaded = {
      ...defaults,
      ...parsed,
      streak: { ...defaults.streak, ...(parsed.streak || {}) },
      daily: { ...defaults.daily, ...(parsed.daily || {}) },
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      completedLabs: Array.isArray(parsed.completedLabs)
        ? parsed.completedLabs
        : [],
      quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
      xpLog: Array.isArray(parsed.xpLog) ? parsed.xpLog : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      rewards: parsed.rewards && typeof parsed.rewards === "object" ? parsed.rewards : {},
      notes: parsed.notes && typeof parsed.notes === "object" ? parsed.notes : {},
      notice: null,
    };
    if (loaded.daily.date !== todayKey()) {
      loaded.daily = {
        date: todayKey(),
        xp: 0,
        target: loaded.daily.target || 50,
        lessons: 0,
        tests: 0,
        labs: 0,
      };
    }
    if (
      loaded.streak.lastDay &&
      loaded.streak.lastDay !== todayKey() &&
      loaded.streak.lastDay !== dateKeyOffset(-1)
    ) {
      loaded.streak = { count: 0, lastDay: loaded.streak.lastDay };
    }
    return loaded;
  } catch {
    return { ...getDefaultState(), theme: fallbackTheme };
  }
};

const withToday = (state) => {
  if (state.daily.date === todayKey()) return state;
  return {
    ...state,
    daily: {
      date: todayKey(),
      xp: 0,
      target: state.daily.target || 50,
      lessons: 0,
      tests: 0,
      labs: 0,
    },
  };
};

const touchStreak = (state) => {
  const today = todayKey();
  if (state.streak.lastDay === today) return state.streak;
  const yesterday = dateKeyOffset(-1);
  return {
    count:
      state.streak.lastDay === yesterday ? (state.streak.count || 0) + 1 : 1,
    lastDay: today,
  };
};

const applyAwards = (state, awards, activityPatch = {}) => {
  let working = withToday(state);
  const rewards = { ...working.rewards };
  let totalXp = 0;
  const labels = [];

  awards.forEach((award) => {
    if (!award || !award.key || rewards[award.key]) return;
    rewards[award.key] = true;
    totalXp += award.amount;
    if (award.label) labels.push(award.label);
  });

  if (totalXp > 0) {
    working = {
      ...working,
      xp: working.xp + totalXp,
      rewards,
      xpLog: [
        ...working.xpLog,
        ...labels.map((label) => ({
          date: new Date().toISOString(),
          day: todayKey(),
          amount: Math.round(totalXp / Math.max(1, labels.length)),
          label,
        })),
      ].slice(-500),
      streak: touchStreak(working),
      lastActiveAt: new Date().toISOString(),
      daily: {
        ...working.daily,
        xp: working.daily.xp + totalXp,
        lessons:
          working.daily.lessons + (activityPatch.lessons ? activityPatch.lessons : 0),
        tests: working.daily.tests + (activityPatch.tests ? activityPatch.tests : 0),
        labs: working.daily.labs + (activityPatch.labs ? activityPatch.labs : 0),
      },
      notice: {
        id: Date.now() + Math.random(),
        amount: totalXp,
        title:
          labels.length > 1
            ? "Yangi natijalar qayd etildi"
            : labels[0] || "Tajriba yakunlandi",
        detail: labels.length > 1 ? labels.join(" · ") : "XP hisobingizga qo'shildi.",
      },
    };
  } else if (
    activityPatch.lessons ||
    activityPatch.tests ||
    activityPatch.labs
  ) {
    working = {
      ...working,
      lastActiveAt: new Date().toISOString(),
      streak: touchStreak(working),
      daily: {
        ...working.daily,
        lessons:
          working.daily.lessons + (activityPatch.lessons ? activityPatch.lessons : 0),
        tests: working.daily.tests + (activityPatch.tests ? activityPatch.tests : 0),
        labs: working.daily.labs + (activityPatch.labs ? activityPatch.labs : 0),
      },
    };
  }

  return working;
};

const completeStageBonuses = (state, completedList) => {
  const completedSet = new Set(completedList);
  const awards = [];
  stagesWithLessons.forEach((stage) => {
    const isComplete = stage.lessons.every((lesson) =>
      completedSet.has(lesson.id)
    );
    if (isComplete) {
      awards.push({
        key: `stage:${stage.id}`,
        amount: 200,
        label: `${stage.title} bosqichi yakunlandi`,
      });
    }
  });
  return applyAwards(state, awards);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "VIEW_LESSON": {
      if (state.lastLessonId === action.lessonId) return state;
      return { ...state, lastLessonId: action.lessonId };
    }
    case "COMPLETE_LESSON": {
      const lesson = lessonsById[action.lessonId];
      if (!lesson) return state;
      if (state.completedLessons.includes(action.lessonId)) {
        return {
          ...state,
          lastLessonId: action.lessonId,
          notice: {
            id: Date.now(),
            amount: 0,
            title: "Bu dars allaqachon yakunlangan",
            detail: "Mashqlarni yana takrorlashingiz mumkin.",
          },
        };
      }
      const completedLessons = [...state.completedLessons, action.lessonId];
      let next = applyAwards(
        state,
        [
          {
            key: `lesson:${action.lessonId}`,
            amount: 50,
            label: `${lesson.title} darsi yakunlandi`,
          },
        ],
        { lessons: 1 }
      );
      next = {
        ...next,
        completedLessons,
        lastLessonId: action.lessonId,
      };
      next = completeStageBonuses(next, completedLessons);
      return next;
    }
    case "COMPLETE_LAB": {
      if (state.completedLabs.includes(action.labId)) {
        return {
          ...state,
          notice: {
            id: Date.now(),
            amount: 0,
            title: "Laboratoriya allaqachon yakunlangan",
            detail: "Tajribalarni yana sinab ko'rishingiz mumkin.",
          },
        };
      }
      const lab = labs.find((item) => item.id === action.labId);
      if (!lab) return state;
      return {
        ...applyAwards(
          state,
          [
            {
              key: `lab:${action.labId}`,
              amount: 70,
              label: `${lab.title} laboratoriyasi yakunlandi`,
            },
          ],
          { labs: 1 }
        ),
        completedLabs: [...state.completedLabs, action.labId],
      };
    }
    case "RECORD_TEST": {
      const payload = action.payload;
      const testKey = `test:${payload.testId}`;
      const passed = Boolean(payload.passed);
      const record = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        testId: payload.testId,
        kind: payload.kind || "test",
        title: payload.title || "Test",
        score: payload.score,
        total: payload.total,
        percentage: percentage(payload.score, payload.total),
        passed,
        date: new Date().toISOString(),
        duration: payload.duration || 0,
        wrongQuestionIds: payload.wrongQuestionIds || [],
        stageId: payload.stageId || null,
        lessonId: payload.lessonId || null,
      };
      let next = {
        ...withToday(state),
        quizHistory: [record, ...state.quizHistory].slice(0, 100),
      };
      if (passed) {
        const xpAmount = payload.xp ?? 30;
        next = applyAwards(
          next,
          [
            {
              key: testKey,
              amount: xpAmount,
              label: `${payload.title} muvaffaqiyatli topshirildi`,
            },
          ],
          { tests: 1 }
        );
      } else {
        next = applyAwards(next, [], { tests: 1 });
        next = {
          ...next,
          notice: {
            id: Date.now(),
            amount: 0,
            title: "Test yakunlandi",
            detail: "60% dan yuqori natija uchun XP beriladi. Qayta urinib ko'ring.",
          },
        };
      }
      return next;
    }
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.includes(action.lessonId);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((id) => id !== action.lessonId)
          : [...state.favorites, action.lessonId],
      };
    }
    case "SAVE_NOTE": {
      const notes = { ...state.notes };
      if (action.value && action.value.trim()) {
        notes[action.lessonId] = action.value;
      } else {
        delete notes[action.lessonId];
      }
      return { ...state, notes };
    }
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    case "SET_DAILY_TARGET":
      return {
        ...state,
        daily: { ...state.daily, target: action.target },
      };
    case "CLEAR_NOTICE":
      return { ...state, notice: null };
    case "RESET_PROGRESS": {
      const theme = state.theme;
      return { ...getDefaultState(), theme };
    }
    default:
      return state;
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.colorScheme = state.theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", state.theme === "dark" ? "#080d18" : "#f6f7fb");
    }
  }, [state.theme]);

  useEffect(() => {
    const payload = {
      completedLessons: state.completedLessons,
      completedLabs: state.completedLabs,
      quizHistory: state.quizHistory,
      xp: state.xp,
      rewards: state.rewards,
      xpLog: state.xpLog,
      streak: state.streak,
      daily: state.daily,
      favorites: state.favorites,
      notes: state.notes,
      theme: state.theme,
      lastLessonId: state.lastLessonId,
      lastActiveAt: state.lastActiveAt,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage to'lgan yoki brauzer ruxsat bermagan bo'lishi mumkin.
    }
  }, [state]);

  useEffect(() => {
    if (!state.notice) return undefined;
    const timer = setTimeout(() => dispatch({ type: "CLEAR_NOTICE" }), 4600);
    return () => clearTimeout(timer);
  }, [state.notice]);

  const value = useMemo(() => {
    const completedLessonsSet = new Set(state.completedLessons);
    const completedStageIds = stagesWithLessons
      .filter((stage) => stage.lessons.every((lesson) => completedLessonsSet.has(lesson.id)))
      .map((stage) => stage.id);
    const allTests = state.quizHistory;
    const passedTests = allTests.filter((item) => item.passed);
    const perfectTests = allTests.filter(
      (item) => item.total > 0 && item.score === item.total
    );
    const lastLesson =
      (state.lastLessonId && lessonsById[state.lastLessonId]) || null;
    const nextIncomplete =
      lessons.find((lesson) => !completedLessonsSet.has(lesson.id)) || null;
    const continueLesson =
      lastLesson && !completedLessonsSet.has(lastLesson.id)
        ? lastLesson
        : nextIncomplete || lastLesson || lessons[0];
    const level = levelInfo(state.xp);
    const dailyProgress = percentage(state.daily.xp, state.daily.target);
    const weekly = getWeekDays().map((day) => ({
      ...day,
      xp: state.xpLog
        .filter((item) => item.day === day.key)
        .reduce((sum, item) => sum + item.amount, 0),
    }));
    const activeDays = new Set(state.xpLog.map((item) => item.day));
    const achievedStageCount = completedStageIds.length;

    return {
      ...state,
      dispatch,
      stats: {
        completedLessonCount: state.completedLessons.length,
        completedLabCount: state.completedLabs.length,
        totalLessons: lessons.length,
        totalLabs: labs.length,
        testCount: allTests.length,
        passedTestCount: passedTests.length,
        perfectTestCount: perfectTests.length,
        overallProgress: percentage(state.completedLessons.length, lessons.length),
        completedStageIds,
        completedStageCount: achievedStageCount,
        activeDayCount: activeDays.size,
        weekly,
        level: level.level,
        levelTitle: level.title,
        levelProgress: level.progress,
        levelRemaining: level.remaining,
        dailyProgress,
        continueLesson,
        nextIncomplete,
        bestTest: allTests.reduce(
          (best, item) => (item.percentage > (best?.percentage || 0) ? item : best),
          null
        ),
        favoriteLessons: state.favorites
          .map((id) => lessonsById[id])
          .filter(Boolean),
        totalXp: state.xp,
        streakCount:
          state.streak.lastDay === todayKey() ||
          state.streak.lastDay === dateKeyOffset(-1)
            ? state.streak.count
            : 0,
        weeklyXp: weekly.reduce((sum, day) => sum + day.xp, 0),
      },
      actions: {
        viewLesson: (lessonId) => dispatch({ type: "VIEW_LESSON", lessonId }),
        completeLesson: (lessonId) =>
          dispatch({ type: "COMPLETE_LESSON", lessonId }),
        completeLab: (labId) => dispatch({ type: "COMPLETE_LAB", labId }),
        recordTest: (payload) => dispatch({ type: "RECORD_TEST", payload }),
        toggleFavorite: (lessonId) =>
          dispatch({ type: "TOGGLE_FAVORITE", lessonId }),
        saveNote: (lessonId, value) =>
          dispatch({ type: "SAVE_NOTE", lessonId, value }),
        setTheme: (theme) => dispatch({ type: "SET_THEME", theme }),
        toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),
        setDailyTarget: (target) =>
          dispatch({ type: "SET_DAILY_TARGET", target }),
        resetProgress: () => dispatch({ type: "RESET_PROGRESS" }),
        clearNotice: () => dispatch({ type: "CLEAR_NOTICE" }),
      },
    };
  }, [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp AppProvider ichida ishlatilishi kerak.");
  }
  return context;
}
