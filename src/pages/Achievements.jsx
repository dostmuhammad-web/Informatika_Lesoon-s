import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { achievements, metricLabels } from "../data/achievements";
import { useApp } from "../context/AppContext";
import {
  countUnlocked,
  getAchievementMetrics,
  getAchievementProgress,
} from "../utils/achievements";
import { percentage } from "../utils/helpers";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";

export default function Achievements() {
  const { stats, favorites } = useApp();
  const [filter, setFilter] = useState("all");
  const metrics = getAchievementMetrics(stats, favorites.length);
  const unlocked = countUnlocked(metrics);
  const overall = percentage(unlocked, achievements.length);

  const items = useMemo(
    () =>
      achievements
        .map((item) => ({ ...item, progress: getAchievementProgress(item, metrics) }))
        .filter((item) => {
          if (filter === "unlocked") return item.progress.unlocked;
          if (filter === "locked") return !item.progress.unlocked;
          return true;
        })
        .sort((a, b) => Number(b.progress.unlocked) - Number(a.progress.unlocked) || b.progress.percent - a.progress.percent),
    [filter, metrics]
  );

  const nextTarget = achievements
    .map((item) => ({ ...item, progress: getAchievementProgress(item, metrics) }))
    .filter((item) => !item.progress.unlocked)
    .sort((a, b) => b.progress.percent - a.progress.percent)[0];

  return (
    <div className="achievements-page">
      <Breadcrumbs items={[{ label: "Yutuqlar" }]} />

      <header className="achievements-hero">
        <div className="achievements-hero__content">
          <span className="eyebrow">Sizning natijalaringiz</span>
          <h1>Har bir qadam — yangi yutuq</h1>
          <p>
            Darslarni tugatish, testlarni yechish va izchil o'rganish orqali yutuqlarni
            oching. Jami {achievements.length} ta maqsad sizni kutmoqda.
          </p>
          <div className="achievements-hero__meta">
            <span><Icon name="trophy" size={16} /> {unlocked} ta ochilgan</span>
            <span><Icon name="target" size={16} /> {achievements.length - unlocked} ta qoldi</span>
            <span><Icon name="flame" size={16} /> {stats.streakCount} kunlik seriya</span>
          </div>
        </div>
        <div className="achievements-hero__ring" style={{ "--progress": `${overall}%` }}>
          <div>
            <strong>{overall}%</strong>
            <span>kolleksiya</span>
          </div>
        </div>
      </header>

      {nextTarget && (
        <div className="next-achievement" style={{ "--achievement-color": nextTarget.color }}>
          <span className="next-achievement__icon">
            <Icon name={nextTarget.icon} size={24} />
          </span>
          <div className="next-achievement__body">
            <span className="eyebrow">Keyingi maqsad</span>
            <h2>{nextTarget.title}</h2>
            <p>{nextTarget.description}</p>
            <div className="next-achievement__progress">
              <ProgressBar value={nextTarget.progress.percent} color={nextTarget.color} thin />
              <span>{nextTarget.progress.current} / {nextTarget.progress.target}</span>
            </div>
          </div>
          <Link to="/kurs" className="button button--ghost">
            Davom etish
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      )}

      <div className="achievements-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Yutuqlar filtri">
          {[
            { key: "all", label: "Barchasi", count: achievements.length },
            { key: "unlocked", label: "Ochilgan", count: unlocked },
            { key: "locked", label: "Yopiq", count: achievements.length - unlocked },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={filter === item.key}
              className={filter === item.key ? "is-active" : ""}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
              <span>{item.count}</span>
            </button>
          ))}
        </div>
        <span className="achievements-toolbar__hint">
          <Icon name="info" size={14} />
          Yutuqlar real vaqtda yangilanadi
        </span>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="trophy"
          title="Bu bo'limda yutuq yo'q"
          description={
            filter === "unlocked"
              ? "Hali yutuq ochilmagan. Birinchi darsni yakunlashdan boshlang."
              : "Barcha yutuqlar ochilgan. Ajoyib natija!"
          }
          actionLabel="Kursga o'tish"
          actionTo="/kurs"
        />
      ) : (
        <div className="achievement-grid">
          {items.map((item) => (
            <article
              key={item.id}
              className={`achievement-card ${item.progress.unlocked ? "is-unlocked" : "is-locked"}`}
              style={{ "--achievement-color": item.color }}
            >
              <div className="achievement-card__top">
                <span className="achievement-card__icon">
                  <Icon name={item.progress.unlocked ? item.icon : "lock"} size={25} />
                </span>
                <span className={`achievement-card__status ${item.progress.unlocked ? "is-unlocked" : ""}`}>
                  {item.progress.unlocked ? "Ochilgan" : `${item.progress.percent}%`}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="achievement-card__progress">
                <ProgressBar
                  value={item.progress.percent}
                  color={item.color}
                  thin
                />
                <div>
                  <span>{item.progress.current} / {item.progress.target}</span>
                  <span>{metricLabels[item.metric]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="achievements-tip">
        <span className="achievements-tip__icon">
          <Icon name="brain" size={24} />
        </span>
        <div>
          <h2>Yutuqlarni tezroq ochish uchun</h2>
          <p>
            Har kuni kamida bitta dars va bitta test bajaring. Laboratoriyalar, bosqich
            yakunlari va sevimli darslar ham alohida yutuqlarga ega.
          </p>
        </div>
        <Link className="button button--light" to="/panel">
          Panelni ko'rish
          <Icon name="arrowRight" size={16} />
        </Link>
      </section>
    </div>
  );
}
