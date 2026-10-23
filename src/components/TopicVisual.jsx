const font = "'Segoe UI', sans-serif";

function SvgText({ x, y, children, size = 13, weight = 600, fill = "var(--text)", anchor = "middle" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={font}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
    >
      {children}
    </text>
  );
}

function InfoVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Axborot turlari va axborot oqimi diagrammasi">
      <title>Axborot oqimi: manba, qayta ishlash, saqlash va qabul qiluvchi</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <circle cx="380" cy="172" r="72" fill={color} opacity="0.14" />
      <circle cx="380" cy="172" r="50" fill="var(--surface)" stroke={color} strokeWidth="2" />
      <SvgText x="380" y="166" size="12" fill={color}>AXBOROT</SvgText>
      <SvgText x="380" y="186" size="10" weight={500} fill="var(--muted)">mazmunli ma'lumot</SvgText>

      {[
        { x: 120, y: 92, icon: "Aa", label: "MATN" },
        { x: 640, y: 92, icon: "▧", label: "RASM" },
        { x: 120, y: 252, icon: "♪", label: "OVOZ" },
        { x: 640, y: 252, icon: "▶", label: "VIDEO" },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x - 66} y={item.y - 34} width="132" height="68" rx="16" fill="var(--surface)" stroke="var(--border)" />
          <SvgText x={item.x - 36} y={item.y + 3} size="22" fill={color}>{item.icon}</SvgText>
          <SvgText x={item.x + 17} y={item.y + 5} size="11" weight={700} fill="var(--text)">{item.label}</SvgText>
        </g>
      ))}

      <path d="M190 120l48 29M570 120l-48 29M190 224l48-29M570 224l-48-29" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="5 6" />

      <g>
        <rect x="268" y="292" width="224" height="40" rx="20" fill="var(--surface)" stroke="var(--border)" />
        <SvgText x="380" y="317" size="11" weight={600} fill="var(--muted)">MANBA → QAYTA ISHLASH → SAQLASH → QABUL QILUVCHI</SvgText>
      </g>
      <SvgText x="380" y="46" size="12" weight={700} fill={color}>MA'LUMOT TURLARI VA OQIMI</SvgText>
    </svg>
  );
}

function ComputerVisual({ color, highlight }) {
  const isRam = /ram|rom|xotira/i.test(highlight);
  const isCpu = /protsessor/i.test(highlight);
  const isStorage = /hdd|ssd|disk|fayl/i.test(highlight);
  const isPeripheral = /monitor|klaviatura|sichqoncha|kiritish|chiqarish/i.test(highlight);
  const isOs = /operatsion|dastur/i.test(highlight);
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Kompyuter qurilmalari diagrammasi">
      <title>Kompyuter qurilmalari: monitor, tizim bloki, protsessor, RAM va disk</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />

      <rect x="66" y="66" width="246" height="162" rx="16" fill="var(--surface)" stroke={isPeripheral ? color : "var(--border-strong)"} strokeWidth={isPeripheral ? 3 : 1.5} />
      <rect x="82" y="82" width="214" height="118" rx="8" fill="var(--diagram-screen)" />
      <path d="M84 94h210M138 190h102M182 228v22M142 250h80" stroke="var(--border-strong)" strokeWidth="2" />
      <rect x="108" y="101" width="98" height="10" rx="5" fill={color} opacity="0.8" />
      <rect x="108" y="120" width="146" height="7" rx="3.5" fill="var(--muted)" opacity="0.45" />
      <rect x="108" y="136" width="120" height="7" rx="3.5" fill="var(--muted)" opacity="0.35" />
      <rect x="108" y="160" width="54" height="22" rx="6" fill={color} opacity="0.18" stroke={color} />
      <SvgText x="188" y="267" size="11" weight={650} fill="var(--text)">MONITOR</SvgText>

      <rect x="386" y="64" width="280" height="214" rx="18" fill="var(--surface)" stroke={isCpu || isRam || isStorage || isOs ? color : "var(--border-strong)"} strokeWidth={isCpu || isRam || isStorage || isOs ? 2.5 : 1.5} />
      <rect x="408" y="92" width="118" height="82" rx="12" fill={isCpu ? color : "var(--surface-2)"} opacity={isCpu ? "0.28" : "1"} stroke={isCpu ? color : "var(--border)"} strokeWidth={isCpu ? 2 : 1} />
      <rect x="428" y="110" width="78" height="46" rx="8" fill="var(--surface)" stroke={color} />
      <path d="M448 110v-8M472 110v-8M496 110v-8M448 164v8M472 164v8M496 164v8M428 124h-8M428 142h-8M506 124h8M506 142h8" stroke="var(--muted)" strokeWidth="1.5" />
      <SvgText x="467" y="140" size="11" weight={700} fill={color}>CPU</SvgText>
      <SvgText x="467" y="193" size="10" fill="var(--muted)">PROTSESSOR</SvgText>

      <rect x="544" y="92" width="98" height="30" rx="7" fill={isRam ? color : "var(--surface-2)"} opacity={isRam ? "0.28" : "1"} stroke={isRam ? color : "var(--border)"} strokeWidth={isRam ? 2 : 1} />
      <path d="M556 92v-5M570 92v-5M584 92v-5M598 92v-5M612 92v-5M626 92v-5M556 122v5M570 122v5M584 122v5M598 122v5M612 122v5M626 122v5" stroke="var(--muted)" strokeWidth="1.4" />
      <SvgText x="593" y="111" size="10" weight={700} fill={isRam ? color : "var(--text)"}>RAM</SvgText>
      <rect x="544" y="136" width="98" height="30" rx="7" fill="var(--surface-2)" stroke="var(--border)" />
      <SvgText x="593" y="155" size="10" weight={700} fill="var(--text)">ROM</SvgText>

      <rect x="544" y="190" width="98" height="46" rx="8" fill={isStorage ? color : "var(--surface-2)"} opacity={isStorage ? "0.28" : "1"} stroke={isStorage ? color : "var(--border)"} strokeWidth={isStorage ? 2 : 1} />
      <circle cx="567" cy="213" r="11" fill="none" stroke={isStorage ? color : "var(--muted)"} strokeWidth="2" />
      <circle cx="567" cy="213" r="3" fill={isStorage ? color : "var(--muted)"} />
      <SvgText x="609" y="210" size="9" weight={700} fill="var(--text)">SSD / HDD</SvgText>
      <SvgText x="609" y="225" size="8" weight={500} fill="var(--muted)">doimiy xotira</SvgText>

      <rect x="544" y="248" width="98" height="18" rx="5" fill="var(--surface-2)" stroke="var(--border)" />
      <SvgText x="593" y="261" size="8" fill="var(--muted)">ANAKART · QUVVAT</SvgText>

      <rect x="408" y="226" width="118" height="36" rx="8" fill="var(--surface-2)" stroke="var(--border)" />
      <SvgText x="467" y="248" size="9" weight={600} fill={isOs ? color : "var(--muted)"}>OPERATSION TIZIM</SvgText>

      <rect x="90" y="298" width="150" height="34" rx="9" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="165" y="319" size="10" fill="var(--text)">KLAVIATURA · SICHQONCHA</SvgText>
      <path d="M240 315h64M304 315v-37" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="5 5" />
      <SvgText x="662" y="319" size="10" weight={600} fill={color}>QURILMALAR O'ZARO BOG'LANADI</SvgText>
    </svg>
  );
}

function NumbersVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Sanoq sistemalari diagrammasi">
      <title>13 sonining ikkilik, sakkizlik, o'nlik va o'n oltilik ko'rinishlari</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="44" size="12" weight={700} fill={color}>BITLAR SONNI QANDAY IFODALAYDI?</SvgText>

      <rect x="108" y="74" width="544" height="82" rx="18" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="380" y="99" size="10" fill="var(--muted)">13 O'NLIK SONINING IKKILIK KO'RINISHI</SvgText>
      {["1", "1", "0", "1"].map((bit, index) => (
        <g key={index}>
          <rect x={246 + index * 68} y="110" width="48" height="34" rx="8" fill={bit === "1" ? color : "var(--surface-2)"} opacity={bit === "1" ? "0.25" : "1"} stroke={bit === "1" ? color : "var(--border)"} />
          <SvgText x={270 + index * 68} y="132" size="16" weight={800} fill={bit === "1" ? color : "var(--muted)"}>{bit}</SvgText>
          <SvgText x={270 + index * 68} y="158" size="8" weight={500} fill="var(--muted)">{2 ** (3 - index)}</SvgText>
        </g>
      ))}
      <SvgText x="524" y="132" size="14" weight={800} fill="var(--text)">→ 13</SvgText>

      {[
        { label: "IKKILIK", base: "2", value: "1101", x: 108 },
        { label: "SAKKIZLIK", base: "8", value: "15", x: 274 },
        { label: "O'NLIK", base: "10", value: "13", x: 440 },
        { label: "O'N OLTILIK", base: "16", value: "D", x: 606 },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y="198" width="146" height="82" rx="14" fill="var(--surface)" stroke="var(--border)" />
          <SvgText x={item.x + 73} y="218" size="8" weight={700} fill="var(--muted)">ASOS {item.base}</SvgText>
          <SvgText x={item.x + 73} y="248" size="21" weight={800} fill={color}>{item.value}</SvgText>
          <SvgText x={item.x + 73} y="266" size="8" weight={600} fill="var(--muted)">{item.label}</SvgText>
        </g>
      ))}
      <SvgText x="380" y="316" size="11" fill="var(--muted)">Har bir xonaning qiymati uning asosiga bog'liq</SvgText>
      <path d="M196 296H564" stroke="var(--border-strong)" strokeDasharray="4 6" />
    </svg>
  );
}

