(function () {
  var S = window.SITE || {};

  // ---- お問い合わせ：Googleフォーム／メール／X のボタン ----
  var I = window.I18N || { t: function (k) { return { mailSubject: "【アプリのお問い合わせ】", mailBody: "アプリ名：\n端末（例：iPhone 15）：\niOSのバージョン：\n\nお問い合わせ内容：\n" }[k]; }, storeCountry: function () { return "jp"; } };
  var mailBtn = document.getElementById("mail-btn");
  // メールの件名・本文の定型文は、表示中の言語に合わせる（言語を切り替えるたびに作り直す）
  function setMail() {
    if (!S.email) { return; }
    mailBtn.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(I.t("mailSubject")) + "&body=" + encodeURIComponent(I.t("mailBody"));
  }
  setMail();

  // フォームのボタン。アプリのお問い合わせボタンから来たとき（?app=qc3&target=品質保証 1/27&info=…）は、フォームに自動入力する。
  // 開くフォームは表示中の言語のもの（無ければ日本語）。toppa（qc3・qc2）は日本語のみなので、いつも日本語フォーム。
  var formBtn = document.getElementById("form-btn");
  var q = new URLSearchParams(location.search);
  var TOPPA = { qc3: 1, qc2: 1 };
  function pickForm() {
    var F = S.forms || {};
    var f = F[I.lang ? I.lang() : "ja"];
    if (TOPPA[q.get("app")] || !f || !f.base) { f = F.ja; }
    return f;
  }
  function setForm() {
    var form = pickForm();
    if (form && form.base) {
      var p = new URLSearchParams();
      var E = form.entries || {};
      var appText = (form.apps || {})[q.get("app")];
      if (appText && E.app) { p.set("entry." + E.app, appText); }
      if (q.get("target") && E.target) { p.set("entry." + E.target, q.get("target")); }
      if (q.get("info") && E.info) { p.set("entry." + E.info, q.get("info")); }
      var qs = p.toString();
      formBtn.href = form.base + (qs ? "?usp=pp_url&" + qs : "");
      formBtn.hidden = false;
      mailBtn.classList.add("ghost");
      return appText;
    }
    formBtn.hidden = true;
    mailBtn.classList.remove("ghost");   // フォームが無いときは、メールのボタンを主役にする
    return null;
  }
  if (setForm()) { document.getElementById("contact").scrollIntoView(); }

  // ---- X（旧Twitter）：URLが設定されているときだけ表示 ----
  var xBtn = document.getElementById("x-btn");
  if (S.x) {
    xBtn.href = S.x;
    xBtn.hidden = false;
  }

  // ---- App Store リンク（URLが空なら、グレーで押せない表示のまま） ----
  var storeLinks = document.querySelectorAll("[data-store]");
  // 国別のURL（…/jp/app/…）は、表示中の言語の国のストアで開く（日本語＝jp／English＝us／한국어＝kr／Français＝fr）
  function storeUrl(url) { return url.replace(/apps\.apple\.com\/[a-z]{2}\//, "apps.apple.com/" + I.storeCountry() + "/"); }
  function setStores() {
    for (var j = 0; j < storeLinks.length; j++) {
      var u = (S.stores || {})[storeLinks[j].getAttribute("data-store")];
      if (u) { storeLinks[j].href = storeUrl(u); }
    }
  }
  for (var i = 0; i < storeLinks.length; i++) {
    var url = (S.stores || {})[storeLinks[i].getAttribute("data-store")];
    if (url) {
      storeLinks[i].href = storeUrl(url);
      storeLinks[i].target = "_blank";
      storeLinks[i].rel = "noopener";
    } else {
      // URLがないうちは、公式バッジは出さず、グレーの文字ボタンにする
      storeLinks[i].classList.remove("badge");
      storeLinks[i].classList.add("store", "off");
      storeLinks[i].textContent = "App Store";
      storeLinks[i].setAttribute("aria-disabled", "true");
    }
  }

  document.addEventListener("langchange", function () { setMail(); setStores(); setForm(); });

  // ---- トップのアイコン列を横にループ表示（動きを減らす設定の人は、そのまま中央に並べる） ----
  var hi = document.querySelector(".hero-icons");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hi && !reduce) {
    var icons = [].slice.call(hi.children);
    var group = document.createElement("div");
    group.className = "hi-group";
    for (var n = 0; n < icons.length; n++) { group.appendChild(icons[n].cloneNode(true)); }
    var track = document.createElement("div");
    track.className = "hi-track";
    track.appendChild(group);
    track.appendChild(group.cloneNode(true));
    track.appendChild(group.cloneNode(true));
    hi.textContent = "";
    hi.appendChild(track);
    hi.classList.add("loop");
  }
})();
