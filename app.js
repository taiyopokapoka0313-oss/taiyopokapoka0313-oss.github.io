(function () {
  var S = window.SITE || {};

  // ---- お問い合わせ：Googleフォーム／メール／X のボタン ----
  var subject = encodeURIComponent("【アプリのお問い合わせ】");
  var body = encodeURIComponent("アプリ名：\n端末（例：iPhone 15）：\niOSのバージョン：\n\nお問い合わせ内容：\n");
  var mailBtn = document.getElementById("mail-btn");
  if (S.email) {
    mailBtn.href = "mailto:" + S.email + "?subject=" + subject + "&body=" + body;
  }

  // フォームのボタン。アプリのお問い合わせボタンから来たとき（?app=qc3&target=品質保証 1/27&info=…）は、フォームに自動入力する
  var formBtn = document.getElementById("form-btn");
  if (S.formBase) {
    var q = new URLSearchParams(location.search);
    var f = new URLSearchParams();
    var E = S.formEntries || {};
    var appText = (S.formApps || {})[q.get("app")];
    if (appText && E.app) { f.set("entry." + E.app, appText); }
    if (q.get("target") && E.target) { f.set("entry." + E.target, q.get("target")); }
    if (q.get("info") && E.info) { f.set("entry." + E.info, q.get("info")); }
    var qs = f.toString();
    formBtn.href = S.formBase + (qs ? "?usp=pp_url&" + qs : "");
    formBtn.hidden = false;
    if (appText) { document.getElementById("contact").scrollIntoView(); }
  } else {
    mailBtn.classList.remove("ghost");
  }

  // ---- X（旧Twitter）：URLが設定されているときだけ表示 ----
  var xBtn = document.getElementById("x-btn");
  if (S.x) {
    xBtn.href = S.x;
    xBtn.hidden = false;
  }

  // ---- App Store リンク（URLが空なら、グレーで押せない表示のまま） ----
  var storeLinks = document.querySelectorAll("[data-store]");
  for (var i = 0; i < storeLinks.length; i++) {
    var url = (S.stores || {})[storeLinks[i].getAttribute("data-store")];
    if (url) {
      storeLinks[i].href = url;
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
