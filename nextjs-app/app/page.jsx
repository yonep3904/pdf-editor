"use client";

import React, { useRef, useEffect } from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import EditorContainer from "@/components/edit_form/editor_container";
import editorList from "@/app/editor_list";
import Footer from "@/components/footer";

const navList = [
  {
    href: "/login",
    label: "ログイン",
  },
  {
    href: "/user",
    label: "ホーム",
  },
  {
    href: "/user",
    label: "編集",
  },
];

function MainPage() {
  // 各セクション内のコンテンツごとに ref を生成
  const refList = editorList.map((section) =>
    section.contents.map(() => useRef(null))
  );

  return (
    <>
      <Header navList={navList} />
      <Sidebar sectionList={editorList} refList={refList} />
      <EditorContainer sectionList={editorList} refList={refList} />
      <Footer copyrights={["aaaaa", "aaabaa"]} />
    </>
  );
}

export default MainPage;
