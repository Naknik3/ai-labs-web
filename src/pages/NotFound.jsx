import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./LegalPage.css";

export default function NotFound() {
  return (
    <div className="legal">
      <Seo path="/404" />
      <div className="legal__header">
        <h1>404</h1>
        <p className="legal__updated">This pad hasn&rsquo;t been built yet</p>
      </div>
      <div className="legal__doc" style={{ textAlign: "center" }}>
        <p>
          The page you were looking for isn&rsquo;t part of the lab. Head back to the island, or
          jump straight to a legal document from the footer.
        </p>
        <Link to="/" className="btn btn--primary">
          Back to base
        </Link>
      </div>
    </div>
  );
}
