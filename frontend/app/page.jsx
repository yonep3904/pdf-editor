"use client";

import React, { useRef } from "react";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { sections } from "./editor_list";
import { QuickEditorContainer } from "@/components/quick_editor_container";
import style from "./style.module.css";

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

function QuickPage() {
  // 各セクション内のコンテンツごとに ref を生成
  const refs = sections.map((section) =>
    section.contents.map(() => useRef(null))
  );

  // コンテンツにジャンプする関数
  const scrollToContent = (sectionIndex, contentIndex) => {
    const targetRef = refs[sectionIndex][contentIndex];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header navList={navList} />
      <Sidebar sections={sections} refs={refs} />
      <div className={style.main}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={style.editorList}>
            <h2>{section.title}</h2>
            <QuickEditorContainer
              editorList={section.contents}
              refList={refs[sectionIndex]}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default QuickPage;
