import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { stagesWithLessons } from "../data/curriculum";
import { useApp } from "../context/AppContext";
import { percentage } from "../utils/helpers";
import Icon from "./Icon";
import Logo from "./Logo";
import ProgressBar from "./ProgressBar";

const mainLinks = [
  { to: "/", label: "Bosh sahifa", icon: "home", end: true },
  { to: "/panel", label: "Mening panelim", icon: "dashboard" },
  { to: "/kurs", label: "To'liq kurs", icon: "book" },
  { to: "/laboratoriyalar", label: "Laboratoriyalar", icon: "flask" },
  { to: "/testlar", label: "Testlar", icon: "test" },
  { to: "/yutuqlar", label: "Yutuqlar", icon: "trophy" },
];

const getActiveStage = (pathname) => {
  const stageMatch = pathname.match(/^\/kurs\/(\d+)/);
  if (stageMatch) return Number(stageMatch[1]);
  const lessonMatch = pathname.match(/^\/dars\/s(\d+)-/);
  if (lessonMatch) return Number(lessonMatch[1]);
  return null;
};

export default function Sidebar({ open, onClose, onSearch }) {
  const { completedLessons, stats, theme, actions } = useApp();
  const location = useLocation();
  const activeStage = getActiveStage(location.pathname);
  const [expanded, setExpanded] = useState(() => new Set(activeStage ? [activeStage] : [1]));

  useEffect(() => {
    if (activeStage) {
      setExpanded((current) => {
        if (current.has(activeStage)) return current;
        const next = new Set(current);
        next.add(activeStage);
        return next;
      });
    }
  }, [activeStage]);

  const toggleStage = (id) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNavigate = () => {
    onClose?.();
  };

  return (
    <aside id="app-sidebar" className={`sidebar ${open ? "is-open" : ""}`} aria-label="Asosiy navigatsiya">
      <div className="sidebar__top">
        <Logo />
        <button
          type="button"
          className="icon-button sidebar__close"
          onClick={onClose}
          aria-label="Menyuni yopish"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <button type="button" className="sidebar__search" onClick={onSearch}>
        <Icon name="search" size={18} />
        <span>Qidirish...</span>
        <kbd>Ctrl K</kbd>
      </button>

      <div className="sidebar__scroll">
        <nav className="sidebar__nav" aria-label="Bo'limlar">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `sidebar-link ${isActive ? "is-active" : ""}`}
              onClick={handleNavigate}
            >
              <span className="sidebar-link__icon">
                <Icon name={link.icon} size={19} />
              </span>
              {link.label}
              <Icon name="chevronRight" size={15} className="sidebar-link__chevron" />
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__section-head">
          <span>O'quv yo'li</span>
          <span className="sidebar__section-count">{stagesWithLessons.length} bosqich</span>
        </div>

        <div className="sidebar__stages">
          {stagesWithLessons.map((stage) => {
            const done = stage.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
            const progress = percentage(done, stage.lessonCount);
            const isExpanded = expanded.has(stage.id);
            return (
              <div
                key={stage.id}
                className={`sidebar-stage ${activeStage === stage.id ? "is-current" : ""}`}
                style={{ "--stage-color": stage.color }}
              >
                <div className="sidebar-stage__row">
                  <NavLink
                    to={`/kurs/${stage.id}`}
                    className="sidebar-stage__main"
                    onClick={handleNavigate}
                  >
                    <span
                      className="sidebar-stage__number"
                      style={{ background: `${stage.color}18`, color: stage.color }}
                    >
                      {String(stage.id).padStart(2, "0")}
                    </span>
                    <span className="sidebar-stage__label">
                      <strong>{stage.title}</strong>
                      <small>{done}/{stage.lessonCount} dars</small>
                    </span>
                  </NavLink>
                  <button
                    type="button"
                    className={`sidebar-stage__toggle ${isExpanded ? "is-open" : ""}`}
                    onClick={() => toggleStage(stage.id)}
                    aria-expanded={isExpanded}
                    aria-label={`${stage.title} darslarini ${isExpanded ? "yopish" : "ochish"}`}
                  >
                    <Icon name="chevronDown" size={16} />
                  </button>
                </div>
                {isExpanded && (
                  <div className="sidebar-stage__lessons">
                    {stage.lessons.map((lesson) => {
                      const isDone = completedLessons.includes(lesson.id);
                      return (
                        <NavLink
                          key={lesson.id}
                          to={`/dars/${lesson.id}`}
                          className={({ isActive }) => `sidebar-lesson ${isActive ? "is-active" : ""}`}
                          onClick={handleNavigate}
                        >
                          <span className={`sidebar-lesson__mark ${isDone ? "is-done" : ""}`}>
                            {isDone ? <Icon name="check" size={11} /> : lesson.order}
                          </span>
                          <span>{lesson.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
                {isExpanded && <ProgressBar value={progress} color={stage.color} thin />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar-progress">
          <div className="sidebar-progress__head">
            <span>
              <Icon name="gem" size={16} />
              {stats.level}-daraja
            </span>
            <strong>{stats.overallProgress}%</strong>
          </div>
          <ProgressBar value={stats.overallProgress} thin />
          <small>{stats.completedLessonCount} / {stats.totalLessons} dars tugallandi</small>
        </div>
        <button
          type="button"
          className="sidebar__theme"
          onClick={actions.toggleTheme}
          aria-label={theme === "dark" ? "Yorug' rejimga o'tish" : "Tungi rejimga o'tish"}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
          {theme === "dark" ? "Yorug' rejim" : "Tungi rejim"}
        </button>
      </div>
    </aside>
  );
}
