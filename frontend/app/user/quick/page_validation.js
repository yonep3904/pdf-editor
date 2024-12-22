export function validatePageString(input) {
  // スペースを無視するために削除
  input = input.replace(/\s+/g, '');
  
  // カンマで区切った各要素をチェック
  const items = input.split(',');
  
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
