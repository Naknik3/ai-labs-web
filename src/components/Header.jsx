import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand">
          <img src="/brand/logo.svg" alt="" width="32" height="32" />
          <span>AI LAB</span>
        </NavLink>
        <nav className="site-header__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            Privacy
          </NavLink>
          <NavLink
            to="/terms"
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            Terms
          </NavLink>
          <NavLink
            to="/children-safety"
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            Safety
          </NavLink>
          <NavLink
            to="/restore-purchases"
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            Restore
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
