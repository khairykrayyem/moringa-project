// src/pages/PharmacyPage.jsx
import { useFavorites } from "../context/FavoritesContext.jsx";

const categories = [
  {
    id: 1,
    title: "בשמים",
    subtitle: "ניחוחות ובשמים",
    icon: "🌸",
    image: "/IMAGES/perfumes.jpg",
  },
  {
    id: 2,
    title: "טיפוח נשים",
    subtitle: "יופי ובריאות",
    icon: "👩",
    image: "/images/women.jpg",
  },
  {
    id: 3,
    title: "טיפוח גברים",
    subtitle: "גילוח וטיפוח",
    icon: "👨",
    image: "/images/men.jpg",
  },
  {
    id: 4,
    title: "מוצרי תינוקות",
    subtitle: "בריאות ותזונת תינוק",
    icon: "👶",
    image: "/images/baby.jpg",
  },
  {
    id: 5,
    title: "שמפו וטיפוח שיער",
    subtitle: "מוצרי שיער איכותיים",
    icon: "🧴",
    image: "/images/hair.jpg",
  },
  {
    id: 6,
    title: "תוספי תזונה",
    subtitle: "ויטמינים ומינרלים",
    icon: "💊",
    image: "/images/supplements.jpg",
  },
];

export default function PharmacyPage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

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
                onClick={() => {
                  if (isFav) removeFavorite(favId);
                  else addFavorite(favItem);
                }}
              >
                {isFav ? "⭐" : "☆"}
              </button>

              {/* תמונה */}
              <img className="category-image" src={cat.image} alt={cat.title} />

              {/* אייקון */}
              <div className="category-icon">{cat.icon}</div>

              <h3>{cat.title}</h3>
              <p>{cat.subtitle}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
