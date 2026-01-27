// src/pages/PharmacyPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../store/favoritesSlice";
import "./PharmacyPage.css";

const categories = [
  {
    id: 1,
    slug: "perfumes",
    title: "בשמים",
    subtitle: "ניחוחות ובשמים",
    image: "/IMAGES/perfumes.jpg",
  },
  {
    id: 2,
    slug: "women-care",
    title: "טיפוח נשים",
    subtitle: "יופי ובריאות",
    image: "/IMAGES/women.jpg",
  },
  {
    id: 3,
    slug: "men-care",
    title: "טיפוח גברים",
    subtitle: "גילוח וטיפוח",
    image: "/IMAGES/men.jpg",
  },
  {
    id: 4,
    slug: "baby",
    title: "מוצרי תינוקות",
    subtitle: "בריאות ותזונת תינוק",
    image: "/IMAGES/baby.jpg",
  },
  {
    id: 5,
    slug: "hair",
    title: "שמפו וטיפוח שיער",
    subtitle: "מוצרי שיער איכותיים",
    image: "/IMAGES/shampu.png",
  },
  {
    id: 6,
    slug: "supplements",
    title: "תוספי תזונה",
    subtitle: "ויטמינים ומינרלים",
    image: "/IMAGES/supplements.png",
  },
  {
    id: 7,
    slug: "jewelry-watches",
    title: "תכשיטם ושעונים",
    subtitle: "תכשיטים ושעונים לגבר ולאישה",
    image: "/IMAGES/waches.jpg",
  },
  {
    id: 8,
    slug: "meds",
    title: "תרופות",
    subtitle: "תרופות בלי מרשם",
    image: "/IMAGES/med.jpg",
  },
  {
    id: 9,
    slug: "makeup",
    title: "מייק אפ & קוסמטיקה",
    subtitle: "מייק אפ וקוסמטיקה",
    image: "/IMAGES/makeup.jpg",
  },
];

export default function PharmacyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // favorites מגיעים מ-Redux
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = (id) => favorites.some((x) => x.id === id);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="ltr">MORINGA PHARM</h1>
        <p>בריאות, יופי וטיפוח במקום אחד.</p>
      </header>

      <div className="search-row">
        <input className="search-input" placeholder="חיפוש מוצרים..." />
      </div>

      <section className="categories-grid">
        {categories.map((cat) => {
          const favId = `pharm-${cat.id}`;

          const favItem = {
            id: favId,
            title: cat.title,
            subtitle: cat.subtitle,
            type: "pharmacy-category",
          };

          const isFav = isFavorite(favId);

          return (
            <div
              key={cat.id}
              className="category-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/pharmacy/${cat.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/pharmacy/${cat.slug}`);
              }}
            >
              {/* ⭐ מועדפים – בצד שמאל למעלה */}
              <button
                type="button"
                className="fav-btn"
                aria-label={isFav ? "הסר ממועדפים" : "הוסף למועדפים"}
                onClick={(e) => {
                  e.stopPropagation(); // ✅ שלא יעשה ניווט כשנוגעים בכוכב
                  dispatch(toggleFavorite(favItem));
                }}
              >
                {isFav ? "⭐" : "☆"}
              </button>

              {/* תמונה */}
              <img className="category-image" src={cat.image} alt={cat.title} />
              <h3>{cat.title}</h3>
              <p>{cat.subtitle}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