function UnitsVisual({ color }) {
  const levels = [
    { label: "BIT", value: "0 yoki 1", width: 90 },
    { label: "BYTE", value: "8 bit", width: 180 },
    { label: "KB", value: "1024 B", width: 270 },
    { label: "MB", value: "1024 KB", width: 360 },
    { label: "GB", value: "1024 MB", width: 450 },
    { label: "TB", value: "1024 GB", width: 540 },
  ];
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Axborot o'lchov birliklari zinapoyasi">
      <title>Bitdan terabaytgacha o'lchov birliklari</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="44" size="12" weight={700} fill={color}>AXBOROT HAJMI ZINAPOYASI</SvgText>
      {levels.map((level, index) => (
        <g key={level.label}>
          <rect
            x={104 + index * 4}
            y={286 - index * 38}
            width={level.width}
            height="30"
            rx="8"
            fill={color}
            opacity={0.09 + index * 0.035}
            stroke={color}
            strokeOpacity="0.35"
          />
          <SvgText x={118 + index * 4} y={306 - index * 38} size="10" weight={800} fill={color} anchor="start">{level.label}</SvgText>
          <SvgText x={198 + index * 4} y={306 - index * 38} size="9" weight={500} fill="var(--muted)" anchor="start">{level.value}</SvgText>
        </g>
      ))}
      <path d="M676 86v206" stroke="var(--border-strong)" strokeDasharray="4 6" />
      <SvgText x="656" y="70" size="9" fill="var(--muted)" anchor="end">1 KB = 1024 B</SvgText>
      <SvgText x="656" y="314" size="9" fill={color} anchor="end">Kattaroq birlik → ko'proq hajm</SvgText>
      <circle cx="676" cy="76" r="4" fill={color} />
    </svg>
  );
}

function LogicVisual({ color, highlight }) {
  const gate = /or/i.test(highlight) ? "OR" : /not/i.test(highlight) ? "NOT" : "AND";
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label={`${gate} mantiqiy eshigi diagrammasi`}>
      <title>{gate} mantiqiy eshigi va rostlik jadvali</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="44" size="12" weight={700} fill={color}>MANTIQIY ESHIK: {gate}</SvgText>

      <rect x="74" y="86" width="126" height="40" rx="12" fill="var(--surface)" stroke="var(--border)" />
      <rect x="74" y="172" width="126" height="40" rx="12" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="137" y="111" size="12" weight={700} fill="var(--text)">A = {gate === "NOT" ? "TRUE" : "TRUE"}</SvgText>
      <SvgText x="137" y="197" size="12" weight={700} fill={gate === "NOT" ? "var(--muted)" : "var(--text)"}>B = FALSE</SvgText>

      <path d="M200 106h74M200 192h74" stroke={color} strokeWidth="2.5" />
      <path d="M274 74h68c48 0 78 32 78 74s-30 74-78 74h-68V74z" fill={color} opacity="0.16" stroke={color} strokeWidth="2.5" />
      <SvgText x="356" y="154" size="19" weight={800} fill={color}>{gate}</SvgText>
      <path d="M420 148h74" stroke={color} strokeWidth="2.5" />
      <path d="M488 139l14 9-14 9z" fill={color} />
      <rect x="510" y="122" width="142" height="52" rx="14" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="581" y="145" size="11" weight={700} fill="var(--muted)">NATIJA</SvgText>
      <SvgText x="581" y="163" size="14" weight={800} fill={color}>{gate === "AND" ? "FALSE" : gate === "OR" ? "TRUE" : "FALSE"}</SvgText>

      <rect x="246" y="246" width="290" height="82" rx="14" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="336" y="266" size="9" weight={700} fill="var(--muted)">A</SvgText>
      <SvgText x="398" y="266" size="9" weight={700} fill="var(--muted)">B</SvgText>
      <SvgText x="474" y="266" size="9" weight={700} fill={color}>A {gate} B</SvgText>
      {[
        ["TRUE", "TRUE", gate === "AND" ? "TRUE" : "TRUE"],
        ["TRUE", "FALSE", gate === "AND" ? "FALSE" : "TRUE"],
        ["FALSE", "TRUE", gate === "AND" ? "FALSE" : "TRUE"],
        ["FALSE", "FALSE", "FALSE"],
      ].map((row, index) => (
        <g key={index}>
          <SvgText x="336" y={286 + index * 10} size="8" fill="var(--text)">{row[0]}</SvgText>
          <SvgText x="398" y={286 + index * 10} size="8" fill="var(--text)">{row[1]}</SvgText>
          <SvgText x="474" y={286 + index * 10} size="8" weight={700} fill={row[2] === "TRUE" ? color : "var(--muted)"}>{row[2]}</SvgText>
        </g>
      ))}
      <SvgText x="380" y="346" size="9" fill="var(--muted)">Rostlik jadvali barcha holatlarni ko'rsatadi</SvgText>
    </svg>
  );
}

function AlgorithmVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Algoritm blok-sxemasi">
      <title>Boshlanish, kiritish, shart, amal va tugash bloklaridan iborat algoritm</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="38" size="12" weight={700} fill={color}>BLOK-SXEMA MANTIQI</SvgText>

      <rect x="316" y="58" width="128" height="42" rx="21" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
      <SvgText x="380" y="84" size="11" weight={700} fill={color}>BOSHLASH</SvgText>
      <path d="M380 100v28M373 121l7 8 7-8" stroke="var(--muted)" strokeWidth="1.8" />

      <rect x="300" y="131" width="160" height="42" rx="10" fill="var(--surface)" stroke="var(--border-strong)" />
      <SvgText x="380" y="157" size="10" weight={600} fill="var(--text)">ma'lumot kiritish</SvgText>
      <path d="M380 173v24M373 190l7 8 7-8" stroke="var(--muted)" strokeWidth="1.8" />

      <path d="M380 200l62 35-62 35-62-35 62-35z" fill={color} opacity="0.14" stroke={color} strokeWidth="2" />
      <SvgText x="380" y="238" size="10" weight={700} fill={color}>shart?</SvgText>
      <path d="M318 235H258v48M442 235h60v48" stroke="var(--muted)" strokeWidth="1.8" strokeDasharray="4 4" />
      <SvgText x="250" y="226" size="8" weight={700} fill="var(--muted)">FALSE</SvgText>
      <SvgText x="510" y="226" size="8" weight={700} fill={color}>TRUE</SvgText>

      <rect x="194" y="283" width="128" height="38" rx="9" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="258" y="307" size="9" fill="var(--text)">boshqa amal</SvgText>
      <rect x="438" y="283" width="128" height="38" rx="9" fill="var(--surface)" stroke={color} />
      <SvgText x="502" y="307" size="9" weight={600} fill={color}>asosiy amal</SvgText>
      <path d="M258 321v18h244v-18M380 339v-8" stroke="var(--muted)" strokeWidth="1.6" strokeDasharray="4 4" />

      <rect x="318" y="339" width="124" height="14" rx="7" fill="var(--surface-2)" stroke="var(--border)" />
      <SvgText x="380" y="349" size="7" fill="var(--muted)">TUGASH</SvgText>

      <g>
        <circle cx="678" cy="96" r="24" fill="var(--surface)" stroke="var(--border)" />
        <SvgText x="678" y="101" size="11" weight={800} fill={color}>1</SvgText>
        <circle cx="678" cy="160" r="24" fill="var(--surface)" stroke="var(--border)" />
        <SvgText x="678" y="165" size="11" weight={800} fill={color}>2</SvgText>
        <circle cx="678" cy="224" r="24" fill="var(--surface)" stroke="var(--border)" />
        <SvgText x="678" y="229" size="11" weight={800} fill={color}>3</SvgText>
        <path d="M678 120v16M678 184v16" stroke="var(--border-strong)" strokeDasharray="3 4" />
      </g>
    </svg>
  );
}

function CodeVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="JavaScript kod muharriri va konsol natijasi">
      <title>Kod muharriri, o'zgaruvchilar va konsol natijasi</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <rect x="70" y="48" width="424" height="256" rx="16" fill="var(--code-bg)" stroke="var(--border-strong)" />
      <path d="M70 84h424" stroke="var(--border-strong)" />
      <circle cx="94" cy="66" r="5" fill="#fb7185" />
      <circle cx="112" cy="66" r="5" fill="#fbbf24" />
      <circle cx="130" cy="66" r="5" fill="#34d399" />
      <SvgText x="252" y="70" size="9" fill="#94a3b8">birinchi-qadam.js</SvgText>
      <SvgText x="96" y="118" size="11" fill="#7dd3fc" anchor="start">let</SvgText>
      <SvgText x="126" y="118" size="11" fill="#e2e8f0" anchor="start">bilim = 0;</SvgText>
      <SvgText x="96" y="144" size="11" fill="#c4b5fd" anchor="start">const</SvgText>
      <SvgText x="142" y="144" size="11" fill="#e2e8f0" anchor="start">maqsad = "algoritm";</SvgText>
      <SvgText x="96" y="170" size="11" fill="#fbbf24" anchor="start">for</SvgText>
      <SvgText x="124" y="170" size="11" fill="#e2e8f0" anchor="start">(let i = 0; i &lt; 3; i++) {"{"}</SvgText>
      <SvgText x="120" y="196" size="11" fill="#e2e8f0" anchor="start">bilim += 1;</SvgText>
      <SvgText x="96" y="222" size="11" fill="#e2e8f0" anchor="start">{"}"}</SvgText>
      <SvgText x="96" y="248" size="11" fill="#7dd3fc" anchor="start">console</SvgText>
      <SvgText x="154" y="248" size="11" fill="#e2e8f0" anchor="start">.log(bilim);</SvgText>
      <rect x="96" y="266" width="86" height="20" rx="5" fill={color} opacity="0.18" />
      <SvgText x="139" y="280" size="8" weight={600} fill={color}>Amaliyotga tayyor</SvgText>

      <rect x="518" y="100" width="176" height="188" rx="16" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="606" y="130" size="10" weight={700} fill="var(--muted)">KONSOL</SvgText>
      <path d="M534 142h144" stroke="var(--border)" />
      <SvgText x="534" y="170" size="10" fill={color} anchor="start">&gt; 3</SvgText>
      <SvgText x="534" y="198" size="9" fill="var(--muted)" anchor="start">bilim = 3</SvgText>
      <SvgText x="534" y="216" size="9" fill="var(--muted)" anchor="start">maqsad = "algoritm"</SvgText>
      <rect x="534" y="238" width="144" height="26" rx="6" fill="var(--surface-2)" />
      <SvgText x="546" y="255" size="8" fill="var(--muted)" anchor="start">Natija muvaffaqiyatli</SvgText>
      <SvgText x="380" y="334" size="10" fill="var(--muted)">Kodni tushunish → yozish → sinash → yaxshilash</SvgText>
    </svg>
  );
}

function BrowserVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="HTML va CSS bilan yaratilgan veb-sahifa maketi">
      <title>HTML tuzilmasi va CSS bilan bezatilgan sahifa</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <rect x="70" y="46" width="620" height="268" rx="18" fill="var(--surface)" stroke="var(--border-strong)" />
      <path d="M70 86h620" stroke="var(--border-strong)" />
      <circle cx="94" cy="66" r="5" fill="#fb7185" />
      <circle cx="112" cy="66" r="5" fill="#fbbf24" />
      <circle cx="130" cy="66" r="5" fill="#34d399" />
      <rect x="252" y="56" width="330" height="20" rx="10" fill="var(--surface-2)" />
      <SvgText x="417" y="70" size="8" fill="var(--muted)">informatika-olami.uz/dars</SvgText>

      <rect x="94" y="108" width="200" height="180" rx="12" fill="var(--surface-2)" />
      <SvgText x="194" y="140" size="10" weight={700} fill={color}>MENYU</SvgText>
      {["Bosh sahifa", "Darslar", "Laboratoriya", "Testlar"].map((item, index) => (
        <g key={item}>
          <rect x="112" y={158 + index * 26} width={index === 1 ? 128 : 150} height="16" rx="8" fill={index === 1 ? color : "var(--surface)"} opacity={index === 1 ? "0.18" : "1"} />
          <SvgText x="122" y={170 + index * 26} size="8" fill={index === 1 ? color : "var(--muted)"} anchor="start">{item}</SvgText>
        </g>
      ))}

      <rect x="318" y="108" width="346" height="98" rx="12" fill={color} opacity="0.12" stroke={color} strokeOpacity="0.3" />
      <SvgText x="342" y="140" size="18" weight={800} fill="var(--text)" anchor="start">Informatikani</SvgText>
      <SvgText x="342" y="164" size="18" weight={800} fill={color} anchor="start">noldan o'rgan</SvgText>
      <rect x="342" y="177" width="112" height="18" rx="9" fill={color} opacity="0.75" />
      <SvgText x="398" y="189" size="7" weight={700} fill="#07101f">BOSHLASH</SvgText>

      {[0, 1, 2].map((item) => (
        <g key={item}>
          <rect x={318 + item * 118} y="224" width="104" height="64" rx="10" fill="var(--surface-2)" stroke="var(--border)" />
          <circle cx={334 + item * 118} cy="242" r="7" fill={color} opacity={0.3 + item * 0.16} />
          <rect x={330 + item * 118} y="258" width="78" height="6" rx="3" fill="var(--muted)" opacity="0.5" />
          <rect x={330 + item * 118} y="270" width="56" height="6" rx="3" fill="var(--muted)" opacity="0.3" />
        </g>
      ))}

      <SvgText x="380" y="334" size="10" fill="var(--muted)">HTML — tuzilma · CSS — ko'rinish · JavaScript — harakat</SvgText>
    </svg>
  );
}

function NetworkVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Internet tarmog'i diagrammasi">
      <title>Uy qurilmasi, router, internet va server o'rtasidagi yo'l</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="40" size="12" weight={700} fill={color}>MA'LUMOT QANDAY YO'L BOSADI?</SvgText>

      <rect x="54" y="152" width="116" height="78" rx="12" fill="var(--surface)" stroke="var(--border)" />
      <rect x="70" y="166" width="84" height="42" rx="6" fill="var(--surface-2)" />
      <rect x="80" y="176" width="64" height="22" rx="3" fill={color} opacity="0.18" />
      <SvgText x="112" y="221" size="9" fill="var(--muted)">SIZNING QURILMA</SvgText>
      <SvgText x="112" y="251" size="8" fill="var(--muted)">IP: 192.168.1.5</SvgText>

      <rect x="236" y="144" width="130" height="94" rx="16" fill="var(--surface)" stroke={color} strokeWidth="1.5" />
      <path d="M258 168h86M258 184h86M258 200h44" stroke="var(--border-strong)" strokeWidth="2" />
      <circle cx="316" cy="168" r="3" fill="#34d399" />
      <circle cx="316" cy="184" r="3" fill="#fbbf24" />
      <SvgText x="301" y="228" size="9" weight={700} fill={color}>ROUTER</SvgText>

      <circle cx="476" cy="191" r="58" fill={color} opacity="0.1" stroke={color} strokeWidth="1.5" strokeDasharray="6 6" />
      <circle cx="476" cy="191" r="38" fill="var(--surface)" stroke="var(--border)" />
      <path d="M454 191h44M476 169c10 12 10 32 0 44M476 169c-10 12-10 32 0 44" stroke={color} strokeWidth="1.5" />
      <SvgText x="476" y="269" size="9" weight={700} fill={color}>INTERNET</SvgText>

      <rect x="596" y="136" width="112" height="110" rx="12" fill="var(--surface)" stroke="var(--border)" />
      <rect x="612" y="152" width="80" height="18" rx="4" fill={color} opacity="0.18" />
      <rect x="612" y="178" width="80" height="18" rx="4" fill="var(--surface-2)" />
      <rect x="612" y="204" width="80" height="18" rx="4" fill="var(--surface-2)" />
      <circle cx="624" cy="230" r="3" fill="#34d399" />
      <SvgText x="652" y="267" size="9" weight={700} fill="var(--text)">SERVER</SvgText>

      <path d="M170 191h66M366 191h52M534 191h62" stroke={color} strokeWidth="2" strokeDasharray="6 6" />
      <path d="M224 184l12 7-12 7M414 184l12 7-12 7M584 184l12 7-12 7" fill={color} />
      <rect x="248" y="60" width="118" height="26" rx="13" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="307" y="77" size="8" fill="var(--muted)">DNS: nom → IP</SvgText>
      <path d="M307 86v45" stroke="var(--muted)" strokeDasharray="3 4" />
      <SvgText x="380" y="326" size="10" fill="var(--muted)">So'rov paketlarga bo'linadi va serverga yetib boradi</SvgText>
    </svg>
  );
}

