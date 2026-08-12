import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src="/brand/logo.svg" alt="" width="24" height="24" />
          <span>AI LAB</span>
        </div>
        <nav className="site-footer__links">
          <Link to="/">Home</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <a href="mailto:guylhass@gmail.com">Contact</a>
        </nav>
        <p className="site-footer__copy">
          © {year} AI LAB. Build intelligence. Contain what you create.
        </p>
      </div>
    </footer>
  );
}
