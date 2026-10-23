import { stages } from "./stages";
import { topicsA } from "./topicsA";
import { topicsB } from "./topicsB";
import { topicsC } from "./topicsC";
import { topicsD } from "./topicsD";
import { getPractical } from "./practicals";

export { stages };

const topics = {
  ...topicsA,
  ...topicsB,
  ...topicsC,
  ...topicsD,
};

const featuredIds = new Set([
  "s1-l1",
  "s2-l5",
  "s3-l2",
  "s4-l7",
  "s5-l3",
  "s6-l1",
  "s7-l3",
  "s8-l10",
  "s9-l6",
  "s10-l1",
  "s11-l7",
  "s12-l1",
  "s13-l3",
  "s14-l7",
]);

const hash = (value) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

const clean = (value) => String(value ?? "").trim();

const uniqueOptions = (correct, distractors) => {
  const result = [correct];
  distractors.forEach((item) => {
    const value = clean(item);
    if (value && value !== correct && result.length < 4 && !result.includes(value)) {
      result.push(value);
    }
  });
  return result;
};

const pickSeeded = (pool, count, seed) => {
  const list = Array.from(new Set(pool.filter(Boolean)));
  if (!list.length) return [];
  const result = [];
  let cursor = hash(seed) % list.length;
  let guard = 0;
  while (result.length < count && guard < list.length * 3) {
    const value = list[cursor % list.length];
    if (!result.includes(value)) result.push(value);
    cursor += 5 + (hash(seed + cursor) % 7);
    guard += 1;
  }
  return result;
};

const lessonDurations = [8, 10, 12];

export const lessons = [];

export const lessonsByStage = stages.reduce((acc, stage) => {
  acc[stage.id] = [];
  return acc;
}, {});

stages.forEach((stage) => {
  const stageTopics = topics[stage.id] || [];
  stageTopics.forEach((topic, index) => {
    const [title, summary, point1, point2, point3, example] = topic.map(clean);
    const id = `s${stage.id}-l${index + 1}`;
    const practical = getPractical({ stageId: stage.id, title });
    const lesson = {
      id,
      stageId: stage.id,
      stageSlug: stage.slug,
      stageTitle: stage.title,
      stageColor: stage.color,
      stageIcon: stage.icon,
      stageLevel: stage.level,
      order: index + 1,
      globalOrder: lessons.length + 1,
      title,
      summary,
      points: [point1, point2, point3],
      example,
      practical,
      practicalTitle: practical.title,
      objective: `${title} mavzusining mohiyatini tushunish va uni kundalik hayotdagi misollar orqali qo'llash.`,
      project: `“${title}” bo'yicha 3 ta amaliy misolni bajaring. ${stage.project}`,
      homework: `${stage.homework} Bu vazifani “${title}” mavzusi bilan bog'lab bajaring.`,
      errorExercise: {
        prompt: `“${title}” mavzusiga oid fikrdagi xatoni toping.`,
        statement: stage.errorTask.statement,
        options: stage.errorTask.options,
        answer: stage.errorTask.answer,
        explanation: stage.errorTask.explanation,
      },
      featured: featuredIds.has(id),
      minutes: lessonDurations[hash(id) % lessonDurations.length],
      xp: 50,
      visualSeed: hash(`${id}-${title}`),
      projectBrief: stage.project,
    };
    lessons.push(lesson);
    lessonsByStage[stage.id].push(lesson);
  });
});

lessons.forEach((lesson, index) => {
  lesson.previousId = lessons[index - 1]?.id || null;
  lesson.nextId = lessons[index + 1]?.id || null;
  lesson.nextInStage =
    lessonsByStage[lesson.stageId][lesson.order]?.id || null;
  lesson.previousInStage =
    lessonsByStage[lesson.stageId][lesson.order - 2]?.id || null;
});

export const lessonsById = lessons.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {});

export const stagesWithLessons = stages.map((stage) => ({
  ...stage,
  lessons: lessonsByStage[stage.id],
  lessonCount: lessonsByStage[stage.id].length,
}));