function DatabaseVisual({ color }) {
  const rows = [
    ["01", "Aziza", "9", "92"],
    ["02", "Bekzod", "9", "87"],
    ["03", "Dilnoza", "8", "95"],
    ["04", "Javohir", "9", "78"],
  ];
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Ma'lumotlar bazasi jadvali diagrammasi">
      <title>O'quvchilar jadvali: qatorlar, ustunlar va primary key</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="40" size="12" weight={700} fill={color}>JADVAL · QATOR · USTUN</SvgText>
      <rect x="126" y="64" width="508" height="224" rx="16" fill="var(--surface)" stroke="var(--border-strong)" />
      <rect x="126" y="64" width="508" height="46" rx="16" fill={color} opacity="0.16" />
      <path d="M126 110h508" stroke={color} />
      {["ID", "ISM", "SINF", "BAHO"].map((heading, index) => (
        <SvgText key={heading} x={[166, 270, 426, 548][index]} y="93" size="10" weight={800} fill={color}>{heading}</SvgText>
      ))}
      <SvgText x="586" y="93" size="8" fill="var(--muted)">PRIMARY KEY</SvgText>
      {rows.map((row, rowIndex) => (
        <g key={row[0]}>
          <path d={`M126 ${110 + (rowIndex + 1) * 42}h508`} stroke="var(--border)" />
          {row.map((cell, cellIndex) => (
            <SvgText key={cell} x={[166, 270, 426, 548][cellIndex]} y={138 + rowIndex * 42} size="10" weight={cellIndex === 0 ? 700 : 500} fill={cellIndex === 0 ? color : "var(--text)"}>{cell}</SvgText>
          ))}
        </g>
      ))}
      <rect x="142" y="120" width="48" height="6" rx="3" fill={color} opacity="0.1" />
      <path d="M166 292v20h126" stroke="var(--border-strong)" strokeDasharray="4 4" />
      <SvgText x="304" y="317" size="9" fill="var(--muted)">Har bir qator — bitta yozuv</SvgText>
      <path d="M270 292v20" stroke="var(--border-strong)" strokeDasharray="4 4" />
      <SvgText x="270" y="327" size="9" fill={color}>Har bir ustun — maydon</SvgText>

      <rect x="664" y="100" width="38" height="38" rx="9" fill={color} opacity="0.16" />
      <SvgText x="683" y="124" size="14" weight={800} fill={color}>SQL</SvgText>
      <path d="M664 162h38M664 178h38M664 194h38" stroke="var(--muted)" strokeWidth="2" />
      <SvgText x="683" y="222" size="7" fill="var(--muted)">so'rov</SvgText>
    </svg>
  );
}

function SecurityVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Kiberxavfsizlik qalqoni diagrammasi">
      <title>Parol, ikki bosqichli himoya va xavfsiz ulanish qalqoni</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="40" size="12" weight={700} fill={color}>HIMOYA QATLAMLARI</SvgText>

      <path d="M380 55l112 42v72c0 68-46 106-112 130-66-24-112-62-112-130V97l112-42z" fill={color} opacity="0.09" stroke={color} strokeWidth="2.5" />
      <rect x="338" y="164" width="84" height="62" rx="12" fill="var(--surface)" stroke={color} strokeWidth="2" />
      <path d="M354 164v-18a26 26 0 0 1 52 0v18" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="380" cy="188" r="7" fill={color} />
      <path d="M380 195v14" stroke={color} strokeWidth="3" />
      <SvgText x="380" y="256" size="9" weight={700} fill={color}>XAVFSIZ HISOB</SvgText>

      <g>
        <rect x="64" y="96" width="138" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <SvgText x="133" y="116" size="8" fill="var(--muted)">KUCHLI PAROL</SvgText>
        <SvgText x="133" y="135" size="11" weight={700} fill="var(--text)">••••••••••••</SvgText>
      </g>
      <g>
        <rect x="62" y="182" width="142" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <rect x="78" y="198" width="56" height="8" rx="4" fill={color} opacity="0.3" />
        <SvgText x="133" y="220" size="8" fill="var(--muted)">2-BOSQICH KODI</SvgText>
        <SvgText x="133" y="234" size="9" fontFamily="monospace" fill={color}>4 8 2 9 1 6</SvgText>
      </g>
      <g>
        <rect x="558" y="102" width="138" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <SvgText x="627" y="124" size="8" fill="var(--muted)">HTTPS</SvgText>
        <SvgText x="627" y="143" size="9" weight={600} fill={color}>Shifrlangan aloqa</SvgText>
      </g>
      <g>
        <rect x="552" y="188" width="150" height="58" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <SvgText x="627" y="208" size="8" fill="var(--muted)">ZAXIRA NUSXA</SvgText>
        <SvgText x="627" y="229" size="9" weight={600} fill="var(--text)">Bulut + tashqi disk</SvgText>
      </g>

      <path d="M202 122h118M202 212h118M518 130l-100 30M518 217l-100-24" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="4 5" />
      <SvgText x="380" y="332" size="10" fill="var(--muted)">Parol + ikkinchi qadam + xavfsiz ulanish = mustahkam himoya</SvgText>
    </svg>
  );
}

function OfficeVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Word, Excel va PowerPoint dasturlari diagrammasi">
      <title>Ofis dasturlari: hujjat, jadval va taqdimot</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="40" size="12" weight={700} fill={color}>KUNDALIK KOMPYUTER ISHLARI</SvgText>

      <g>
        <rect x="76" y="88" width="182" height="196" rx="16" fill="var(--surface)" stroke="var(--border-strong)" />
        <rect x="92" y="104" width="150" height="28" rx="7" fill={color} opacity="0.16" />
        <SvgText x="167" y="123" size="9" weight={700} fill={color}>WORD</SvgText>
        <rect x="92" y="148" width="108" height="8" rx="4" fill="var(--text)" opacity="0.65" />
        {[0, 1, 2, 3, 4, 5].map((line) => (
          <rect key={line} x="92" y={168 + line * 13} width={line % 3 === 0 ? 138 : 124} height="5" rx="2.5" fill="var(--muted)" opacity="0.3" />
        ))}
        <rect x="92" y="250" width="62" height="20" rx="6" fill={color} opacity="0.2" />
        <SvgText x="123" y="264" size="7" fill={color}>MATN</SvgText>
      </g>

      <g>
        <rect x="288" y="88" width="182" height="196" rx="16" fill="var(--surface)" stroke="var(--border-strong)" />
        <rect x="304" y="104" width="150" height="28" rx="7" fill="#22c55e" opacity="0.16" />
        <SvgText x="379" y="123" size="9" weight={700} fill="#22c55e">EXCEL</SvgText>
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={row}>
            {[0, 1, 2, 3].map((col) => (
              <rect key={col} x={304 + col * 37} y={148 + row * 25} width="35" height="23" rx="3" fill={row === 0 ? "var(--surface-2)" : col === 0 ? color : "var(--surface)"} opacity={row === 0 || col === 0 ? "0.12" : "1"} stroke="var(--border)" />
            ))}
          </g>
        ))}
        <SvgText x="379" y="279" size="7" fill="var(--muted)">FORMULA · JADVAL · GRAFIK</SvgText>
      </g>

      <g>
        <rect x="500" y="88" width="182" height="196" rx="16" fill="var(--surface)" stroke="var(--border-strong)" />
        <rect x="516" y="104" width="150" height="28" rx="7" fill="#f97316" opacity="0.16" />
        <SvgText x="591" y="123" size="9" weight={700} fill="#f97316">POWERPOINT</SvgText>
        <rect x="532" y="148" width="118" height="78" rx="8" fill="var(--surface-2)" stroke="var(--border)" />
        <rect x="548" y="164" width="64" height="8" rx="4" fill={color} opacity="0.7" />
        <rect x="548" y="180" width="84" height="5" rx="2.5" fill="var(--muted)" opacity="0.4" />
        <rect x="548" y="190" width="74" height="5" rx="2.5" fill="var(--muted)" opacity="0.3" />
        <circle cx="548" cy="210" r="9" fill={color} opacity="0.3" />
        <rect x="532" y="238" width="38" height="12" rx="4" fill="var(--surface-2)" />
        <rect x="578" y="238" width="38" height="12" rx="4" fill="var(--surface-2)" />
        <rect x="624" y="238" width="26" height="12" rx="4" fill="var(--surface-2)" />
        <SvgText x="591" y="279" size="7" fill="var(--muted)">TAQDIMOT · SLAYD</SvgText>
      </g>

      <rect x="76" y="300" width="606" height="28" rx="10" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="380" y="318" size="8" fill="var(--muted)">Ctrl + S — saqlash · Ctrl + C — nusxalash · Ctrl + V — qo'yish · Ctrl + Z — bekor qilish</SvgText>
    </svg>
  );
}

