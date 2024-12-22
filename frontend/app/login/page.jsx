"use client"; 

import { useState } from 'react';
import Image from "next/image";

import { Header } from '@/components/header';
import { Login } from './components/login';
import styles from './style.module.css';

function LoginPage(props) {
  // モーダルの表示状態
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const navList = [
    {
      href: "/login",
      label: "ログイン"
    }
  ]
  return (
    <>
      <Header navList={navList} />
      <Image src="/login.png" alt="login" width={400} height={300} />
      
      <button onClick={openModal} className={styles.loginButton}>
        ログイン
      </button>
      {isOpen ? <Login closeModal={closeModal}/> : null}
    </>
  );
}

export default LoginPage;

