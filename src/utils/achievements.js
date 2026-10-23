import { achievements } from "../data/achievements";

export const getAchievementMetrics = (stats, favoritesCount = 0) => ({
  lessons: stats.completedLessonCount,
  tests: stats.testCount,
  perfectTests: stats.perfectTestCount,
  labs: stats.completedLabCount,
  streak: stats.streakCount,
  xp: stats.totalXp,
  level: stats.level,
  completedStages: stats.completedStageCount,
  favorites: favoritesCount,
});

export const getAchievementProgress = (achievement, metrics) => {
  const current = Math.min(metrics[achievement.metric] || 0, achievement.target);
  return {
    current,
    target: achievement.target,
    percent: Math.min(100, Math.round((current / achievement.target) * 100)),
    unlocked: current >= achievement.target,
  };
};

export const countUnlocked = (metrics) =>
  achievements.filter((item) => (metrics[item.metric] || 0) >= item.target).length;
