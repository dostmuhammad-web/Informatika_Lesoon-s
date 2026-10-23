import { Link } from "react-router-dom";
import {
  labs,
  stagesWithLessons,
  courseStats,
  featuredLessons,
} from "../data/curriculum";
import { useApp } from "../context/AppContext";
import { formatLongDate } from "../utils/helpers";
import Icon from "../components/Icon";
import LabCard from "../components/LabCard";
import LessonCard from "../components/LessonCard";
import ProgressBar from "../components/ProgressBar";
import SectionHeading from "../components/SectionHeading";
import StageCard from "../components/StageCard";
import StageGlyph from "../components/StageGlyph";

const features = [
  {
    icon: "route",
    title: "Bosqichma-bosqich yo'l",
    text: "Har bir mavzu oldingisiga tayanadi. Noldan boshlab, murakkab loyihalargacha ishonch bilan o'tasiz.",
    color: "#5b7cfa",
  },
  {
    icon: "flask",
    title: "Amaliyot birinchi o'rinda",
    text: "7 ta interaktiv laboratoriya bilan kodni yozing, natijani ko'ring va xatoni darhol tushuning.",
    color: "#06b6d4",
  },
  {
    icon: "test",
    title: "Bilimni mustahkamlash",
    text: "Dars testlari, bosqich yakuniy imtihonlari va aralash testlar bilimni doimiy tekshirib turadi.",
    color: "#8b5cf6",
  },
  {
    icon: "chart",
    title: "Ko'rinadigan natija",
    text: "XP, kunlik maqsad, streak va bosqich progressi orqali o'z o'sishingizni aniq kuzatasiz.",
    color: "#10b981",
  },
];

