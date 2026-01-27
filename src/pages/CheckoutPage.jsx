import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { apiPost } from "../api/api";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((s) => s.cart.items);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    const name = form.customerName.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();

    if (cartItems.length === 0) return "הסל ריק";
    if (name.length < 2) return "שם מלא חייב להיות לפחות 2 תווים";
    if (!/^\d{9,10}$/.test(phone)) return "טלפון חייב להיות 9–10 ספרות";
    if (address.length < 5) return "כתובת חייבת להיות לפחות 5 תווים";

    return "";
  }

  async function submit(e) {
    e.preventDefault();
    if (loading) return; // מגן משליחה כפולה
    setError("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        items: cartItems.map((it) => ({
          productId: it.id,
          title: it.title,
          price: it.price,
          qty: it.qty,
        })),
      };

      await apiPost("/orders", payload); // ✅ נשמר ב-MongoDB
      dispatch(clearCart());
      alert("ההזמנה נשלחה בהצלחה!");
      navigate("/home");
    } catch (e2) {
      setError(e2.message || "שליחת הזמנה נכשלה");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <h1>Checkout</h1>

      <form className="checkout-form" onSubmit={submit}>
        <input
          name="customerName"
          placeholder="שם מלא"
          value={form.customerName}
          onChange={onChange}
          required
          minLength={2}
        />

        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          placeholder="טלפון"
          value={form.phone}
          onChange={onChange}
          required
        />

        <input
          name="address"
          placeholder="כתובת"
          value={form.address}
          onChange={onChange}
          required
          minLength={5}
        />

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "שולח..." : "שלח הזמנה"}
        </button>
      </form>
    </div>
  );
}
