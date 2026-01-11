// src/pages/PharmacyPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import "./PharmacyPage.css";

const categories = [
  {
    id: 1,
    title: "בשמים",
    subtitle: "ניחוחות ובשמים",
    image: "/IMAGES/perfumes.jpg",
  },
  {
    id: 2,
    title: "טיפוח נשים",
    subtitle: "יופי ובריאות",
    image: "/IMAGES/women.jpg",
  },
  {
    id: 3,
    title: "טיפוח גברים",
    subtitle: "גילוח וטיפוח",
    image: "/IMAGES/men.jpg",
  },
  {
    id: 4,
    title: "מוצרי תינוקות",
    subtitle: "בריאות ותזונת תינוק",
    image: "/IMAGES/baby.jpg",
  },
  {
    id: 5,
    title: "שמפו וטיפוח שיער",
    subtitle: "מוצרי שיער איכותיים",
    image: "/IMAGES/shampu.png",
  },
  {
    id: 6,
    title: "תוספי תזונה",
    subtitle: "ויטמינים ומינרלים",
    image: "/IMAGES/supplements.png",
  },
  {
    id: 7,
    title: "תכשיטם ושעונים ",
    subtitle: "תכשיטים ושעונים לגבר ולאישה",
    image: "/IMAGES/waches.jpg",
  },
  {
    id: 8,
    title: "תרופות ",
    subtitle: "תרופות בלי מרשם  ",
    image: "/IMAGES/med.jpg",
  },
  {
    id: 9,
    title: "מייק אפ & קוסמטיקה",
    subtitle: "מייק אפ וקוסמטיקה  ",
    image: "/IMAGES/makeup.jpg",
  },
];

export default function PharmacyPage() {
  const dispatch = useDispatch();

  //  favorites מגיעים מ-Redux
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
            <div key={cat.id} className="category-card">
              {/* ⭐ מועדפים – בצד שמאל למעלה */}
              <button
                type="button"
                className="fav-btn"
                aria-label={isFav ? "הסר ממועדפים" : "הוסף למועדפים"}
                onClick={() => dispatch(toggleFavorite(favItem))}
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
