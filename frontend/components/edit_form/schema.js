import * as yup from "yup";

function validatePages(input) {
  // スペースを無視するために削除
  input = input.replace(/\s+/g, "");

  // カンマで区切った各要素をチェック
  const items = input.split(",");

  // 正規表現で個々の要素をチェック
  const singlePagePattern = /^\d+$/; // 単一の数字
  const rangePattern = /^(\d+)-(\d+)$/; // 範囲形式

  for (const item of items) {
    if (!item) continue; // 空の要素は無視（末尾カンマなど）

    if (singlePagePattern.test(item)) {
      // 単一の数字形式は問題なし
      continue;
    } else if (rangePattern.test(item)) {
      // 範囲形式の場合、XX <= YY を確認
      const [_, start, end] = item.match(rangePattern);
      if (parseInt(start, 10) > parseInt(end, 10)) {
        return false;
      }
    } else {
      // その他の形式は無効
      return false;
    }
  }
  return true; // 全てのチェックを通過
}

const createSchema = (fields) => {
  const shape = {};

  if (fields.includes("files")) {
    shape.files = yup
      .array()
      .min(1, "少なくとも1つのファイルを選択してください")
      .required("ファイルは必須です")
      .nullable();
  }

  if (fields.includes("pages")) {
    shape.pages = yup
      .string()
      .required("ページ番号を入力してください")
      .max(100, "100文字以内で入力してください")
      .test(
        "formatValidation",
        "ページ指定の形式が正しくありません",
        validatePages
      )
      .nullable();
  }

  if (fields.includes("angle")) {
    shape.angle = yup
      .string()
      .required("回転方向を選択してください")
      .oneOf(["0", "1", "2", "3"], "選択肢から選んでください")
      .transform((value) => {
        switch (value) {
          case "右に90°":
            return "1";
          case "180°":
            return "2";
          case "左に90°":
            return "3";
        }
      })
      .nullable();
  }

  if (fields.includes("format")) {
    shape.format = yup
      .string()
      .required("形式を選択してください")
      .oneOf([".png", ".jpg", ".bmp", ".tiff"], "選択肢から選んでください")
      .nullable();
  }

  return yup.object().shape(shape);
};

export default createSchema;
