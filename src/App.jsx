import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Medicines from "./pages/Medicines";
import Billing from "./pages/Billing";
import BillHistory from "./pages/BillHistory";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/history" element={<BillHistory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;