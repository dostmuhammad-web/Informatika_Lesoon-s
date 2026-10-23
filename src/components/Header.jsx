import { useApp } from "../context/AppContext";
import Icon from "./Icon";

export default function Header({ onMenu, onSearch }) {
  const { stats, theme, actions } = useApp();

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="icon-button topbar__menu"
          onClick={onMenu}
          aria-label="Menyuni ochish"
          aria-controls="app-sidebar"
        >
          <Icon name="menu" size={21} />
        </button>
        <button type="button" className="topbar__search" onClick={onSearch}>
          <Icon name="search" size={18} />
          <span>Mavzu, lab yoki test qidiring...</span>
          <kbd>Ctrl K</kbd>
        </button>
      </div>

      <div className="topbar__right">
        <span className="topbar__stat topbar__stat--streak" title="Ketma-ket faol kunlar">
          <Icon name="flame" size={17} />
          <strong>{stats.streakCount}</strong>
          <span className="topbar__stat-text">kun</span>
        </span>
        <span className="topbar__stat topbar__stat--xp" title="Umumiy tajriba ballari">
          <Icon name="zap" size={17} />
          <strong>{stats.totalXp.toLocaleString("uz-UZ")}</strong>
          <span className="topbar__stat-text">XP</span>
        </span>
        <button
          type="button"
          className="icon-button"
          onClick={actions.toggleTheme}
          aria-label={theme === "dark" ? "Yorug' rejimga o'tish" : "Tungi rejimga o'tish"}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
        </button>
        <div className="topbar__profile" title={`${stats.levelTitle} · ${stats.level}-daraja`}>
          <span className="topbar__avatar">{stats.level}</span>
          <span className="topbar__profile-text">
            <strong>O'quvchi</strong>
            <small>{stats.levelTitle}</small>
          </span>
        </div>
      </div>
    </header>
  );
}
