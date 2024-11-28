// * Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import store from "./libs/rtk/store.js";

// * Pages
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import {
  Cart,
  Home,
  Product,
  Address,
  Profile,
  UsersOrders,
  Settings as UserSettings,
  AddNewAddress,
  CheckOut,
  OrderHistory,
  FAQ,
} from "./pages/User/index.js";
import {
  Customers,
  Dashboard,
  Orders,
  Overview,
  Products,
  Settings,
} from "./pages/Admin/index.js";
import AdminApp from "./AdminApp.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="address" element={<Address />} />
              <Route path="usersorders" element={<UsersOrders />} />
              <Route path="settings" element={<UserSettings />} />
              <Route path="addnewaddress" element={<AddNewAddress />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="faq" element={<FAQ />} />
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
      </AuthProvider>
    </Provider>
  </StrictMode>
);
