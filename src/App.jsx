import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import JoinClub from "./pages/JoinClub.jsx";
import OffersPage from "./pages/OffersPage.jsx";

export default function App() {
  return (
    <>
      <nav
        style={{
          padding: 16,
          background: "#111",
          color: "white",
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold", letterSpacing: 1.5 }}>
          MORINGA Pharm · Café · Bakery · Restaurant
        </span>
        <Link style={{ color: "white" }} to="/">Home</Link>
        <Link style={{ color: "white" }} to="/club">Join Club</Link>
        <Link style={{ color: "white" }} to="/offers">Special Offers (API)</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/club" element={<JoinClub />} />
        <Route path="/offers" element={<OffersPage />} />
      </Routes>
    </>
  );
}
