import { useState } from "react";
import Icon from "../Icon";

const steps = [
  { id: "water", label: "Suvni qaynatish" },
  { id: "kettle", label: "Choynakni tayyorlash" },
  { id: "leaves", label: "Choy bargini solish" },
  { id: "pour", label: "Qaynoq suv quyish" },
  { id: "wait", label: "5 daqiqa damlash" },
  { id: "cup", label: "Fincanga quyish" },
];

const initialOrder = ["leaves", "water", "cup", "kettle", "wait", "pour"];
const correctOrder = steps.map((step) => step.id);

export default function AlgorithmBuilder() {
  const [order, setOrder] = useState(initialOrder);
  const [checked, setChecked] = useState(false);
  const isCorrect = order.every((id, index) => id === correctOrder[index]);

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    setChecked(false);
  };

  const reset = () => {
    setOrder(initialOrder);
    setChecked(false);
  };

  return (
    <div className="lab-widget algorithm-builder">
      <div className="lab-widget__head">
        <div>
          <span className="eyebrow">Algoritm</span>
          <h3>Choy tayyorlash ketma-ketligi</h3>
        </div>
        <button type="button" className="button button--ghost button--sm" onClick={reset}>
          <Icon name="refresh" size={15} />
          Aralashtirish
        </button>
      </div>

      <p className="algorithm-builder__intro">
        Bloklarni tugmalar yordamida to'g'ri tartibga keltiring. Algoritmda qadamlar
        aniq va mantiqiy ketma-ketlikda bo'lishi kerak.
      </p>

      <div className="algorithm-list">
        {order.map((id, index) => {
          const step = steps.find((item) => item.id === id);
          return (
            <div
              key={id}
              className={`algorithm-step ${checked && order[index] !== correctOrder[index] ? "is-wrong" : ""} ${checked && order[index] === correctOrder[index] ? "is-correct" : ""}`}
            >
              <span className="algorithm-step__number">{index + 1}</span>
              <span className="algorithm-step__handle">
                <Icon name="grid" size={16} />
              </span>
              <strong>{step.label}</strong>
              <div className="algorithm-step__controls">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`${step.label} blokini yuqoriga ko'chirish`}
                >
                  <Icon name="arrowUp" size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === order.length - 1}
                  aria-label={`${step.label} blokini pastga ko'chirish`}
                >
                  <Icon name="arrowDown" size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="algorithm-builder__footer">
        <span className={`algorithm-builder__status ${checked ? (isCorrect ? "is-correct" : "is-wrong") : ""}`}>
          {checked
            ? isCorrect
              ? "To'g'ri! Bu algoritm real hayotda ishlaydi."
              : "Tartib hali to'g'ri emas. Qadamlarni mantiqan qayta tekshiring."
            : "Tayyor bo'lsangiz, tartibni tekshiring."}
        </span>
        <button type="button" className="button button--primary button--sm" onClick={() => setChecked(true)}>
          <Icon name="check" size={15} />
          Tartibni tekshirish
        </button>
      </div>

      {checked && isCorrect && (
        <div className="algorithm-success">
          <Icon name="award" size={24} />
          <div>
            <strong>Algoritm qurildi!</strong>
            <p>Qadamlar soni {steps.length} ta. Har bir qadam aniq bitta amalni bildiradi.</p>
          </div>
        </div>
      )}
    </div>
  );
}
