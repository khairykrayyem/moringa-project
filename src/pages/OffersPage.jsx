import { useEffect, useState } from "react";
import axios from "axios";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOffers() {
      try {
        setLoading(true);
        setError("");
        // Fake API – אפשר להחליף בעתיד ל-API של מוצרים אמיתיים
        const res = await axios.get(
          "https://fakestoreapi.com/products?limit=6"
        );
        setOffers(res.data);
      } catch (err) {
        setError("Failed to load offers");
      } finally {
        setLoading(false);
      }
    }

    loadOffers();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading special offers…</div>;
  if (error)
    return (
      <div style={{ padding: 24, color: "red" }}>
        {error}
      </div>
    );

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h1>Special Offers</h1>
      <p style={{ color: "#555", marginBottom: 16 }}>
        External API demo – products adapted as MORINGA-style offers.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 12,
              padding: 12,
              background: "white",
            }}
          >
            <img
              src={offer.image}
              alt={offer.title}
              style={{ width: "100%", height: 160, objectFit: "contain" }}
            />
            <h3 style={{ fontSize: 14, marginTop: 8 }}>{offer.title}</h3>
            <div style={{ fontWeight: "bold", marginTop: 4 }}>
              {offer.price} ₪
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