export default function Home() {
  const { stats, daily, completedLessons, theme } = useApp();
  const nextLesson = stats.continueLesson;
  const nextStage = stagesWithLessons.find((stage) => stage.id === nextLesson?.stageId) || stagesWithLessons[0];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__glow hero__glow--one" aria-hidden="true" />
        <div className="hero__glow hero__glow--two" aria-hidden="true" />
        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__badge-dot" />
            {courseStats.stageCount} bosqich · {courseStats.lessonCount} dars · {labs.length} laboratoriya
          </span>
          <h1>
            Raqamli dunyoni
            <span> noldan o'rganing</span>
          </h1>
          <p className="hero__lead">
            Informatika, algoritmlar, veb va sun'iy intellekt sirlarini amaliyot orqali
            o'zlashtiring. Har bir dars — keyingi katta imkoniyatga qadam.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary button--lg" to={`/dars/${nextLesson?.id || featuredLessons[0].id}`}>
              <Icon name="play" size={18} filled />
              O'rganishni boshlash
            </Link>
            <Link className="button button--ghost button--lg" to="/kurs">
              Kurs xaritasini ko'rish
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
          <div className="hero__facts">
            <div>
              <strong>{courseStats.questionCount}</strong>
              <span>test savoli</span>
            </div>
            <div>
              <strong>{Math.round(courseStats.totalMinutes / 60)} soat</strong>
              <span>o'quv kontenti</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>bepul va ochiq</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-label="Shaxsiy o'quv paneli ko'rinishi">
          <div className="hero-panel">
            <div className="hero-panel__head">
              <div>
                <span className="hero-panel__eyebrow">Bugungi reja</span>
                <strong>{formatLongDate()}</strong>
              </div>
              <span className="hero-panel__streak">
                <Icon name="flame" size={16} />
                {stats.streakCount} kun
              </span>
            </div>

            <div className="hero-panel__target">
              <div className="hero-panel__target-head">
                <span>Kunlik maqsad</span>
                <strong>{daily.xp} / {daily.target} XP</strong>
              </div>
              <ProgressBar value={stats.dailyProgress} thin />
              <small>
                {stats.dailyProgress >= 100
                  ? "Bugungi maqsad bajarildi. Ajoyib!"
                  : `Maqsadga ${Math.max(0, daily.target - daily.xp)} XP qoldi`}
              </small>
            </div>

            <Link className="hero-panel__lesson" to={`/dars/${nextLesson.id}`}>
              <span className="hero-panel__lesson-icon">
                <Icon name={nextLesson.stageIcon} size={21} />
              </span>
              <span className="hero-panel__lesson-body">
                <small>Davom etish · {nextLesson.order}-dars</small>
                <strong>{nextLesson.title}</strong>
                <span>{nextStage.title} · {nextLesson.minutes} daqiqa</span>
              </span>
              <span className="hero-panel__play">
                <Icon name="play" size={15} filled />
              </span>
            </Link>

            <div className="hero-panel__mini">
              <div>
                <span>Daraja</span>
                <strong>{stats.level}</strong>
                <small>{stats.levelTitle}</small>
              </div>
              <div>
                <span>Progress</span>
                <strong>{stats.overallProgress}%</strong>
                <small>{stats.completedLessonCount} dars</small>
              </div>
              <div>
                <span>XP</span>
                <strong>{stats.totalXp}</strong>
                <small>jami ball</small>
              </div>
            </div>
          </div>

          <div className="hero-float hero-float--code" aria-hidden="true">
            <span className="hero-float__label">JavaScript</span>
            <code><em>const</em> kelajak = <b>"sen"</b>;</code>
          </div>

          <div className="hero-float hero-float--badge" aria-hidden="true">
            <span className="hero-float__badge-icon">
              <Icon name="award" size={22} />
            </span>
            <div>
              <strong>Yangi bosqich</strong>
              <span>+200 XP bonus</span>
            </div>
          </div>

          <div className="hero-float hero-float--nodes" aria-hidden="true">
            <svg viewBox="0 0 150 82">
              <path d="M22 42l38-21 35 19 32-22M60 21l3 39M95 40l-32 20M95 40l33 18" />
              <circle cx="22" cy="42" r="5" />
              <circle cx="60" cy="21" r="5" />
              <circle cx="98" cy="40" r="5" />
              <circle cx="63" cy="60" r="5" />
              <circle cx="128" cy="58" r="5" />
              <circle cx="127" cy="18" r="4" />
            </svg>
            <span>Tarmoq tayyor</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card" style={{ "--feature-color": feature.color }}>
              <span className="feature-card__icon">
                <Icon name={feature.icon} size={21} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeading
          eyebrow="Kurs xaritasi"
          title="Noldan mutaxassislikka yo'l"
          description="Har bir bosqich oldingi bilimlarga tayanadi va amaliy natija bilan yakunlanadi."
          link="/kurs"
          linkLabel="Barcha bosqichlar"
        />
        <div className="stage-grid stage-grid--home">
          {stagesWithLessons.slice(0, 6).map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </div>
        <div className="home-stages-footer">
          <div className="home-stages-footer__stages">
            {stagesWithLessons.slice(6).map((stage) => (
              <Link key={stage.id} to={`/kurs/${stage.id}`} title={stage.title}>
                <StageGlyph stage={stage} size="sm" />
              </Link>
            ))}
          </div>
          <span>+ {stagesWithLessons.length - 6} ta ilg'or bosqich: veb, sun'iy intellekt va loyiha</span>
          <Link className="text-link" to="/kurs">
            Barchasini ko'rish
            <Icon name="arrowRight" size={15} />
          </Link>
        </div>
      </section>

      <section className="home-section">
        <SectionHeading
          eyebrow="Amaliyot maydoni"
          title="Bilimni qo'lingizda sinab ko'ring"
          description="Har bir laboratoriya real natija beradi: sonni aylantiring, kodni ishga tushiring, qurilmalarni o'rganing."
          link="/laboratoriyalar"
          linkLabel="Barcha laboratoriyalar"
        />
        <div className="lab-grid lab-grid--home">
          {labs.slice(0, 3).map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
        <div className="lab-strip">
          {labs.slice(3).map((lab) => (
            <Link key={lab.id} to={`/laboratoriya/${lab.id}`} className="lab-strip__item">
              <span style={{ background: `${lab.color}18`, color: lab.color }}>
                <Icon name={lab.icon} size={18} />
              </span>
              <div>
                <strong>{lab.title}</strong>
                <small>{lab.short}</small>
              </div>
              <Icon name="arrowRight" size={14} />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-section--split">
        <div className="test-banner">
          <div className="test-banner__content">
            <span className="eyebrow">Bilimni sinang</span>
            <h2>Bilasizmi yoki shunchaki tanishmisiz?</h2>
            <p>
              {courseStats.questionCount} savoldan iborat bank, 6 xil test rejimi va har bir xato
              uchun tushunarli izoh. Natijani darhol ko'ring.
            </p>
            <div className="test-banner__actions">
              <Link className="button button--light" to="/testlar?rejim=kunlik">
                Kunlik testni boshlash
                <Icon name="arrowRight" size={16} />
              </Link>
              <Link className="test-banner__link" to="/testlar">
                Barcha testlar
              </Link>
            </div>
          </div>
          <div className="test-banner__preview" aria-hidden="true">
            <div className="question-preview">
              <span className="question-preview__tag">Savol 04 / 10</span>
              <h3>Qaysi birlik axborot hajmini eng kichik o'lchamda ifodalaydi?</h3>
              <div className="question-preview__option"><span>A</span> Bayt</div>
              <div className="question-preview__option is-correct"><span>B</span> Bit <Icon name="checkCircle" size={17} /></div>
              <div className="question-preview__option"><span>C</span> Kilobayt</div>
              <div className="question-preview__footer">
                <span><Icon name="clock" size={14} /> 00:42</span>
                <span className="question-preview__progress"><i /></span>
                <span>+30 XP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="daily-card">
          <span className="daily-card__icon">
            <Icon name="target" size={24} />
          </span>
          <span className="eyebrow">Kunlik odat</span>
          <h3>Har kuni 15 daqiqa — katta natija</h3>
          <p>Kichik izchil qadamlar eng katta o'zgarishni yaratadi. Bugun maqsadingizni belgilang.</p>
          <div className="daily-card__progress">
            <div>
              <span>Bugungi natija</span>
              <strong>{daily.xp} XP</strong>
            </div>
            <ProgressBar value={stats.dailyProgress} thin />
          </div>
          <Link className="button button--primary button--block" to="/panel">
            Panelni ochish
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="home-section">
        <SectionHeading
          eyebrow="Tanlangan darslar"
          title="Bugun nimadan boshlaymiz?"
          description="Eng ko'p ochiladigan va amaliy jihatdan foydali mavzular."
          link="/kurs"
        />
        <div className="lesson-grid lesson-grid--home">
          {featuredLessons.slice(0, 3).map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} showStage />
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__glow" aria-hidden="true" />
        <span className="eyebrow">Bugun boshlang</span>
        <h2>Kelajak texnologiyasini tushunish — birinchi darsdan boshlanadi</h2>
        <p>Ro'yxatdan o'tish shart emas. Progressingiz brauzeringizda avtomatik saqlanadi.</p>
        <div className="final-cta__actions">
          <Link className="button button--light button--lg" to={`/dars/${nextLesson.id}`}>
            {completedLessons.length ? "Keyingi darsni ochish" : "Birinchi darsni boshlash"}
            <Icon name="arrowRight" size={18} />
          </Link>
          <Link className="button button--outline-light button--lg" to="/panel">
            Shaxsiy panel
          </Link>
        </div>
        <div className="final-cta__points">
          <span><Icon name="check" size={15} /> Bepul va ochiq</span>
          <span><Icon name="check" size={15} /> Amaliyotga asoslangan</span>
          <span><Icon name="check" size={15} /> {theme === "dark" ? "Tungi" : "Kunduzgi"} rejim qo'llab-quvvatlanadi</span>
        </div>
      </section>
    </div>
  );
}
