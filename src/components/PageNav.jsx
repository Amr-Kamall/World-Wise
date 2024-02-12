import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo.jsx";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink className={styles.ctaLink} to="/login">
            login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
