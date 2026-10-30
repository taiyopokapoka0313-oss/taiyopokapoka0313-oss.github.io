// 多言語（日本語／English／한국어／Français）の辞書と切り替え。
// ・文章は index.html に日本語で直接書いてある（JSが動かなくても読める）。ここには各言語の訳を持つ。
// ・index.html の data-i18n="キー"（中身を置き換え）／data-i18n-alt／data-i18n-aria／data-i18n-title で対応づける。
// ・言語の決まり方：URLの ?lang=en|ko|fr|ja ＞ 前に選んだ言語（このブラウザに保存）＞ ブラウザの言語 ＞ 日本語
(function () {
  var LANGS = ["ja", "en", "ko", "fr"];
  var NAMES = { ja: "日本語", en: "English", ko: "한국어", fr: "Français" };
  // FaceUP の App Store ページを、その言語の国のストアで開く
  var STORE_CC = { ja: "jp", en: "us", ko: "kr", fr: "fr" };

  var D = {
    ja: {
      title: "Outumn apps｜サポート",
      desc: "FaceUP（小顔トレーニング）と toppa シリーズ（資格勉強アプリ）のサポートページ。よくある質問・お問い合わせ・アプリ紹介。",
      langLabel: "言語",
      navApps: "アプリ", navFaq: "よくある質問", navContact: "お問い合わせ",
      heroTitle: "小さな習慣を、<br>大きな実りに。",
      appsTitle: "アプリ紹介",
      tagFace: "小顔・顔トレ",
      faceupIcon: "FaceUP のアイコン",
      badgeAlt: "App Storeからダウンロード",
      faqTitle: "よくある質問",
      q1: "アカウント登録やログインは必要ですか？",
      a1: "いいえ、必要ありません。どのアプリも登録なしですぐに使えます。",
      contactTitle: "お問い合わせ",
      mail: "メール", xBtn: "Xでメッセージを送る",
      privacy: "プライバシーポリシー",
      mailSubject: "【アプリのお問い合わせ】",
      mailBody: "アプリ名：\n端末（例：iPhone 15）：\niOSのバージョン：\n\nお問い合わせ内容：\n"
    },
    en: {
      title: "Outumn apps | Support",
      desc: "Support for FaceUP (face training) and the toppa series (study apps for certification exams): FAQ, contact and app info.",
      langLabel: "Language",
      navApps: "Apps", navFaq: "FAQ", navContact: "Contact",
      heroTitle: "Small habits,<br>big harvests.",
      appsTitle: "Our apps",
      tagFace: "Face training",
      faceupIcon: "FaceUP icon",
      badgeAlt: "Download on the App Store",
      faqTitle: "Frequently asked questions",
      q1: "Do I need an account or to log in?",
      a1: "No. Every app works right away, with no sign-up.",
      contactTitle: "Contact us",
      mail: "Email", xBtn: "Message us on X",
      privacy: "Privacy Policy",
      mailSubject: "[App inquiry]",
      mailBody: "App name:\nDevice (e.g. iPhone 15):\niOS version:\n\nYour message:\n"
    },
    ko: {
      title: "Outumn apps | 고객 지원",
      desc: "FaceUP(얼굴 트레이닝)과 toppa 시리즈(자격시험 공부 앱)의 고객 지원 페이지예요. 자주 묻는 질문, 문의, 앱 소개를 볼 수 있어요.",
      langLabel: "언어",
      navApps: "앱", navFaq: "자주 묻는 질문", navContact: "문의하기",
      heroTitle: "작은 습관이<br>큰 결실이 되도록.",
      appsTitle: "앱 소개",
      tagFace: "얼굴 트레이닝",
      faceupIcon: "FaceUP 아이콘",
      badgeAlt: "App Store에서 다운로드",
      faqTitle: "자주 묻는 질문",
      q1: "계정 등록이나 로그인이 필요한가요?",
      a1: "아니요, 필요 없어요. 모든 앱을 가입 없이 바로 쓸 수 있어요.",
      contactTitle: "문의하기",
      mail: "이메일", xBtn: "X로 메시지 보내기",
      privacy: "개인정보 처리방침",
      mailSubject: "[앱 문의]",
      mailBody: "앱 이름:\n기기(예: iPhone 15):\niOS 버전:\n\n문의 내용:\n"
    },
    fr: {
      title: "Outumn apps | Assistance",
      desc: "Assistance pour FaceUP (entraînement du visage) et la série toppa (applis de révision pour examens) : FAQ, contact et présentation des applis.",
      langLabel: "Langue",
      navApps: "Applis", navFaq: "FAQ", navContact: "Contact",
      heroTitle: "De petites habitudes,<br>de belles récoltes.",
      appsTitle: "Nos applis",
      tagFace: "Entraînement du visage",
      faceupIcon: "Icône de FaceUP",
      badgeAlt: "Télécharger dans l'App Store",
      faqTitle: "Questions fréquentes",
      q1: "Faut-il créer un compte ou se connecter ?",
      a1: "Non, pas du tout. Toutes nos applis s'utilisent tout de suite, sans inscription.",
      contactTitle: "Nous contacter",
      mail: "E-mail", xBtn: "Nous écrire sur X",
      privacy: "Politique de confidentialité",
      mailSubject: "[Question sur une appli]",
      mailBody: "Nom de l'appli :\nAppareil (ex. iPhone 15) :\nVersion d'iOS :\n\nVotre message :\n"
    }
  };

  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && D[q]) { return q; }
    try { var s = localStorage.getItem("lang"); if (s && D[s]) { return s; } } catch (e) {}
    var nav = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "ja"]);
    for (var i = 0; i < nav.length; i++) {
      var p = String(nav[i]).slice(0, 2).toLowerCase();
      if (D[p]) { return p; }
    }
    return "ja";
  }

  var cur = "ja";

  function t(key) { return (D[cur] && D[cur][key] !== undefined) ? D[cur][key] : D.ja[key]; }

  function each(attr, fn) {
    var els = document.querySelectorAll("[" + attr + "]");
    for (var i = 0; i < els.length; i++) { fn(els[i], els[i].getAttribute(attr)); }
  }

  function apply(lang, save) {
    if (!D[lang]) { lang = "ja"; }
    cur = lang;
    document.documentElement.lang = lang;
    document.title = t("title");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) { meta.setAttribute("content", t("desc")); }
    each("data-i18n", function (el, k) { el.innerHTML = t(k); });
    each("data-i18n-alt", function (el, k) { el.setAttribute("alt", t(k)); });
    each("data-i18n-aria", function (el, k) { el.setAttribute("aria-label", t(k)); });
    // App Store の公式バッジは言語ごとのファイル（assets/badges/appstore-<言語>.svg）。無い言語は日本語版のまま
    var badges = document.querySelectorAll("img[data-badge]");
    for (var b = 0; b < badges.length; b++) {
      (function (img) {
        var want = "assets/badges/appstore-" + lang + ".svg";
        img.onerror = function () { img.onerror = null; img.src = "assets/badges/appstore-ja.svg"; };
        img.src = want;
      })(badges[b]);
    }
    // 選択中の言語の表示
    var label = document.getElementById("lang-current");
    if (label) { label.textContent = NAMES[lang]; }
    var items = document.querySelectorAll("#lang-menu [data-lang]");
    for (var i = 0; i < items.length; i++) {
      var on = items[i].getAttribute("data-lang") === lang;
      items[i].setAttribute("aria-current", on ? "true" : "false");
    }
    if (save) {
      try { localStorage.setItem("lang", lang); } catch (e) {}
      // URLの ?lang=… も選んだ言語に合わせる（残したままだと、再読み込みで元の言語に戻るため）。ほかの ?app=… などはそのまま
      try {
        var u = new URL(location.href);
        if (u.searchParams.has("lang")) { u.searchParams.set("lang", lang); history.replaceState(null, "", u.toString()); }
      } catch (e) {}
    }
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function init() {
    // 言語メニュー（<details>）：選んだら閉じる／外側をタップしても閉じる
    var menu = document.getElementById("lang-menu");
    var box = document.getElementById("lang-box");
    if (menu && box) {
      for (var i = 0; i < LANGS.length; i++) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("data-lang", LANGS[i]);
        btn.setAttribute("lang", LANGS[i]);
        btn.textContent = NAMES[LANGS[i]];
        li.appendChild(btn);
        menu.appendChild(li);
      }
      menu.addEventListener("click", function (e) {
        var b = e.target.closest("[data-lang]");
        if (!b) { return; }
        apply(b.getAttribute("data-lang"), true);
        box.removeAttribute("open");
      });
      document.addEventListener("click", function (e) { if (!box.contains(e.target)) { box.removeAttribute("open"); } });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") { box.removeAttribute("open"); } });
    }
    apply(pick(), false);
  }

  window.I18N = { t: t, lang: function () { return cur; }, storeCountry: function () { return STORE_CC[cur] || "jp"; }, apply: apply };

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();
