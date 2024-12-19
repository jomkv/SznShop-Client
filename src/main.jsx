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
  EditAddress,
  CheckOut,
  OrderHistory,
  FAQ,
  CategoryPage,
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
import Protected from "./pages/Protected/Protected.jsx";

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
              <Route
                path="cart"
                element={
                  <Protected>
                    <Cart />
                  </Protected>
                }
              />
              <Route
                path="profile"
                element={
                  <Protected>
                    <Profile />
                  </Protected>
                }
              />
              <Route
                path="address"
                element={
                  <Protected>
                    <Address />
                  </Protected>
                }
              />
              <Route
                path="usersorders"
                element={
                  <Protected>
                    <UsersOrders />
                  </Protected>
                }
              />
              <Route
                path="settings"
                element={
                  <Protected>
                    <UserSettings />
                  </Protected>
                }
              />
              <Route
                path="addnewaddress"
                element={
                  <Protected>
                    <AddNewAddress />
                  </Protected>
                }
              />
              <Route
                path="edit-address/:id"
                element={
                  <Protected>
                    <EditAddress />
                  </Protected>
                }
              />
              <Route
                path="checkout/cart"
                element={
                  <Protected>
                    <CheckOut isCart={true} />
                  </Protected>
                }
              />
              <Route
                path="checkout/:id"
                element={
                  <Protected>
                    <CheckOut isCart={false} />
                  </Protected>
                }
              />
              <Route
                path="order/:id"
                element={
                  <Protected>
                    <OrderHistory />
                  </Protected>
                }
              />
              <Route
                path="faq"
                element={
                  <Protected>
                    <FAQ />
                  </Protected>
                }
              />
              <Route path="category/:categoryName" element={<CategoryPage />} />
            </Route>
            <Route
              path="/admin"
              element={
                <Protected>
                  <AdminApp />
                </Protected>
              }
            >
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
