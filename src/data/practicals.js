const steps = (title, items, note = "") => ({
  kind: "steps",
  title,
  steps: items,
  note,
});

const code = (title, language, source, note) => ({
  kind: "code",
  title,
  language,
  code: source,
  note,
});

const jsBasics = (title) => {
  const normalized = title.toLowerCase();

  if (normalized.includes("dasturlash nima") || normalized.includes("dasturlash tillari")) {
    return code(
      "Birinchi dastur",
      "javascript",
      `let ism = "Aziza";\nconsole.log("Salom, " + ism + "!");\n\n// Konsolda: Salom, Aziza!`,
      "Dastur bajarilganda console.log ichidagi matn chiqadi. Avval o'zgaruvchi yaratildi, keyin undan foydalanildi."
    );
  }
  if (normalized.includes("o'zgaruvchilar")) {
    return code(
      "O'zgaruvchilar bilan ishlash",
      "javascript",
      `let ism = "Dilshod";\nlet yosh = 14;\nconst maktab = "21-maktab";\n\nism = "Dilshodbek";\nconsole.log(ism, yosh, maktab);`,
      "let qiymati keyin o'zgarishi mumkin. const bilan yaratilgan qiymatni qayta tayinlash mumkin emas."
    );
  }
  if (normalized.includes("ma'lumot turlari")) {
    return code(
      "Ma'lumot turlarini aniqlash",
      "javascript",
      `const matn = "Informatika";\nconst son = 2026;\nconst ha = true;\nconst royxat = [1, 2, 3];\n\nconsole.log(typeof matn);  // string\nconsole.log(typeof son);   // number\nconsole.log(typeof ha);    // boolean\nconsole.log(Array.isArray(royxat)); // true`,
      "typeof asosiy turlarni aniqlaydi. Massiv ham object turi bo'lgani uchun Array.isArray tekshiruvi ishlatiladi."
    );
  }
  if (normalized.includes("operatorlar")) {
    return code(
      "Operatorlar bilan hisoblash",
      "javascript",
      `const narx = 12000;\nconst soni = 3;\nconst jami = narx * soni;\nconst chegirma = jami >= 30000;\n\nconsole.log(jami);\nconsole.log(chegirma);`,
      "* arifmetik operator, >= esa taqqoslash operatoridir. Taqqoslash natijasi har doim true yoki false bo'ladi."
    );
  }
  if (normalized.includes("shartlar")) {
    return code(
      "if / else sharti",
      "javascript",
      `const baho = 86;\n\nif (baho >= 90) {\n  console.log("A daraja");\n} else if (baho >= 70) {\n  console.log("B daraja");\n} else {\n  console.log("Qayta mashq qiling");\n}`,
      "Shartlar yuqoridan pastga tekshiriladi. Shuning uchun eng aniq shartni avval yozish muhim."
    );
  }
  if (normalized.includes("takrorlash")) {
    return code(
      "for sikli",
      "javascript",
      `const baholar = [78, 91, 65, 88];\nlet jami = 0;\n\nfor (let i = 0; i < baholar.length; i += 1) {\n  jami += baholar[i];\n}\n\nconsole.log(jami / baholar.length);`,
      "Sikl massivning har bir elementini ko'rib chiqadi. length massiv uzunligini beradi."
    );
  }
  if (normalized.includes("funksiyalar")) {
    return code(
      "Funksiya yaratish",
      "javascript",
      `function yigindi(a, b) {\n  return a + b;\n}\n\nconst natija = yigindi(12, 8);\nconsole.log(natija); // 20`,
      "Funksiya parametr qabul qiladi va return orqali natija qaytaradi. Bir marta yozib, ko'p marta chaqirish mumkin."
    );
  }
  if (normalized.includes("massivlar")) {
    return code(
      "Massiv metodlari",
      "javascript",
      `const mevalar = ["olma", "banan", "uzum"];\nmevalar.push("nok");\n\nconst katta = mevalar.map((meva) => meva.toUpperCase());\nconst uuzun = mevalar.filter((meva) => meva.length > 5);\n\nconsole.log(katta);\nconsole.log(uuzun);`,
      "map har bir elementni o'zgartirib yangi massiv qaytaradi. filter esa faqat shartga mos elementlarni oladi."
    );
  }
  if (normalized.includes("xatolarni topish")) {
    return code(
      "Xatoni toping",
      "javascript",
      `const narxlar = [10, 20, 30];\nlet jami = 0;\n\nfor (let i = 0; i <= narxlar.length; i += 1) {\n  jami += narxlar[i];\n}\n\nconsole.log(jami);`,
      "Bu kodda siklni bir qadam ortiq aylantirilgan. i < narxlar.length bo'lishi kerak, aks holda undefined qo'shiladi."
    );
  }
  return code(
    "Amaliy namuna",
    "javascript",
    `let ism = "O'quvchi";\nconsole.log("Salom, " + ism + "!");`,
    "Kodni o'zgartirib, o'z ismingizni chiqarib ko'ring."
  );
};

