export const WEEKDAYS = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];

export const MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

export const todayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const dateKeyOffset = (days, date = new Date()) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return todayKey(copy);
};

export const formatLongDate = (date = new Date()) =>
  `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

export const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${hours}:${minutes}`;
};

export const getGreeting = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 6) return "Xayrli tun";
  if (hour < 12) return "Xayrli tong";
  if (hour < 17) return "Xayrli kun";
  return "Xayrli kech";
};

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const percentage = (part, total) => {
  if (!total) return 0;
  return Math.round((part / total) * 100);
};

export const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const seededRandom = (seed) => {
  let value = typeof seed === "number" ? seed : stringHash(String(seed));
  value += 0x6d2b79f5;
  let t = value;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const stringHash = (value) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

export const seededShuffle = (array, seed) => {
  const copy = [...array];
  let state = stringHash(String(seed));
  for (let i = copy.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const shuffleQuestion = (question, seed = 1) => {
  const options = question.options.map((label, index) => ({
    label,
    isCorrect: index === question.answer,
  }));
  const shuffled = seededShuffle(options, `${question.id}-${seed}`);
  return {
    ...question,
    options: shuffled.map((option) => option.label),
    answer: shuffled.findIndex((option) => option.isCorrect),
  };
};

export const levelInfo = (xp) => {
  const safeXp = Math.max(0, Number(xp) || 0);
  const level = Math.floor(Math.sqrt(safeXp / 120)) + 1;
  const start = Math.pow(level - 1, 2) * 120;
  const next = Math.pow(level, 2) * 120;
  const progress = percentage(safeXp - start, next - start);
  const titles = [
    "Yangi boshlovchi",
    "Qiziquvchan o'quvchi",
    "Bilim izlovchi",
    "Mantiq ustasi",
    "Kod yozuvchi",
    "Muammo yechuvchi",
    "Texnologiya izlanuvchisi",
    "Raqamli bunyodkor",
    "Informatika ustasi",
    "Kelajak muhandisi",
  ];
  const title = titles[Math.min(level - 1, titles.length - 1)];
  return {
    level,
    title,
    start,
    next,
    progress,
    remaining: Math.max(0, next - safeXp),
  };
};

export const formatNumber = (value, maximumFractionDigits = 2) =>
  new Intl.NumberFormat("uz-UZ", { maximumFractionDigits }).format(value);

export const pluralUz = (count, singular, plural) =>
  `${count} ${count === 1 ? singular : plural}`;

export const padBinary = (value, length = 8) =>
  (value >>> 0).toString(2).padStart(length, "0");

export const toDateLabel = (dateKey) => {
  if (!dateKey) return "";
  const [year, month, day] = dateKey.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
};

export const isToday = (dateKey) => dateKey === todayKey();

export const average = (values) => {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export const timeAgo = (isoDate) => {
  if (!isoDate) return "";
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "hozir";
  if (minutes < 60) return `${minutes} daqiqa oldin`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} soat oldin`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} kun oldin`;
  return formatDateTime(isoDate);
};

export const groupByDate = (items) =>
  items.reduce((acc, item) => {
    const key = item.date ? item.date.slice(0, 10) : todayKey();
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

export const getWeekDays = () => {
  const result = [];
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push({
      key: todayKey(date),
      short: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"][date.getDay()],
      day: date.getDate(),
      full: WEEKDAYS[date.getDay()],
    });
  }
  return result;
};
