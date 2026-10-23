import { Link, useParams } from "react-router-dom";
import { getStage, labs, labsById } from "../data/curriculum";
import { useApp } from "../context/AppContext";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import { labComponents } from "../components/labs";

const guides = {
  "sanoq-sistemalari": {
    goal: "Sonlarni turli sanoq sistemalarida ifodalashni amalda ko'rish.",
    steps: [
      "O'nlik son kiriting yoki tayyor qiymatlardan birini tanlang.",
      "To'rt xil sanoq sistemasidagi natijalarni solishtiring.",
      "Ikkilik yoyilmadagi har bir bitning qiymatini kuzating.",
    ],
    tip: "255 sonini kiriting va 11111111 natijasini oling — bu bir baytning maksimal qiymati.",
  },
  "axborot-hajmi": {
    goal: "Bit, bayt va katta hajm birliklari o'rtasidagi munosabatni hisoblash.",
    steps: [
      "Qiymat va birlikni tanlang.",
      "Barcha birliklardagi natijalarni bir vaqtda ko'ring.",
      "1 GB ichida nechta MB borligini tekshiring.",
    ],
    tip: "Xotira qurilmalari hajmi odatda GB yoki TB da, fayl hajmi esa KB yoki MB da ko'rsatiladi.",
  },
  "mantiqiy-eshiklar": {
    goal: "AND, OR, NOT va boshqa mantiqiy amallarning natijasini tushunish.",
    steps: [
      "Mantiqiy eshikni tanlang.",
      "A va B kirish qiymatlarini almashtiring.",
      "Rostlik jadvalidan joriy holatni toping.",
    ],
    tip: "TRUE = 1, FALSE = 0. XOR faqat kirishlar har xil bo'lganda 1 qaytaradi.",
  },
  "algoritm-qurish": {
    goal: "Qadamlar tartibini mantiqiy ketma-ketlikka keltirish.",
    steps: [
      "Bloklarni yuqoriga yoki pastga ko'chirish tugmalari bilan tartiblang.",
      "Har bir qadam oldingisiga mantiqan bog'liq bo'lishi kerak.",
      "«Tartibni tekshirish» tugmasi bilan natijani sinang.",
    ],
    tip: "Algoritmda qadamlar aniq, bajariladigan va yakuniy natijaga olib boradigan bo'lishi shart.",
  },
  "html-css": {
    goal: "HTML tuzilmasini va CSS orqali sahifa ko'rinishini yaratishni o'rganish.",
    steps: [
      "HTML yoki CSS bo'limini tanlang.",
      "Kodni tahrirlang — o'ng tomondagi natija yangilanadi.",
      "Rang, o'lcham va joylashuvni o'zgartirib ko'ring.",
    ],
    tip: "HTML — sahifa skeleti, CSS — uning kiyimi. Avval tuzilma yarating, keyin bezang.",
  },
  javascript: {
    goal: "JavaScript kodini yozish, ishga tushirish va natijani konsolda ko'rish.",
    steps: [
      "Tayyor namunalardan birini tanlang yoki o'z kodingizni yozing.",
      "«Ishga tushirish» tugmasini bosing yoki Ctrl + Enter dan foydalaning.",
      "Konsoldagi natija va xato xabarini o'qing.",
    ],
    tip: "console.log() qiymatni chiqaradi. Kod xato bersa, konsol qatorini diqqat bilan o'qing.",
  },
  qurilmalar: {
    goal: "Kompyuter qurilmalarining nomi, vazifasi va o'zaro bog'liqligini bilish.",
    steps: [
      "Sxemadagi istalgan qurilmani bosing.",
      "Uning vazifasi va qiziqarli faktini o'qing.",
      "Monitor, protsessor va xotira o'rtasidagi farqni taqqoslang.",
    ],
    tip: "Kiritish qurilmalari ma'lumotni kompyuterga, chiqarish qurilmalari esa natijani tashqariga uzatadi.",
  },
};

