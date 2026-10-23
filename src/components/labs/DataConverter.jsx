import { useState } from "react";
import Icon from "../Icon";

const unitFactors = {
  bit: 1 / 8,
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

const units = [
  { key: "bit", label: "Bit" },
  { key: "B", label: "Bayt" },
  { key: "KB", label: "Kilobayt" },
  { key: "MB", label: "Megabayt" },
  { key: "GB", label: "Gigabayt" },
  { key: "TB", label: "Terabayt" },
];

const formatValue = (value) => {
  if (!Number.isFinite(value)) return "—";
  const digits = Math.abs(value) < 1 ? 6 : 3;
  return new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: digits }).format(value);
};

export default function DataConverter() {
  const [value, setValue] = useState("1");
  const [unit, setUnit] = useState("GB");

  const numeric = Number(String(value).replace(",", "."));
  const valid = Number.isFinite(numeric) && numeric >= 0;
  const bytes = valid ? numeric * unitFactors[unit] : 0;
  const results = units.map((item) => ({
    ...item,
    value: bytes / unitFactors[item.key],
  }));

  return (
    <div className="lab-widget data-converter">
      <div className="lab-widget__head">
        <div>
          <span className="eyebrow">Konvertor</span>
          <h3>Hajmni aylantirish</h3>
        </div>
        <div className="lab-presets">
          {[
            { value: "512", unit: "MB" },
            { value: "1", unit: "GB" },
            { value: "2", unit: "TB" },
          ].map((preset) => (
            <button
              key={`${preset.value}${preset.unit}`}
              type="button"
              onClick={() => {
                setValue(preset.value);
                setUnit(preset.unit);
              }}
            >
              {preset.value} {preset.unit}
            </button>
          ))}
        </div>
      </div>

      <div className="data-converter__input">
        <label>
          <span>Qiymat</span>
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(event) => setValue(event.target.value.replace(/[^\d.,]/g, ""))}
            placeholder="Masalan: 1.5"
          />
        </label>
        <label>
          <span>Birlik</span>
          <select value={unit} onChange={(event) => setUnit(event.target.value)}>
            {units.map((item) => (
              <option key={item.key} value={item.key}>{item.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="data-converter__formula">
        <Icon name="info" size={16} />
        <span>
          1 KB = 1024 B · 1 MB = 1024 KB · 1 GB = 1024 MB · 1 TB = 1024 GB
        </span>
      </div>

      <div className="data-results">
        {results.map((item) => (
          <div
            key={item.key}
            className={`data-result ${item.key === unit ? "is-source" : ""}`}
          >
            <span className="data-result__label">{item.label}</span>
            <strong>{valid ? formatValue(item.value) : "—"}</strong>
            <span className="data-result__unit">{item.key}</span>
          </div>
        ))}
      </div>

      {valid && (
        <div className="data-converter__summary">
          <span>Xulosa</span>
          <p>
            {formatValue(numeric)} {unit} = <strong>{formatValue(bytes * 8)} bit</strong> ={" "}
            <strong>{formatValue(bytes / unitFactors.MB)} MB</strong>
          </p>
        </div>
      )}
    </div>
  );
}
