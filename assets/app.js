/* =====================================================================
   Website player: draws the slides, handles clicks/keys, the lesson
   menu, full screen and the "Download PowerPoint" button.
   No need to edit this file.
   ===================================================================== */
(function () {
  "use strict";
  var D = window.CopticDeck, PX = 100, PT = 100 / 72;
  var stage = document.getElementById("stage");

  function fail(msg) {
    document.getElementById("error").hidden = false;
    document.getElementById("errorText").textContent = msg;
  }
  if (typeof window.SLIDES === "undefined" || typeof window.ALPHABET === "undefined") {
    fail("slides.js didn't load. This usually means a typo in the last change: a missing comma between slides, or a missing quote or bracket. Undo that change on GitHub (History → the previous version) or fix the typo, then refresh.");
    return;
  }
  var built;
  try { built = D.build(window.ALPHABET, window.SLIDES); }
  catch (e) { fail(e.message); return; }

  // Coptic font, built into fonts.js so it works even without internet
  try {
    var ff = new FontFace("CS Avva Shenouda", "url(data:font/ttf;base64," + window.FONT_DATA.webCoptic + ")");
    document.fonts.add(ff); ff.load();
  } catch (e) {}

  /* ---------------------------------------------------------------- draw */
  function esc(t) { var d = document.createElement("span"); d.textContent = t; return d.innerHTML; }
  function box(e) { return "left:" + e.x * PX + "px;top:" + e.y * PX + "px;width:" + e.w * PX + "px;height:" + e.h * PX + "px"; }
  function fragAttr(e) { return e.frag ? ' data-f="' + e.frag + '"' : ""; }
  function fragCls(e) { return e.frag ? (" frag" + (e.exit ? " exit" : "")) : ""; }
  function runHtml(r) {
    var st = "font-size:" + (r.size * PT).toFixed(1) + "px;color:#" + r.color;
    if (r.bold && r.font !== "c") st += ";font-weight:700";
    if (r.italic) st += ";font-style:italic";
    if (r.u) st += ";text-decoration:underline";
    var text = r.font === "c" ? D.toKeys(r.t) : r.t;
    return '<span class="' + r.font + '" style="' + st + '">' + esc(text) + "</span>";
  }
  function elHtml(e) {
    if (e.kind === "text") {
      var paras = e.paras.map(function (p) { return '<p style="text-align:' + p.align + '">' + p.runs.map(runHtml).join("") + "</p>"; }).join("");
      var jc = e.valign === "middle" ? "center" : e.valign === "bottom" ? "flex-end" : "flex-start";
      return '<div class="el txt' + fragCls(e) + '"' + fragAttr(e) + ' style="' + box(e) + ";justify-content:" + jc + (e.pad === 0 ? ";padding:0" : "") + '">' + paras + "</div>";
    }
    if (e.kind === "image") return '<div class="el pic' + fragCls(e) + '"' + fragAttr(e) + ' style="' + box(e) + '"><img alt="" src="' + e.src + '"></div>';
    var st = box(e) + ";background:#" + (e.fill || "FFFFFF");
    if (e.kind === "oval") st += ";border-radius:50%";
    if (e.kind === "rect" && e.radius) st += ";border-radius:" + e.radius * PX + "px";
    if (e.line) st += ";border:1px solid #" + e.line;
    var cls = e.kind === "arrow" ? "arrow" : (e.shadow ? "card" : "");
    return '<div class="el ' + cls + fragCls(e) + '"' + fragAttr(e) + ' style="' + st + '"></div>';
  }
  stage.innerHTML = built.map(function (s, i) {
    return '<section class="slide" hidden data-i="' + i + '" aria-label="' + esc(s.label) + '">' + s.els.map(elHtml).join("") + "</section>";
  }).join("");
  var slides = Array.prototype.slice.call(stage.querySelectorAll(".slide"));

  /* ---------------------------------------------------------------- navigation */
  var cur = -1, step = 0;
  function fit() { stage.style.transform = "translate(-50%, -50%) scale(" + Math.min(innerWidth / 1000, innerHeight / 562.5) + ")"; }
  addEventListener("resize", fit); fit();
  function setStep(el, n) {
    Array.prototype.forEach.call(el.querySelectorAll(".frag"), function (f) { f.classList.toggle("on", +f.getAttribute("data-f") <= n); });
  }
  function show(i, atEnd, back) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (cur >= 0) slides[cur].hidden = true;
    var el = slides[i];
    el.hidden = false; el.classList.remove("enter", "back"); void el.offsetWidth;
    if (cur !== -1 && i !== cur) { el.classList.add("enter"); if (back) el.classList.add("back"); }
    cur = i; step = atEnd ? built[i].frags : 0; setStep(el, step);
    stage.style.backgroundImage = "url(assets/bg/" + built[i].bg + ".jpg)";
    document.getElementById("count").textContent = (i + 1) + " / " + slides.length;
    document.getElementById("progress").style.width = ((i + 1) / slides.length * 100) + "%";
    try { history.replaceState(null, "", "#s" + (i + 1)); } catch (e) {}
    markMenu();
  }
  function next() { if (step < built[cur].frags) { step++; setStep(slides[cur], step); } else if (cur < slides.length - 1) show(cur + 1); }
  function prev() { if (step > 0) { step--; setStep(slides[cur], step); } else if (cur > 0) show(cur - 1, true, true); }

  /* ---------------------------------------------------------------- menu */
  var menu = document.getElementById("menu"), list = document.getElementById("outline");
  built.forEach(function (s, i) {
    var t = s.src.type;
    if (t !== "lesson" && t !== "part" && t !== "title") return;
    var li = document.createElement("li"), a = document.createElement("a");
    a.href = "#s" + (i + 1); a.className = t === "lesson" ? "l0" : "l1"; a.setAttribute("data-i", i);
    a.innerHTML = "<span>" + esc(s.src.title || "") + (t === "lesson" && s.src.subtitle ? " <small>" + esc(s.src.subtitle) + "</small>" : "") + '</span><span class="num">' + (i + 1) + "</span>";
    a.addEventListener("click", function (ev) { ev.preventDefault(); closeMenu(); show(i); });
    li.appendChild(a); list.appendChild(li);
  });
  function markMenu() {
    var best = null;
    Array.prototype.forEach.call(list.querySelectorAll("a"), function (a) { a.classList.remove("cur"); if (+a.getAttribute("data-i") <= cur) best = a; });
    if (best) best.classList.add("cur");
  }
  function openMenu() { menu.hidden = false; var c = list.querySelector(".cur") || list.querySelector("a"); if (c) { c.focus(); c.scrollIntoView({ block: "center" }); } }
  function closeMenu() { menu.hidden = true; }
  menu.addEventListener("click", function (e) { if (e.target === menu) closeMenu(); });

  function fullscreen() {
    var d = document, el = d.documentElement;
    try {
      if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      else (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    } catch (e) {}
  }

  /* ---------------------------------------------------------------- PowerPoint download */
  var toastT;
  function toast(msg, keep) {
    var t = document.getElementById("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); if (!keep) toastT = setTimeout(function () { t.hidden = true; }, 6000);
  }
  function loadScript(src) {
    return new Promise(function (res, rej) { var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  function loadImage(src) {
    return fetch(src).then(function (r) { if (!r.ok) throw new Error(src); return r.blob(); }).then(function (blob) {
      return new Promise(function (res, rej) {
        var fr = new FileReader();
        fr.onload = function () { var im = new Image(); im.onload = function () { res({ data: fr.result, w: im.naturalWidth, h: im.naturalHeight }); }; im.onerror = rej; im.src = fr.result; };
        fr.onerror = rej; fr.readAsDataURL(blob);
      });
    });
  }
  var busy = false;
  function download() {
    if (busy) return;
    if (location.protocol === "file:") { toast("The PowerPoint download works on the website, not from a copy opened on this computer."); return; }
    busy = true; toast("Building the PowerPoint…", true);
    Promise.all([loadScript("assets/lib/jszip.min.js"), loadScript("assets/lib/pptxgen.bundle.js"), loadScript("assets/export.js")]).then(function () {
      return window.CopticExport.exportPptx({ built: built, PptxGenJS: window.PptxGenJS, JSZip: window.JSZip, loadImage: loadImage, fonts: window.FONT_DATA });
    }).then(function (blob) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "Coptic_Alphabet_Lessons.pptx";
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      toast("Downloaded Coptic_Alphabet_Lessons.pptx");
    }).catch(function (e) { toast("Couldn't build the PowerPoint: " + (e && e.message ? e.message : e)); })
      .then(function () { busy = false; });
  }

  /* ---------------------------------------------------------------- controls */
  function btn(id, fn) { document.getElementById(id).addEventListener("click", function (e) { e.stopPropagation(); fn(); }); }
  btn("next", next); btn("prev", prev); btn("menuBtn", openMenu); btn("fsBtn", fullscreen); btn("pptBtn", download);
  document.addEventListener("keydown", function (e) {
    if (!menu.hidden) { if (e.key === "Escape" || e.key === "m" || e.key === "M") { closeMenu(); e.preventDefault(); } return; }
    var k = e.key;
    if (["ArrowRight", "ArrowDown", " ", "PageDown", "Enter", "n", "N"].indexOf(k) >= 0) { next(); e.preventDefault(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace", "p", "P"].indexOf(k) >= 0) { prev(); e.preventDefault(); }
    else if (k === "Home") { show(0); e.preventDefault(); }
    else if (k === "End") { show(slides.length - 1); e.preventDefault(); }
    else if (k === "m" || k === "M") { openMenu(); e.preventDefault(); }
    else if (k === "f" || k === "F") { fullscreen(); e.preventDefault(); }
  });
  var vp = document.getElementById("viewport");
  vp.addEventListener("click", function (e) { if (e.clientX < innerWidth * 0.2) prev(); else next(); });
  var tx = null, ty = null;
  vp.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  vp.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { (dx < 0 ? next : prev)(); e.preventDefault(); }
    tx = null;
  });
  var idleT;
  function wake() {
    document.body.classList.remove("idle"); clearTimeout(idleT);
    idleT = setTimeout(function () { if (menu.hidden) document.body.classList.add("idle"); }, 2500);
  }
  ["mousemove", "touchstart"].forEach(function (ev) { document.addEventListener(ev, wake, { passive: true }); });
  wake();

  window.deck = { show: show, next: next, prev: prev };
  addEventListener("hashchange", function () { var h = /^#s(\d+)$/.exec(location.hash); if (h && +h[1] - 1 !== cur) show(+h[1] - 1); });
  var m = /^#s(\d+)$/.exec(location.hash);
  var start = function () { show(m ? +m[1] - 1 : 0); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start, start); else start();
})();
