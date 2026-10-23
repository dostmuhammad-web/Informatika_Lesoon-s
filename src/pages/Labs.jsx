import { Link } from "react-router-dom";
import { labs, stagesWithLessons } from "../data/curriculum";
import { useApp } from "../context/AppContext";
import { percentage } from "../utils/helpers";
import Breadcrumbs from "../components/Breadcrumbs";
import Icon from "../components/Icon";
import LabCard from "../components/LabCard";
import ProgressBar from "../components/ProgressBar";

export default function Labs() {
  const { completedLabs, stats, lastLessonId } = useApp();
  const stageId = lastLessonId ? Number(lastLessonId.match(/^s(\d+)-/)?.[1]) : 1;
  const recommended = labs.find((lab) => lab.stageId === stageId) || labs[0];
  const recommendedStage = stagesWithLessons.find((stage) => stage.id === recommended.stageId);
  const progress = percentage(completedLabs.length, labs.length);

  return (
    <div className="labs-page">
      <Breadcrumbs items={[{ label: "Laboratoriyalar" }]} />

      <header className="page-head">
        <div className="page-head__content">
          <span className="eyebrow">Amaliyot maydoni</span>
          <h1>Bilimni o'z qo'lingiz bilan sinang</h1>
          <p>
            Nazariya faqat boshlanish. Ushbu 7 ta interaktiv muhitda hisoblang, kod yozing,
            sxema quring va natijani darhol ko'ring.
          </p>
          <div className="page-head__stats">
            <span><Icon name="flask" size={16} /> {labs.length} laboratoriya</span>
            <span><Icon name="zap" size={16} /> Har biri +70 XP</span>
            <span><Icon name="shield" size={16} /> Xavfsiz muhit</span>
          </div>
        </div>
        <div className="labs-summary">
          <div className="labs-summary__ring" style={{ "--progress": `${progress}%` }}>
            <div>
              <strong>{progress}%</strong>
              <span>tugallandi</span>
            </div>
          </div>
          <div>
            <span>Laboratoriyalar</span>
            <strong>{stats.completedLabCount} / {labs.length} bajarildi</strong>
            <ProgressBar value={progress} thin />
            <small>Har bir lab uchun +70 XP</small>
          </div>
        </div>
      </header>

      <section className="recommended-lab" style={{ "--lab-color": recommended.color }}>
        <span className="recommended-lab__label">
          <Icon name="spark" size={15} />
          Sizga tavsiya
        </span>
        <div className="recommended-lab__body">
          <span className="recommended-lab__icon">
            <Icon name={recommended.icon} size={26} />
          </span>
          <div>
            <h2>{recommended.title}</h2>
            <p>{recommended.description}</p>
            <div className="recommended-lab__meta">
              <span><Icon name="book" size={14} /> {recommendedStage.title}</span>
              <span><Icon name="clock" size={14} /> 10–15 daqiqa</span>
              <span><Icon name="zap" size={14} /> +70 XP</span>
            </div>
          </div>
        </div>
        <Link className="button button--primary" to={`/laboratoriya/${recommended.id}`}>
          Laboratoriyani ochish
          <Icon name="arrowRight" size={16} />
        </Link>
      </section>

      <div className="section-heading">
        <div>
          <span className="eyebrow">Barcha laboratoriyalar</span>
          <h2>O'zingizga mos muhitni tanlang</h2>
          <p>Har bir laboratoriya real vaqtda ishlaydi va progress avtomatik saqlanadi.</p>
        </div>
      </div>

      <div className="lab-grid lab-grid--all">
        {labs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      <div className="labs-tip">
        <Icon name="info" size={19} />
        <p>
          Laboratoriyani bir necha marta ochishingiz mumkin. XP faqat birinchi marta
          yakunlaganingizda beriladi, ammo mashq natijasi cheklanmagan.
        </p>
      </div>
    </div>
  );
}
