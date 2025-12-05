export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 12,
        padding: 16,
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 12, color: "#999", textTransform: "uppercase" }}>
        {product.category}
      </div>
      <h3 style={{ margin: "4px 0 8px" }}>{product.name}</h3>
      <p style={{ fontSize: 14, color: "#555", minHeight: 40 }}>{product.description}</p>
      <div style={{ marginTop: 12, fontWeight: "bold" }}>{product.price} ₪</div>
    </div>
  );
}
