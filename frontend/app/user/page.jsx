import React from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/card";

function UserPage() {
  const navList = [
    {
      href: "/login",
      label: "ログイン",
    },
    {
      href: "/user",
      label: "ホーム",
    },
  ];
  return (
    <>
      <Header navList={navList} />
      <h1>編集方法を選択</h1>

      <ul className="flex justify-center">
        <Card
          title="クイック操作"
          text="簡単なPDFファイルの編集を素早く行います"
          image="/scs.png"
          link="/user/quick"
        />
        <Card
          title="カスタム操作"
          text="PDFファイルの詳細な編集を行います"
          image="/scs.png"
          link="/user/customize"
        />
      </ul>
    </>
  );
}

export default UserPage;
