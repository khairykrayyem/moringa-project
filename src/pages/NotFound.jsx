import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="page-container"
      style={{
        textAlign: "center",
        padding: 40,
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <h1 style={{ fontSize: 56, margin: 0 }}>404</h1>
      <p>העמוד שחיפשת לא נמצא</p>

      <button
        className="primary-btn"
        type="button"
        onClick={() => navigate("/home")}
      >
        חזרה לדף הראשי
      </button>
    </div>
  );
}
