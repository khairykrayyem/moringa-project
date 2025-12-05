import { useState } from "react";

export default function JoinClub() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    favoriteArea: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }
    if (!form.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    if (!/^\d{7,}$/.test(form.phone)) {
      newErrors.phone = "Phone must be digits only (at least 7)";
    }
    if (!form.favoriteArea) {
      newErrors.favoriteArea = "Please choose your favorite area";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("NEW CLUB MEMBER:", form);
    alert("Welcome to MORINGA Club! (check console)");
    setForm({ fullName: "", email: "", phone: "", favoriteArea: "" });
  };

  return (
    <div style={{ padding: 24, maxWidth: 480, margin: "0 auto" }}>
      <h1>Join MORINGA Club</h1>
      <p style={{ color: "#555", marginBottom: 16 }}>
        Earn points on coffee, bakery, restaurant & natural products.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, marginTop: 8 }}
      >
        <div>
          <label>Full Name</label>
          <input
            style={{ width: "100%", padding: 8 }}
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Your name"
          />
          {errors.fullName && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.fullName}</div>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            style={{ width: "100%", padding: 8 }}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="name@example.com"
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>
          )}
        </div>

        <div>
          <label>Phone</label>
          <input
            style={{ width: "100%", padding: 8 }}
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="05XXXXXXXX"
          />
          {errors.phone && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.phone}</div>
          )}
        </div>

        <div>
          <label>Favorite Area</label>
          <select
            style={{ width: "100%", padding: 8 }}
            value={form.favoriteArea}
            onChange={(e) => handleChange("favoriteArea", e.target.value)}
          >
            <option value="">Choose…</option>
            <option value="coffee">Coffee</option>
            <option value="bakery">Bakery</option>
            <option value="restaurant">Restaurant</option>
            <option value="natural">Natural Shop</option>
          </select>
          {errors.favoriteArea && (
            <div style={{ color: "red", fontSize: 12 }}>
              {errors.favoriteArea}
            </div>
          )}
        </div>

        <button style={{ padding: 10, marginTop: 8 }}>Join Club</button>
      </form>
    </div>
  );
}
