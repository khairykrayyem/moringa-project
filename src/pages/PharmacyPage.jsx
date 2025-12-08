const categories = [
  { id: 1, title: "בשמים", subtitle: "ניחוחות ובשמים" },
  { id: 2, title: "טיפוח נשים", subtitle: "יופי ובריאות" },
  { id: 3, title: "טיפוח גברים", subtitle: "גילוח וטיפוח" },
  { id: 4, title: "מוצרי תינוקות", subtitle: "בריאות ותזונת תינוק" },
  { id: 5, title: "תרופות במלאי", subtitle: "מרשם וללא מרשם" },
  { id: 6, title: "שמפו וטיפוח שיער", subtitle: "מוצרי שיער איכותיים" },
  { id: 7, title: "תוספי תזונה", subtitle: "ויטמינים ומינרלים" },
  { id: 8, title: "תכשיטים ושעונים", subtitle: "אקססוריז" },
  { id: 9, title: "איפור וקוסמטיקה", subtitle: "מוצרי יופי" },
];

export default function PharmacyPage() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>MORINGA PHARM</h1>
        <p>בריאות, יופי וטיפוח במקום אחד.</p>
      </header>

      <div className="search-row">
        <input
          className="search-input"
          placeholder="חיפוש מוצרים..."
        />
      </div>

      <section className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <div className="category-icon">💊</div>
            <h3>{cat.title}</h3>
            <p>{cat.subtitle}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
