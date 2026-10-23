import { useDeferredValue, useState } from "react";
import Icon from "../Icon";

const defaultHtml = `<div class="card">
  <span class="tag">HTML + CSS</span>
  <h1>Salom, veb!</h1>
  <p>Bu sahifani o'zingiz o'zgartirib ko'ring.</p>
  <button>Boshlash</button>
</div>`;

const defaultCss = `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #eef2ff, #ecfeff);
}

.card {
  padding: 32px;
  width: 280px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 50px rgba(30, 41, 59, .14);
  text-align: center;
}

.tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  color: #4f46e5;
  background: #eef2ff;
  padding: 5px 10px;
  border-radius: 999px;
}

h1 { margin: 16px 0 8px; color: #0f172a; }
p { color: #64748b; line-height: 1.6; font-size: 14px; }

button {
  border: 0;
  padding: 10px 20px;
  border-radius: 10px;
  background: #4f46e5;
  color: white;
  font-weight: 600;
  cursor: pointer;
}`;

export default function HtmlPlayground() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [tab, setTab] = useState("html");
  const deferredHtml = useDeferredValue(html);
  const deferredCss = useDeferredValue(css);

  const srcDoc = `<!doctype html><html lang="uz"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><style>${deferredCss}</style></head><body>${deferredHtml}</body></html>`;

  const reset = () => {
    setHtml(defaultHtml);
    setCss(defaultCss);
  };

  return (
    <div className="lab-widget html-playground">
      <div className="lab-widget__head">
        <div>
          <span className="eyebrow">Jonli muharrir</span>
          <h3>Kod yozing — natijani ko'ring</h3>
        </div>
        <button type="button" className="button button--ghost button--sm" onClick={reset}>
          <Icon name="refresh" size={15} />
          Namuna
        </button>
      </div>

      <div className="playground">
        <div className="playground__editor">
          <div className="playground__tabs">
            <button
              type="button"
              className={tab === "html" ? "is-active" : ""}
              onClick={() => setTab("html")}
            >
              HTML
            </button>
            <button
              type="button"
              className={tab === "css" ? "is-active" : ""}
              onClick={() => setTab("css")}
            >
              CSS
            </button>
            <span className="playground__live">
              <i /> Jonli
            </span>
          </div>
          {tab === "html" ? (
            <textarea
              className="playground__code"
              value={html}
              onChange={(event) => setHtml(event.target.value)}
              spellCheck="false"
              aria-label="HTML kodi"
            />
          ) : (
            <textarea
              className="playground__code"
              value={css}
              onChange={(event) => setCss(event.target.value)}
              spellCheck="false"
              aria-label="CSS kodi"
            />
          )}
        </div>
        <div className="playground__preview">
          <div className="playground__browser">
            <span className="playground__browser-dots"><i /><i /><i /></span>
            <span>Natija</span>
          </div>
          <iframe
            title="HTML va CSS natijasi"
            srcDoc={srcDoc}
            sandbox=""
          />
        </div>
      </div>
      <p className="playground__note">
        <Icon name="shield" size={14} />
        Xavfsizlik uchun preview ichida JavaScript ishlamaydi. HTML va CSS to'liq ishlaydi.
      </p>
    </div>
  );
}
