import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("pharmacy_cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    localStorage.removeItem("pharmacy_cart");
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  return (
    <div className="page">
      <div className="section-card">
        <div className="page-header">
          <div>
            <p className="eyebrow" style={{ color: "#0f766e" }}>Selected items</p>
            <h2 className="section-title">Cart</h2>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="alert">Your cart is empty. Add medicines from the inventory.</div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="cart-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>Price: Rs. {Number(item.price).toFixed(2)}</p>
                    <p>Qty: {item.quantity || 1}</p>
                  </div>
                  <button className="btn btn--danger" onClick={() => removeItem(idx)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <p>Total: <strong>Rs. {getTotal()}</strong></p>
              <div className="cart-actions">
                <Link to="/billing" className="btn btn--primary">Proceed to Billing</Link>
                <button onClick={clearCart} className="btn btn--secondary">Clear Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
