import { Link } from "react-router-dom";
import { LabzMark, Wordmark } from "./BrandMark.jsx";
import SectionLink from "./SectionLink.jsx";
import AppStoreButton from "./AppStoreButton.jsx";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <LabzMark size={38} className="site-header__mark" />
          <Wordmark />
        </Link>
        <div className="site-header__spacer" />
        <nav className="site-header__nav">
          <SectionLink id="play">How it plays</SectionLink>
          <SectionLink id="buildings">Buildings</SectionLink>
        </nav>
        <AppStoreButton className="btn btn--primary btn--sm">Get it on iPhone</AppStoreButton>
      </div>
    </header>
  );
}
