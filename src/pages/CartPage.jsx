import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, setQty } from "../store/cartSlice";
import "./CartPage.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((s) => s.cart.items);

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div className="page-container">
      <h1>סל קניות</h1>

      {items.length === 0 ? (
        <p>
          הסל ריק. <Link to="/pharmacy">חזור לבית המרקחת</Link>
        </p>
      ) : (
        <>
          <div className="cart-list">
            {items.map((it) => (
              <div key={it.id} className="cart-row">
                <img className="cart-thumb" src={it.thumbnail} alt={it.title} />
                <div className="cart-info">
                  <b>{it.title}</b>
                  <div>${it.price}</div>
                </div>

                <input
                  className="cart-qty"
                  type="number"
                  min="1"
                  value={it.qty}
                  onChange={(e) => dispatch(setQty({ id: it.id, qty: e.target.value }))}
                />

                <button onClick={() => dispatch(removeFromCart(it.id))}>
                  הסר
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <b>סה״כ: ${total.toFixed(2)}</b>
            <button className="primary-btn" onClick={() => navigate("/checkout")}>
              מעבר לתשלום
            </button>
          </div>
        </>
      )}
    </div>
  );
}
