import { useLocation, useNavigate } from "react-router-dom";

/* Anchors to a section of the home page. From a legal page it routes home
   first and hands the target id to Home via router state. */
export default function SectionLink({ id, className, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function onClick(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.history.replaceState) window.history.replaceState(null, "", `/#${id}`);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  }

  return (
    <a href={`/#${id}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
