import { useEffect, useState } from "react";
import { getMedicines } from "../services/api";

export default function Medicines() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadMedicines();
    const savedCart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
    setCart(savedCart);
  }, []);

  const loadMedicines = async () => {
    try {
      const medicines = await getMedicines();
      setData(medicines);
      setError("");
    } catch (err) {
      setError("Unable to load medicines from API. Showing placeholder items.");
      setData([
        { id: 1, name: "Paracetamol", price: 100, quantity: 25 },
        { id: 2, name: "Aspirin", price: 150, quantity: 18 },
        { id: 3, name: "Vitamin C", price: 200, quantity: 40 }
      ]);
    }
  };

  const addToCart = (medicine) => {
    const updatedCart = [...cart, { ...medicine, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("pharmacy_cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="page">
      <div className="section-card">
        <h2 className="section-title">Available Medicines</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="card-grid">
          {data.map((m) => (
            <div key={m.id} className="product-card">
              <h3>{m.name}</h3>
              <p>Price: Rs. {Number(m.price).toFixed(2)}</p>
              <p>Stock: {m.quantity ?? "N/A"}</p>
              <button onClick={() => addToCart(m)} className="btn btn--primary">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="section-card">
          <h3>Cart Preview ({cart.length})</h3>
          {cart.length === 0 ? (
            <p>No items added yet.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={`${item.id}-${index}`} className="cart-item">
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    maxWidth: "1100px",
    margin: "0 auto"
  },
  error: {
    padding: "12px",
    marginBottom: "18px",
    background: "#fdecea",
    color: "#b71c1c",
    borderRadius: "10px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px"
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "14px",
    padding: "20px",
    background: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
  },
  button: {
    marginTop: "12px",
    padding: "10px 16px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  cartPreview: {
    marginTop: "30px",
    padding: "20px",
    background: "#f9fafb",
    borderRadius: "14px"
  },
  cartList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  cartItem: {
    padding: "10px 0",
    borderBottom: "1px solid #e0e0e0"
  }
};