const jsAdvanced = (title) => {
  const normalized = title.toLowerCase();

  if (normalized === "variables") {
    return code(
      "Variables",
      "javascript",
      `let ball = 10;\nconst ism = "Nodira";\n\nball += 5;\nconsole.log(ism, ball); // Nodira 15`,
      "const bilan e'lon qilingan qiymatga qayta qiymat berilmaydi. let esa yangilanadi."
    );
  }
  if (normalized === "data types") {
    return code(
      "Data types",
      "javascript",
      `const matn = "salom";\nconst son = Number("42");\nconst ha = Boolean(1);\nconst yoq = null;\n\nconsole.log(typeof matn, typeof son, typeof ha, yoq);`,
      "Number va Boolean funksiyalari qiymatni boshqa turga aylantiradi. typeof joriy turni ko'rsatadi."
    );
  }
  if (normalized === "operators") {
    return code(
      "Operators",
      "javascript",
      `const yosh = 16;\nconst ruxsat = yosh >= 14 && yosh < 18;\nconst chegirma = yosh < 12 || yosh > 65;\n\nconsole.log(ruxsat);   // true\nconsole.log(chegirma); // false`,
      "&& ikkala shartni, || esa kamida bitta shartni talab qiladi."
    );
  }
  if (normalized === "if/else") {
    return code(
      "if / else",
      "javascript",
      `const harorat = 28;\n\nif (harorat > 30) {\n  console.log("Juda issiq");\n} else if (harorat >= 20) {\n  console.log("Iliq");\n} else {\n  console.log("Salqin");\n}`,
      "Shartlar ketma-ket tekshiriladi va birinchi mos blok bajariladi."
    );
  }
  if (normalized === "loops") {
    return code(
      "Loops",
      "javascript",
      `for (let i = 1; i <= 5; i += 1) {\n  console.log(i + " x 3 = " + i * 3);\n}\n\nconst mevalar = ["olma", "nok"];\nfor (const meva of mevalar) {\n  console.log(meva);\n}`,
      "for aniq sonlar uchun, for...of massiv elementlari uchun qulay."
    );
  }
  if (normalized === "functions") {
    return code(
      "Functions",
      "javascript",
      `const hisobla = (a, b) => a * b;\n\nfunction salomlash(ism) {\n  return "Salom, " + ism;\n}\n\nconsole.log(hisobla(6, 7));\nconsole.log(salomlash("Aziz"));`,
      "Arrow function qisqa yozuv beradi. return funksiya natijasini qaytaradi."
    );
  }
  if (normalized === "arrays") {
    return code(
      "Arrays",
      "javascript",
      `const sonlar = [4, 8, 15, 16, 23, 42];\nconst juftlar = sonlar.filter((n) => n % 2 === 0);\nconst ikkilangan = sonlar.map((n) => n * 2);\n\nconsole.log(juftlar);\nconsole.log(ikkilangan.length);`,
      "filter shartli tanlaydi, map yangi qiymatlar massivini yaratadi."
    );
  }
  if (normalized === "objects") {
    return code(
      "Objects",
      "javascript",
      `const talaba = {\n  ism: "Malika",\n  yosh: 16,\n  fanlar: ["Matematika", "Informatika"],\n};\n\nconsole.log(talaba.ism);\nconsole.log(talaba["yosh"]);\ntalaba.yosh = 17;`,
      "Object xossalariga nuqta yoki kvadrat qavs orqali murojaat qilinadi."
    );
  }
  if (normalized === "dom") {
    return code(
      "DOM",
      "javascript",
      `const sarlavha = document.querySelector("#sarlavha");\n\nif (sarlavha) {\n  sarlavha.textContent = "Yangi matn";\n  sarlavha.classList.add("faol");\n}`,
      "querySelector elementni topadi. textContent matnni, classList klassni boshqaradi."
    );
  }
  if (normalized === "events") {
    return code(
      "Events",
      "javascript",
      `const tugma = document.querySelector("#tugma");\n\nif (tugma) {\n  tugma.addEventListener("click", () => {\n    console.log("Tugma bosildi");\n  });\n}`,
      "addEventListener hodisaga funksiya ulaydi. click foydalanuvchi bosganda ishga tushadi."
    );
  }
  if (normalized === "forms") {
    return code(
      "Forms",
      "javascript",
      `const forma = document.querySelector("form");\n\nforma?.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const ism = document.querySelector("#ism").value.trim();\n  console.log("Kiritilgan ism:", ism);\n});`,
      "preventDefault sahifa qayta yuklanishini to'xtatadi. value maydon qiymatini beradi."
    );
  }
  if (normalized === "localstorage") {
    return code(
      "LocalStorage",
      "javascript",
      `const progress = { dars: 3, xp: 150 };\n\nlocalStorage.setItem("progress", JSON.stringify(progress));\n\nconst saqlangan = JSON.parse(localStorage.getItem("progress"));\nconsole.log(saqlangan.xp);`,
      "Objectni saqlashdan oldin JSON.stringify, o'qishda esa JSON.parse ishlatiladi."
    );
  }
  if (normalized.includes("api")) {
    return code(
      "API va JSON",
      "javascript",
      `async function malumotOl() {\n  const javob = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const data = await javob.json();\n  console.log(data.name);\n}\n\nmalumotOl();`,
      "fetch so'rov yuboradi. await javobni kutadi. Haqiqiy loyihada xatolarni try/catch bilan boshqarish kerak."
    );
  }
  return jsBasics(title);
};

