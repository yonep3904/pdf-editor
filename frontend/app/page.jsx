"use client";

import React, { useRef } from "react";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import EditorContainer from "../components/edit_form/editor_container";
import editorList from "../app/editor_list";
import Footer from "../components/footer";

const navList = [
  // {
  //   href: "/login",
  //   label: "ログイン",
  // },
  // {
  //   href: "/user",
  //   label: "ホーム",
  // },
  // {
  //   href: "/user",
  //   label: "編集",
  // },
];

function MainPage() {
  // 各セクション内のコンテンツごとに ref を生成
  const refList = useRef([]);
  refList.current = editorList.map((section) =>
    section.contents.map(() => React.createRef(null))
  );

  return (
    <>
      <Header navList={navList} />
      <Sidebar sectionList={editorList} refList={refList.current} />
      <EditorContainer sectionList={editorList} refList={refList.current} />
      <Footer />
    </>
  );
}

export default MainPage;
