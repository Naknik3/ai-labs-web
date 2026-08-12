import { useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import LabMapBackground from "./LabMapBackground.jsx";
import "./Layout.css";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={`site-shell ${isHome ? "site-shell--home" : ""}`}>
      <LabMapBackground />
      <div className="site-shell__scrim" />
      <div className="site-shell__content">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
