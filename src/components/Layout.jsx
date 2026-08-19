import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { LabzMarkDefs } from "./BrandMark.jsx";
import { initAnalytics, trackPageview } from "../lib/analytics.js";
import "./Layout.css";

export default function Layout({ children }) {
  const { pathname, state } = useLocation();

  // Land at the top when routing between pages - unless we were sent to a
  // specific section of the home page, which Home scrolls to itself.
  useEffect(() => {
    if (state?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [pathname, state]);

  useEffect(() => {
    initAnalytics();
    trackPageview(pathname);
  }, [pathname]);

  return (
    <div className="site-shell">
      <LabzMarkDefs />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
