import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import JoinClub from "./pages/JoinClub.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import PharmacyPage from "./pages/PharmacyPage.jsx";
import "./App.css";
import NotFound from "./pages/NotFound.jsx";
import { useFavorites } from "./context/FavoritesContext.jsx";


export default function App() {
  
      const { favorites } = useFavorites();

  return (
    <>
      {/* סרגל עליון קבוע */}
      <nav className="app-nav">
        <span className="app-logo ltr">
          MORINGA Pharm · Café · Bakery · Restaurant
        </span>
        <span style={{ color: "white" }}>מועדפים: {favorites.length} ⭐</span>


        <div className="nav-links">
          <Link className="nav-link" to="/">דף פתיחה</Link>
          <Link className="nav-link" to="/home">דף ראשי</Link>
          <Link className="nav-link" to="/club">הצטרפות למועדון</Link>
          <Link className="nav-link" to="/offers">מבצעים (API)</Link>
        </div>
      </nav>

      {/* אזור בו הדפים מתחלפים */}
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/club" element={<JoinClub />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
