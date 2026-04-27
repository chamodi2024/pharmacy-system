import { useEffect, useState } from "react";
import { getMedicines } from "../services/api";

export default function Medicines() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadMedicines();

    const savedCart =
      JSON.parse(localStorage.getItem("pharmacy_cart")) || [];

    setCart(savedCart);
  }, []);

  const [loading, setLoading] = useState(false);

  const loadMedicines = async () => {
    setLoading(true);
    try {
      const medicines = await getMedicines();
      setData(medicines || []);
      setError("");
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Unable to load medicines from API.";
      setError(message);
      console.error("Medicines load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (medicine) => {
    let updatedCart = [...cart];

    const index = updatedCart.findIndex(
      (item) => item.id === medicine.id
    );

    if (index >= 0) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({
        ...medicine,
        quantity: 1
      });
    }

    setCart(updatedCart);
    localStorage.setItem(
      "pharmacy_cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <div className="page">
      <h1>Available Medicines</h1>

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading medicines...</p>
      ) : (
        <div className="card-grid">
          {data.map((m) => (
          <div key={m.id} className="product-card">
            <h3>{m.name}</h3>
            <p>Price: Rs. {Number(m.price).toFixed(2)}</p>
            <p>Stock: {m.quantity}</p>

            <button onClick={() => addToCart(m)}>
              Add to Cart
            </button>
          </div>
        ))}
        </div>
      )}

      <hr />

      <h2>Cart ({cart.length})</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            {item.name} x {item.quantity}
          </div>
        ))
      )}
    </div>
  );
}