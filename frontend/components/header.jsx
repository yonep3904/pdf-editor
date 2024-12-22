import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

export function Header(props) {
  const { navList } = props;

  return (
    <header className={styles.header}>
      <Image
        src="/logo.png"
        alt="pdf-editor logo"
        className={styles.logo}
        width={150}
        height={40}
        priority
      />
      <nav>
        <ul className={styles.navList}>
          {navList.map((link, index) => {
            const isLast = (index === navList.length - 1);
            return (
              <li key={index} className={styles.navItem}>
                <Link href={link.href}>{link.label}</Link>
                {!isLast && <span>&gt;</span>}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
