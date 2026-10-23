import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__visual" aria-hidden="true">
        <span>4</span>
        <span className="not-found__orb">
          <Icon name="search" size={45} />
        </span>
        <span>4</span>
      </div>
      <span className="eyebrow">Sahifa topilmadi</span>
      <h1>Bu manzilda hech narsa yo'q</h1>
      <p>
        Havola o'zgargan yoki sahifa ko'chirilgan bo'lishi mumkin. O'rganishni
        to'xtatmang — kurs xaritasidan davom eting.
      </p>
      <div className="not-found__actions">
        <Link className="button button--primary" to="/">
          <Icon name="home" size={17} />
          Bosh sahifa
        </Link>
        <Link className="button button--ghost" to="/kurs">
          Kurs xaritasi
          <Icon name="arrowRight" size={16} />
        </Link>
      </div>
      <div className="not-found__links">
        <Link to="/laboratoriyalar">Laboratoriyalar</Link>
        <Link to="/testlar">Testlar</Link>
        <Link to="/panel">Mening panelim</Link>
      </div>
    </div>
  );
}
