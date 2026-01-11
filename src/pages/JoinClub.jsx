import { useState } from "react";
import "./JoinClub.css";


export default function JoinClub() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (form.firstName.trim().length < 2)
      newErrors.firstName = "שם פרטי חייב להיות לפחות 2 תווים";
    if (form.lastName.trim().length < 2)
      newErrors.lastName = "שם משפחה חייב להיות לפחות 2 תווים";
    if (!/^\d{9,10}$/.test(form.phone))
      newErrors.phone = "טלפון חייב להיות מספר באורך 9–10 ספרות";
    if (!form.email.includes("@"))
      newErrors.email = "אימייל לא תקין";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      console.log("Club form data:", form);
      alert("נרשמת למועדון MORINGA! (כרגע רק הדפסה ל-console.log)");
    }
  }

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <div className="form-icon">🌿</div>
        <h2>יצירת חשבון</h2>
        <p className="form-subtitle">הצטרפו היום למועדון MORINGA</p>

        <form onSubmit={handleSubmit} className="club-form">
          <label>
            שם פרטי
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="error-text">{errors.firstName}</span>
            )}
          </label>

          <label>
            שם משפחה
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error-text">{errors.lastName}</span>
            )}
          </label>

          <label>
            טלפון
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </label>

          <label>
            אימייל
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </label>

          <button type="submit" className="primary-btn full-width">
            סיום הרשמה
          </button>

          <p className="form-footer">
            כבר יש לך חשבון? <span className="link-inline">התחברות</span>
          </p>
        </form>
      </div>
    </div>
  );
}
