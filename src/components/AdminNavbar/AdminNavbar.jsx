import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutModal from "../LogoutModal/LogoutModal";

function AdminNavbar({ collapsed }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <>
      <aside
        id="sidebar"
        className={`sidebar-toggle ${collapsed ? "collapsed" : ""}`}
      >
        <p className="sidebar-logo">SZN</p>
        <ul className="sidebar-nav p-0">
          <li
            className={`sidebar-item p-0 ${
              selectedTab === "dashboard" ? "active" : ""
            }`}
          >
            <Link
              to="/admin"
              className="sidebar-link"
              onClick={() => {
                setSelectedTab("dashboard");
              }}
            >
              <div className="link-container">
                <i className="bi bi-suitcase-lg me-3"></i>
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              selectedTab === "products" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/products"
              className="sidebar-link"
              onClick={() => {
                setSelectedTab("products");
              }}
            >
              <div className="link-container">
                <i className="bi bi-tag me-3"></i>
                <span>Products</span>
              </div>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              selectedTab === "customers" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/customers"
              className="sidebar-link"
              onClick={() => {
                setSelectedTab("customers");
              }}
            >
              <div className="link-container">
                <i className="bi bi-people me-3"></i>
                <span>Customers</span>
              </div>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              selectedTab === "orders" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/orders"
              className="sidebar-link"
              onClick={() => {
                setSelectedTab("orders");
              }}
            >
              <div className="link-container">
                <i className="bi bi-basket3 me-3"></i>
                <span>Orders</span>
              </div>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              selectedTab === "overview" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/overview"
              className="sidebar-link"
              onClick={() => {
                setSelectedTab("overview");
              }}
            >
              <div className="link-container">
                <i className="bi bi-bar-chart me-3"></i>
                <span>Overview</span>
              </div>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              selectedTab === "settings" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/settings"
              className="sidebar-link"
              onClick={() => {
                setSelectedTab("settings");
              }}
            >
              <div className="link-container">
                <i className="bi bi-gear me-3"></i>
                <span>Settings</span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link
            className="sidebar-link"
            onClick={() => {
              setShowLogoutModal(true);
            }}
          >
            <div className="link-container">
              <i className="bi bi-box-arrow-right me-3"></i>
              <span>Logout</span>
            </div>
          </Link>
        </div>
      </aside>
      <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal} />
    </>
  );
}

export default AdminNavbar;
