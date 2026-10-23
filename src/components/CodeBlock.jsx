import { useState } from "react";
import Icon from "./Icon";

export default function CodeBlock({ code, language = "javascript", title }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="code-block">
      <div className="code-block__head">
        <span className="code-block__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="code-block__title">{title || language}</span>
        <span className="code-block__language">{language}</span>
        <button type="button" className="code-block__copy" onClick={copy}>
          <Icon name={copied ? "check" : "copy"} size={14} />
          {copied ? "Nusxalandi" : "Nusxalash"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
