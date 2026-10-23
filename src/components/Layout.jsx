import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Icon from "./Icon";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import Sidebar from "./Sidebar";
import XPToast from "./XPToast";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", sidebarOpen || searchOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [sidebarOpen, searchOpen]);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Asosiy kontentga o'tish
      </a>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSearch={() => setSearchOpen(true)}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Menyuni yopish"
        />
      )}

      <div className="app__main">
        <Header onMenu={() => setSidebarOpen(true)} onSearch={() => setSearchOpen(true)} />
        <main id="main-content" className="page">
          <Outlet />
        </main>
        <footer className="site-footer">
          <div className="site-footer__brand">
            <Logo />
            <p>Informatikani noldan o'rganish uchun zamonaviy va amaliy platforma.</p>
          </div>
          <div className="site-footer__links">
            <div>
              <strong>O'rganish</strong>
              <Link to="/kurs">To'liq kurs</Link>
              <Link to="/laboratoriyalar">Laboratoriyalar</Link>
              <Link to="/testlar">Testlar</Link>
            </div>
            <div>
              <strong>Progress</strong>
              <Link to="/panel">Mening panelim</Link>
              <Link to="/yutuqlar">Yutuqlar</Link>
              <Link to="/panel#eslatmalar">Eslatmalar</Link>
            </div>
          </div>
          <div className="site-footer__bottom">
            <span>© {new Date().getFullYear()} Informatika olami</span>
            <span>O'rgan. Tajriba qil. Yarat.</span>
            <span className="site-footer__safe">
              <Icon name="shield" size={14} />
              Progress brauzeringizda saqlanadi
            </span>
          </div>
        </footer>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <XPToast />
    </div>
  );
}