const htmlPractical = (title) => {
  const normalized = title.toLowerCase();
  if (normalized.includes("hujjati tuzilishi")) {
    return code(
      "HTML hujjati tuzilishi",
      "html",
      `<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="UTF-8" />\n  <title>Mening sahifam</title>\n</head>\n<body>\n  <h1>Asosiy sarlavha</h1>\n  <p>Bu hujjatning ko'rinadigan qismi.</p>\n</body>\n</html>`,
      "head brauzerga ma'lumot beradi, body esa foydalanuvchi ko'radigan mazmunni saqlaydi."
    );
  }
  if (normalized.includes("sarlavhalar")) {
    return code(
      "Sarlavhalar va paragraflar",
      "html",
      `<h1>Informatika olami</h1>\n<h2>Bugungi mavzu</h2>\n<p>HTML — veb-sahifaning <strong>tuzilishi</strong>.</p>\n<p>Har bir paragraf alohida <em>p</em> tegida yoziladi.</p>`,
      "h1 eng muhim sarlavha, h2 unga bo'ysunuvchi sarlavha. strong muhim matnni ajratadi."
    );
  }
  if (normalized.includes("rasmlar")) {
    return code(
      "Rasm va havola",
      "html",
      `<img src="/rasmlar/kompyuter.jpg" alt="Stol ustidagi kompyuter" width="320" />\n\n<p>\n  Batafsil: <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">HTML qo'llanmasi</a>\n</p>`,
      "alt rasm yuklanmasa ko'rinadigan matn. target=\"_blank\" havolani yangi oynada ochadi."
    );
  }
  if (normalized.includes("ro'yxatlar")) {
    return code(
      "Ro'yxat va jadval",
      "html",
      `<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<table>\n  <tr><th>Fan</th><th>Baho</th></tr>\n  <tr><td>Informatika</td><td>5</td></tr>\n</table>`,
      "ul tartibsiz ro'yxat, ol tartiblangan ro'yxat. th jadval sarlavhasi, td oddiy katak."
    );
  }
  if (normalized.includes("formalar")) {
    return code(
      "Forma elementlari",
      "html",
      `<form>\n  <label for="ism">Ismingiz</label>\n  <input id="ism" name="ism" type="text" placeholder="Ism kiriting" />\n  <button type="submit">Yuborish</button>\n</form>`,
      "label for va input id bir xil bo'lsa, yorliqni bosganda maydon faollashadi."
    );
  }
  if (normalized.includes("flexbox")) {
    return code(
      "Flexbox",
      "css",
      `.menyu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\n.karta {\n  display: flex;\n  flex-direction: column;\n}`,
      "justify-content asosiy o'q bo'ylab, align-items ko'ndalang o'q bo'ylab joylashtiradi."
    );
  }
  if (normalized.includes("grid")) {
    return code(
      "Grid",
      "css",
      `.galereya {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}\n\n.galereya .karta {\n  min-height: 180px;\n}`,
      "auto-fit va minmax ekran kengligiga qarab ustunlar sonini moslashtiradi."
    );
  }
  if (normalized.includes("responsive")) {
    return code(
      "Responsive media query",
      "css",
      `.konteyner {\n  width: min(1120px, 92%);\n  margin-inline: auto;\n}\n\n@media (max-width: 720px) {\n  .konteyner {\n    width: 100%;\n    padding: 16px;\n  }\n}`,
      "Kichik ekran uchun uslublar media query ichida yoziladi. width: min(...) moslashuvchan o'lcham beradi."
    );
  }
  if (normalized.includes("margin")) {
    return code(
      "Margin va padding",
      "css",
      `.karta {\n  margin: 24px 0;\n  padding: 20px;\n  border: 1px solid #dbe3f0;\n  border-radius: 16px;\n  box-sizing: border-box;\n}`,
      "margin tashqi masofa, padding ichki bo'shliq. border-box o'lcham hisobini soddalashtiradi."
    );
  }
  if (normalized.includes("ranglar")) {
    return code(
      "Rang va shrift",
      "css",
      `body {\n  font-family: "Segoe UI", sans-serif;\n  color: #14213d;\n  background: #f6f8fc;\n  line-height: 1.7;\n}\n\nh1 {\n  color: #4f46e5;\n  font-size: clamp(2rem, 5vw, 3.4rem);\n}`,
      "clamp() shrift o'lchamini ekran kengligiga moslab beradi. Kontrastli ranglar o'qishni osonlashtiradi."
    );
  }
  return code(
    "Birinchi HTML sahifa",
    "html",
    `<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="UTF-8" />\n  <title>Mening sahifam</title>\n</head>\n<body>\n  <h1>Salom, dunyo!</h1>\n  <p>Bu mening birinchi sahifam.</p>\n</body>\n</html>`,
    "HTML hujjati head va body qismlaridan iborat. Har bir teg to'g'ri yopilishi kerak."
  );
};

