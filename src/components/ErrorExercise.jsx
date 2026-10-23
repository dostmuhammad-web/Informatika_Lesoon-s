import { useState } from "react";
import Icon from "./Icon";

export default function ErrorExercise({ exercise }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = selected === exercise.answer;

  const reset = () => {
    setSelected(null);
    setChecked(false);
  };

  return (
    <div className="error-exercise">
      <div className="error-exercise__head">
        <span className="error-exercise__icon">
          <Icon name="alert" size={20} />
        </span>
        <div>
          <span className="eyebrow">Xatoni toping</span>
          <h3>{exercise.prompt}</h3>
        </div>
      </div>

      <blockquote className="error-exercise__statement">
        “{exercise.statement}”
      </blockquote>

      <div className="error-exercise__options">
        {exercise.options.map((option, index) => {
          let stateClass = "";
          if (checked && index === exercise.answer) stateClass = "is-correct";
          else if (checked && index === selected) stateClass = "is-wrong";
          else if (selected === index) stateClass = "is-selected";
          return (
            <button
              key={option}
              type="button"
              className={`error-option ${stateClass}`}
              onClick={() => !checked && setSelected(index)}
              disabled={checked}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
              {checked && index === exercise.answer && <Icon name="checkCircle" size={17} />}
            </button>
          );
        })}
      </div>

      {checked && (
        <div className={`error-exercise__feedback ${isCorrect ? "is-correct" : "is-wrong"}`}>
          <Icon name={isCorrect ? "checkCircle" : "info"} size={19} />
          <div>
            <strong>{isCorrect ? "To'g'ri tahlil!" : "Yana bir bor o'ylab ko'ring"}</strong>
            <p>{exercise.explanation}</p>
          </div>
        </div>
      )}

      <div className="error-exercise__actions">
        {checked ? (
          <button type="button" className="button button--ghost button--sm" onClick={reset}>
            <Icon name="refresh" size={15} />
            Qayta urinish
          </button>
        ) : (
          <button
            type="button"
            className="button button--primary button--sm"
            onClick={() => setChecked(true)}
            disabled={selected === null}
          >
            Javobni tekshirish
            <Icon name="check" size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
