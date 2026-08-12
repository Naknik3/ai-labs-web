import { Link } from "react-router-dom";
import { LabzMark, Wordmark } from "./BrandMark.jsx";
import SectionLink from "./SectionLink.jsx";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <Link to="/" className="site-footer__brand">
          <LabzMark size={30} className="site-footer__mark" />
          <Wordmark />
        </Link>
        <div className="site-footer__spacer" />
        <nav className="site-footer__links">
          <SectionLink id="play">How it plays</SectionLink>
          <SectionLink id="buildings">Buildings</SectionLink>
          <SectionLink id="faq">FAQ</SectionLink>
          <SectionLink id="waitlist">Waitlist</SectionLink>
        </nav>
      </div>

      <div className="site-footer__row site-footer__row--legal">
        <nav className="site-footer__links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/children-safety">Children&rsquo;s Safety</Link>
          <Link to="/restore-purchases">Restore Purchases</Link>
          <a href="mailto:ailabzsupport@gmail.com">Contact</a>
        </nav>
        <div className="site-footer__spacer" />
        <span className="site-footer__copy">© {year} AI-LABZ</span>
      </div>
    </footer>
  );
}
