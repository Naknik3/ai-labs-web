import { Link } from "react-router-dom";
import "./LegalPage.css";

export default function NotFound() {
  return (
    <div className="legal" style={{ textAlign: "center" }}>
      <h1>404</h1>
      <p>This pad hasn't been built yet.</p>
      <Link to="/" className="btn btn--primary" style={{ marginTop: 16 }}>
        Back to base
      </Link>
    </div>
  );
}
