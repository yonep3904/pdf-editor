import React from "react";
import PropTypes from "prop-types";
import styles from "./footer.module.css";
import constant from "../app/const";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 yonep3904 </p>
      <Link href={constant.github.link}>
        <Image
          src="/github-mark.svg"
          alt="github-mark"
          className={styles.logo}
          width={150}
          height={40}
          priority
        />
        <p>
          {constant.github.name} / {constant.github.repository}
        </p>
      </Link>
    </footer>
  );
};

Footer.propTypes = {
  copyrights: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Footer;