const sqlPractical = (title) => {
  const normalized = title.toLowerCase();
  if (normalized === "select") {
    return code(
      "SELECT",
      "sql",
      `SELECT ism, yosh\nFROM oquvchilar;`,
      "SELECT dan keyin kerakli ustunlar yoziladi. * barcha ustunlarni tanlaydi."
    );
  }
  if (normalized === "where") {
    return code(
      "WHERE",
      "sql",
      `SELECT ism, baho\nFROM oquvchilar\nWHERE baho >= 80 AND sinf = 9;`,
      "WHERE qatorlarni filtrlaydi. AND bilan bir nechta shartni bog'lash mumkin."
    );
  }
  if (normalized === "order by") {
    return code(
      "ORDER BY",
      "sql",
      `SELECT ism, baho\nFROM oquvchilar\nWHERE sinf = 9\nORDER BY baho DESC;`,
      "DESC kamayish, ASC o'sish tartibini beradi. ORDER BY odatda so'rov oxirida yoziladi."
    );
  }
  if (normalized.includes("insert")) {
    return code(
      "INSERT, UPDATE, DELETE",
      "sql",
      `INSERT INTO oquvchilar (ism, yosh, sinf)\nVALUES ('Aziza', 15, 9);\n\nUPDATE oquvchilar\nSET baho = 92\nWHERE ism = 'Aziza';\n\nDELETE FROM oquvchilar\nWHERE ism = 'Aziza';`,
      "UPDATE va DELETE da WHERE shartini unutmaslik kerak, aks holda barcha qatorlar o'zgaradi."
    );
  }
  return code(
    "SQL so'rovi",
    "sql",
    `SELECT ism, yosh\nFROM oquvchilar\nWHERE sinf = 9\nORDER BY yosh DESC;`,
    "SELECT ustunlarni tanlaydi, WHERE filtrlaydi, ORDER BY saralaydi."
  );
};

