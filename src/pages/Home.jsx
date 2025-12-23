// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "pharm",
    title: "MORINGA PHARM",
    subtitle: "Pharmacy",
    description: "בית המרקחת הבריאותי שלך.",
    cta: "לצפייה בקטגוריות",
    image:
      "https://zehavitke.co.il/wp-content/uploads/2019/10/%D7%9E%D7%95%D7%A8%D7%99%D7%A0%D7%92%D7%94-%D7%A4%D7%90%D7%A8%D7%9D_%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%A4%D7%A0%D7%99%D7%9D-%D7%96%D7%94%D7%91%D7%99%D7%AA-%D7%A7%D7%90%D7%95%D7%A4%D7%9E%D7%9F_%D7%A7%D7%95%D7%A4%D7%AA-%D7%AA%D7%A8%D7%95%D7%A4%D7%95%D7%AA.jpg",
  },
  {
    id: "cafe",
    title: "בית קפה",
    subtitle: "RESET Café",
    description: "קפה משובח ומשקאות מיוחדים.",
    cta: "לצפייה בתפריט",
    image:
      "https://www.coracaoconfections.com/cdn/shop/articles/envato-labs-ai-f9f7f840-5830-408f-8681-974bec3ca366_ef081282-c9a8-44ec-952f-3495521e106c.jpg?v=1752532282&width=2048",
  },
  {
    id: "bakery",
    title: "מאפייה",
    subtitle: "RESET Bakery",
    description: "מאפים טריים יום-יום וחמים מהתנור.",
    cta: "לצפייה במאפים",
    image:
      "https://img.freepik.com/premium-photo/collection-breads-wheat-white-background_1304147-112756.jpg",
  },
  {
    id: "restaurant",
    title: "מסעדה",
    subtitle: "RESET Restaurant",
    description: "ארוחות טריות עם חומרי גלם טבעיים.",
    cta: "הזמנת אוכל",
    image:
      "https://www.shutterstock.com/image-photo/collage-many-popular-all-over-600w-2499784767.jpg",
  },
  {
    id: "market",
    title: "מרקט",
    subtitle: "RESET Market",
    description: "מוצרי מזון ואורח חיים בריא.",
    cta: "לעבור לחנות",
    image:
      "https://media.istockphoto.com/id/1425139113/photo/purchasing-goods-with-smartphone-at-grocery-store.jpg?s=612x612&w=0&k=20&c=xMbZgp4BZAWCH_j7UkM9YiYTXcpS4zqg3MW4_jRmriM=",
  },
  {
    id: "club",
    title: "מועדון הלקוחות",
    subtitle: "join to the Club",
    description: "צברו נקודות ומבצעים בלעדיים בכל רכישה.",
    cta: "להצטרפות למועדון",
    image: "/IMAGES/JOINCLUB.jpg" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <h1>ברוכים הבאים ל-MORINGA & RESET</h1>
          <p>כל מה שקשור לבריאות, קפה, מאפים ואוכל טוב – במקום אחד.</p>
        </header>

        {/* 6 כרטיסים – 3 בשורה, 3 בשורה שנייה */}
        <div className="cards-grid cards-grid--services">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <img
                src={service.image}
                alt={service.subtitle}
                className="service-card-image"
              />

              <h4 className="service-card-subtitle">{service.subtitle}</h4>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <button
                className="link-btn"
                type="button"
                onClick={() => {
                  // כרגע רק דוגמה – אפשר לשים ניווט אמיתי כשיהיו דפים
                  if (service.id === "pharm") navigate("/pharmacy");
                  else if (service.id === "club") navigate("/club");
                  // שאר הדפים יישארו בעתיד
                }}
              >
                {service.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
