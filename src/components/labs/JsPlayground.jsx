import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";

const workerSource = `
self.onmessage = function (event) {
  const logs = [];
  const format = function (value) {
    if (typeof value === "string") return value;
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  };
  const customConsole = {
    log: function () {
      logs.push({ type: "log", text: Array.prototype.map.call(arguments, format).join(" ") });
    },
    info: function () {
      logs.push({ type: "info", text: Array.prototype.map.call(arguments, format).join(" ") });
    },
    warn: function () {
      logs.push({ type: "warn", text: Array.prototype.map.call(arguments, format).join(" ") });
    },
    error: function () {
      logs.push({ type: "error", text: Array.prototype.map.call(arguments, format).join(" ") });
    },
  };
  try {
    const fn = new Function("console", event.data);
    fn(customConsole);
    self.postMessage({ logs: logs.slice(0, 100) });
  } catch (error) {
    self.postMessage({
      logs: logs.slice(0, 100),
      error: error && error.message ? error.message : String(error),
    });
  }
};
`;

const examples = [
  {
    key: "salom",
    label: "Salom",
    code: `const ism = "Aziza";\nconst yosh = 14;\n\nconsole.log("Salom, " + ism + "!");\nconsole.log("Yosh:", yosh);`,
  },
  {
    key: "sikl",
    label: "Sikl",
    code: `let yigindi = 0;\n\nfor (let i = 1; i <= 5; i += 1) {\n  yigindi += i;\n  console.log(i + "-qadam:", yigindi);\n}\n\nconsole.log("Natija:", yigindi);`,
  },
  {
    key: "massiv",
    label: "Massiv",
    code: `const baholar = [78, 91, 65, 88];\nconst ortacha = baholar.reduce((a, b) => a + b, 0) / baholar.length;\n\nconsole.log("Baholar:", baholar);\nconsole.log("O'rtacha:", ortacha.toFixed(1));`,
  },
  {
    key: "funksiya",
    label: "Funksiya",
    code: `function daraja(baho) {\n  if (baho >= 90) return "A";\n  if (baho >= 70) return "B";\n  return "Qayta mashq";\n}\n\nconsole.log(daraja(95));\nconsole.log(daraja(82));\nconsole.log(daraja(55));`,
  },
];

export default function JsPlayground() {
  const [code, setCode] = useState(examples[0].code);
  const [output, setOutput] = useState([
    { type: "info", text: "Kodni ishga tushirish uchun «Ishga tushirish» tugmasini bosing." },
  ]);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const workerRef = useRef(null);
  const timerRef = useRef(null);

  const stopWorker = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  useEffect(() => stopWorker, []);

  const run = () => {
    stopWorker();
    setRunning(true);
    setError(null);
    setElapsed(0);
    const started = performance.now();

    const blob = new Blob([workerSource], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    workerRef.current = worker;

    timerRef.current = setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      setRunning(false);
      setError("Kod 2.5 soniyada tugamadi. Cheksiz sikl bo'lishi mumkin.");
    }, 2500);

    worker.onmessage = (event) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      worker.terminate();
      workerRef.current = null;
      setRunning(false);
      setElapsed(Math.round(performance.now() - started));
      const data = event.data || {};
      setOutput(data.logs?.length ? data.logs : [{ type: "info", text: "Konsolga hech narsa chiqmadi." }]);
      setError(data.error || null);
    };

    worker.onerror = (event) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      worker.terminate();
      workerRef.current = null;
      setRunning(false);
      setError(event.message || "Kod bajarishda xatolik yuz berdi.");
    };

    worker.postMessage(code);
  };

  return (
    <div className="lab-widget js-playground">
      <div className="lab-widget__head">
        <div>
          <span className="eyebrow">JavaScript muhiti</span>
          <h3>Kodni yozing va ishga tushiring</h3>
        </div>
        <div className="lab-presets">
          {examples.map((item) => (
            <button key={item.key} type="button" onClick={() => setCode(item.code)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="js-playground__layout">
        <div className="js-editor">
          <div className="js-editor__head">
            <span className="js-editor__dots"><i /><i /><i /></span>
            <span>main.js</span>
            <button
              type="button"
              className="js-editor__run"
              onClick={run}
              disabled={running}
            >
              <Icon name={running ? "refresh" : "play"} size={14} filled={!running} />
              {running ? "Bajarilmoqda..." : "Ishga tushirish"}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                event.preventDefault();
                run();
              }
            }}
            spellCheck="false"
            aria-label="JavaScript kodi"
          />
          <span className="js-editor__hint">Ctrl + Enter</span>
        </div>

        <div className="js-console">
          <div className="js-console__head">
            <span><Icon name="terminal" size={15} /> Konsol</span>
            <span>{running ? "..." : `${elapsed} ms`}</span>
          </div>
          <div className="js-console__body">
            {output.map((item, index) => (
              <div key={`${item.text}-${index}`} className={`console-line console-line--${item.type}`}>
                <span>›</span>
                <code>{item.text}</code>
              </div>
            ))}
            {error && (
              <div className="console-line console-line--error">
                <span>!</span>
                <code>{error}</code>
              </div>
            )}
          </div>
          <div className="js-console__footer">
            <span className={error ? "is-error" : "is-ok"}>
              <i />
              {error ? "Xatolik" : "Tayyor"}
            </span>
            <button
              type="button"
              onClick={() => {
                setOutput([{ type: "info", text: "Konsol tozalandi." }]);
                setError(null);
              }}
            >
              Tozalash
            </button>
          </div>
        </div>
      </div>
      <p className="playground__note">
        <Icon name="shield" size={14} />
        Kod alohida worker ichida bajariladi. Cheksiz sikl 2.5 soniyadan keyin avtomatik to'xtatiladi.
      </p>
    </div>
  );
}