export const stagesById = stagesWithLessons.reduce((acc, stage) => {
  acc[stage.id] = stage;
  return acc;
}, {});

const allPracticeTitles = Array.from(
  new Set(lessons.map((lesson) => lesson.practicalTitle))
);
const allStageTitles = stages.map((stage) => stage.title);
const allExamples = lessons.map((lesson) => lesson.example);
const allPoints = lessons.flatMap((lesson) =>
  lesson.points.map((point) => ({ point, lessonId: lesson.id }))
);

const makeDistractors = (pool, seed, correct) =>
  pickSeeded(
    pool.filter((item) => item !== correct),
    3,
    seed
  );

const buildQuestionBank = () => {
  const bank = [];

  lessons.forEach((lesson) => {
    const otherLessons = lessons.filter((item) => item.id !== lesson.id);
    const summaryPool = otherLessons.map((item) => item.summary);
    const pointPool = allPoints
      .filter((item) => item.lessonId !== lesson.id)
      .map((item) => item.point);
    const examplePool = allExamples.filter((item) => item !== lesson.example);
    const stagePool = allStageTitles.filter((item) => item !== lesson.stageTitle);
    const practicePool = allPracticeTitles.filter(
      (item) => item !== lesson.practicalTitle
    );

    const questions = [
      {
        question: `“${lesson.title}” mavzusining asosiy g'oyasi qaysi?`,
        correct: lesson.summary,
        distractors: makeDistractors(summaryPool, `${lesson.id}-1`, lesson.summary),
        explanation: lesson.summary,
        difficulty: "oson",
      },
      {
        question: `“${lesson.title}” bo'yicha qaysi fikr to'g'ri?`,
        correct: lesson.points[0],
        distractors: makeDistractors(pointPool, `${lesson.id}-2`, lesson.points[0]),
        explanation: lesson.points[0],
        difficulty: "o'rta",
      },
      {
        question: `Qaysi kundalik misol “${lesson.title}” bilan bog'liq?`,
        correct: lesson.example,
        distractors: makeDistractors(examplePool, `${lesson.id}-3`, lesson.example),
        explanation: `Bu mavzuga mos misol: ${lesson.example}`,
        difficulty: "o'rta",
      },
      {
        question: `“${lesson.title}” qaysi bosqichda o'rganiladi?`,
        correct: lesson.stageTitle,
        distractors: makeDistractors(stagePool, `${lesson.id}-4`, lesson.stageTitle),
        explanation: `Bu mavzu “${lesson.stageTitle}” bosqichining ${lesson.order}-darsidir.`,
        difficulty: "oson",
      },
      {
        question: `“${lesson.title}” uchun qaysi amaliy mashq eng mos?`,
        correct: lesson.practicalTitle,
        distractors: makeDistractors(
          practicePool,
          `${lesson.id}-5`,
          lesson.practicalTitle
        ),
        explanation: `Bu darsda “${lesson.practicalTitle}” amaliy mashqi bajariladi.`,
        difficulty: "qiyin",
      },
    ];

    questions.forEach((item, questionIndex) => {
      const options = uniqueOptions(
        item.correct,
        item.distractors
      );
      if (options.length < 4) {
        const fallback = stages
          .map((stage) => `${stage.title} bo'yicha umumiy tushuncha`)
          .find((value) => !options.includes(value));
        if (fallback) options.push(fallback);
      }
      bank.push({
        id: `${lesson.id}-q${questionIndex + 1}`,
        question: item.question,
        options,
        answer: 0,
        explanation: item.explanation,
        difficulty: item.difficulty,
        topicId: lesson.id,
        topicTitle: lesson.title,
        stageId: lesson.stageId,
        stageTitle: lesson.stageTitle,
        source: `${lesson.stageTitle} · ${lesson.title}`,
      });
    });
  });

  return bank;
};

export const questionBank = buildQuestionBank();

