import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="landing-card">
        <div className="landing-icon">🌿</div>
        <p className="landing-subtitle">ברוכים הבאים אל</p>
        <h1 className="landing-title">MORINGA & RESET</h1>
        <p className="landing-text">
          בית מרקחת · קפה ·חנות · מאפייה · מסעדה – הכל במקום אחד.
        </p>
        <button className="primary-btn" onClick={() => navigate("/home")}>
          התחילו
        </button>
      </div>
    </div>
  );
}
