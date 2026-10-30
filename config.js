// サイトの設定（ここだけ直せば、ページの中身を触らずに済みます）
window.SITE = {
  // 連絡先メール（公開されます）
  email: "taiyo.pokapoka0313@gmail.com",

  // X（旧Twitter）のアカウントURL。空のままだと、Xのボタンは表示されません。
  // 例：https://x.com/アカウント名
  x: "",

  // Googleフォーム（Outumn お問い合わせ）。言語ごとに1つずつ持てる（ja／en／ko／fr）。
  // ・base が空の言語は、日本語フォームを開く。base が全部空なら、フォームの代わりに「メールで問い合わせる」ボタンだけが出る。
  // ・entries：フォームの各質問の合言葉（entry.○○）。フォームの質問を作り直したら、ここも直す。
  //   （フォームの「事前入力したURLを取得」で出るURLの entry.数字 を見る）
  // ・apps：サイトのURLの ?app=○○ と、そのフォームの選択肢の対応。右側は、フォームの選択肢の文字と「完全に同じ」にすること（1文字でも違うと入らない）。
  // ・toppaのアプリ（qc3・qc2）からの問い合わせは、言語に関わらず日本語フォームを開く（toppaは日本語のみのため）。
  forms: {
    ja: {
      base: "https://docs.google.com/forms/d/e/1FAIpQLSeSgHfXATksR4_wY_g_rnOZcbPqWD85KzazFVULhxweXyMWvg/viewform",
      entries: {
        app: "709342254",     // お問い合わせの対象
        target: "1769365592", // 対象の画面・問題番号
        info: "1053881280"    // アプリ情報（自動入力）
      },
      apps: {
        faceup: "FaceUP",
        qc3: "QC検定®3級 問題集・一問一答【toppa】",
        qc2: "QC検定®2級 問題集・一問一答【toppa】",
        site: "Webサイト・その他"
      }
    },
    // 英語・韓国語・フランス語のフォームは日本語フォームのコピーなので、entries の番号は同じ。apps は各フォームの選択肢の文字と一字一句そろえる
    en: {
      base: "https://docs.google.com/forms/d/e/1FAIpQLScFj1T4ASPsVcHk48pq39AgdqxnUBPMKQPOGi6O9v3zYvReDQ/viewform",
      entries: { app: "709342254", target: "1769365592", info: "1053881280" },
      apps: { faceup: "FaceUP", site: "Website / Other" }
    },
    ko: {
      base: "https://docs.google.com/forms/d/e/1FAIpQLScAXYOXVJBeHmncP4KAcOpdFR52fDwG5aicsAWuiMya5xJjMg/viewform",
      entries: { app: "709342254", target: "1769365592", info: "1053881280" },
      apps: { faceup: "FaceUP", site: "웹사이트 · 기타" }
    },
    fr: {
      base: "https://docs.google.com/forms/d/e/1FAIpQLSd1FwGfSnlIjckLEG21dAdq_Jo1CW0BQr4z3CqMeca8wB8A2A/viewform",
      entries: { app: "709342254", target: "1769365592", info: "1053881280" },
      apps: { faceup: "FaceUP", site: "Site web / Autre" }
    }
  },

  // App Store のリンク（QC3級・QC2級は index.html に直接書いてある。空のものは、グレーで押せない表示になる）
  stores: {
    faceup: "https://apps.apple.com/jp/app/id6790339306"
  }
};
