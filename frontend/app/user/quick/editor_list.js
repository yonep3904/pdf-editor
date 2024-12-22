import { validatePageString } from "./page_validation";

const pageInput = {
  validationMessage: "ページ指定の形式が正しくありません",
  validationFunc: validatePageString,
  label: "ページの指定",
  placeholder: "1, 2-4, 6",
};

export const sections = [
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
        textInput: pageInput,
        apiEndpoint: "/split",
      },
      {
        title: "ページの結合",
        description: "複数のPDFファイルを結合します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: true,
        },
        apiEndpoint: "/marge",
      },
      // {
      //   title: "ページの挿入",
      //   description: "別のPDFのページを挿入します。",
      //   fileUpload: {
      //     accept: { "application/pdf": [".pdf"] },
      //     multiple: true,
      //   },
      //   textInput: pageInput,
      //   apiEndpoint: "/insert",
      // },
      {
        title: "ページの削除",
        description: "指定したページを削除します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        textInput: pageInput,
        apiEndpoint: "/delete",
      },
      {
        title: "ページの抽出",
        description: "指定したページのみを抽出します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        textInput: pageInput,
        apiEndpoint: "/extract",
      },
      {
        title: "ページの回転",
        description: "ページを回転します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        radioInput: {
          label: "回転する向きを選択",
          options: [
            { label: "右に90°", value: 1 },
            { label: "180°", value: 2 },
            { label: "左に90°", value: 3 },
          ],
        },
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
        apiEndpoint: "/extract_text",
      },
      {
        title: "画像の抽出",
        description: "PDFファイルから画像を抽出します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        apiEndpoint: "/extract_image",
      },
      {
        title: "表の抽出",
        description: "PDFファイルから表データを抽出します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        apiEndpoint: "/extract_table",
      },
    ],
  },
  // {
    // title: "PDFに変換する",
    // contents: [
    //   {
    //     title: "テキスト → PDF",
    //     description: "テキストファイルからPDFファイルを作成します。",
    //     fileUpload: {
    //       accept: { "text/plain": [".txt"] },
    //       multiple: false,
    //     },
    //     apiEndpoint: "/transform/text2pdf",
      // },
      // {
      //   title: "Word → PDF",
      //   description: "Wordファイル(.docx)からPDFファイルを作成します。",
      //   fileUpload: {
      //     accept: {
      //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      //         [".docx"],
      //     },
      //     multiple: false,
      //   },
      //   apiEndpoint: "/transform/word2pdf",
      // },
      // {
      //   title: "Excel → PDF",
      //   description: "Excelファイル(.xlsx)からPDFファイルを作成します。",
      //   fileUpload: {
      //     accept: {
      //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      //         [".xlsx"],
      //     },
      //     multiple: false,
      //   },
      //   apiEndpoint: "/api/v1/transform/excel2pdf",
      // },
      // {
      //   title: "PowerPoint → PDF",
      //   description: "PowerPointファイル(.pptx)からPDFファイルを作成します。",
      //   fileUpload: {
      //     accept: {
      //       "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      //         [".pptx"],
      //     },
      //     multiple: false,
      //   },
      //   apiEndpoint: "/api/v1/transform/ppt2pdf",
      // },
  //   ],
  // },
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
        apiEndpoint: "/convert_image",
      },
      {
        title: "PDF → Word",
        description: "PDFファイルからWordファイル(.docx)を作成します。",
        fileUpload: {
          accept: { "application/pdf": [".pdf"] },
          multiple: false,
        },
        apiEndpoint: "/convert_docx",
      },
    ],
  },
];