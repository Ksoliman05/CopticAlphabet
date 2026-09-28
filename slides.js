/* =====================================================================
   COPTIC ALPHABET LESSONS: the slides
   This is the only file you need to edit. Save it and refresh the page.
   See EDITING.md for every slide type with a copy-paste example.

   Tips
   - Type Coptic as real Coptic letters (copy from here, or use a Coptic
     keyboard). The site converts it to the CS Avva Shenouda font for you.
   - Jinkim: put the combining mark  ̀  (U+0300) right AFTER its letter: ⲡ̀
   - In "sound": **bold** and _underlined highlight_.
   - Every entry ends with "}," (comma!) except that commas are optional
     after the very last one.
   ===================================================================== */

/* The alphabet: [capital, small, name, sound]. Letter names used below
   (in "letter", "letters", "newLetters") must match a name here. */
var ALPHABET = [
  ["Ⲁ", "ⲁ", "Alpha", "a"],
  ["Ⲃ", "ⲃ", "Vita", "v / b"],
  ["Ⲅ", "ⲅ", "Gamma", "g / gh / n"],
  ["Ⲇ", "ⲇ", "Delta", "th / z / d"],
  ["Ⲉ", "ⲉ", "Ey", "e"],
  ["Ⲋ", "ⲋ", "So-ou", "6"],
  ["Ⲍ", "ⲍ", "Zeeta", "z"],
  ["Ⲏ", "ⲏ", "Eeta", "ee"],
  ["Ⲑ", "ⲑ", "Theta", "th / t"],
  ["Ⲓ", "ⲓ", "Yota", "i / y"],
  ["Ⲕ", "ⲕ", "Kappa", "k"],
  ["Ⲗ", "ⲗ", "Lola", "l"],
  ["Ⲙ", "ⲙ", "Mey", "m"],
  ["Ⲛ", "ⲛ", "Ney", "n"],
  ["Ⲝ", "ⲝ", "Exi", "x"],
  ["Ⲟ", "ⲟ", "O", "o"],
  ["Ⲡ", "ⲡ", "Pe", "p"],
  ["Ⲣ", "ⲣ", "Ro", "r"],
  ["Ⲥ", "ⲥ", "Seema", "s / z"],
  ["Ⲧ", "ⲧ", "Tav", "t / d"],
  ["Ⲩ", "ⲩ", "Epsilon", "i / v / oo"],
  ["Ⲫ", "ⲫ", "Phi", "f"],
  ["Ⲭ", "ⲭ", "Key", "k / kh / sh"],
  ["Ⲯ", "ⲯ", "Epsi", "ps"],
  ["Ⲱ", "ⲱ", "Omega", "o"],
  ["Ϣ", "ϣ", "Shai", "sh"],
  ["Ϥ", "ϥ", "Fai", "f"],
  ["Ϧ", "ϧ", "Khai", "kh"],
  ["Ϩ", "ϩ", "Hori", "h"],
  ["Ϫ", "ϫ", "Jenja", "j / g"],
  ["Ϭ", "ϭ", "Cheema", "ch"],
  ["Ϯ", "ϯ", "Ti", "ti"]
];

