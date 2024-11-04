import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../libs/rtk/api/authApiSlice";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";

function AdminNavbar({ collapsed }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
      toast.success("Logged out");
    } catch (error) {
      toast.warn("Something went wrong, please try again later.");
    }
  };

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
      <Modal
        centered
        onHide={() => {
          setShowLogoutModal(false);
        }}
        show={showLogoutModal}
      >
        <Modal.Header closeButton />
        <Modal.Body className="fs-5">
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isLoading}
            onClick={handleLogout}
            variant="dark"
            className="fw-semibold"
          >
            {isLoading ? <Spinner /> : "Yes, logout"}
          </Button>
          <Button
            variant="secondary"
            className="fw-semibold"
            onClick={() => {
              setShowLogoutModal(false);
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminNavbar;
