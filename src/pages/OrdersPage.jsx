import { useEffect, useState } from "react";
import "./OrdersPage.css";
import { apiGet, apiPost, apiPut, apiDelete } from "../api/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    itemsText: "1,Panadol,20,1", // productId,title,price,qty
  });

  async function load() {
    setError("");
    setLoading(true);
    try {
      const data = await apiGet("/orders");
      setOrders(data);
    } catch (e) {
      setError(e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function parseItems(itemsText) {
    // פורמט פשוט: שורות, כל שורה: productId,title,price,qty
    return itemsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [productId, title, price, qty] = line.split(",").map((x) => x.trim());
        return {
          productId: Number(productId),
          title,
          price: Number(price),
          qty: Number(qty),
        };
      });
  }

  async function createOrder(e) {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        items: parseItems(form.itemsText),
      };
      await apiPost("/orders", payload);
      setForm((p) => ({ ...p, customerName: "", phone: "", address: "" }));
      await load();
    } catch (e2) {
      setError(e2.message || "Create failed");
    }
  }

  async function updateStatus(id, status) {
    setError("");
    try {
      await apiPut(`/orders/${id}`, { status });
      await load();
    } catch (e) {
      setError(e.message || "Update failed");
    }
  }

  async function removeOrder(id) {
    setError("");
    try {
      await apiDelete(`/orders/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Delete failed");
    }
  }

  return (
    <div className="page-container">
      <h1>Orders (CRUD)</h1>

      <form className="order-form" onSubmit={createOrder}>
        <input
          name="customerName"
          placeholder="שם לקוח"
          value={form.customerName}
          onChange={onChange}
        />
        <input
          name="phone"
          placeholder="טלפון"
          value={form.phone}
          onChange={onChange}
        />
        <input
          name="address"
          placeholder="כתובת"
          value={form.address}
          onChange={onChange}
        />

        <textarea
          name="itemsText"
          rows="3"
          value={form.itemsText}
          onChange={onChange}
          placeholder={`items: productId,title,price,qty\nExample:\n1,Panadol,20,1`}
        />

        <button type="submit" className="primary-btn">
          Create Order
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <div className="orders-list">
          {orders.map((o) => (
            <div key={o._id} className="order-card">
              <div className="order-top">
                <b>{o.customerName}</b> · {o.phone}
              </div>
              <div>{o.address}</div>
              <div>
                Status: <b>{o.status}</b>
              </div>
              <ul>
                {o.items.map((it, idx) => (
                  <li key={idx}>
                    {it.title} × {it.qty} (${it.price})
                  </li>
                ))}
              </ul>

              <div className="order-actions">
                <button onClick={() => updateStatus(o._id, "PREPARING")}>
                  PREPARING
                </button>
                <button onClick={() => updateStatus(o._id, "READY")}>READY</button>
                <button onClick={() => updateStatus(o._id, "DELIVERED")}>
                  DELIVERED
                </button>
                <button onClick={() => removeOrder(o._id)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
