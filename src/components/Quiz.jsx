import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { shuffleQuestion, percentage } from "../utils/helpers";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";

const letters = ["A", "B", "C", "D", "E", "F"];

export default function Quiz({
  questions,
  title = "Bilimni sinash",
  xp = 30,
  passing = 60,
  lessonId = null,
  stageId = null,
  mode = "test",
  onFinish,
  onRetry,
  exitTo,
  exitLabel = "Orqaga",
  compact = false,
  timeLimit = 0,
}) {
  const [attempt, setAttempt] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const startedAt = useRef(Date.now());
  const reported = useRef(false);

  const prepared = useMemo(
    () => questions.map((question, index) => shuffleQuestion(question, attempt + index)),
    [questions, attempt]
  );

  const total = prepared.length;
  const question = prepared[current];
  const score = answers.filter((item) => item.correct).length;
  const scorePercent = percentage(score, total);
  const passed = scorePercent >= passing;

  const reset = () => {
    setAttempt((value) => value + 1);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
    setFinished(false);
    reported.current = false;
    startedAt.current = Date.now();
    setTimeLeft(timeLimit);
    onRetry?.();
  };

  const finish = (finalAnswers) => {
    const finalScore = finalAnswers.filter((item) => item.correct).length;
    const result = {
      title,
      xp,
      score: finalScore,
      total,
      percentage: percentage(finalScore, total),
      passed: percentage(finalScore, total) >= passing,
      wrongQuestionIds: finalAnswers
        .filter((item) => !item.correct)
        .map((item) => item.question.id),
      duration: Math.round((Date.now() - startedAt.current) / 1000),
      lessonId,
      stageId,
      mode,
      answers: finalAnswers,
    };
    setFinished(true);
    if (!reported.current) {
      reported.current = true;
      onFinish?.(result);
    }
  };

  useEffect(() => {
    if (!timeLimit || finished) return undefined;
    if (timeLeft <= 0) {
      finish(answers);
      return undefined;
    }
    const timer = setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timeLimit, finished]);

  const confirm = () => {
    if (selected === null || revealed) return;
    const isCorrect = selected === question.answer;
    const nextAnswers = [
      ...answers,
      {
        question,
        selected,
        correct: isCorrect,
      },
    ];
    setAnswers(nextAnswers);
    setRevealed(true);
  };

  const next = () => {
    if (current + 1 >= total) {
      finish(answers);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
    setRevealed(false);
  };

  if (!total) {
    return (
      <div className="quiz quiz--empty">
        <Icon name="info" size={26} />
        <p>Bu test uchun savollar topilmadi.</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className={`quiz-result ${passed ? "is-passed" : "is-failed"}`}>
        <div className="quiz-result__hero">
          <span className="quiz-result__icon">
            <Icon name={passed ? "award" : "refresh"} size={34} />
          </span>
          <span className="eyebrow">{passed ? "Muvaffaqiyatli" : "Yana bir urinish"}</span>
          <h2>{passed ? "Test yakunlandi!" : "Natija yetarli emas"}</h2>
          <p>
            {passed
              ? `Siz ${total} savoldan ${score} tasiga to'g'ri javob berdingiz va ${xp} XP oldingiz.`
              : `${total} savoldan ${score} tasiga to'g'ri javob berdingiz. O'tish uchun kamida ${passing}% kerak.`}
          </p>
        </div>

        <div className="quiz-result__score">
          <div className="quiz-result__circle" style={{ "--score": `${scorePercent}%` }}>
            <strong>{scorePercent}%</strong>
            <span>{score}/{total}</span>
          </div>
          <div className="quiz-result__details">
            <div>
              <span>To'g'ri javoblar</span>
              <strong>{score}</strong>
            </div>
            <div>
              <span>Xatolar</span>
              <strong>{total - score}</strong>
            </div>
            <div>
              <span>Olgan XP</span>
              <strong>{passed ? `+${xp}` : "0"}</strong>
            </div>
          </div>
        </div>

        <div className="quiz-review">
          <h3>Javoblar tahlili</h3>
          {answers.map((item, index) => (
            <div
              key={`${item.question.id}-${index}`}
              className={`quiz-review__item ${item.correct ? "is-correct" : "is-wrong"}`}
            >
              <span className="quiz-review__mark">
                <Icon name={item.correct ? "check" : "close"} size={15} />
              </span>
              <div>
                <strong>{index + 1}. {item.question.question}</strong>
                {!item.correct && (
                  <p>
                    Sizning javobingiz: <em>{item.question.options[item.selected]}</em>
                  </p>
                )}
                <p className="quiz-review__correct">
                  To'g'ri javob: {item.question.options[item.question.answer]}
                </p>
                <p className="quiz-review__explanation">{item.question.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-result__actions">
          <button type="button" className="button button--primary" onClick={reset}>
            <Icon name="refresh" size={17} />
            Qayta urinish
          </button>
          {exitTo && (
            <Link className="button button--ghost" to={exitTo}>
              {exitLabel}
              <Icon name="arrowRight" size={17} />
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`quiz ${compact ? "quiz--compact" : ""}`}>
      <div className="quiz__head">
        <div className="quiz__title">
          <span className="eyebrow">{mode === "lesson" ? "Dars testi" : "Test"}</span>
          <h3>{title}</h3>
        </div>
        <div className="quiz__counter">
          {timeLimit > 0 && (
            <span className={`quiz__timer ${timeLeft <= 30 ? "is-low" : ""}`}>
              <Icon name="timer" size={15} />
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          )}
          <span>Savol</span>
          <strong>{current + 1} / {total}</strong>
        </div>
      </div>
      <ProgressBar value={((current + (revealed ? 1 : 0)) / total) * 100} thin />

      <div className="quiz__question">
        <div className="quiz__question-meta">
          <span>{question.difficulty || "o'rta"} daraja</span>
          <span>{question.topicTitle || question.source}</span>
        </div>
        <h2>{question.question}</h2>

        <div className="quiz__options" role="group" aria-label="Javob variantlari">
          {question.options.map((option, index) => {
            const isSelected = selected === index;
            const isCorrect = question.answer === index;
            let stateClass = "";
            if (revealed && isCorrect) stateClass = "is-correct";
            else if (revealed && isSelected && !isCorrect) stateClass = "is-wrong";
            else if (isSelected) stateClass = "is-selected";
            return (
              <button
                key={option}
                type="button"
                className={`quiz-option ${stateClass}`}
                onClick={() => !revealed && setSelected(index)}
                disabled={revealed}
                aria-pressed={isSelected}
              >
                <span className="quiz-option__letter">{letters[index]}</span>
                <span className="quiz-option__text">{option}</span>
                {revealed && isCorrect && <Icon name="checkCircle" size={19} />}
                {revealed && isSelected && !isCorrect && <Icon name="xCircle" size={19} />}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className={`quiz__feedback ${selected === question.answer ? "is-correct" : "is-wrong"}`}>
            <Icon name={selected === question.answer ? "checkCircle" : "info"} size={20} />
            <div>
              <strong>{selected === question.answer ? "To'g'ri javob!" : "Xato javob"}</strong>
              <p>{question.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <div className="quiz__actions">
        <span className="quiz__hint">
          {revealed ? "Izohni o'qing va keyingi savolga o'ting." : "Javobni tanlang, so'ng tasdiqlang."}
        </span>
        {!revealed ? (
          <button
            type="button"
            className="button button--primary"
            onClick={confirm}
            disabled={selected === null}
          >
            Javobni tasdiqlash
            <Icon name="check" size={17} />
          </button>
        ) : (
          <button type="button" className="button button--primary" onClick={next}>
            {current + 1 >= total ? "Natijani ko'rish" : "Keyingi savol"}
            <Icon name="arrowRight" size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
