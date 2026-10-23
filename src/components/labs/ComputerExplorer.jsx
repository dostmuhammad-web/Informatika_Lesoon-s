import { useState } from "react";
import Icon from "../Icon";

const devices = [
  {
    id: "cpu",
    name: "Protsessor (CPU)",
    short: "CPU",
    icon: "cpu",
    role: "Kompyuterning «miyasi» — hisoblash va buyruqlarni bajaradi.",
    fact: "Zamonaviy protsessorda milliardlab tranzistorlar bor va ular soniyasiga milliardlab amal bajaradi.",
    color: "#5b7cfa",
  },
  {
    id: "ram",
    name: "Operativ xotira (RAM)",
    short: "RAM",
    icon: "layers",
    role: "Hozir ishlatilayotgan dastur va ma'lumotlarni vaqtincha saqlaydi.",
    fact: "Kompyuter o'chganda RAM tarkibi yo'qoladi. Shuning uchun u doimiy xotira emas.",
    color: "#10b981",
  },
  {
    id: "ssd",
    name: "Doimiy xotira (SSD)",
    short: "SSD",
    icon: "database",
    role: "Fayl, dastur va operatsion tizimni o'chirilgandan keyin ham saqlaydi.",
    fact: "SSD harakatlanuvchi qismlarga ega emas, shuning uchun HDD'ga qaraganda tezroq va jimroq ishlaydi.",
    color: "#f59e0b",
  },
  {
    id: "motherboard",
    name: "Anakart",
    short: "MAINBOARD",
    icon: "grid",
    role: "Barcha qurilmalarni bog'laydigan asosiy plata.",
    fact: "Protsessor, RAM, disk va boshqa qismlar anakart orqali elektr va ma'lumot almashadi.",
    color: "#8b5cf6",
  },
  {
    id: "psu",
    name: "Quvvat manbasi",
    short: "PSU",
    icon: "zap",
    role: "Kompyuter qismlarini zarur elektr quvvati bilan ta'minlaydi.",
    fact: "Quvvat manbasi rozetkadagi kuchlanishni kompyuter qismlariga mos kuchlanishga aylantiradi.",
    color: "#ec4899",
  },
  {
    id: "monitor",
    name: "Monitor",
    short: "DISPLAY",
    icon: "monitor",
    role: "Natijani vizual ko'rinishda chiqaradi.",
    fact: "Monitor tasviri piksellardan tashkil topgan. 1920×1080 ekranda 2 milliondan ortiq piksel bor.",
    color: "#06b6d4",
  },
  {
    id: "keyboard",
    name: "Klaviatura",
    short: "INPUT",
    icon: "grid",
    role: "Matn va buyruqlarni kiritish uchun xizmat qiladi.",
    fact: "Klaviatura — kiritish qurilmasi. Uning signallari kompyuter tomonidan raqamli kodga aylantiriladi.",
    color: "#f97316",
  },
];

export default function ComputerExplorer() {
  const [activeId, setActiveId] = useState("cpu");
  const active = devices.find((device) => device.id === activeId);

  return (
    <div className="lab-widget computer-explorer">
      <div className="lab-widget__head">
        <div>
          <span className="eyebrow">Interaktiv sxema</span>
          <h3>Qurilmani bosing</h3>
        </div>
        <span className="computer-explorer__hint">
          <Icon name="info" size={14} />
          Har bir qism haqida ma'lumot
        </span>
      </div>

      <div className="computer-explorer__layout">
        <div className="pc-diagram">
          <div className="pc-monitor">
            <div className="pc-monitor__screen">
              <div className="pc-monitor__window">
                <span /><span /><span />
                <div className="pc-monitor__lines"><i /><i /><i /></div>
              </div>
            </div>
            <div className="pc-monitor__stand" />
            <button
              type="button"
              className={`pc-part pc-part--monitor ${activeId === "monitor" ? "is-active" : ""}`}
              onClick={() => setActiveId("monitor")}
            >
              Monitor
            </button>
          </div>

          <div className="pc-case">
            <div className="pc-case__top">
              <span><i /> POWER</span>
              <span>SYSTEM UNIT</span>
            </div>
            <button
              type="button"
              className={`pc-part pc-part--cpu ${activeId === "cpu" ? "is-active" : ""}`}
              onClick={() => setActiveId("cpu")}
            >
              <Icon name="cpu" size={18} />
              <span>CPU</span>
              <small>Protsessor</small>
            </button>
            <button
              type="button"
              className={`pc-part pc-part--ram ${activeId === "ram" ? "is-active" : ""}`}
              onClick={() => setActiveId("ram")}
            >
              <Icon name="layers" size={18} />
              <span>RAM</span>
              <small>Xotira</small>
            </button>
            <button
              type="button"
              className={`pc-part pc-part--ssd ${activeId === "ssd" ? "is-active" : ""}`}
              onClick={() => setActiveId("ssd")}
            >
              <Icon name="database" size={18} />
              <span>SSD</span>
              <small>Disk</small>
            </button>
            <button
              type="button"
              className={`pc-part pc-part--board ${activeId === "motherboard" ? "is-active" : ""}`}
              onClick={() => setActiveId("motherboard")}
            >
              <Icon name="grid" size={18} />
              <span>MAINBOARD</span>
            </button>
            <button
              type="button"
              className={`pc-part pc-part--psu ${activeId === "psu" ? "is-active" : ""}`}
              onClick={() => setActiveId("psu")}
            >
              <Icon name="zap" size={18} />
              <span>PSU</span>
            </button>
          </div>

          <button
            type="button"
            className={`pc-part pc-part--keyboard ${activeId === "keyboard" ? "is-active" : ""}`}
            onClick={() => setActiveId("keyboard")}
          >
            <span className="pc-keyboard">
              {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
            </span>
            Klaviatura
          </button>
        </div>

        <div className="device-info" style={{ "--device-color": active.color }}>
          <span className="device-info__icon" style={{ background: `${active.color}18`, color: active.color }}>
            <Icon name={active.icon} size={27} />
          </span>
          <span className="eyebrow">Qurilma ma'lumoti</span>
          <h2>{active.name}</h2>
          <p>{active.role}</p>
          <div className="device-info__fact">
            <Icon name="spark" size={17} />
            <div>
              <strong>Qiziqarli fakt</strong>
              <p>{active.fact}</p>
            </div>
          </div>
          <div className="device-info__tabs">
            {devices.map((device) => (
              <button
                key={device.id}
                type="button"
                className={device.id === active.id ? "is-active" : ""}
                onClick={() => setActiveId(device.id)}
                title={device.name}
              >
                <Icon name={device.icon} size={15} />
                {device.short}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
