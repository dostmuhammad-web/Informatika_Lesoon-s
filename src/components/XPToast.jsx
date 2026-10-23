import { useApp } from "../context/AppContext";
import Icon from "./Icon";

export default function XPToast() {
  const { notice, actions } = useApp();
  if (!notice) return null;

  return (
    <div className="xp-toast" role="status" aria-live="polite">
      <span className={`xp-toast__icon ${notice.amount ? "xp-toast__icon--xp" : ""}`}>
        <Icon name={notice.amount ? "zap" : "info"} size={20} />
      </span>
      <div className="xp-toast__body">
        <strong>{notice.title}</strong>
        <span>{notice.detail}</span>
      </div>
      {notice.amount > 0 && <span className="xp-toast__amount">+{notice.amount} XP</span>}
      <button
        type="button"
        className="icon-button icon-button--sm"
        onClick={actions.clearNotice}
        aria-label="Xabarni yopish"
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}
