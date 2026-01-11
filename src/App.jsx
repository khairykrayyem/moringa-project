import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFavorites } from "./store/favoritesSlice";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import JoinClub from "./pages/JoinClub.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import PharmacyPage from "./pages/PharmacyPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import ThemeToggle from "./components/ThemeToggle";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles/App.css";

export default function App() {
  // ✅ App קורא theme רק בשביל class על העטיפה
  const [theme] = useLocalStorage("theme", "light");

  // ✅ Redux
  const dispatch = useDispatch();
  const favoritesCount = useSelector((state) => state.favorites.items.length);

  return (
    <div className={`app-root theme-${theme}`}>
      <nav className="app-nav">
        <span className="app-logo ltr">
          MORINGA Pharm · Café · Bakery · Restaurant
        </span>

        <span style={{ color: "white" }}>מועדפים: {favoritesCount} ⭐</span>

        {/* ✅ Dispatch #2 (App) */}
        <button
          type="button"
          className="nav-btn"
          onClick={() => dispatch(clearFavorites())}
        >
          נקה מועדפים
        </button>

        {/* ✅ useLocalStorage Component #2 (ThemeToggle) */}
        <ThemeToggle />

        <div className="nav-links">
          <Link className="nav-link" to="/">דף פתיחה</Link>
          <Link className="nav-link" to="/home">דף ראשי</Link>
          <Link className="nav-link" to="/club">הצטרפות למועדון</Link>
          <Link className="nav-link" to="/offers">מבצעים (API)</Link>
        </div>
      </nav>

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
    </div>
  );
}
