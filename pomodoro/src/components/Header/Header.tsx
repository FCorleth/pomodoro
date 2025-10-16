import { Timer, Scroll } from "phosphor-react";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src={logo} alt="Logo" />
      <nav className={styles.navbar}>
        <NavLink to="/" title="Timer" className={styles.link}>
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History" className={styles.link}>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </header>
  );
}
