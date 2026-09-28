# How to edit the slides

Everything on the site comes from one file: **`slides.js`**. Change it, and both the website and the "Download PowerPoint" button pick up the change. You never need to touch `index.html` or anything in `assets/`.

## Making a change on GitHub

1. Open the repository on github.com and click **`slides.js`**, then the pencil icon (Edit).
2. Make your change (examples below).
3. Click **Commit changes…**, write a short note like "Add Lesson 5 exercise", and click **Commit changes**.
4. Wait a minute or two, then refresh the site with **Ctrl+F5** (Cmd+Shift+R on a Mac).

If something is wrong, the site shows a message saying what and where instead of the slides. To undo, open `slides.js` on GitHub, click **History**, open the previous version, and copy it back.

## The rules of the file

- The slides appear in the same order as the entries in `SLIDES`. To move a slide, move its whole `{ ... },` block. To delete one, delete the whole block.
- Every entry starts with `{` and ends with `},`. **Don't forget the comma.** A missing comma or quote is the most common mistake.
- Text goes inside double quotes: `"like this"`. To use a double quote inside the text, write `\"`.
- Lines starting with `//` are notes for you. The site ignores them.

## Typing Coptic

Type real Coptic letters. The site switches them to the CS Avva Shenouda font automatically. The easiest way is to copy letters from the `ALPHABET` list at the top of `slides.js`, or from any existing word.

- **Jinkim:** the mark goes right *after* its letter, as a separate character (U+0300). Copy it from an existing word such as `ⲡ̀ⲛⲉⲩⲙⲁ` or `ⲁ̀ⲛⲟⲕ`.
- **Number bar** (ⲓ̅ⲋ = 16): the bar (U+0305) also goes right after its letter.
- Coptic inside English text (such as in a rule) is detected and shown in the Coptic font automatically.

## Slide types, with copy-paste examples

### A new letter
```js
{ type: "letter",
  letter: "Alpha",
  sound: "**A** (as in f_a_ther)",
  note: "Optional small note under the sound line.",
  words: [
    ["ⲁⲃⲃⲁ", "Av-va", "father"],
    ["ⲁⲙⲱⲓⲛⲓ", "A-moi-ni", "come"],
    ["ⲁⲗⲏⲑⲱⲥ", "A-lee-thos", "truly"]
  ] },
```
- `letter` must be a name from `ALPHABET`. The big letter pictures and the colored letters inside the words are picked automatically.
- In `sound`, `**A**` is bold and `_a_` is the underlined highlight.
- Each word is `[Coptic, reading, meaning]`. Up to 3 fit on a slide.
- Each line appears on its own click.

### Word practice (answers appear one click at a time)
```js
{ type: "exercise", title: "Exercise: Part 1",
  prompt: "Optional line under the title.",
  words: [
    ["ⲍⲁⲍ", "Zaz"],
    ["ⲃⲁⲕⲓ", "Va-ki", "city"]
  ] },
```
The meaning is optional. From 1 to 16 words are laid out in a grid automatically.

### A reading rule
```js
{ type: "rule", title: "Vita: V or B?",
  intro: "Look at the word, then at the letter right after Ⲃ.",
  rows: [
    { when: "In names of people and places, it is always B", examples: [["ⲁⲃⲣⲁⲁⲙ", "Ab-ra-am (Abraham)"]] },
    { when: "In other words, before a vowel, it is V", examples: [["ⲃⲁⲕⲓ", "Va-ki (city)"]] }
  ] },
```
Use 2 or 3 rows, each with 1 or 2 examples.

### Lesson divider and part divider
```js
{ type: "lesson", number: "05", title: "Lesson 5", subtitle: "Reading whole hymns" },
{ type: "part", title: "Lesson 5 · Part 1", letters: ["Alpha", "Vita"] },
```
Lessons and parts are listed in the site's **Lessons** menu automatically. For a part divider with no letters, use `letters: []`.

### Review cards
```js
{ type: "review", title: "Review of Part 1", letters: ["Alpha", "Vita", "Ey", "Zeeta"] },
```
The sound under each letter comes from `ALPHABET`.

### Letter chart ("letters learned so far")
```js
{ type: "chart", title: "Lesson 1 done: 12 of 32 letters", newLetters: ["Alpha", "Vita"] },
```
Letters from earlier charts are counted for you, and the letters in `newLetters` are colored as new. The number in the title is typed by you, so update it if you change which letters a lesson covers.

### "Write it in English" table (answers hidden until clicked)
```js
{ type: "writeit", title: "Final practice: write it in English",
  words: [["ϣⲁϣϥ", "Shashf", "seven"], ["ⲡⲉⲕⲣⲁⲛ", "Pek-ran", "your name"]] },
```

### Others
- `title`: the opening slide. `{ type: "title", title: "...", subtitle: "..." }`
- `steps`: numbered cards with arrows, like "Where does Coptic come from?"
- `stats`: big-number cards, like "Coptic has 32 letters"
- `vowels`: the vowel cards
- `columns`: side-by-side cards, like "Our lessons" and "Coptic or Greek?"
- `image`: a picture with a title. `{ type: "image", title: "...", image: "assets/my-picture.png" }`. Upload the picture into the `assets` folder first.

Copy an existing slide of the same type from `slides.js` and change the words.

## Optional: choose a background

Backgrounds rotate automatically. To pick one for a slide, add `background: "CUSTOM_14"` (any file name in `assets/bg/`, without `.jpg`).
