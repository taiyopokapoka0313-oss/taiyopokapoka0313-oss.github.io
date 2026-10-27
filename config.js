// サイトの設定（ここだけ直せば、ページの中身を触らずに済みます）
window.SITE = {
  // 連絡先メール（公開されます）
  email: "taiyo.pokapoka0313@gmail.com",

  // X（旧Twitter）のアカウントURL。空のままだと、Xのボタンは表示されません。
  // 例：https://x.com/アカウント名
  x: "",

  // Googleフォーム（Outumn お問い合わせ）
  // 空のままだと、フォームの代わりに「メールで問い合わせる」ボタンだけが出ます。
  formBase: "https://docs.google.com/forms/d/e/1FAIpQLSeSgHfXATksR4_wY_g_rnOZcbPqWD85KzazFVULhxweXyMWvg/viewform",

  // フォームの各質問の合言葉（entry.○○）。フォームの質問を作り直したら、ここも直す。
  formEntries: {
    app: "709342254",     // お問い合わせの対象
    target: "1769365592", // 対象の画面・問題番号
    info: "1053881280"    // アプリ情報（自動入力）
  },

  // サイトのURLの ?app=○○ と、フォームの選択肢の対応。
  // 右側は、フォームの選択肢の文字と「完全に同じ」にすること（1文字でも違うと入らない）。
  formApps: {
    faceup: "FaceUP",
    qc3: "QC検定®3級 問題集・一問一答【toppa】",
    qc2: "QC検定®2級 問題集・一問一答【toppa】",
    site: "Webサイト・その他"
  },

  // App Store のリンク（QC3級・QC2級は index.html に直接書いてある。空のものは、グレーで押せない表示になる）
  stores: {
    faceup: "https://apps.apple.com/jp/app/id6790339306"
  }
};