const stagePracticals = {
  1: steps("Axborot oqimini kuzatish", [
    "Manbani aniqlang: ma'lumot qayerdan olinyapti?",
    "Axborot turini belgilang: matn, rasm, ovoz yoki video.",
    "Qayta ishlash usulini tanlang: o'qish, solishtirish yoki hisoblash.",
    "Natijani xulosa qilib, ishonchliligini tekshiring.",
  ]),
  2: steps("Qurilmalarni vazifasiga ko'ra ajratish", [
    "Protsessor, RAM, disk va anakartni ichki qurilmalarga kiriting.",
    "Monitor, printer va dinamikni chiqarish qurilmalariga ajrating.",
    "Klaviatura, sichqoncha va kamerani kiritish qurilmalariga ajrating.",
    "Har bir qurilmaning vazifasini bir jumlada tushuntiring.",
  ]),
  3: code(
    "Sanoq sistemalarini JavaScriptda tekshirish",
    "javascript",
    `const son = 13;\n\nconsole.log(son.toString(2));  // 1101\nconsole.log(son.toString(8));  // 15\nconsole.log(son.toString(16)); // d\n\nconsole.log(parseInt("1101", 2)); // 13`,
    "toString(asos) sonni berilgan sanoq sistemasida ifodalaydi. parseInt esa matnni o'qiydi."
  ),
  4: code(
    "Fayl hajmini hisoblash",
    "javascript",
    `const kilobayt = 2048;\nconst megabayt = kilobayt / 1024;\nconst bayt = kilobayt * 1024;\nconst bit = bayt * 8;\n\nconsole.log(kilobayt + " KB = " + megabayt + " MB");\nconsole.log(bayt + " bayt = " + bit + " bit");`,
    "Xotira o'lchovlarida 1 KB = 1024 B. Internet tezligida megabit va megabaytni aralashtirmaslik kerak."
  ),
  5: code(
    "Mantiqiy amallarni tekshirish",
    "javascript",
    `const a = true;\nconst b = false;\n\nconsole.log(a && b); // false\nconsole.log(a || b); // true\nconsole.log(!a);     // false\nconsole.log(5 > 3);  // true`,
    "&& — AND, || — OR, ! — NOT. Taqqoslash amali natijasi mantiqiy qiymat bo'ladi."
  ),
  6: code(
    "Algoritmni psevdokodda yozish",
    "text",
    `BOSHLASH\n  son1 = kiritish("Birinchi son:")\n  son2 = kiritish("Ikkinchi son:")\n  yigindi = son1 + son2\n  chiqarish(yigindi)\nTUGASH`,
    "Psevdokod aniq dasturlash tiliga bog'lanmagan algoritm yozuvidir. Qadamlar ketma-ket va tushunarli bo'lishi kerak."
  ),
  7: jsBasics,
  8: htmlPractical,
  9: jsAdvanced,
  10: steps("Veb-so'rov yo'lini kuzatish", [
    "Brauzerga sayt nomini yozing.",
    "DNS domen nomini IP manzilga aylantiradi.",
    "Brauzer HTTPS so'rovini serverga yuboradi.",
    "Server HTML, CSS va JavaScript fayllarini qaytaradi.",
    "Brauzer natijani tahlil qilib, sahifani ko'rsatadi.",
  ]),
  11: sqlPractical,
  12: steps("Hisobni himoyalash tekshiruvi", [
    "Parol uzunligi kamida 12 belgidan iboratmi?",
    "Parolda katta-kichik harf, raqam va maxsus belgi bormi?",
    "Ikki bosqichli himoya yoqilganmi?",
    "Zaxira kodlar xavfsiz joyda saqlanganmi?",
    "Shubhali kirish urinishlari tarixini tekshirdingizmi?",
  ]),
  13: steps("Faylni tartib bilan saqlash", [
    "Fan nomi bilan papka yarating.",
    "Hujjat nomiga sana va mavzuni kiriting.",
    "Muhim faylning zaxira nusxasini yarating.",
    "Keraksiz nusxalarni Savatga o'tkazing va tekshiring.",
  ]),
  14: code(
    "Ikkilik qidiruv tamoyili",
    "javascript",
    `function ikkilikQidiruv(arr, target) {\n  let chap = 0;\n  let ong = arr.length - 1;\n\n  while (chap <= ong) {\n    const orta = Math.floor((chap + ong) / 2);\n    if (arr[orta] === target) return orta;\n    if (arr[orta] < target) chap = orta + 1;\n    else ong = orta - 1;\n  }\n  return -1;\n}\n\nconsole.log(ikkilikQidiruv([1, 3, 5, 8, 12], 8));`,
    "Ikkilik qidiruv faqat tartiblangan massivda ishlaydi. Har qadamda qidiruv oralig'i ikki barobar kichrayadi."
  ),
};

export function getPractical(lesson) {
  const practical = stagePracticals[lesson.stageId];
  if (typeof practical === "function") {
    return practical(lesson.title);
  }
  return practical;
}
