/* =====================================================================
   Slide engine, shared by the website and the PowerPoint download.
   Each slide type in slides.js is laid out here as a list of shapes
   (positions in inches on a 10 x 5.625 slide). You don't need to edit
   this file to add or change slides.
   ===================================================================== */
(function (root) {
  "use strict";

  var C = { brown: "806860", terra: "C8A591", ink: "40474B", sage: "A0A299", cream: "F2EEE6",
            muted: "7A7A7A", faint: "F7F5F1", faintInk: "C9C6BE", white: "FFFFFF", black: "000000" };
  var FONTS = { h: "Hammersmith One", b: "Manjari", c: "CS Avva Shenouda" };

  /* ---------------------------------------------------------------- Coptic */
  // Unicode Coptic -> CS Avva Shenouda keyboard keys
  var KEYS = {
    "ⲁ":"a","ⲃ":"b","ⲅ":"g","ⲇ":"d","ⲉ":"e","ⲋ":"^","ⲍ":"z","ⲏ":"y","ⲑ":";","ⲓ":"i","ⲕ":"k","ⲗ":"l",
    "ⲙ":"m","ⲛ":"n","ⲝ":"x","ⲟ":"o","ⲡ":"p","ⲣ":"r","ⲥ":"c","ⲧ":"t","ⲩ":"u","ⲫ":"v","ⲭ":",","ⲯ":"'",
    "ⲱ":"w","ϣ":"s","ϥ":"f","ϧ":"q","ϩ":"h","ϫ":"j","ϭ":"[","ϯ":"]",
    "Ⲁ":"A","Ⲃ":"B","Ⲅ":"G","Ⲇ":"D","Ⲉ":"E","Ⲋ":"^","Ⲍ":"Z","Ⲏ":"Y","Ⲑ":":","Ⲓ":"I","Ⲕ":"K","Ⲗ":"L",
    "Ⲙ":"M","Ⲛ":"N","Ⲝ":"X","Ⲟ":"O","Ⲡ":"P","Ⲣ":"R","Ⲥ":"C","Ⲧ":"T","Ⲩ":"U","Ⲫ":"V","Ⲭ":"<","Ⲯ":"\"",
    "Ⲱ":"W","Ϣ":"S","Ϥ":"F","Ϧ":"Q","Ϩ":"H","Ϫ":"J","Ϭ":"{","Ϯ":"}"
  };
  var MARKS = { "̀": "`", "̅": "=" };
  function isCoptic(ch) { var o = ch.charCodeAt(0); return (o >= 0x2C80 && o <= 0x2CFF) || (o >= 0x3E2 && o <= 0x3EF); }
  function clusters(s) {
    var out = [];
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (MARKS[ch] && out.length) out[out.length - 1] += ch; else out.push(ch);
    }
    return out;
  }
  function toKeys(s) {
    return clusters(s).map(function (cl) {
      var base = cl[0], marks = cl.slice(1).split("").map(function (m) { return MARKS[m] || m; }).join("");
      return marks + (KEYS[base] || base);
    }).join("");
  }

  /* ---------------------------------------------------------------- text */
  // run: {t, size, font:'h'|'b'|'c', color, bold, italic, u}
  function R(t, size, o) { var r = { t: t, size: size, font: "b", color: C.ink }; for (var k in o) r[k] = o[k]; return r; }
  // Split text into English and Coptic runs; supports **bold** and _highlight_.
  function rich(text, size, o, copticSize) {
    o = o || {}; var runs = [];
    var parts = String(text).split(/(\*\*[^*]+\*\*|_[^_]+_)/);
    parts.forEach(function (p) {
      if (!p) return;
      var extra = {};
      if (/^\*\*.*\*\*$/.test(p)) { p = p.slice(2, -2); extra.bold = true; }
      else if (/^_.*_$/.test(p)) { p = p.slice(1, -1); extra.color = C.terra; extra.u = true; }
      var buf = "", cop = null;
      function flush() {
        if (!buf) return;
        var r = R(buf, size, o); for (var k in extra) r[k] = extra[k];
        if (cop) { r.font = "c"; r.size = copticSize || size * 1.35; r.italic = false; r.bold = false; }
        runs.push(r); buf = "";
      }
      for (var i = 0; i < p.length; i++) {
        var ch = p[i], c = MARKS[ch] ? cop : (ch === " " ? cop : isCoptic(ch));
        if (cop !== null && c !== cop) flush();
        cop = c; buf += ch;
      }
      flush();
    });
    return runs;
  }
  function coptic(t, size, color) { return R(t, size, { font: "c", color: color || C.ink }); }
  function P(runs, align, o) { var p = { runs: runs, align: align || "left" }; for (var k in o) p[k] = o[k]; return p; }
  function T(x, y, w, h, paras, o) {
    var e = { kind: "text", x: x, y: y, w: w, h: h, paras: paras, valign: "top" };
    for (var k in o) e[k] = o[k]; return e;
  }
  function one(x, y, w, h, runs, align, o) { return T(x, y, w, h, [P(runs, align)], o); }
  function card(x, y, w, h, fill, o) {
    var e = { kind: "rect", x: x, y: y, w: w, h: h, fill: fill || C.cream, radius: Math.min(0.12, Math.min(w, h) / 2), shadow: true };
    for (var k in o) e[k] = o[k]; return e;
  }
  function oval(x, y, w, h, fill) { return { kind: "oval", x: x, y: y, w: w, h: h, fill: fill }; }

  /* ---------------------------------------------------------------- helpers */
  function alphabetIndex(ALPHABET) { var m = {}; ALPHABET.forEach(function (a) { m[a[2]] = a; }); return m; }
  function need(map, name, where) {
    if (!map[name]) throw new Error('Unknown letter "' + name + '" in ' + where + '. It must match a name in ALPHABET.');
    return map[name];
  }
  function title(text, o) {
    o = o || {};
    return one(0.6, o.y || 0.38, 8.8, o.h || 0.78, [R(text, o.size || 26, { font: "h", color: C.ink, bold: true })], "center", { valign: "bottom" });
  }
  function subtitle(text, y) { return one(1.0, y || 1.12, 8.0, 0.36, rich(text, 13, { color: C.muted, italic: true }, 18), "center", {}); }
  function gridDims(n) {
    if (n <= 4) return n === 4 ? [2, 2] : [n, 1];
    if (n <= 6) return [3, 2];
    if (n <= 8) return [4, 2];
    if (n <= 9) return [3, 3];
    if (n <= 12) return [4, 3];
    return [4, 4];
  }

  /* ---------------------------------------------------------------- backgrounds */
  var BG_TITLE_ONLY = ["CUSTOM_11", "CUSTOM_15", "CUSTOM_18", "CUSTOM_12", "CUSTOM_20", "CUSTOM_14", "CUSTOM_21", "CUSTOM_16"];
  var BG_LESSON = ["SECTION_HEADER", "CUSTOM_6", "CUSTOM_8", "CUSTOM_13", "SECTION_HEADER"];
  var BG_PART = ["CUSTOM_32_1", "SECTION_TITLE_AND_DESCRIPTION"];

  /* ---------------------------------------------------------------- layouts */
  var L = {};

  L.title = function (s) {
    return { bg: "TITLE", els: [
      { kind: "image", x: 4.15, y: 0.77, w: 1.7, h: 1.7, src: "assets/cross.png" },
      one(0.9, 2.3, 8.2, 1.2, [R(s.title, 55, { font: "h", color: C.brown, bold: true })], "center", { valign: "bottom" }),
      one(1.4, 3.6, 7.2, 0.5, [R(s.subtitle || "", 15)], "center")
    ] };
  };

  L.lesson = function (s) {
    return { els: [
      one(2.2, 0.95, 5.6, 1.35, [R(s.number || "", 75, { font: "h", color: C.sage, bold: true })], "center", { valign: "bottom" }),
      one(1.2, 2.1, 7.6, 1.35, [R(s.title, 54, { font: "h", color: C.ink, bold: true })], "center", { valign: "middle" }),
      one(1.2, 3.45, 7.6, 0.5, [R(s.subtitle || "", 16, { color: C.brown })], "center")
    ] };
  };

  L.part = function (s, ctx) {
    var els = [one(1.4, 1.2, 7.2, 1.7, [R(s.title, 36, { font: "h", color: C.ink, bold: true })], "center", { valign: "bottom" })];
    var names = s.letters || [], n = names.length, w = 1.25, gap = 0.2, x0 = 5 - (n * w + (n - 1) * gap) / 2;
    names.forEach(function (nm, i) {
      var g, lab = nm;
      if (nm === "Jinkim") g = "ⲙ̀"; else { var a = need(ctx.A, nm, s.title); g = a[0] + a[1]; }
      var x = x0 + i * (w + gap);
      els.push(card(x, 3.05, w, 1.15));
      els.push(one(x, 3.08, w, 0.72, [coptic(g, 30)], "center", { valign: "middle" }));
      els.push(one(x, 3.78, w, 0.35, [R(lab, 12, { bold: true, color: C.brown })], "center"));
    });
    return { els: els };
  };

  L.letter = function (s, ctx) {
    var a = s.letter ? need(ctx.A, s.letter, "a letter slide") : null;
    var name = s.title || (a ? a[2] : "");
    var els = [title(name)], frag = 0;
    var pron = [R("★  ", 16, { color: C.sage }), R("Pronunciation: ", 20)].concat(rich(s.sound || "", 20, {}, 26));
    els.push(one(0.45, 1.28, 5.9, 0.5, pron, "left", { frag: ++frag }));
    var y = 1.95;
    if (s.note) { els.push(one(0.95, 1.74, 5.4, 0.34, rich(s.note, 13, { bold: true, color: C.brown }, 18), "left", { frag: ++frag })); y = 2.18; }
    var targets = {};
    if (s.highlight && s.highlight !== "jinkim") s.highlight.split("").forEach(function (c) { targets[c] = 1; });
    else if (a) { targets[a[0]] = 1; targets[a[1]] = 1; }
    (s.words || []).forEach(function (w) {
      var cl = clusters(w[0]);
      var size = Math.max(26, Math.min(38, Math.floor((5.7 - (w[1].length + (w[2] || "").length + 4) * 0.085) * 72 / (0.62 * cl.length))));
      var runs = [];
      var buf = "", hit = null;
      cl.forEach(function (c) {
        var h = s.highlight === "jinkim" ? c.indexOf("̀") >= 0 : !!targets[c[0]];
        if (hit !== null && h !== hit) { runs.push(coptic(buf, size, hit ? C.brown : C.ink)); buf = ""; }
        hit = h; buf += c;
      });
      if (buf) runs.push(coptic(buf, size, hit ? C.brown : C.ink));
      runs.push(R("  (" + w[1] + (w[2] ? ": " : ""), 14));
      if (w[2]) runs.push(R(w[2], 14, { bold: true, color: C.brown }));
      runs.push(R(")", 14));
      els.push(one(0.95, y, 5.6, 0.62, runs, "left", { valign: "middle", frag: ++frag }));
      y += 0.62;
    });
    if (s.glyphs) {
      els.push(one(6.3, 1.0, 2.6, 1.95, [coptic(s.glyphs[0], 110, C.black)], "center", { valign: "middle" }));
      if (s.glyphs[1]) els.push(one(6.3, 3.0, 2.6, 1.75, [coptic(s.glyphs[1], 96, C.black)], "center", { valign: "middle" }));
    } else if (a) {
      els.push({ kind: "image", x: 6.4, y: 1.05, w: 2.45, h: 1.85, src: "assets/letters/" + a[2] + "-capital.png" });
      els.push({ kind: "image", x: 6.55, y: 3.15, w: 2.15, h: 1.55, src: "assets/letters/" + a[2] + "-small.png" });
    }
    return { bg: "TITLE_AND_BODY", els: els, frags: frag };
  };

  L.rule = function (s) {
    var els = [title(s.title)];
    if (s.intro) els.push(subtitle(s.intro));
    var rows = s.rows || [], n = rows.length, Y0 = 1.55, Y1 = 4.95, gap = 0.15, h = (Y1 - Y0 - (n - 1) * gap) / n;
    rows.forEach(function (row, i) {
      var y = Y0 + i * (h + gap), exs = row.examples || [];
      els.push(card(1.0, y, 8.0, h));
      els.push(oval(1.2, y + h / 2 - 0.22, 0.44, 0.44, C.brown));
      els.push(one(1.2, y + h / 2 - 0.22, 0.44, 0.44, [R(String(i + 1), 14, { bold: true, color: C.white })], "center", { valign: "middle", pad: 0 }));
      els.push(one(1.8, y, 3.5, h, rich(row.when, 15, {}, 22), "left", { valign: "middle" }));
      var ew = 3.5 / Math.max(1, exs.length);
      exs.forEach(function (ex, j) {
        var x = 5.4 + j * ew;
        els.push(one(x, y + 0.02, ew, h * 0.58, [coptic(ex[0], exs.length === 1 ? 32 : 28)], "center", { valign: "bottom" }));
        els.push(one(x, y + h * 0.6, ew, h * 0.38, [R(ex[1], 12, { bold: true, color: C.brown })], "center"));
      });
    });
    return { els: els };
  };

  L.exercise = function (s) {
    var words = s.words || [], els = [title(s.title)];
    els.push(subtitle(s.prompt || "Read each word out loud, then click to check."));
    var d = gridDims(words.length), cols = d[0], rows = d[1];
    var X0 = 1.1, X1 = 8.9, Y0 = 1.55, Y1 = 5.0, gap = 0.15;
    var cw = (X1 - X0 - (cols - 1) * gap) / cols, ch = (Y1 - Y0 - (rows - 1) * gap) / rows;
    var big = ch > 1.5 ? 40 : (ch > 1.0 ? 32 : 24), small = ch > 1.0 ? 13 : 10, frag = 0;
    words.forEach(function (w, i) {
      var r = Math.floor(i / cols), c = i % cols, x = X0 + c * (cw + gap), y = Y0 + r * (ch + gap);
      var n = clusters(w[0]).length, fs = Math.max(16, Math.min(big, Math.floor((cw - 0.2) * 72 / (0.68 * n))));
      els.push(card(x, y, cw, ch));
      els.push(one(x, y + 0.02, cw, ch * 0.58, [coptic(w[0], fs)], "center", { valign: "bottom" }));
      var paras = [P([R(w[1] || "", small, { bold: true, color: C.brown })], "center")];
      if (w[2]) paras.push(P([R(w[2], small - 1, { italic: true, color: C.muted })], "center"));
      els.push(T(x, y + ch * 0.6, cw, ch * 0.38, paras, { frag: ++frag }));
    });
    return { els: els, frags: frag };
  };

  L.review = function (s, ctx) {
    var els = [title(s.title)], names = s.letters || [], n = names.length, w = 1.75, gap = 0.25;
    var x0 = 5 - (n * w + (n - 1) * gap) / 2;
    names.forEach(function (nm, i) {
      var a = need(ctx.A, nm, s.title), x = x0 + i * (w + gap);
      els.push(card(x, 1.45, w, 3.2));
      els.push(one(x, 1.6, w, 1.3, [coptic(a[0] + a[1], 44)], "center", { valign: "middle" }));
      els.push(one(x, 3.05, w, 0.45, [R(a[2], 18, { bold: true, color: C.brown })], "center"));
      els.push(T(x, 3.55, w, 0.9, [P([R("says", 11, { color: C.muted })], "center"), P([R(a[3], 20, { bold: true })], "center")]));
    });
    return { els: els };
  };

  L.chart = function (s, ctx) {
    var els = [title(s.title)], prev = {}, nw = {};
    ctx.learned.forEach(function (n) { prev[n] = 1; });
    (s.newLetters || []).forEach(function (n) { need(ctx.A, n, s.title); nw[n] = 1; ctx.learned.push(n); });
    var X0 = 0.85, Y0 = 1.3, cw = 0.95, chh = 0.78, gap = 0.09;
    ctx.ALPHABET.forEach(function (a, i) {
      var r = Math.floor(i / 8), c = i % 8, x = X0 + c * (cw + gap), y = Y0 + r * (chh + gap), fill, gc, nc;
      if (s.allLetters) { fill = C.cream; gc = C.ink; nc = C.brown; }
      else if (nw[a[2]]) { fill = C.terra; gc = C.ink; nc = C.ink; }
      else if (prev[a[2]]) { fill = C.brown; gc = C.white; nc = C.white; }
      else { fill = C.faint; gc = C.faintInk; nc = C.faintInk; }
      els.push(card(x, y, cw, chh, fill));
      els.push(one(x, y + 0.02, cw, 0.5, [coptic(a[0] + a[1], 20, gc)], "center", { valign: "middle" }));
      els.push(one(x, y + 0.5, cw, 0.26, [R(a[2], 9, { bold: true, color: nc })], "center"));
    });
    var ly = Y0 + 4 * (chh + gap) + 0.05;
    if (s.note) els.push(one(0.85, ly, 8.3, 0.35, [R(s.note, 12, { italic: true, color: C.muted })], "center"));
    else if (!s.allLetters) {
      [[C.terra, "New in this lesson"], [C.brown, "Learned before"], [C.faint, "Still to come"]].forEach(function (it, i) {
        var x = 2.3 + i * 2.0;
        els.push(card(x, ly + 0.08, 0.22, 0.22, it[0], { shadow: false, line: it[0] === C.faint ? "D9D5CC" : null, radius: 0.04 }));
        els.push(one(x + 0.28, ly + 0.02, 1.9, 0.34, [R(it[1], 11)], "left"));
      });
    }
    return { els: els };
  };

  L.steps = function (s) {
    var els = [title(s.title)], st = s.steps || [], n = st.length, w = 2.45, gap = 0.35;
    var x0 = 5 - (n * w + (n - 1) * gap) / 2;
    st.forEach(function (p, i) {
      var x = x0 + i * (w + gap);
      els.push(card(x, 1.5, w, 3.0));
      els.push(oval(x + w / 2 - 0.3, 1.7, 0.6, 0.6, i < n - 1 ? C.terra : C.brown));
      els.push(one(x + w / 2 - 0.3, 1.7, 0.6, 0.6, [R(String(i + 1), 20, { bold: true, color: C.white })], "center", { valign: "middle", pad: 0 }));
      els.push(one(x + 0.15, 2.45, w - 0.3, 0.45, [R(p[0], 18, { bold: true })], "center"));
      els.push(one(x + 0.2, 2.95, w - 0.4, 1.45, rich(p[1], 13), "center"));
      if (i < n - 1) els.push({ kind: "arrow", x: x + w + 0.07, y: 2.85, w: 0.21, h: 0.3, fill: C.sage });
    });
    return { els: els };
  };

  L.stats = function (s) {
    var els = [title(s.title)], st = s.stats || [], n = st.length, w = 2.45, gap = 0.35;
    var x0 = 5 - (n * w + (n - 1) * gap) / 2;
    st.forEach(function (p, i) {
      var x = x0 + i * (w + gap);
      els.push(card(x, 1.45, w, 2.85));
      els.push(one(x, 1.55, w, 0.95, [R(p[0], 54, { bold: true, color: C.brown })], "center", { valign: "middle" }));
      els.push(one(x + 0.15, 2.5, w - 0.3, 0.85, [R(p[1], 13)], "center"));
      if (p[2]) els.push(one(x + 0.1, 3.4, w - 0.2, 0.7, [coptic(p[2], 22, C.brown)], "center", { valign: "middle" }));
    });
    if (s.footer) els.push(one(1.0, 4.45, 8.0, 0.45, [R(s.footer, 18, { bold: true })], "center"));
    return { els: els };
  };

  L.vowels = function (s, ctx) {
    var els = [title(s.title)];
    if (s.intro) els.push(one(1.0, 1.12, 8.0, 0.6, [R(s.intro, 13)], "center"));
    var vs = s.vowels || [], n = vs.length, w = 1.08, gap = 0.12, x0 = 5 - (n * w + (n - 1) * gap) / 2;
    vs.forEach(function (v, i) {
      var a = need(ctx.A, v[0], s.title), x = x0 + i * (w + gap);
      els.push(card(x, 1.95, w, 2.6));
      els.push(one(x, 2.05, w, 0.95, [coptic(a[0] + a[1], 30)], "center", { valign: "middle" }));
      els.push(one(x, 3.05, w, 0.35, [R(a[2], 12, { bold: true, color: C.brown })], "center"));
      els.push(T(x, 3.45, w, 0.95, [P([R(v[1], 18, { bold: true })], "center"), P([R("as in " + v[2], 10, { color: C.muted })], "center")]));
    });
    if (s.footer) els.push(one(1.0, 4.65, 8.0, 0.4, [R(s.footer, 12, { italic: true, color: C.muted })], "center"));
    return { els: els };
  };

  L.columns = function (s) {
    var els = [title(s.title)], cols = s.columns || [], n = cols.length;
    if (s.intro) els.push(subtitle(s.intro));
    var top = s.intro ? 1.55 : 1.45, hh = s.footer ? 3.0 : 3.3;
    var gap = n > 2 ? 0.2 : 0.3, w = Math.min(3.85, (8.0 - (n - 1) * gap) / n), x0 = 5 - (n * w + (n - 1) * gap) / 2;
    cols.forEach(function (c, i) {
      var x = x0 + i * (w + gap), exs = c.examples || [];
      els.push(card(x, top, w, hh));
      els.push(one(x, top + 0.12, w, 0.42, [R(c.heading || "", n > 2 ? 18 : 20, { bold: true, color: C.brown })], "center"));
      if (c.text) els.push(one(x + 0.1, top + 0.56, w - 0.2, exs.length ? 0.3 : 0.75, [R(c.text, exs.length ? 12 : 13, { color: exs.length ? C.muted : C.ink })], "center"));
      if (c.coptic) els.push(one(x + 0.1, top + (exs.length ? 0.85 : 1.4), w - 0.2, exs.length ? 0.75 : 1.7, [coptic(c.coptic, exs.length ? 30 : 22)], "center", { valign: "middle" }));
      var ew = (w - 0.4) / Math.max(1, exs.length);
      exs.forEach(function (ex, j) {
        var ex0 = x + 0.2 + j * ew;
        els.push(one(ex0, top + 1.75, ew, 0.6, [coptic(ex[0], 24)], "center", { valign: "bottom" }));
        els.push(one(ex0, top + 2.35, ew, 0.35, [R(ex[1], 11, { italic: true, color: C.muted })], "center"));
      });
    });
    if (s.footer) els.push(one(1.0, 4.65, 8.0, 0.4, [R(s.footer, 12, { italic: true, color: C.muted })], "center"));
    return { els: els };
  };

  L.image = function (s) {
    return { els: [title(s.title), { kind: "image", x: 0.9, y: 1.3, w: 8.2, h: 3.7, src: s.image }] };
  };

  L.writeit = function (s) {
    var els = [title(s.title)], ws = s.words || [], n = ws.length, Y0 = 1.3, rh = Math.min(0.8, 3.7 / Math.max(1, n)), frag = 0;
    ws.forEach(function (w, i) {
      var y = Y0 + i * rh;
      els.push({ kind: "rect", x: 0.95, y: y, w: 3.04, h: rh, fill: C.terra, line: "BFBCB3" });
      els.push({ kind: "rect", x: 3.99, y: y, w: 4.88, h: rh, fill: C.white, line: "BFBCB3" });
      els.push(one(1.1, y, 2.8, rh, [coptic(w[0], 32)], "left", { valign: "middle" }));
      els.push(one(3.99, y, 4.88, rh, [R("(" + w[1] + (w[2] ? ": " : ""), 20, { bold: true }), R(w[2] || "", 20, { bold: true, color: C.terra }), R(")", 20, { bold: true })], "center", { valign: "middle" }));
      els.push({ kind: "rect", x: 4.1, y: y + 0.1, w: 4.66, h: rh - 0.2, fill: C.white, line: C.terra, frag: ++frag, exit: true });
    });
    return { els: els, frags: frag };
  };

  /* ---------------------------------------------------------------- build all */
  function build(ALPHABET, SLIDES) {
    var ctx = { ALPHABET: ALPHABET, A: alphabetIndex(ALPHABET), learned: [] };
    var cTO = 0, cLesson = 0, cPart = 0, out = [];
    SLIDES.forEach(function (s, i) {
      if (!s) return;
      var f = L[s.type];
      if (!f) throw new Error('Slide ' + (i + 1) + ': unknown type "' + s.type + '".');
      var r;
      try { r = f(s, ctx); }
      catch (e) { throw new Error("Slide " + (i + 1) + (s.title ? ' ("' + s.title + '")' : s.letter ? ' ("' + s.letter + '")' : "") + ": " + e.message); }
      var bg = s.background || r.bg;
      if (!bg) {
        if (s.type === "lesson") bg = BG_LESSON[cLesson++ % BG_LESSON.length];
        else if (s.type === "part") bg = BG_PART[cPart++ % BG_PART.length];
        else bg = BG_TITLE_ONLY[cTO++ % BG_TITLE_ONLY.length];
      }
      out.push({ src: s, bg: bg, els: r.els, frags: r.frags || 0, label: s.title || (s.letter || "Slide " + (i + 1)) });
    });
    return out;
  }

  root.CopticDeck = { build: build, toKeys: toKeys, clusters: clusters, COLORS: C, FONTS: FONTS };
})(typeof window !== "undefined" ? window : globalThis);
