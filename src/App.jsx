import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import ChildrenSafety from "./pages/ChildrenSafety.jsx";
import RestorePurchases from "./pages/RestorePurchases.jsx";
import DeleteData from "./pages/DeleteData.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/children-safety" element={<ChildrenSafety />} />
        <Route path="/restore-purchases" element={<RestorePurchases />} />
        <Route path="/delete-data" element={<DeleteData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
