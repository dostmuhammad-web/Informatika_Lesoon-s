import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  labs,
  lessons,
  stagesWithLessons,
  featuredLessons,
} from "../data/curriculum";
import Icon from "./Icon";

const synonyms = {
  ram: "operativ xotira tezkor xotira random access memory",
  rom: "doimiy xotira o'qish uchun xotira read only memory",
  ssd: "doimiy xotira disk saqlash qurilmasi",
  hdd: "doimiy xotira disk saqlash qurilmasi",
  html: "veb sahifa teglar tuzilma",
  css: "veb dizayn uslub rang",
  js: "javascript dasturlash kod",
  ai: "sun'iy intellekt",
  ip: "internet protokol manzil tarmoq",
  sql: "ma'lumotlar bazasi so'rov jadval",
  xp: "tajriba ball progress",
};

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[ʻ‘’`´]/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const getSearchText = (lesson) => {
  const lowerTitle = lesson.title.toLowerCase();
  const extras = Object.entries(synonyms)
    .filter(([key]) => lowerTitle.includes(key) || lesson.summary.toLowerCase().includes(key))
    .map(([, value]) => value)
    .join(" ");
  return normalize(
    [
      lesson.title,
      lesson.summary,
      lesson.points.join(" "),
      lesson.example,
      lesson.stageTitle,
      lesson.practicalTitle,
      extras,
    ].join(" ")
  );
};

const withIndex = lessons.map((lesson) => ({
  ...lesson,
  searchText: getSearchText(lesson),
}));

const allTestLinks = [
  {
    id: "aralash",
    title: "Aralash test",
    description: "Barcha bosqichlardan tanlangan 20 savol",
    icon: "shuffle",
    to: "/testlar?rejim=aralash",
  },
  {
    id: "kunlik",
    title: "Kunlik test",
    description: "Har kuni 10 savol bilan bilimni mustahkamlash",
    icon: "calendar",
    to: "/testlar?rejim=kunlik",
  },
  {
    id: "challenge",
    title: "Vaqtli challenge",
    description: "Cheklangan vaqtda tezkor test",
    icon: "timer",
    to: "/testlar?rejim=challenge",
  },
];

function Highlight({ text, query }) {
  const clean = query.trim();
  if (!clean) return text;
  const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = String(text).split(new RegExp(`(${escaped})`, "ig"));
  return parts.map((part, index) =>
    part.toLowerCase() === clean.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    setActive(0);
    const timer = setTimeout(() => inputRef.current?.focus(), 40);
    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const clean = normalize(query);
    if (!clean) {
      return {
        empty: true,
        lessons: [],
        stages: [],
        labs: [],
        tests: [],
      };
    }
    const tokens = clean.split(" ");
    const matches = (text) => tokens.every((token) => normalize(text).includes(token));

    const matchedLessons = withIndex.filter((lesson) => matches(lesson.searchText)).slice(0, 7);
    const stageIds = new Set(matchedLessons.map((lesson) => lesson.stageId));

    const matchedStages = stagesWithLessons
      .filter(
        (stage) =>
          stageIds.has(stage.id) ||
          matches(`${stage.title} ${stage.tagline} ${stage.description} ${stage.level}`)
      )
      .slice(0, 4);

    const matchedLabs = labs
      .filter((lab) => matches(`${lab.title} ${lab.short} ${lab.description}`))
      .slice(0, 3);

    const stageTestLinks = Array.from(stageIds)
      .slice(0, 3)
      .map((id) => {
        const stage = stagesWithLessons.find((item) => item.id === id);
        return {
          id: `stage-${id}`,
          title: `${stage.title} yakuniy testi`,
          description: `${stage.lessonCount} dars bo'yicha savollar`,
          icon: "clipboard",
          to: `/testlar?rejim=bosqich&id=${id}`,
        };
      });

    const genericTests = allTestLinks.filter((item) =>
      matches(`${item.title} ${item.description} test imtihon`)
    );

    return {
      empty: false,
      lessons: matchedLessons,
      stages: matchedStages,
      labs: matchedLabs,
      tests: [...stageTestLinks, ...genericTests].slice(0, 4),
      total:
        matchedLessons.length +
        matchedStages.length +
        matchedLabs.length +
        stageTestLinks.length +
        genericTests.length,
    };
  }, [query]);

  const flat = useMemo(
    () => [
      ...results.lessons.map((item) => ({ to: `/dars/${item.id}` })),
      ...results.stages.map((item) => ({ to: `/kurs/${item.id}` })),
      ...results.labs.map((item) => ({ to: `/laboratoriya/${item.id}` })),
      ...results.tests.map((item) => ({ to: item.to })),
    ],
    [results]
  );

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const go = (to) => {
    onClose();
    navigate(to);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (flat.length ? (value + 1) % flat.length : 0));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => (flat.length ? (value - 1 + flat.length) % flat.length : 0));
    }
    if (event.key === "Enter" && flat[active]) {
      event.preventDefault();
      go(flat[active].to);
    }
  };

  let index = 0;
  const nextIndex = () => {
    const value = index;
    index += 1;
    return value;
  };

  return (
    <div className="search-overlay" onMouseDown={onClose}>
      <div
        className="search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Sayt bo'ylab qidiruv"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="search-modal__input">
          <Icon name="search" size={21} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Mavzu, laboratoriya yoki test qidiring..."
            aria-label="Qidiruv so'zi"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="icon-button icon-button--sm"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Qidiruvni tozalash"
            >
              <Icon name="close" size={16} />
            </button>
          )}
          <kbd>Esc</kbd>
        </div>

        <div className="search-modal__body">
          {results.empty && (
            <div className="search-suggestions">
              <span className="search-suggestions__label">Ommabop qidiruvlar</span>
              <div className="search-suggestions__chips">
                {["RAM", "Sanoq sistemalari", "HTML", "Algoritm", "SQL", "Xavfsizlik"].map((item) => (
                  <button key={item} type="button" onClick={() => setQuery(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <span className="search-suggestions__label">Boshlash uchun</span>
              <div className="search-featured">
                {featuredLessons.slice(0, 4).map((lesson) => (
                  <button
                    type="button"
                    key={lesson.id}
                    className="search-featured__item"
                    onClick={() => go(`/dars/${lesson.id}`)}
                  >
                    <span style={{ background: `${lesson.stageColor}20`, color: lesson.stageColor }}>
                      <Icon name={lesson.stageIcon} size={17} />
                    </span>
                    <div>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.stageTitle}</small>
                    </div>
                    <Icon name="arrowRight" size={15} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!results.empty && results.total === 0 && (
            <div className="search-empty">
              <span>
                <Icon name="search" size={26} />
              </span>
              <h3>Hech narsa topilmadi</h3>
              <p>“{query}” bo‘yicha natija yo‘q. Boshqacha so‘z bilan urinib ko‘ring.</p>
            </div>
          )}

          {!results.empty && results.lessons.length > 0 && (
            <div className="search-group">
              <span className="search-group__title">Darslar</span>
              {results.lessons.map((lesson) => {
                const itemIndex = nextIndex();
                return (
                  <button
                    type="button"
                    key={lesson.id}
                    className={`search-result ${active === itemIndex ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(itemIndex)}
                    onClick={() => go(`/dars/${lesson.id}`)}
                  >
                    <span
                      className="search-result__icon"
                      style={{ background: `${lesson.stageColor}18`, color: lesson.stageColor }}
                    >
                      <Icon name={lesson.stageIcon} size={18} />
                    </span>
                    <span className="search-result__content">
                      <strong>
                        <Highlight text={lesson.title} query={query} />
                      </strong>
                      <small>
                        {lesson.stageTitle} · {lesson.minutes} daqiqa
                      </small>
                    </span>
                    <Icon name="arrowRight" size={15} />
                  </button>
                );
              })}
            </div>
          )}

          {!results.empty && results.stages.length > 0 && (
            <div className="search-group">
              <span className="search-group__title">Bosqichlar</span>
              {results.stages.map((stage) => {
                const itemIndex = nextIndex();
                return (
                  <button
                    type="button"
                    key={stage.id}
                    className={`search-result ${active === itemIndex ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(itemIndex)}
                    onClick={() => go(`/kurs/${stage.id}`)}
                  >
                    <span className="search-result__icon" style={{ background: `${stage.color}18`, color: stage.color }}>
                      <Icon name={stage.icon} size={18} />
                    </span>
                    <span className="search-result__content">
                      <strong>{stage.title}</strong>
                      <small>{stage.lessonCount} dars · {stage.level}</small>
                    </span>
                    <Icon name="arrowRight" size={15} />
                  </button>
                );
              })}
            </div>
          )}

          {!results.empty && results.labs.length > 0 && (
            <div className="search-group">
              <span className="search-group__title">Laboratoriyalar</span>
              {results.labs.map((lab) => {
                const itemIndex = nextIndex();
                return (
                  <button
                    type="button"
                    key={lab.id}
                    className={`search-result ${active === itemIndex ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(itemIndex)}
                    onClick={() => go(`/laboratoriya/${lab.id}`)}
                  >
                    <span className="search-result__icon" style={{ background: `${lab.color}18`, color: lab.color }}>
                      <Icon name={lab.icon} size={18} />
                    </span>
                    <span className="search-result__content">
                      <strong>{lab.title}</strong>
                      <small>{lab.short} · Interaktiv laboratoriya</small>
                    </span>
                    <Icon name="arrowRight" size={15} />
                  </button>
                );
              })}
            </div>
          )}

          {!results.empty && results.tests.length > 0 && (
            <div className="search-group">
              <span className="search-group__title">Testlar</span>
              {results.tests.map((test) => {
                const itemIndex = nextIndex();
                return (
                  <button
                    type="button"
                    key={test.id}
                    className={`search-result ${active === itemIndex ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(itemIndex)}
                    onClick={() => go(test.to)}
                  >
                    <span className="search-result__icon">
                      <Icon name={test.icon} size={18} />
                    </span>
                    <span className="search-result__content">
                      <strong>{test.title}</strong>
                      <small>{test.description}</small>
                    </span>
                    <Icon name="arrowRight" size={15} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="search-modal__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> yurish</span>
          <span><kbd>Enter</kbd> ochish</span>
          <span><kbd>Esc</kbd> yopish</span>
        </div>
      </div>
    </div>
  );
}
