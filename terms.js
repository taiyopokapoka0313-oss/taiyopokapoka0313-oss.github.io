// 免責事項ページ：サイドバー（スマホでは上のタブ）で選んだアプリの文書だけを表示する。
// JSが動かないときは、全アプリの文書が縦に並んだまま読める。
(function () {
  var docs = [].slice.call(document.querySelectorAll(".app-doc"));
  var links = [].slice.call(document.querySelectorAll(".side-nav a"));
  if (!docs.length || !links.length) { return; }
  document.documentElement.classList.add("terms-js");

  // アプリを指定して開いたとき（#toppa-qc2 など）は、ページの先頭を表示する。
  // ブラウザはIDの位置まで自動でスクロールし、上のメニューにアプリ名が隠れるので、行き先が先頭になるように大きな余白を指定する。
  docs.forEach(function (d) { d.style.scrollMarginTop = "2000px"; });

  function show(id, scroll) {
    var found = docs.some(function (d) { return d.id === id; });
    if (!found) { id = docs[0].id; }
    docs.forEach(function (d) { d.hidden = d.id !== id; });
    links.forEach(function (a) {
      var on = a.getAttribute("data-app") === id;
      if (on) {
        a.setAttribute("aria-current", "true");
        // スマホの横並びメニューでは、選んだアプリが見える位置までスクロール
        if (a.parentNode && a.parentNode.scrollWidth > a.parentNode.clientWidth) { a.parentNode.scrollLeft = a.offsetLeft - 16; }
      } else { a.removeAttribute("aria-current"); }
    });
    if (scroll) { window.scrollTo({ top: 0 }); }
    return id;
  }

  // #アプリID（または #アプリID-a3 のような条への直リンク）に対応
  function fromHash() {
    var h = decodeURIComponent(location.hash.replace(/^#/, ""));
    var id = h.replace(/-a\d+$/, "");
    show(id, false);
    if (/-a\d+$/.test(h)) {
      var el = document.getElementById(h);
      if (el) { el.scrollIntoView(); }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });   // 自動のスクロールが先に済んでいた場合の戻し
    }
  }

  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var id = a.getAttribute("data-app");
      history.replaceState(null, "", "#" + id);
      show(id, true);
    });
  });
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