var SLIDES = [

  // ============================================================
  // INTRO
  // ============================================================
  { type: "title", title: "Coptic Alphabet", subtitle: "Learning to read Coptic" },
  { type: "steps", title: "Where does Coptic come from?",
    steps: [
      ["Hieroglyphics", "The first way ancient Egyptians wrote, with pictures, in the time of the pharaohs."],
      ["Demotic", "A faster, handwritten form of Egyptian writing used later on."],
      ["Coptic", "The last stage of the Egyptian language, written with Greek letters plus 7 letters kept from Demotic."]
    ] },
  { type: "stats", title: "Coptic has 32 letters",
    stats: [
      ["24", "letters from Greek", "ⲁ ⲃ ⲅ ⲇ ⲉ ⲍ ⲏ ⲑ ..."],
      ["+1", "So-ou, used only for the number 6", "ⲋ"],
      ["+7", "letters kept from Demotic, for sounds Greek doesn't have", "ϣ ϥ ϧ ϩ ϫ ϭ ϯ"]
    ],
    footer: "24 + 1 + 7 = 32" },
  { type: "chart", title: "The whole alphabet", allLetters: true,
    note: "Every letter has a capital and a small form. Don't worry, we will learn them a few at a time!" },
  { type: "vowels", title: "Vowels",
    intro: "Vowels are letters you say with your mouth open, without closing any part of it. English has 5 (a, e, i, o, u). Coptic has 7.",
    vowels: [
      ["Alpha", "a", "father"], ["Ey", "e", "pen"], ["Eeta", "ee", "feet"], ["Yota", "i", "sit"],
      ["O", "o", "not"], ["Epsilon", "i", "sit"], ["Omega", "o", "bore"]
    ],
    footer: "All the other letters are consonants: you close part of your mouth to say them." },
  { type: "columns", title: "Our lessons",
    columns: [
      { heading: "Lesson 1", text: "Look and sound like English", coptic: "ⲁ ⲃ ⲉ ⲍ ⲓ ⲕ ⲙ ⲛ ⲟ ⲥ ⲧ ⲱ" },
      { heading: "Lesson 2", text: "Look like English, sound different", coptic: "ⲏ ⲣ ⲭ ϯ ϥ ϩ" },
      { heading: "Lesson 3", text: "Brand-new shapes", coptic: "ⲩ ⲇ ⲗ ⲡ ⲫ ⲝ ⲯ ϧ ϭ" },
      { heading: "Lesson 4", text: "The last five", coptic: "ⲅ ϣ ⲑ ϫ ⲋ" }
    ] },

  // ============================================================
  // LESSON 1
  // ============================================================
  { type: "lesson", number: "01", title: "Lesson 1", subtitle: "Letters that look and sound like English" },
  { type: "part", title: "Lesson 1 · Part 1", letters: ["Alpha", "Vita", "Ey", "Zeeta"] },
  { type: "letter",
    letter: "Alpha",
    sound: "**A** (as in f_a_ther)",
    words: [
      ["ⲁⲃⲃⲁ", "Av-va", "father"],
      ["ⲁⲙⲱⲓⲛⲓ", "A-moi-ni", "come"],
      ["ⲁⲗⲏⲑⲱⲥ", "A-lee-thos", "truly"]
    ] },
  { type: "letter",
    letter: "Vita",
    sound: "**V** or **B** (_v_ase or _b_ell)",
    note: "Depends on the word (next slide).",
    words: [
      ["ⲃⲁⲕⲓ", "Va-ki", "city"],
      ["ⲛⲉⲛⲛⲟⲃⲓ", "Nen-no-vi", "our sins"],
      ["ⲁⲃⲣⲁⲁⲙ", "Ab-ra-am", "Abraham"]
    ] },
  { type: "rule", title: "Vita: V or B?",
    intro: "Look at the word, then at the letter right after Ⲃ.",
    rows: [
      { when: "In names of people and places, it is always B", examples: [["ⲁⲃⲣⲁⲁⲙ", "Ab-ra-am (Abraham)"]] },
      { when: "In other words, before a vowel, it is V", examples: [["ⲃⲁⲕⲓ", "Va-ki (city)"]] },
      { when: "In other words, before a consonant or at the end, it is B", examples: [["ⲉⲑⲟⲩⲁⲃ", "E-tho-wab (holy)"]] }
    ] },
  { type: "exercise", title: "Practice: Vita",
    prompt: "V or B? Read each word, then click to check.",
    words: [
      ["ϩⲱⲃ", "Hob", "thing"],
      ["ⲃⲁⲗ", "Val", "eye"],
      ["ⲛⲟⲃⲓ", "No-vi", "sin"],
      ["ⲛ̀ⲛⲟⲩⲃ", "En-noub", "the gold"],
      ["ⲃⲱϩⲉⲙ", "Vo-hem"],
      ["ⲗⲱⲃϣ", "Lobsh"],
      ["ⲉ̀ⲃⲟⲗ", "E-vol", "out"],
      ["ⲛⲓⲃⲉⲛ", "Ni-ven", "every"]
    ] },
  { type: "letter",
    letter: "Ey",
    sound: "**E** (as in p_e_n or l_e_g)",
    words: [
      ["ⲇⲉⲥⲡⲟⲧⲁ", "Zes-po-ta", "master"],
      ["ⲭⲉⲣⲉ", "She-re", "hail"],
      ["ⲑⲉⲟⲥ", "The-os", "God"]
    ] },
  { type: "letter",
    letter: "Zeeta",
    sound: "**Z** (as in _z_oo or _z_ip)",
    words: [
      ["ⲍⲱⲟⲛ", "Zo-on", "animal"],
      ["ⲧⲣⲁⲡⲉⲍⲁ", "Tra-pe-za", "table"],
      ["ⲍⲱⲏ", "Zo-ee", "life"]
    ] },
  { type: "exercise", title: "Exercise: Part 1",
    words: [
      ["ⲁⲃⲃⲁ", "Av-va", "father"],
      ["ⲍⲁⲍ", "Zaz"],
      ["ⲍⲉⲛⲍⲉⲛ", "Zen-zen"],
      ["ⲃⲁⲍ", "Vaz"]
    ] },
  { type: "part", title: "Lesson 1 · Part 2", letters: ["Yota", "Kappa", "Mey", "Ney"] },
  { type: "review", title: "Review of Part 1", letters: ["Alpha", "Vita", "Ey", "Zeeta"] },
  { type: "letter",
    letter: "Yota",
    sound: "**I** (as in s_i_t or w_i_n)",
    note: "Starting a word before a vowel, it says Y.",
    words: [
      ["ⲡⲓⲱ̀ⲟⲩ", "Pi-o-ou", "the glory"],
      ["ⲡⲓⲥ̀ⲙⲟⲩ", "Pi-es-mou", "the blessing"],
      ["ⲡⲓⲁ̀ⲙⲁϩⲓ", "Pi-a-ma-hi", "the majesty"]
    ] },
  { type: "letter",
    letter: "Kappa",
    sound: "**K** (as in _k_ind or for_k_)",
    words: [
      ["ⲡⲉⲕⲣⲁⲛ", "Pek-ran", "your name"],
      ["ⲕ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ", "Ek-es-ma-ro-out", "you are blessed"],
      ["ⲡⲓⲕⲁⲩⲙⲁ", "Pi-kav-ma", "the heat"]
    ] },
  { type: "letter",
    letter: "Mey",
    sound: "**M** (as in _m_other or fa_m_ily)",
    words: [
      ["ⲙⲁⲣⲉⲛⲟⲩⲱⲛϩ", "Ma-ren-ou-onh", "let us give thanks"],
      ["ⲙⲁⲓⲣⲱⲙⲓ", "Mai-ro-mi", "lover of mankind"],
      ["ⲙⲩⲥⲧⲏⲣⲓⲟⲛ", "Mis-tee-ri-on", "mystery"]
    ] },
  { type: "letter",
    letter: "Ney",
    sound: "**N** (as in _n_ame or fa_n_)",
    words: [
      ["ⲛⲟϥⲣⲓ", "Nof-ri", "good"],
      ["ⲛⲁⲓ", "Nai", "mercy"],
      ["ⲱⲥⲁⲛⲛⲁ", "O-san-na", "save us"]
    ] },
  { type: "exercise", title: "Exercise: Part 2",
    words: [
      ["ⲛⲁⲛ", "Nan"],
      ["ⲙⲁ", "Ma", "give"],
      ["ⲓⲁⲃ", "Yab"],
      ["ⲛⲉⲙⲁⲛ", "Ne-man", "with us"],
      ["ⲛⲁⲕ", "Nak", "to you"],
      ["ⲕⲁⲛ", "Kan"]
    ] },
  { type: "part", title: "Lesson 1 · Part 3", letters: ["O", "Seema", "Tav", "Omega"] },
  { type: "review", title: "Review of Part 2", letters: ["Yota", "Kappa", "Mey", "Ney"] },
  { type: "letter",
    letter: "O",
    sound: "**O** short (as in n_o_t or f_o_x)",
    words: [
      ["ⲛⲟⲙⲟⲥ", "No-mos", "law"],
      ["ⲡⲟⲗⲓⲥ", "Po-lis", "city"],
      ["ⲥⲟⲫⲟⲥ", "So-fos", "wise"]
    ] },
  { type: "letter",
    letter: "Seema",
    sound: "**S** (as in _s_ay or la_s_t)",
    words: [
      ["ⲥⲱⲧⲉⲙ", "So-tem", "to hear"],
      ["ⲥ̀ⲛⲁⲩ", "Es-nav", "two"],
      ["ⲁⲛⲁⲥⲧⲁⲥⲓⲥ", "A-na-sta-sis", "resurrection"]
    ] },
  { type: "letter",
    letter: "Tav",
    sound: "**T** (as in _t_alk or _t_rot)",
    note: "In some Greek words it says D (Lesson 2).",
    words: [
      ["ⲧⲁⲕⲧⲟ", "Tak-to", "circle"],
      ["ⲡⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ", "Pres-vi-te-ros", "priest"],
      ["ⲡⲉⲧⲣⲟⲥ", "Pet-ros", "Peter"]
    ] },
  { type: "letter",
    letter: "Omega",
    sound: "**O** long (as in b_o_re or f_oe_)",
    words: [
      ["ϯⲟⲩⲣⲱ", "Ti-ou-ro", "the queen"],
      ["ⲱⲟⲩ", "O-ou", "glory"],
      ["ⲡⲓⲱⲓⲕ", "Pi-oik", "the bread"]
    ] },
  { type: "exercise", title: "Lesson 1 final exercise",
    words: [
      ["ⲧⲁⲟⲥ", "Ta-os"],
      ["ⲥⲱⲕ", "Sok"],
      ["ⲥⲓⲛⲁ", "Si-na", "Sinai"],
      ["ⲛⲉⲙ", "Nem", "and"],
      ["ⲕⲉ", "Ke", "also"],
      ["ⲧⲁⲓ", "Tai", "this"],
      ["ⲁⲙⲱⲓⲛⲓ", "A-moi-ni", "come"],
      ["ⲛⲁⲓ ⲛⲁⲛ", "Nai nan", "have mercy on us"],
      ["ⲃⲁⲕⲓ", "Va-ki", "city"],
      ["ⲍⲱⲟⲛ", "Zo-on", "animal"],
      ["ⲙⲁⲛⲛⲁ", "Man-na", "manna"]
    ] },
  { type: "chart", title: "Lesson 1 done: 12 of 32 letters", newLetters: ["Alpha", "Vita", "Ey", "Zeeta", "Yota", "Kappa", "Mey", "Ney", "O", "Seema", "Tav", "Omega"] },

  // ============================================================
  // LESSON 2
  // ============================================================
  { type: "lesson", number: "02", title: "Lesson 2", subtitle: "Look like English, sound different" },
  { type: "exercise", title: "Review of Lesson 1",
    prompt: "Warm up: read these using only Lesson 1 letters.",
    words: [
      ["ⲃⲁⲧ", "Vat"],
      ["ⲃⲉⲧ", "Vet"],
      ["ⲃⲓⲛ", "Vin"],
      ["ⲓⲉ", "Ye"],
      ["ⲕⲁⲧ", "Kat"],
      ["ⲕⲓⲛ", "Kin"],
      ["ⲕⲓⲧ", "Kit"],
      ["ⲙⲁⲧ", "Mat"],
      ["ⲙⲉⲧ", "Met"],
      ["ⲛⲉⲧ", "Net"],
      ["ⲛⲟⲧ", "Not"],
      ["ⲧⲁⲃ", "Tab"],
      ["ⲧⲁⲛ", "Tan"],
      ["ⲧⲓⲛ", "Tin"],
      ["ⲧⲟⲛ", "Ton"],
      ["ⲍⲓⲧ", "Zit"]
    ] },
  { type: "part", title: "Lesson 2 · Part 1", letters: ["Eeta", "Ro", "Key", "Ti"] },
  { type: "letter",
    letter: "Eeta",
    sound: "**Ee** (as in f_ee_t or sl_ee_p)",
    words: [
      ["ⲙⲱⲩ̀ⲥⲏⲥ", "Mo-ee-sees", "Moses"],
      ["ⲛ̀ϩⲣⲏⲓ", "En-eh-ree", "above"],
      ["ⲙⲉⲑⲙⲏⲓ", "Meth-mee", "truth"]
    ] },
  { type: "letter",
    letter: "Ro",
    sound: "**R** (as in _r_oad or _r_ay)",
    words: [
      ["ⲣⲁϣⲓ", "Ra-shi", "joy"],
      ["ⲡⲉⲕⲑ̀ⲣⲟⲛⲟⲥ", "Pek-eth-ro-nos", "your throne"],
      ["ⲣⲁⲕⲟϯ", "Ra-ko-ti", "Alexandria"]
    ] },
  { type: "letter",
    letter: "Key",
    sound: "**K**, **Kh** or **Sh**",
    note: "Depends on the word (next slide).",
    words: [
      ["ⲭⲁⲕⲓ", "Ka-ki", "darkness"],
      ["ⲭ̀ⲣⲓⲥⲧⲟⲥ", "Ekh-ris-tos", "Christ"],
      ["ⲭⲉⲣⲉ", "She-re", "hail"]
    ] },
  { type: "rule", title: "Key: K, Kh or Sh?",
    intro: "First ask: is the word Coptic or Greek? (See the next slide.)",
    rows: [
      { when: "Coptic word: always K", examples: [["ⲭⲁⲕⲓ", "Ka-ki (darkness)"]] },
      { when: "Greek word, before ⲉ ⲓ ⲏ ⲩ: Sh", examples: [["ⲭⲉⲣⲉ", "She-re (hail)"]] },
      { when: "Greek word, before any other letter: Kh", examples: [["ⲭ̀ⲣⲓⲥⲧⲟⲥ", "Ekh-ris-tos (Christ)"]] }
    ] },
  { type: "columns", title: "Is the word Coptic or Greek?",
    intro: "Many church words come from Greek. Some letters give it away.",
    columns: [
      { heading: "Probably Greek", text: "if it has one of these:", coptic: "ⲅ ⲇ ⲍ ⲝ ⲯ", examples: [["ⲁⲅⲓⲟⲥ", "holy"], ["ⲇⲟⲝⲁ", "glory"]] },
      { heading: "Coptic", text: "if it has one of these:", coptic: "ϣ ϥ ϧ ϫ ϭ ϯ", examples: [["ⲣⲁϣⲓ", "joy"], ["ϧⲉⲛ", "in"]] }
    ],
    footer: "No clue letters? Ask your teacher. You'll soon remember the common words." },
  { type: "rule", title: "Seema and Tav in Greek words",
    intro: "Two sound changes that only happen in words that come from Greek.",
    rows: [
      { when: "Tav right after Ney sounds like D", examples: [["ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ", "Pan-do-kra-tor (Almighty)"]] },
      { when: "Seema right before Mey sounds like Z", examples: [["ⲕⲟⲥⲙⲟⲥ", "Koz-mos (world)"]] },
      { when: "Another example of Seema before Mey", examples: [["ⲡⲗⲁⲥⲙⲁ", "Plaz-ma (creation)"]] }
    ] },
  { type: "letter",
    letter: "Ti",
    sound: "**Ti** (as in _ti_ara or four_tee_n)",
    words: [
      ["ϯⲧ̀ⲣⲓⲁⲥ", "Ti-et-ri-as", "the Trinity"],
      ["ϯⲉⲕⲕⲗⲏⲥⲓⲁ", "Ti-ek-lee-si-a", "the church"],
      ["ϯⲡⲁⲣⲑⲉⲛⲟⲥ", "Ti-par-the-nos", "the Virgin"]
    ] },
  { type: "exercise", title: "Exercise: Part 1",
    words: [
      ["ⲕⲏⲕ", "Keek"],
      ["ⲍⲁⲭⲁⲣⲓⲁⲥ", "Za-kha-ri-as", "Zechariah"],
      ["ⲃⲉⲣⲥⲓⲙ", "Ver-sim", "clover"],
      ["ⲥⲁⲣⲣⲁ", "Sar-ra", "Sarah"],
      ["ⲙⲁⲣⲕⲟⲥ", "Mar-kos", "Mark"]
    ] },
  { type: "part", title: "Lesson 2 · Part 2", letters: ["Fai", "Hori"] },
  { type: "review", title: "Review of Part 1", letters: ["Eeta", "Ro", "Key", "Ti"] },
  { type: "letter",
    letter: "Fai",
    sound: "**F** (as in _f_ish or _f_ull)",
    words: [
      ["ϣⲁϣϥ", "Shashf", "seven"],
      ["ⲡⲉϥⲗⲁⲟⲥ", "Pef-la-os", "his people"],
      ["ϥⲁⲓ", "Fai", "to carry"]
    ] },
  { type: "letter",
    letter: "Hori",
    sound: "**H** (as in _h_ope or _h_int)",
    words: [
      ["ⲉ̀ϩⲟⲟⲩ", "E-ho-ou", "day"],
      ["ⲉ̀ϫⲱⲣϩ", "E-gorh", "night"],
      ["ⲉ̀ⲛⲉϩ", "E-neh", "forever"]
    ] },
  { type: "exercise", title: "Exercise: Part 2",
    words: [
      ["ⲡⲉϥⲣⲁⲛ", "Pef-ran", "his name"],
      ["ϥⲁⲓ", "Fai", "to carry"],
      ["ϩⲏⲧ", "Heet", "heart"],
      ["ⲥⲁϩ", "Sah", "teacher"]
    ] },
  { type: "exercise", title: "Practice: everything so far (1)",
    words: [
      ["ⲧⲱⲛⲕ", "Tonk", "arise"],
      ["ⲓⲱⲧ", "Yot", "father"],
      ["ⲛⲓⲓⲟϯ", "Ni-yo-ti", "the fathers"],
      ["ⲕⲟⲥⲙⲟⲥ", "Koz-mos", "world"],
      ["ⲭ̀ⲣⲓⲥⲧⲓⲁⲛⲟⲥ", "Ekh-ris-ti-a-nos", "Christian"],
      ["ⲭⲏⲙⲓ", "Kee-mi", "Egypt"],
      ["ⲭⲉⲣⲉ", "She-re", "hail"],
      ["ⲙⲁⲣⲓⲁ", "Ma-ri-a", "Mary"],
      ["ϯⲥⲱ", "Ti-so", "I drink"]
    ] },
  { type: "exercise", title: "Practice: everything so far (2)",
    words: [
      ["ⲱⲓⲕ", "Oik", "bread"],
      ["ⲃⲉⲣⲓ", "Ve-ri", "new"],
      ["ⲙⲉⲛⲣⲉ", "Men-re", "to love"],
      ["ⲥⲱⲧⲉⲙ", "So-tem", "to hear"],
      ["ⲥⲱⲙⲁ", "So-ma", "body"],
      ["ϯⲕⲁϯ", "Ti-ka-ti", "to educate"]
    ] },
  { type: "chart", title: "Lesson 2 done: 18 of 32 letters", newLetters: ["Eeta", "Ro", "Key", "Ti", "Fai", "Hori"] },

  // ============================================================
  // LESSON 3
  // ============================================================
  { type: "lesson", number: "03", title: "Lesson 3", subtitle: "Letters with brand-new shapes" },
  { type: "part", title: "Lesson 3 · Part 1", letters: ["Jinkim", "Epsilon", "Delta", "Lola"] },
  { type: "letter", title: "The Jinkim", glyphs: ["ⲙ̀", "ⲁ̀"], highlight: "jinkim",
    sound: "short **E** or a pause",
    note: "Consonant: add \"e\" before it. Vowel: pause.",
    words: [
      ["ⲙ̀ⲙⲟⲛ", "Em-mon", "there is not"],
      ["ⲛ̀ⲑⲟⲕ", "En-thok", "you"],
      ["ⲁ̀ⲛⲟⲕ", "A - nok", "I"]
    ] },
  { type: "letter",
    letter: "Epsilon",
    sound: "**I**, **V** or **Oo**",
    note: "It depends on the letter before it.",
    words: [
      ["ⲉⲩⲭⲏ", "Ev-shee", "prayer"],
      ["ⲙⲁⲣⲧⲩⲣⲟⲥ", "Mar-ti-ros", "martyr"],
      ["ⲫ̀ⲛⲟⲩϯ", "Ef-nou-ti", "God"]
    ] },
  { type: "rule", title: "Epsilon: look at the letter before",
    intro: "Epsilon joins with the vowel in front of it.",
    rows: [
      { when: "ⲁⲩ  sounds like \"av\"  and  ⲉⲩ  sounds like \"ev\"", examples: [["ⲡⲁⲩⲗⲟⲥ", "Pav-los (Paul)"]] },
      { when: "ⲟⲩ  sounds like \"oo\" (as in soup)", examples: [["ⲛⲟⲩϯ", "Nou-ti (God)"]] },
      { when: "Anywhere else it sounds like \"i\" (as in sit)", examples: [["ⲙⲁⲣⲧⲩⲣⲟⲥ", "Mar-ti-ros (martyr)"]] }
    ] },
  { type: "rule", title: "Two vowels together",
    intro: "Most of these only apply to words that come from Greek.",
    rows: [
      { when: "ⲱⲓ  sounds like \"oi\" (as in oil)", examples: [["ⲱⲓⲕ", "Oik (bread)"]] },
      { when: "Greek words: ⲁⲓ sounds like \"e\";  ⲉⲓ and ⲟⲓ sound like \"i\"", examples: [["ⲙⲉⲧⲁⲛⲟⲓⲁ", "Me-ta-ni-a (repentance)"]] },
      { when: "The same vowel twice: say both, stress the second", examples: [["ⲁⲃⲣⲁⲁⲙ", "Ab-ra-am (Abraham)"]] }
    ] },
  { type: "letter",
    letter: "Delta",
    sound: "**Th** / **Z** or **D**",
    note: "D only in names (next slide).",
    words: [
      ["ⲇⲓⲕⲉⲟⲥ", "Zi-ke-os", "righteous"],
      ["ⲇⲟⲝⲁ", "Zox-a", "glory"],
      ["ⲇⲁⲩⲓⲇ", "Da-vid", "David"]
    ] },
  { type: "rule", title: "Delta: Th / Z or D?",
    intro: "Is the word a name, or an ordinary word?",
    rows: [
      { when: "Ordinary words: Th (as in this) or Z", examples: [["ⲇⲟⲝⲁ", "Zox-a (glory)"], ["ⲇⲓⲕⲉⲟⲥ", "Zi-ke-os (righteous)"]] },
      { when: "Names of people and places: D", examples: [["ⲇⲁⲩⲓⲇ", "Da-vid (David)"], ["ⲇⲁⲛⲓⲏⲗ", "Da-ni-eel (Daniel)"]] }
    ] },
  { type: "letter",
    letter: "Lola",
    sound: "**L** (as in _l_ate or fa_l_se)",
    words: [
      ["ⲡⲁⲗⲁⲥ", "Pa-las", "my tongue"],
      ["ⲗⲁⲟⲥ", "La-os", "people"],
      ["ϩⲁⲗⲁϯ", "Ha-la-ti", "birds"]
    ] },
  { type: "exercise", title: "Exercise: Part 1",
    words: [
      ["ⲇⲁⲩⲓⲇ", "Da-vid", "David"],
      ["ⲗⲁⲥ", "Las", "tongue"],
      ["ⲡⲁⲩⲗⲟⲥ", "Pav-los", "Paul"],
      ["ⲗⲟⲩⲕⲁⲥ", "Lou-kas", "Luke"],
      ["ⲇⲁⲛⲓⲏⲗ", "Da-ni-eel", "Daniel"]
    ] },
  { type: "part", title: "Lesson 3 · Part 2", letters: ["Pe", "Phi"] },
  { type: "review", title: "Review of Part 1", letters: ["Epsilon", "Delta", "Lola"] },
  { type: "letter",
    letter: "Pe",
    sound: "**P** (as in _p_lay or ca_p_)",
    words: [
      ["ⲡⲉⲛⲓⲱⲧ", "Pen-yot", "our Father"],
      ["ⲡⲓⲣⲏ", "Pi-ree", "the sun"],
      ["ⲡ̀ⲛⲉⲩⲙⲁ", "Ep-nev-ma", "spirit"]
    ] },
  { type: "letter",
    letter: "Phi",
    sound: "**F** (as in _f_an or _f_ail)",
    words: [
      ["ⲫ̀ⲓⲱⲧ", "Ef-yot", "the Father"],
      ["ⲫ̀ⲣⲁϣⲓ", "Ef-ra-shi", "the joy"],
      ["ⲫ̀ⲓⲟⲙ", "Ef-yom", "the sea"]
    ] },
  { type: "exercise", title: "Exercise: Part 2",
    words: [
      ["ⲡⲉⲛⲓⲱⲧ", "Pen-yot", "our Father"],
      ["ⲇⲉⲥⲡⲟⲧⲁ", "Zes-po-ta", "master"],
      ["ⲫ̀ⲛⲟⲩϯ", "Ef-nou-ti", "God"],
      ["ⲉⲩⲭⲏ", "Ev-shee", "prayer"],
      ["ⲡⲓⲱ̀ⲟⲩ", "Pi-o-ou", "the glory"],
      ["ⲛⲓⲥⲓⲟⲩ", "Ni-si-ou", "the stars"]
    ] },
  { type: "part", title: "Lesson 3 · Part 3", letters: ["Exi", "Epsi"] },
  { type: "letter",
    letter: "Exi",
    sound: "**X** or **Ks** (as in fi_x_)",
    words: [
      ["ⲁⲝⲓⲟⲥ", "Ax-i-os", "worthy"],
      ["ⲝⲉⲛⲟⲥ", "Ex-e-nos", "stranger"],
      ["ⲇⲟⲝⲁ", "Zox-a", "glory"]
    ] },
  { type: "letter",
    letter: "Epsi",
    sound: "**Ps** (as in ma_ps_)",
    words: [
      ["ⲯⲁⲗⲓ", "Psa-li", "hymn of praise"],
      ["ⲯⲩⲭⲏ", "Psi-shee", "soul"],
      ["ⲁⲣⲓⲯⲁⲗⲓⲛ", "A-ri-psa-lin", "let us praise"]
    ] },
  { type: "exercise", title: "Exercise: Part 3",
    words: [
      ["ⲁⲝⲓⲟⲥ", "Ax-i-os", "worthy"],
      ["ⲯⲩⲭⲏ", "Psi-shee", "soul"],
      ["ⲫⲟⲟⲩ", "Fo-ou", "today"],
      ["ⲛⲓⲫⲏⲟⲩⲓ", "Ni-fee-ou-i", "the heavens"]
    ] },
  { type: "part", title: "Lesson 3 · Part 4", letters: ["Khai", "Cheema"] },
  { type: "review", title: "Review of Parts 2 and 3", letters: ["Pe", "Phi", "Exi", "Epsi"] },
  { type: "letter",
    letter: "Khai",
    sound: "**Kh** (a raspy K sound)",
    words: [
      ["ϧⲉⲛ", "Khen", "in"],
      ["ⲥ̀ϧⲁⲓ", "Es-khai", "to write"],
      ["ⲡⲓϧⲣⲱⲟⲩ", "Pi-khro-ou", "the voice"]
    ] },
  { type: "letter",
    letter: "Cheema",
    sound: "**Ch** (as in _ch_urch or _ch_ime)",
    note: "It can sound almost like \"tch\".",
    words: [
      ["ϭ̀ⲣⲟⲙⲡⲓ", "Etch-rom-pi", "dove"],
      ["ⲧⲉⲛϭⲓⲥⲓ", "Ten-chi-si", "we exalt"],
      ["ⲛⲓϭⲏⲡⲓ", "Ni-chee-pi", "the clouds"]
    ] },
  { type: "exercise", title: "Exercise: Part 4 (1)",
    words: [
      ["ϧⲉⲛ", "Khen", "in"],
      ["ⲡ̀ⲱⲛϧ", "Ep-onkh", "the life"],
      ["ⲛⲟϥⲣⲓ", "Nof-ri", "good"],
      ["ϭ̀ⲣⲟⲙⲡⲓ", "Etch-rom-pi", "dove"]
    ] },
  { type: "exercise", title: "Exercise: Part 4 (2)",
    words: [
      ["ϩⲱⲥ", "Hos", "praise"],
      ["ⲡ̀ϧⲏⲃⲥ", "Ep-kheebs", "the lamp"],
      ["ⲡⲓⲟϩ", "Pi-oh", "the moon"],
      ["ϯϩⲓⲣⲏⲛⲏ", "Ti-hi-ree-nee", "the peace"]
    ] },
  { type: "chart", title: "Lesson 3 done: 27 of 32 letters", newLetters: ["Epsilon", "Delta", "Lola", "Pe", "Phi", "Exi", "Epsi", "Khai", "Cheema"] },

  // ============================================================
  // LESSON 4
  // ============================================================
  { type: "lesson", number: "04", title: "Lesson 4", subtitle: "The last five letters" },
  { type: "part", title: "Lesson 4 · Part 1", letters: ["Gamma", "Shai"] },
  { type: "letter",
    letter: "Gamma",
    sound: "**G**, **Gh** or **N**",
    note: "Depends on the next letter (next slide).",
    words: [
      ["ⲁⲅⲅⲉⲗⲟⲥ", "An-ge-los", "angels"],
      ["ⲅⲉⲱⲣⲅⲓⲟⲥ", "Ge-or-gi-os", "George"],
      ["ⲁⲅⲁⲑⲟⲥ", "A-gha-thos", "good"]
    ] },
  { type: "rule", title: "Gamma: G, N or Gh?",
    intro: "Look at the letter right after Ⲅ.",
    rows: [
      { when: "Before ⲉ ⲓ ⲏ ⲩ: G (as in get)", examples: [["ⲁⲅⲓⲟⲥ", "A-gi-os (holy)"]] },
      { when: "Before ⲅ ⲕ ⲝ ⲭ: N (as in sing)", examples: [["ⲁⲅⲅⲉⲗⲟⲥ", "An-ge-los (angels)"]] },
      { when: "Before ⲁ ⲟ ⲱ or other consonants: Gh (no English sound)", examples: [["ⲁⲅⲁⲑⲟⲥ", "A-gha-thos (good)"]] }
    ] },
  { type: "letter",
    letter: "Shai",
    sound: "**Sh** (as in _sh_ip or ru_sh_)",
    words: [
      ["ϣⲟⲩⲣⲏ", "Shou-ree", "censer"],
      ["ⲡ̀ϣⲏⲣⲓ", "Ep-shee-ri", "the Son"],
      ["ϣⲉⲙϣⲓ", "Shem-shi", "to worship"]
    ] },
  { type: "exercise", title: "Exercise: Part 1",
    words: [
      ["ⲁⲅⲓⲟⲥ", "A-gi-os", "holy"],
      ["ⲗⲟⲅⲟⲥ", "Lo-ghos", "word"],
      ["ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ", "Ev-an-ge-li-on", "Gospel"],
      ["ϣⲗⲏⲗ", "Esh-leel", "pray"],
      ["ⲡⲓϣⲁⲓ", "Pi-shai", "the feast"],
      ["ⲣⲁϣⲓ", "Ra-shi", "joy"]
    ] },
  { type: "part", title: "Lesson 4 · Part 2", letters: ["Theta", "Jenja", "So-ou"] },
  { type: "review", title: "Review of Part 1", letters: ["Gamma", "Shai"] },
  { type: "letter",
    letter: "Theta",
    sound: "**Th** (as in _th_in or _th_ought)",
    note: "Sometimes it says T (next slide).",
    words: [
      ["ⲑⲉⲟⲧⲟⲕⲟⲥ", "The-o-to-kos", "Mother of God"],
      ["ⲑ̀ⲣⲟⲛⲟⲥ", "Eth-ro-nos", "throne"],
      ["ⲙⲁⲑⲏⲧⲏⲥ", "Ma-thee-tees", "disciple"]
    ] },
  { type: "rule", title: "Theta: Th or T?",
    intro: "Look at the letter right before Ⲑ.",
    rows: [
      { when: "Usually: soft Th (as in thin)", examples: [["ⲑⲉⲟⲥ", "The-os (God)"]] },
      { when: "Right after ⲧ: T", examples: [["ⲙⲁⲧⲑⲉⲟⲥ", "Mat-te-os (Matthew)"]] },
      { when: "Right after ϣ or ⲥ: T", examples: [["ⲉ̀ϣⲑⲟⲣⲧⲉⲣ", "Esh-tor-ter (trouble)"]] }
    ] },
  { type: "letter",
    letter: "Jenja",
    sound: "**J** or **G** (_j_oy or _g_et)",
    note: "Depends on the next vowel (next slide).",
    words: [
      ["ϫⲉ", "Je", "that"],
      ["ϫⲁϫⲓ", "Ga-ji", "enemy"],
      ["ⲥⲁϫⲓ", "Sa-ji", "word"]
    ] },
  { type: "rule", title: "Jenja: J or G?",
    intro: "Look at the vowel right after Ϫ.",
    rows: [
      { when: "Before ⲁ ⲟ ⲱ: G (as in get)", examples: [["ϫⲱⲙ", "Gom (book)"], ["ϫⲁϫⲓ", "Ga-ji (enemy)"]] },
      { when: "Before ⲉ ⲓ ⲏ ⲩ: J (as in jet)", examples: [["ϫⲉ", "Je (that)"], ["ⲥⲁϫⲓ", "Sa-ji (word)"]] }
    ] },
  { type: "letter",
    letter: "So-ou",
    sound: "**Soo**",
    note: "Not used in words. It is the number 6.",
    words: [
      ["ⲋ", "Soo", "6"],

    ] },
  { type: "exercise", title: "Exercise: Part 2",
    words: [
      ["ⲡⲁⲣⲑⲉⲛⲟⲥ", "Par-the-nos", "virgin"],
      ["ⲉⲑⲟⲩⲁⲃ", "E-tho-wab", "holy"],
      ["ⲙⲉⲑⲙⲏⲓ", "Meth-mee", "truth"],
      ["ϫⲱⲙ", "Gom", "book"],
      ["ϫⲉ", "Je", "that"],
      ["ⲥⲁϫⲓ", "Sa-ji", "word"]
    ] },
  { type: "chart", title: "You know all 32 letters!", newLetters: ["Gamma", "Shai", "Theta", "Jenja", "So-ou"] },

  // ============================================================
  // REVIEW
  // ============================================================
  { type: "lesson", number: "05", title: "Review", subtitle: "Put it all together" },
  { type: "writeit", title: "Final practice: write it in English",
    words: [
      ["ϣⲁϣϥ", "Shashf", "seven"],
      ["ⲡⲉⲕⲣⲁⲛ", "Pek-ran", "your name"],
      ["ⲡ̀ⲛⲉⲩⲙⲁ", "Ep-nev-ma", "spirit"],
      ["ⲭ̀ⲗⲟⲙ", "Ek-lom", "crown"]
    ] },
];
