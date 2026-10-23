import { useState } from "react";
import Icon from "../Icon";

const format = (value) => new Intl.NumberFormat("uz-UZ").format(value);

export default function NumberConverter() {
  const [input, setInput] = useState("13");
  const valid = /^\d+$/.test(input.trim());
  const number = valid ? Math.min(Number(input), 999999999) : 0;
  const binary = number.toString(2);
  const padded = binary.padStart(Math.max(8, Math.ceil(binary.length / 4) * 4), "0");
  const groups = padded.match(/.{1,4}/g) || [padded];
  const bits = binary.split("");
  const startPower = bits.length - 1;

  const outputs = [
    { base: "2", label: "Ikkilik", value: groups.join(" "), hint: "0 va 1" },
    { base: "8", label: "Sakkizlik", value: number.toString(8), hint: "0–7" },
    { base: "10", label: "O'nlik", value: format(number), hint: "0–9" },
    { base: "16", label: "O'n oltilik", value: number.toString(16).toUpperCase(), hint: "0–F" },
  ];

  return (
    <div className="lab-widget number-converter">
      <div className="lab-widget__head">
        <div>
          <span className="eyebrow">Kirish</span>
          <h3>Sonni kiriting</h3>
        </div>
        <div className="lab-presets">
          {[13, 42, 255, 1024].map((preset) => (
            <button key={preset} type="button" onClick={() => setInput(String(preset))}>
              {preset}
            </button>
          ))}
        </div>
      </div>

      <label className="number-input">
        <span>O'nlik son</span>
        <input
          type="text"
          inputMode="numeric"
          value={input}
          onChange={(event) => setInput(event.target.value.replace(/[^\d]/g, "").slice(0, 9))}
          placeholder="Masalan: 13"
        />
        {!valid && input !== "" && <small>Faqat butun musbat son kiriting.</small>}
      </label>

      <div className="converter-results">
        {outputs.map((item) => (
          <div key={item.base} className="converter-result">
            <span className="converter-result__base">ASOS {item.base}</span>
            <strong>{valid ? item.value : "—"}</strong>
            <span>{item.label} · {item.hint}</span>
          </div>
        ))}
      </div>

      {valid && number > 0 && (
        <div className="binary-breakdown">
          <div className="binary-breakdown__head">
            <span>Ikkilik yoyilma</span>
            <small>Har bir 1 bit o'z qiymatini qo'shadi</small>
          </div>
          <div className="binary-breakdown__bits">
            {bits.map((bit, index) => {
              const power = startPower - index;
              const value = 2 ** power;
              return (
                <div key={`${bit}-${index}`} className={`bit-cell ${bit === "1" ? "is-on" : ""}`}>
                  <span className="bit-cell__value">{bit}</span>
                  <small>{power < 10 ? value : `2^${power}`}</small>
                </div>
              );
            })}
          </div>
          <p className="binary-breakdown__sum">
            <Icon name="info" size={15} />
            {bits
              .map((bit, index) => (bit === "1" ? `2^${startPower - index}` : null))
              .filter(Boolean)
              .join(" + ")}{" "}
            = {format(number)}
          </p>
        </div>
      )}
    </div>
  );
}
