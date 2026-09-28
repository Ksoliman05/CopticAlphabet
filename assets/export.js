/* =====================================================================
   "Download PowerPoint": turns the built slides into a .pptx with
   the same design, click-by-click reveals, fade transitions and the
   Coptic font packed inside. No need to edit this file.
   ===================================================================== */
(function (root) {
  "use strict";
  var D = root.CopticDeck;

  function runsFor(el) {
    var out = [];
    el.paras.forEach(function (p, pi) {
      p.runs.forEach(function (r, ri) {
        var o = {
          fontFace: D.FONTS[r.font] || D.FONTS.b, fontSize: r.size, color: r.color,
          bold: !!r.bold && r.font !== "c", italic: !!r.italic, align: p.align
        };
        if (r.u) o.underline = { style: "sng" };
        if (ri === p.runs.length - 1 && pi < el.paras.length - 1) o.breakLine = true;
        out.push({ text: r.font === "c" ? D.toKeys(r.t) : r.t, options: o });
      });
    });
    return out;
  }
  function fragName(el) { return el.frag ? "frag-" + el.frag + (el.exit ? "-exit" : "") : undefined; }

  function contain(img, el) {
    var r = Math.min(el.w / img.w, el.h / img.h), w = img.w * r, h = img.h * r;
    return { x: el.x + (el.w - w) / 2, y: el.y + (el.h - h) / 2, w: w, h: h };
  }

  function timingXml(ids) {
    // ids: [[fragNumber, [{id, exit}]], ...] in click order
    var n = 2, clicks = "";
    function id() { return ++n; }
    ids.forEach(function (step) {
      var inner = "";
      step[1].forEach(function (t, k) {
        var tg = '<p:tgtEl><p:spTgt spid="' + t.id + '"/></p:tgtEl>';
        var node = k === 0 ? "clickEffect" : "withEffect";
        var body = t.exit
          ? '<p:animEffect transition="out" filter="fade"><p:cBhvr><p:cTn id="' + id() + '" dur="400"/>' + tg + '</p:cBhvr></p:animEffect>' +
            '<p:set><p:cBhvr><p:cTn id="' + id() + '" dur="1" fill="hold"><p:stCondLst><p:cond delay="399"/></p:stCondLst></p:cTn>' + tg +
            '<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="hidden"/></p:to></p:set>'
          : '<p:set><p:cBhvr><p:cTn id="' + id() + '" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>' + tg +
            '<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>' +
            '<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="' + id() + '" dur="400"/>' + tg + '</p:cBhvr></p:animEffect>';
        inner += '<p:par><p:cTn id="' + id() + '" presetID="10" presetClass="' + (t.exit ? "exit" : "entr") + '" presetSubtype="0" fill="hold" grpId="0" nodeType="' + node + '">' +
                 '<p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>' + body + '</p:childTnLst></p:cTn></p:par>';
      });
      clicks += '<p:par><p:cTn id="' + id() + '" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst>' +
                '<p:par><p:cTn id="' + id() + '" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>' + inner +
                '</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>';
    });
    var bld = "";
    ids.forEach(function (step) { step[1].forEach(function (t) { bld += '<p:bldP spid="' + t.id + '" grpId="0"/>'; }); });
    return '<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>' +
      '<p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>' + clicks + '</p:childTnLst></p:cTn>' +
      '<p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>' +
      '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq>' +
      '</p:childTnLst></p:cTn></p:par></p:tnLst><p:bldLst>' + bld + '</p:bldLst></p:timing>';
  }

  function b64ToBytes(b64) {
    if (typeof atob === "function") { var s = atob(b64), u = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
    return Buffer.from(b64, "base64");
  }

  // opts: { built, PptxGenJS, JSZip, loadImage(src) -> Promise<{data, w, h}>, fonts: FONT_DATA, output: "blob"|"nodebuffer" }
  function exportPptx(opts) {
    var pres = new opts.PptxGenJS();
    pres.layout = "LAYOUT_16x9";
    pres.title = "Coptic Alphabet Lessons";
    var srcs = {};
    opts.built.forEach(function (s) {
      srcs["assets/bg/" + s.bg + ".jpg"] = 1;
      s.els.forEach(function (e) { if (e.kind === "image") srcs[e.src] = 1; });
    });
    var cache = {};
    return Promise.all(Object.keys(srcs).map(function (src) {
      return opts.loadImage(src).then(function (img) { cache[src] = img; }, function () { cache[src] = null; });
    })).then(function () {
      opts.built.forEach(function (s) {
        var slide = pres.addSlide();
        var bg = cache["assets/bg/" + s.bg + ".jpg"];
        if (bg) slide.background = { data: bg.data };
        s.els.forEach(function (e) {
          var name = fragName(e);
          if (e.kind === "text") {
            var o = { x: e.x, y: e.y, w: e.w, h: e.h, valign: e.valign === "middle" ? "middle" : e.valign, margin: e.pad === 0 ? 0 : 3,
                      fit: "none", wrap: true, isTextBox: true };
            if (name) o.objectName = name;
            slide.addText(runsFor(e), o);
          } else if (e.kind === "rect" || e.kind === "oval" || e.kind === "arrow") {
            var shape = e.kind === "oval" ? pres.ShapeType.ellipse : e.kind === "arrow" ? pres.ShapeType.rightArrow
                      : (e.radius ? pres.ShapeType.roundRect : pres.ShapeType.rect);
            var so = { x: e.x, y: e.y, w: e.w, h: e.h, fill: { color: e.fill || "FFFFFF" },
                       line: e.line ? { color: e.line, width: 0.75 } : { type: "none" } };
            if (e.radius && e.kind === "rect") so.rectRadius = e.radius;
            if (e.shadow) so.shadow = { type: "outer", blur: 3, offset: 1.5, angle: 90, color: "40474B", opacity: 0.22 };
            if (name) so.objectName = name;
            slide.addShape(shape, so);
          } else if (e.kind === "image") {
            var img = cache[e.src]; if (!img) return;
            var b = contain(img, e), io = { data: img.data, x: b.x, y: b.y, w: b.w, h: b.h };
            if (name) io.objectName = name;
            slide.addImage(io);
          }
        });
      });
      return pres.write({ outputType: "arraybuffer" });
    }).then(function (buf) {
      return opts.JSZip.loadAsync(buf);
    }).then(function (zip) {
      var jobs = opts.built.map(function (s, i) {
        var path = "ppt/slides/slide" + (i + 1) + ".xml";
        return zip.file(path).async("string").then(function (xml) {
          var groups = {}, re = /<p:cNvPr id="(\d+)" name="frag-(\d+)(-exit)?"/g, m;
          while ((m = re.exec(xml))) { (groups[m[2]] = groups[m[2]] || []).push({ id: m[1], exit: !!m[3] }); }
          var steps = Object.keys(groups).map(Number).sort(function (a, b) { return a - b; }).map(function (k) { return [k, groups[k]]; });
          var extra = '<p:transition spd="med"><p:fade/></p:transition>' + (steps.length ? timingXml(steps) : "");
          xml = xml.replace(/<\/p:sld>\s*$/, extra + "</p:sld>");
          zip.file(path, xml);
        });
      });
      return Promise.all(jobs).then(function () { return zip; });
    }).then(function (zip) {
      // Pack the fonts inside the file so church computers don't need them installed
      var F = opts.fonts || {};
      var list = [["CS Avva Shenouda", "pptCoptic", null], ["Hammersmith One", "pptHammersmith", null], ["Manjari", "pptManjari", "pptManjariBold"]];
      return Promise.all([zip.file("ppt/presentation.xml").async("string"), zip.file("ppt/_rels/presentation.xml.rels").async("string"),
                          zip.file("[Content_Types].xml").async("string")]).then(function (x) {
        var pxml = x[0], rels = x[1], ct = x[2], lst = "", n = 0;
        list.forEach(function (f) {
          if (!F[f[1]]) return;
          var entry = '<p:embeddedFont><p:font typeface="' + f[0] + '" charset="0"/>';
          [[f[1], "regular"], [f[2], "bold"]].forEach(function (v) {
            if (!v[0] || !F[v[0]]) return;
            n++; var rid = "rIdFont" + n, file = "fonts/font" + n + ".fntdata";
            zip.file("ppt/" + file, b64ToBytes(F[v[0]]));
            rels = rels.replace("</Relationships>", '<Relationship Id="' + rid + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/font" Target="' + file + '"/></Relationships>');
            entry += '<p:' + v[1] + ' r:id="' + rid + '"/>';
          });
          lst += entry + "</p:embeddedFont>";
        });
        if (lst) {
          pxml = pxml.replace(/(<p:notesSz[^>]*\/>)/, "$1<p:embeddedFontLst>" + lst + "</p:embeddedFontLst>");
          if (ct.indexOf('Extension="fntdata"') < 0) ct = ct.replace("<Types ", "<Types ").replace(/(<Types[^>]*>)/, '$1<Default Extension="fntdata" ContentType="application/x-fontdata"/>');
        }
        zip.file("ppt/presentation.xml", pxml); zip.file("ppt/_rels/presentation.xml.rels", rels); zip.file("[Content_Types].xml", ct);
        return zip.generateAsync({ type: opts.output || "blob", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      });
    });
  }

  root.CopticExport = { exportPptx: exportPptx };
})(typeof window !== "undefined" ? window : globalThis);