export default function LabPage() {
  const { labId } = useParams();
  const lab = labsById[labId];
  const { completedLabs, actions } = useApp();

  if (!lab) {
    return (
      <EmptyState
        icon="flask"
        title="Laboratoriya topilmadi"
        description="Bunday laboratoriya mavjud emas. Barcha mavjud muhitlarni ro'yxatdan tanlang."
        actionLabel="Laboratoriyalar"
        actionTo="/laboratoriyalar"
      />
    );
  }

  const Widget = labComponents[lab.id];
  const stage = getStage(lab.stageId);
  const guide = guides[lab.id];
  const isDone = completedLabs.includes(lab.id);
  const labIndex = labs.findIndex((item) => item.id === lab.id);
  const nextLab = labs[labIndex + 1] || labs[0];

  return (
    <div className="lab-page" style={{ "--lab-color": lab.color }}>
      <Breadcrumbs
        items={[
          { label: "Laboratoriyalar", to: "/laboratoriyalar" },
          { label: lab.title },
        ]}
      />

      <header className="lab-hero">
        <span className="lab-hero__icon">
          <Icon name={lab.icon} size={30} />
        </span>
        <div className="lab-hero__content">
          <div className="lab-hero__meta">
            <span>LAB {String(lab.number).padStart(2, "0")}</span>
            <span>{lab.short}</span>
            {isDone && <span className="is-done"><Icon name="checkCircle" size={13} /> Bajarilgan</span>}
          </div>
          <h1>{lab.title}</h1>
          <p>{lab.description}</p>
        </div>
        <div className="lab-hero__actions">
          <Link className="button button--ghost" to={`/kurs/${stage.id}`}>
            <Icon name="book" size={16} />
            {stage.id}-bosqich
          </Link>
          {isDone ? (
            <Link className="button button--primary" to={`/laboratoriya/${nextLab.id}`}>
              Keyingi laboratoriya
              <Icon name="arrowRight" size={16} />
            </Link>
          ) : (
            <button type="button" className="button button--primary" onClick={() => actions.completeLab(lab.id)}>
              <Icon name="check" size={16} />
              Yakunlash · +70 XP
            </button>
          )}
        </div>
      </header>

      <div className="lab-page__layout">
        <div className="lab-page__main">
          <Widget />

          <div className="lab-complete-strip">
            <div>
              <span className="eyebrow">Laboratoriya yakuni</span>
              <h3>{isDone ? "Bu laboratoriya allaqachon bajarilgan" : "Mashqni bajardingizmi?"}</h3>
              <p>
                {isDone
                  ? "Xohlagancha qayta mashq qilishingiz mumkin. XP takroran berilmaydi."
                  : "Natijani tekshirib, laboratoriyani yakunlang. Hisobingizga 70 XP qo'shiladi."}
              </p>
            </div>
            {isDone ? (
              <span className="lab-complete-strip__done">
                <Icon name="checkCircle" size={18} />
                +70 XP olindi
              </span>
            ) : (
              <button type="button" className="button button--primary" onClick={() => actions.completeLab(lab.id)}>
                <Icon name="award" size={17} />
                Laboratoriyani yakunlash
              </button>
            )}
          </div>
        </div>

        <aside className="lab-aside">
          <div className="aside-card">
            <div className="aside-card__head">
              <Icon name="target" size={19} />
              <h3>Mashq maqsadi</h3>
            </div>
            <p>{guide.goal}</p>
            <div className="aside-label">
              <Icon name="route" size={14} />
              Bajarish tartibi
            </div>
            <ol className="aside-steps">
              {guide.steps.map((step, index) => (
                <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
              ))}
            </ol>
          </div>

          <div className="aside-card aside-card--tip">
            <span className="aside-card__icon"><Icon name="spark" size={20} /></span>
            <h3>Foydali maslahat</h3>
            <p>{guide.tip}</p>
          </div>

          <div className="aside-card aside-card--mini">
            <span>Lab holati</span>
            <strong>{isDone ? "Tugallangan" : "Hali boshlanmagan"}</strong>
            <div className="lab-aside__info">
              <span><Icon name="zap" size={14} /> +70 XP</span>
              <span><Icon name="clock" size={14} /> 10–15 daqiqa</span>
            </div>
            <Link to={`/kurs/${stage.id}`} className="text-link">
              {stage.title} bosqichi
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="aside-next">
            <span>Keyingi lab</span>
            <Link to={`/laboratoriya/${nextLab.id}`}>
              <Icon name={nextLab.icon} size={18} />
              <span>
                <strong>{nextLab.title}</strong>
                <small>{nextLab.short}</small>
              </span>
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
