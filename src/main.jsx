// * Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// * Pages
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import { Home, Product } from "./pages/User/index.js";
import {
  Customers,
  Dashboard,
  Orders,
  Overview,
  Products,
  Settings,
} from "./pages/Admin/index.js";
import AdminApp from "./AdminApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
        </Route>
        <Route path="/admin" element={<AdminApp />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="overview" element={<Overview />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
