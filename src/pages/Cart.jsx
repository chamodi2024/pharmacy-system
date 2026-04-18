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
        <h2 className="section-title">🛒 Cart</h2>
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

const styles = {
  page: {
    padding: "24px",
    maxWidth: "1000px",
    margin: "0 auto"
  },
  empty: {
    padding: "20px",
    background: "#fff9e6",
    borderRadius: "12px",
    color: "#7b5e00"
  },
  list: {
    display: "grid",
    gap: "16px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px",
    borderRadius: "12px",
    background: "white",
    border: "1px solid #e2e8f0"
  },
  removeBtn: {
    padding: "10px 16px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  summary: {
    marginTop: "24px",
    padding: "20px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0"
  },
  actions: {
    marginTop: "14px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  checkoutBtn: {
    padding: "12px 18px",
    background: "#1976d2",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600"
  },
  clearBtn: {
    padding: "12px 18px",
    background: "#94a3b8",
    color: "white",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  }
};
