import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "../assets/logo.svg"

function Navigation() {
  return (
    <>
        <main className={styles.app}>
            <nav>
                <img src={logo} className={styles.logo} alt="Logo" />
                <ul className={styles.menu}>
                <li>
                    <NavLink href="#" className={styles.active} to="/">
                        Tracks
                    </NavLink>
                </li>
                <li>
                    <NavLink href="#" className={styles.active} to="/playlists">
                        Playlists
                    </NavLink>
                </li>
                </ul>
            </nav>
        </main>
    </>
  );
}

export default Navigation;