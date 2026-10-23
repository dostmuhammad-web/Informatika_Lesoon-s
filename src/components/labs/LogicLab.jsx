import { useState } from "react";
import Icon from "../Icon";

const gates = [
  { key: "AND", label: "AND", rule: "Ikkala kirish ham TRUE bo'lsa, natija TRUE." },
  { key: "OR", label: "OR", rule: "Kamida bitta kirish TRUE bo'lsa, natija TRUE." },
  { key: "NOT", label: "NOT", rule: "Kirish qiymatini teskarisiga o'zgartiradi." },
  { key: "NAND", label: "NAND", rule: "AND natijasining teskarisi." },
  { key: "NOR", label: "NOR", rule: "OR natijasining teskarisi." },
  { key: "XOR", label: "XOR", rule: "Kirishlar har xil bo'lsa, natija TRUE." },
];

const evaluate = (gate, a, b) => {
  const values = {
    AND: a && b,
    OR: a || b,
    NOT: !a,
    NAND: !(a && b),
    NOR: !(a || b),
    XOR: a !== b,
  };
  return values[gate];
};

export default function LogicLab() {
  const [gate, setGate] = useState("AND");
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const result = evaluate(gate, a, b);
  const currentGate = gates.find((item) => item.key === gate);
  const isNot = gate === "NOT";

  return (
    <div className="lab-widget logic-lab">
      <div className="lab-widget__head">
        <div>
          <span className="eyebrow">Mantiqiy amal</span>
          <h3>Eshikni tanlang</h3>
        </div>
        <div className="gate-tabs">
          {gates.map((item) => (
            <button
              key={item.key}
              type="button"
              className={gate === item.key ? "is-active" : ""}
              onClick={() => setGate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p className="logic-lab__rule">
        <Icon name="info" size={16} />
        {currentGate.rule}
      </p>

      <div className="logic-circuit">
        <div className="logic-inputs">
          <button
            type="button"
            role="switch"
            aria-checked={a}
            className={`logic-switch ${a ? "is-true" : ""}`}
            onClick={() => setA((value) => !value)}
          >
            <span className="logic-switch__label">A</span>
            <span className="logic-switch__track"><i /></span>
            <span className="logic-switch__value">{a ? "TRUE" : "FALSE"}</span>
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={b}
            className={`logic-switch ${b ? "is-true" : ""}`}
            onClick={() => setB((value) => !value)}
            disabled={isNot}
          >
            <span className="logic-switch__label">B</span>
            <span className="logic-switch__track"><i /></span>
            <span className="logic-switch__value">{isNot ? "ISHLATILMAYDI" : b ? "TRUE" : "FALSE"}</span>
          </button>
        </div>

        <div className="logic-gate">
          <span className="logic-gate__line" />
          <div className="logic-gate__body">
            <small>MANTIQ</small>
            <strong>{gate}</strong>
          </div>
          <span className="logic-gate__line logic-gate__line--out" />
        </div>

        <div className={`logic-output ${result ? "is-true" : ""}`}>
          <span>NATIJA</span>
          <strong>{result ? "TRUE" : "FALSE"}</strong>
          <i />
        </div>
      </div>

      <div className="truth-table">
        <div className="truth-table__head">
          <span>A</span>
          <span>B</span>
          <span>A {gate} B</span>
        </div>
        {[
          [true, true],
          [true, false],
          [false, true],
          [false, false],
        ].map(([rowA, rowB]) => {
          const rowResult = evaluate(gate, rowA, rowB);
          const isCurrent = !isNot && rowA === a && rowB === b;
          return (
            <div key={`${rowA}-${rowB}`} className={`truth-table__row ${isCurrent ? "is-current" : ""}`}>
              <span>{rowA ? "1" : "0"}</span>
              <span>{rowB ? "1" : "0"}</span>
              <strong className={rowResult ? "is-true" : ""}>{rowResult ? "1" : "0"}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}