export const questionsByLesson = questionBank.reduce((acc, question) => {
  if (!acc[question.topicId]) acc[question.topicId] = [];
  acc[question.topicId].push(question);
  return acc;
}, {});

export const questionsByStage = questionBank.reduce((acc, question) => {
  if (!acc[question.stageId]) acc[question.stageId] = [];
  acc[question.stageId].push(question);
  return acc;
}, {});

export const featuredLessons = lessons.filter((lesson) => lesson.featured);

export const courseStats = {
  stageCount: stages.length,
  lessonCount: lessons.length,
  questionCount: questionBank.length,
  totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.minutes, 0),
};

export const labs = [
  {
    id: "sanoq-sistemalari",
    number: 1,
    title: "Sanoq sistemalari",
    short: "Konverter",
    description:
      "Istalgan butun sonni ikkilik, sakkizlik, o'nlik va o'n oltilik sistemalarda ko'ring. O'tish mantiqini real vaqtda kuzating.",
    icon: "binary",
    color: "#f59e0b",
    stageId: 3,
    xp: 70,
  },
  {
    id: "axborot-hajmi",
    number: 2,
    title: "Axborot hajmi",
    short: "Konvertor",
    description:
      "Bit, bayt, kilobayt, megabayt, gigabayt va terabayt o'rtasida qiymatlarni aniq aylantiring.",
    icon: "layers",
    color: "#ec4899",
    stageId: 4,
    xp: 70,
  },
  {
    id: "mantiqiy-eshiklar",
    number: 3,
    title: "Mantiqiy eshiklar",
    short: "Mantiq",
    description:
      "AND, OR, NOT va boshqa mantiqiy amallarni sinab ko'ring. Kirish qiymatlarini o'zgartirib, natijani jadvalda kuzating.",
    icon: "logic",
    color: "#8b5cf6",
    stageId: 5,
    xp: 70,
  },
  {
    id: "algoritm-qurish",
    number: 4,
    title: "Algoritm qurish",
    short: "Bloklar",
    description:
      "Choy tayyorlash algoritmini to'g'ri tartibda tuzing. Xato tartib haqida aniq izoh oling.",
    icon: "flow",
    color: "#06b6d4",
    stageId: 6,
    xp: 70,
  },
  {
    id: "html-css",
    number: 5,
    title: "HTML / CSS playground",
    short: "Veb",
    description:
      "HTML va CSS kodini yozing, natijani darhol jonli ko'ring. Boshlang'ich namuna tayyor.",
    icon: "browser",
    color: "#f97316",
    stageId: 8,
    xp: 70,
  },
  {
    id: "javascript",
    number: 6,
    title: "JavaScript playground",
    short: "Kod",
    description:
      "Kod yozib ishga tushiring. Konsol natijalari va tushunarli xato izohlari bir joyda.",
    icon: "terminal",
    color: "#eab308",
    stageId: 9,
    xp: 70,
  },
  {
    id: "qurilmalar",
    number: 7,
    title: "Kompyuter qurilmalari",
    short: "Morfologiya",
    description:
      "Kompyuter diagrammasidagi qurilmalarni bosing. Har birining nomi, vazifasi va qiziqarli faktini o'rganing.",
    icon: "cpu",
    color: "#10b981",
    stageId: 2,
    xp: 70,
  },
];

export const labsById = labs.reduce((acc, lab) => {
  acc[lab.id] = lab;
  return acc;
}, {});

export const getLesson = (id) => lessonsById[id] || null;
export const getStage = (id) => stagesById[Number(id)] || null;
export const getQuestionsForLesson = (id) => questionsByLesson[id] || [];
export const getQuestionsForStage = (id) => questionsByStage[Number(id)] || [];

export const getNextLesson = (id) => {
  const lesson = getLesson(id);
  return lesson?.nextId ? getLesson(lesson.nextId) : null;
};

export const getPreviousLesson = (id) => {
  const lesson = getLesson(id);
  return lesson?.previousId ? getLesson(lesson.previousId) : null;
};

export const getStageLessonNumber = (lesson) => lesson.order;
