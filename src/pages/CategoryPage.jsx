import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { apiGet } from "../api/api";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const cartCount = useSelector((s) =>
    s.cart.items.reduce((sum, it) => sum + it.qty, 0)
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ function we can reuse for initial load + retry
  const load = useCallback(
    async (aliveRef) => {
      setLoading(true);
      setError("");

      try {
        const data = await apiGet(
          `/products?category=${encodeURIComponent(category)}`
        );

        if (aliveRef && !aliveRef.current) return;
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (aliveRef && !aliveRef.current) return;
        setError(e.message || "Failed to load products");
        setProducts([]);
      } finally {
        if (aliveRef && !aliveRef.current) return;
        setLoading(false);
      }
    },
    [category]
  );

  useEffect(() => {
    const aliveRef = { current: true };

    load(aliveRef);

    return () => {
      aliveRef.current = false;
    };
  }, [load]);

  return (
    <div className="page-container">
      <div className="cat-top">
        <h1 className="cat-title">קטגוריה: {category}</h1>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link className="cart-link" to="/cart">
         MY BASKET ({cartCount})
        </Link>


          {/* ✅ Retry button always available, but nicer when error exists */}
          {error && (
            <button className="nav-btn" type="button" onClick={() => load()}>
              נסה שוב
            </button>
          )}
        </div>
      </div>

      {loading && <p>טוען מוצרים...</p>}

      {!loading && error && (
        <div style={{ paddingTop: 8 }}>
          <p style={{ color: "crimson" }}>שגיאה: {error}</p>
          <button className="primary-btn" type="button" onClick={() => load()}>
            נסה שוב
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p>אין מוצרים בקטגוריה הזו כרגע</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="cards-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              {p.image ? (
                <img className="product-img" src={p.image} alt={p.title} />
              ) : (
                <div className="product-img placeholder">No Image</div>
              )}

              <h3 className="product-title">{p.title}</h3>
              <p className="product-price">{p.price} ₪</p>

              <button
                className="primary-btn"
                type="button"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: p._id, // ✅ MongoDB id
                      title: p.title,
                      price: p.price,
                      thumbnail: p.image || "",
                    })
                  )
                }
              >
                הוסף לסל
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
