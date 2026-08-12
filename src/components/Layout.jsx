import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