function AdvancedVisual({ color }) {
  return (
    <svg viewBox="0 0 760 360" role="img" aria-label="Ma'lumotlar tuzilmasi, stack va daraxt diagrammasi">
      <title>Ma'lumotlar tuzilmasi: stack, navbat va daraxt</title>
      <rect width="760" height="360" rx="26" fill="var(--diagram-bg)" />
      <SvgText x="380" y="38" size="12" weight={700} fill={color}>MA'LUMOTLAR TUZILMALARI</SvgText>

      <SvgText x="136" y="70" size="10" weight={700} fill={color}>STACK (LIFO)</SvgText>
      {[0, 1, 2, 3].map((item) => (
        <g key={item}>
          <rect x="82" y={214 - item * 34} width="108" height="28" rx="6" fill={color} opacity={0.08 + item * 0.06} stroke={color} strokeOpacity="0.4" />
          <SvgText x="136" y={233 - item * 34} size="9" fill="var(--text)">{["A", "B", "C", "D"][item]}</SvgText>
        </g>
      ))}
      <path d="M206 210V82M198 92l8-12 8 12" stroke="var(--muted)" strokeWidth="1.5" />
      <SvgText x="226" y="148" size="8" fill="var(--muted)" anchor="start">pop</SvgText>

      <SvgText x="380" y="70" size="10" weight={700} fill={color}>QUEUE (FIFO)</SvgText>
      <rect x="270" y="156" width="220" height="42" rx="10" fill="var(--surface)" stroke="var(--border-strong)" />
      {["A", "B", "C", "D"].map((item, index) => (
        <g key={item}>
          <rect x={278 + index * 52} y="164" width="44" height="26" rx="6" fill={color} opacity={0.12 + index * 0.04} />
          <SvgText x={300 + index * 52} y="181" size="9" fill="var(--text)">{item}</SvgText>
        </g>
      ))}
      <path d="M256 177h-24M272 170l-10 7 10 7M528 177h18M514 170l10 7-10 7" stroke="var(--muted)" strokeWidth="1.5" />
      <SvgText x="380" y="224" size="8" fill="var(--muted)">birinchi kirgan → birinchi chiqadi</SvgText>

      <SvgText x="632" y="70" size="10" weight={700} fill={color}>DARAXT</SvgText>
      <circle cx="632" cy="104" r="16" fill={color} opacity="0.18" stroke={color} />
      <SvgText x="632" y="108" size="8" fill={color}>8</SvgText>
      <path d="M620 118l-48 38M644 118l48 38" stroke="var(--border-strong)" strokeWidth="1.5" />
      {[
        { x: 562, y: 168, label: "3" },
        { x: 702, y: 168, label: "10" },
      ].map((node) => (
        <g key={node.x}>
          <circle cx={node.x} cy={node.y} r="16" fill="var(--surface)" stroke={color} />
          <SvgText x={node.x} y={node.y + 4} size="8" fill="var(--text)">{node.label}</SvgText>
        </g>
      ))}
      <path d="M548 181l-36 38M576 181l36 38M688 181l-36 38M716 181l36 38" stroke="var(--border-strong)" strokeWidth="1.2" />
      {[512, 612, 652, 752].map((x) => (
        <circle key={x} cx={x} cy="228" r="12" fill="var(--surface-2)" stroke="var(--border)" />
      ))}

      <rect x="76" y="282" width="606" height="42" rx="12" fill="var(--surface)" stroke="var(--border)" />
      <SvgText x="380" y="301" size="8" fill="var(--muted)">CHOOSE THE RIGHT STRUCTURE</SvgText>
      <SvgText x="380" y="315" size="10" weight={600} fill={color}>Masalaga mos tuzilma — tezroq va sodda yechim</SvgText>
    </svg>
  );
}

export default function TopicVisual({ lesson, large = false }) {
  const { stageId, title } = lesson;
  const color = lesson.stageColor || "#5b7cfa";
  let visual = null;

  if (stageId === 1) visual = <InfoVisual color={color} />;
  else if (stageId === 2) visual = <ComputerVisual color={color} highlight={title} />;
  else if (stageId === 3) visual = <NumbersVisual color={color} />;
  else if (stageId === 4) visual = <UnitsVisual color={color} />;
  else if (stageId === 5) visual = <LogicVisual color={color} highlight={title} />;
  else if (stageId === 6) visual = <AlgorithmVisual color={color} />;
  else if (stageId === 7 || stageId === 9) visual = <CodeVisual color={color} />;
  else if (stageId === 8) visual = <BrowserVisual color={color} />;
  else if (stageId === 10) visual = <NetworkVisual color={color} />;
  else if (stageId === 11) visual = <DatabaseVisual color={color} />;
  else if (stageId === 12) visual = <SecurityVisual color={color} />;
  else if (stageId === 13) visual = <OfficeVisual color={color} />;
  else if (stageId === 14) visual = <AdvancedVisual color={color} />;
  else visual = <InfoVisual color={color} />;

  return (
    <figure className={`topic-visual ${large ? "topic-visual--large" : ""}`}>
      {visual}
      <figcaption>
        <span className="topic-visual__dot" style={{ background: color }} />
        {title} — mavzuga oid sxema
      </figcaption>
    </figure>
  );
}
