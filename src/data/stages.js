export const stages = [
  {
    id: 1,
    slug: "informatikaga-kirish",
    title: "Informatikaga kirish",
    tagline: "Axborot olamining eshigi",
    description:
      "Informatika nima ekanini, axborotning turlari va hayotimizdagi o'rnini eng sodda misollar bilan tushunasiz.",
    icon: "spark",
    color: "#5b7cfa",
    level: "Boshlang'ich",
    duration: "1 soat 30 daqiqa",
    project:
      "Kun davomida qabul qilgan axborotlaringizni turkumlaydigan kichik jadval tayyorlang.",
    homework:
      "Bugun ishlatgan 5 ta axborot manbasini yozing va har birining turini aniqlang.",
    errorTask: {
      statement:
        "Axborot faqat matn ko'rinishida bo'ladi va uni faqat kitobdan olish mumkin.",
      options: [
        "Axborot matn, rasm, ovoz, video va raqam ko'rinishida bo'lishi mumkin.",
        "Axborotni faqat qog'ozga yozish kerak.",
        "Har qanday matn albatta to'g'ri axborotdir.",
      ],
      answer: 0,
      explanation:
        "Axborotning bir necha turi bor. Uning to'g'riligi esa manba va tekshirishga bog'liq.",
    },
  },
  {
    id: 2,
    slug: "kompyuter-asoslari",
    title: "Kompyuter asoslari",
    tagline: "Qurilmalar qanday birlashadi?",
    description:
      "Kompyuterning ichki tuzilishi, asosiy qurilmalar, xotira turlari va operatsion tizim bilan tanishasiz.",
    icon: "cpu",
    color: "#10b981",
    level: "Boshlang'ich",
    duration: "2 soat 20 daqiqa",
    project:
      "O'z kompyuteringiz yoki telefon qurilmalaringiz uchun qismlar xaritasini chizing.",
    homework:
      "O'z qurilmangizdagi 5 ta komponentni topib, ularning vazifasini daftaringizga yozing.",
    errorTask: {
      statement:
        "Operatsion tizim o'chirilganda ham barcha dasturlar ishlashda davom etadi.",
      options: [
        "Operatsion tizim dasturlar va qurilmalar o'rtasida vositachilik qiladi, usiz tizim ishlamaydi.",
        "Operatsion tizim faqat o'yinlar uchun kerak.",
        "Operatsion tizim kompyuterning jismoniy protsessoridir.",
      ],
      answer: 0,
      explanation:
        "Operatsion tizim resurslarni boshqaradi. U ishlamasa, dasturlar qurilmalardan foydalana olmaydi.",
    },
  },
  {
    id: 3,
    slug: "sanoq-sistemalari",
    title: "Sanoq sistemalari",
    tagline: "Sonlar tilini o'rganing",
    description:
      "O'nlik, ikkilik, sakkizlik va o'n oltilik sanoq sistemalarini o'zaro o'tkazishni amalda o'rganasiz.",
    icon: "binary",
    color: "#f59e0b",
    level: "O'rta",
    duration: "1 soat 50 daqiqa",
    project:
      "O'zingizning sanoq sistemasi kalkulyatoringizni qog'ozda yoki kodda yasang.",
    homework:
      "10, 25 va 42 sonlarini ikkilik va o'n oltilik sistemaga o'tkazing.",
    errorTask: {
      statement:
        "Ikkilik sanoq sistemasida 2, 3 va 4 raqamlaridan ham foydalaniladi.",
      options: [
        "Ikkilik sistemada faqat 0 va 1 raqamlari ishlatiladi.",
        "Ikkilik sistemada faqat juft raqamlar ishlatiladi.",
        "Ikkilik sistemada har doim sakkiz xona bo'ladi.",
      ],
      answer: 0,
      explanation:
        "Sanoq sistemasining asosi nechta raqamdan foydalanishni belgilaydi. Ikkilikda asos 2, raqamlar 0 va 1.",
    },
  },
  {
    id: 4,
    slug: "axborot-olchov-birliklari",
    title: "Axborot o'lchov birliklari",
    tagline: "Bitdan terabaytgacha",
    description:
      "Fayl hajmi, internet tezligi va xotira sig'imini bit, bayt, kilobayt va boshqa birliklarda hisoblashni o'rganasiz.",
    icon: "layers",
    color: "#ec4899",
    level: "O'rta",
    duration: "1 soat 30 daqiqa",
    project:
      "Telefoningizdagi 5 ta fayl hajmini jadvalga yozib, ularni MB ga aylantiring.",
    homework:
      "Telefoningizdagi uchta fayl hajmini yozib, ularni bit va megabaytga aylantiring.",
    errorTask: {
      statement:
        "1 kilobayt har doim 1000 baytga teng va boshqa imkoniyat yo'q.",
      options: [
        "Kompyuter xotirasida ko'pincha 1 KB = 1024 B qabul qilinadi.",
        "1 bayt 1024 bitga teng.",
        "Megabayt baytdan kichik birlik.",
      ],
      answer: 0,
      explanation:
        "Ikkilik tizimda o'lchovlar ko'pincha 1024 ga asoslanadi. 1 KB = 1024 B, 1 MB = 1024 KB.",
    },
  },
  {
    id: 5,
    slug: "mantiq-asoslari",
    title: "Mantiq asoslari",
    tagline: "To'g'ri va noto'g'ri dunyosi",
    description:
      "TRUE va FALSE qiymatlari, AND, OR, NOT amallari va rostlik jadvallari bilan mantiqiy fikrlashni rivojlantirasiz.",
    icon: "logic",
    color: "#8b5cf6",
    level: "O'rta",
    duration: "1 soat 40 daqiqa",
    project:
      "Kundalik qarorlaringizdan bittasini mantiqiy ifoda ko'rinishida yozing.",
    homework:
      "Uchta kundalik qaroringizni TRUE/FALSE shartlar bilan yozing.",
    errorTask: {
      statement: "TRUE AND FALSE natijasi TRUE bo'ladi.",
      options: [
        "TRUE AND FALSE natijasi FALSE bo'ladi, chunki AND ikkala shartni ham talab qiladi.",
        "TRUE AND FALSE har doim ikkita natija beradi.",
        "AND amali faqat matnlar bilan ishlaydi.",
      ],
      answer: 0,
      explanation:
        "AND amalida ikkala qiymat ham TRUE bo'lsagina natija TRUE bo'ladi.",
    },
  },
  {
    id: 6,
    slug: "algoritmlar",
    title: "Algoritmlar",
    tagline: "Masalani qadamlarga bo'ling",
    description:
      "Algoritm tushunchasi, uning xossalari, chiziqli, tarmoqlanuvchi va takrorlanuvchi tuzilmalarini o'rganasiz.",
    icon: "flow",
    color: "#06b6d4",
    level: "O'rta",
    duration: "1 soat 50 daqiqa",
    project:
      "Kundalik vazifangiz uchun blok-sxema ko'rinishidagi algoritm tuzing.",
    homework:
      "Ertalabki tartibingizni 8 qadamli algoritm ko'rinishida yozing.",
    errorTask: {
      statement:
        "Algoritmda qadamlar tartibi muhim emas, ularni istalgancha almashtirish mumkin.",
      options: [
        "Ko'p masalalarda qadamlar tartibi natijaga bevosita ta'sir qiladi.",
        "Algoritm faqat bitta qadamdan iborat bo'ladi.",
        "Algoritmni faqat qog'ozda yozish mumkin.",
      ],
      answer: 0,
      explanation:
        "Algoritm aniq ketma-ketlikdir. Qadamlarni o'zgartirish noto'g'ri natija yoki xatolikka olib kelishi mumkin.",
    },
  },
  {
    id: 7,
    slug: "dasturlashga-kirish",
    title: "Dasturlashga kirish",
    tagline: "Birinchi kod satrlaringiz",
    description:
      "Dasturlash tushunchasi, o'zgaruvchilar, ma'lumot turlari, shartlar, takrorlash va funksiyalarni o'rganasiz.",
    icon: "code",
    color: "#22c55e",
    level: "O'rta",
    duration: "2 soat 30 daqiqa",
    project:
      "O'zgaruvchilar va shartlardan foydalanib, oddiy baho hisoblagich yarating.",
    homework: "Ikki sonning kattasini topadigan dastur yozing.",
    errorTask: {
      statement:
        "let yosh = 15; if (yosh = 18) { console.log('Voyaga yetgan'); }",
      options: [
        "if shartida taqqoslash uchun == yoki === ishlatilishi kerak.",
        "let o'rniga faqat var ishlatiladi.",
        "console.log matn chiqara olmaydi.",
      ],
      answer: 0,
      explanation:
        "Bitta tenglik (=) qiymat beradi. Taqqoslash uchun === yoki == operatoridan foydalaniladi.",
    },
  },
  {
    id: 8,
    slug: "html-va-css",
    title: "HTML va CSS",
    tagline: "Veb sahifangizni quring",
    description:
      "HTML hujjat tuzilishi, matn, rasm, forma va zamonaviy CSS layout usullarini amaliy o'rganasiz.",
    icon: "browser",
    color: "#f97316",
    level: "O'rta",
    duration: "2 soat 30 daqiqa",
    project: "O'zingiz haqingizda bir sahifali shaxsiy veb-sayt yarating.",
    homework: "O'zingiz haqingizda uch bo'limli oddiy HTML sahifa yarating.",
    errorTask: {
      statement: "<p>Salom dunyo</p></div>",
      options: [
        "Ochilgan <p> tegiga mos yopiluvchi teg bor, lekin ortiqcha </div> yopilgan.",
        "p tegida matn yozish mumkin emas.",
        "HTML teglari juft bo'lishi shart emas.",
      ],
      answer: 0,
      explanation:
        "HTMLda ochilgan har bir teg mos tartibda yopilishi kerak. Ortiqcha yopiluvchi teg xatolik hisoblanadi.",
    },
  },
  {
    id: 9,
    slug: "javascript",
    title: "JavaScript",
    tagline: "Sahifangizni jonlantiring",
    description:
      "JavaScript asoslari, DOM, hodisalar, formalar, LocalStorage va API bilan ishlashni amaliy mashqlar orqali o'rganasiz.",
    icon: "terminal",
    color: "#eab308",
    level: "O'rta",
    duration: "3 soat",
    project:
      "LocalStorage yordamida natijalarni saqlaydigan mini vazifalar ilovasini yarating.",
    homework:
      "Massivdagi sonlarning yig'indisini hisoblaydigan funksiya yozing.",
    errorTask: {
      statement:
        "const ranglar = ['qizil', 'yashil']; console.log(ranglar.lenght);",
      options: [
        "Xossa nomi length bo'lishi kerak, lenght emas.",
        "Massiv elementlarini console.log orqali ko'rish mumkin emas.",
        "const bilan massiv yaratib bo'lmaydi.",
      ],
      answer: 0,
      explanation:
        "length — massiv uzunligini beruvchi to'g'ri xossa nomi. Imlo xatosi undefined qaytaradi.",
    },
  },
  {
    id: 10,
    slug: "internet-va-tarmoqlar",
    title: "Internet va tarmoqlar",
    tagline: "Ma'lumot qanday yo'l bosadi?",
    description:
      "Internet, LAN va WAN, IP, DNS, HTTP, brauzer, server va xavfsiz ulanish asoslarini o'rganasiz.",
    icon: "network",
    color: "#3b82f6",
    level: "O'rta",
    duration: "2 soat",
    project: "Uyingizdagi qurilmalarning kichik tarmoq xaritasini chizing.",
    homework:
      "Uy tarmog'ingizdagi qurilmalar ro'yxatini tuzing va ularning vazifasini yozing.",
    errorTask: {
      statement:
        "HTTPS manzillarda ma'lumotlar ochiq matn ko'rinishida uzatiladi.",
      options: [
        "HTTPS ma'lumotlarni shifrlangan kanal orqali uzatadi.",
        "HTTPS faqat rasm yuklash uchun ishlatiladi.",
        "HTTP va HTTPS bir xil xavfsizlikni beradi.",
      ],
      answer: 0,
      explanation:
        "HTTPS TLS shifrlashdan foydalanadi, shuning uchun ma'lumotlar yo'lda o'qilishi qiyinlashadi.",
    },
  },
  {
    id: 11,
    slug: "malumotlar-bazasi",
    title: "Ma'lumotlar bazasi",
    tagline: "Ma'lumotni tartib bilan boshqaring",
    description:
      "Jadval, qator, ustun, kalit, qidirish, saralash va SQL asoslarini amaliy misollar bilan o'rganasiz.",
    icon: "database",
    color: "#a855f7",
    level: "O'rta",
    duration: "2 soat",
    project:
      "O'quvchilar jadvali uchun 5 ta ustunli kichik baza loyihasini tuzing.",
    homework:
      "5 qatorli o'quvchilar jadvalini tuzing va WHERE shartli so'rov yozing.",
    errorTask: {
      statement: "SELEC name FROM oquvchilar;",
      options: [
        "Kalit so'z SELECT to'g'ri yozilishi kerak, SELEC emas.",
        "FROM o'rniga faqat TABLE ishlatiladi.",
        "SQL faqat raqamlar bilan ishlaydi.",
      ],
      answer: 0,
      explanation:
        "SQL kalit so'zlari aniq yoziladi. SELECT ustunlarni tanlash uchun ishlatiladi.",
    },
  },
  {
    id: 12,
    slug: "kiberxavfsizlik",
    title: "Kiberxavfsizlik",
    tagline: "Raqamli dunyoda himoyalaning",
    description:
      "Kuchli parol, ikki bosqichli himoya, fishing, zararli dasturlar va xavfsiz internet qoidalarini o'rganasiz.",
    icon: "shield",
    color: "#ef4444",
    level: "O'rta",
    duration: "1 soat 40 daqiqa",
    project:
      "Oilangiz uchun 10 banddan iborat raqamli xavfsizlik eslatmasini tuzing.",
    homework:
      "Ikki bosqichli himoyani yoqing va zaxira kodlarni xavfsiz joyga saqlang.",
    errorTask: {
      statement:
        "Bir xil parolni barcha saytlarda ishlatish eng xavfsiz usuldir.",
      options: [
        "Har bir muhim hisob uchun alohida va kuchli parol ishlatish kerak.",
        "Parolni hech kimga aytmaslikning o'zi yetadi.",
        "Parol qanchalik qisqa bo'lsa, shunchalik xavfsiz.",
      ],
      answer: 0,
      explanation:
        "Bir parol oshkor bo'lsa, boshqa hisoblar ham xavf ostida qoladi. Parollar har xil bo'lishi kerak.",
    },
  },
  {
    id: 13,
    slug: "kompyuter-savodxonligi",
    title: "Kompyuter savodxonligi",
    tagline: "Kundalik ishlarni osonlashtiring",
    description:
      "Windows, fayllar, klaviatura, Word, Excel, PowerPoint, PDF va qurilmalar bilan ishlashni amalda o'rganasiz.",
    icon: "monitor",
    color: "#64748b",
    level: "Boshlang'ich",
    duration: "2 soat 20 daqiqa",
    project:
      "Word va Excel yordamida o'z haftalik rejangizni tayyorlang.",
    homework: "Haftalik reja uchun Excel jadvalini tuzing.",
    errorTask: {
      statement:
        "Faylni o'chirib yuborsangiz, uni hech qachon qaytarib bo'lmaydi.",
      options: [
        "Fayl ko'pincha Savat (Recycle Bin) orqali qaytarilishi mumkin.",
        "Faylni faqat printer orqali tiklash mumkin.",
        "Har bir fayl avtomatik ravishda internetga yuklanadi.",
      ],
      answer: 0,
      explanation:
        "O'chirilgan fayl odatda Savatga tushadi va u yerdan tiklanadi. Savat bo'shatilgach tiklash qiyinlashadi.",
    },
  },
  {
    id: 14,
    slug: "murakkab-mavzular",
    title: "Murakkab mavzular",
    tagline: "Keyingi darajaga qadam",
    description:
      "Ma'lumotlar tuzilmalari, stack, queue, qidiruv, saralash, rekursiya, murakkablik va sun'iy intellekt asoslari.",
    icon: "brain",
    color: "#0ea5e9",
    level: "Yuqori",
    duration: "2 soat 40 daqiqa",
    project:
      "Saralash algoritmlarini solishtiruvchi kichik vizual tajriba yarating.",
    homework: "Stack va queue farqini bitta jadvalda yozing.",
    errorTask: {
      statement: "Rekursiv funksiya hech qachon to'xtash shartiga muhtoj emas.",
      options: [
        "Rekursiyada to'xtash sharti bo'lmasa, funksiya cheksiz chaqirilib xatolik beradi.",
        "Rekursiya faqat massivlar bilan ishlaydi.",
        "Barcha algoritmlar bir xil tezlikda ishlaydi.",
      ],
      answer: 0,
      explanation:
        "Har bir rekursiv funksiyada bazaviy holat bo'lishi kerak. Aks holda stack to'lib, xatolik yuz beradi.",
    },
  },
];
