import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

const initialItems = [
  { id: 1, name: "Signature Cappuccino", category: "Coffee", price: 18, description: "Rich espresso with silky milk" },
  { id: 2, name: "Almond Croissant", category: "Bakery", price: 16, description: "Buttery croissant with almond cream" },
  { id: 3, name: "Green Power Bowl", category: "Restaurant", price: 42, description: "Quinoa, avocado, roasted veggies" },
  { id: 4, name: "Moringa Detox Tea", category: "Natural Shop", price: 24, description: "Herbal tea with moringa & mint" },
];

export default function Home() {
  const [items] = useState(initialItems);

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <h1 style={{ marginBottom: 8 }}>Welcome to MORINGA Club</h1>
      <p style={{ marginBottom: 24, color: "#555" }}>
        A daily luxury experience – café, bakery, restaurant and natural shop in one place.
      </p>

      <h2>Signature Selection</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
