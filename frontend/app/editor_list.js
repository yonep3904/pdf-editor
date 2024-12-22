const editorList = [
  {
    title: "ページの編集",
    contents: [
      {
        title: "ページの分割",
        description:
          "複数のページからなるPDFファイルを1ページずつに分割します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [],
        apiEndpoint: "/split",
      },
      {
        title: "ページの結合",
        description: "複数のPDFファイルを結合します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: true,
        },
        params: [],
        apiEndpoint: "/marge",
      },
      {
        title: "ページの削除",
        description: "指定したページを削除します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [["pages", "pages"]],
        apiEndpoint: "/delete",
      },
      {
        title: "ページの抽出",
        description: "指定したページのみを抽出します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [["pages", "pages"]],
        apiEndpoint: "/extract",
      },
      {
        title: "ページの回転",
        description: "ページを回転します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [["pages", "pages"]],
        apiEndpoint: "/rotate",
      },
    ],
  },
  {
    title: "コンテンツの抽出",
    contents: [
      {
        title: "テキストの抽出",
        description: "PDFファイルからテキストを抽出します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [],
        apiEndpoint: "/extract_text",
      },
      {
        title: "画像の抽出",
        description: "PDFファイルから画像を抽出します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [],
        apiEndpoint: "/extract_image",
      },
      {
        title: "表の抽出",
        description: "PDFファイルから表データを抽出します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [],
        apiEndpoint: "/extract_table",
      },
    ],
  },
  {
    title: "PDFから変換する",
    contents: [
      {
        title: "PDF → 画像",
        description: "PDFファイルから画像ファイルを作成します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [],
        apiEndpoint: "/convert_image",
      },
      {
        title: "PDF → Word",
        description: "PDFファイルからWordファイル(.docx)を作成します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        params: [],
        apiEndpoint: "/convert_docx",
      },
    ],
  },
];

export default editorList;
