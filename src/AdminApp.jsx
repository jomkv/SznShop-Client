import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./admin.css";
import { useState } from "react";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";

function AdminApp() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex">
      <AdminNavbar collapsed={collapsed} />
      <div className="main">
        <nav
          style={{
            padding: "1.15rem 1.5rem",
            borderBottom: "2px dashed rgba(0, 0, 0, 0.292)",
            minHeight: "10vh",
            backgroundColor: "white",
          }}
          className="navbar-expand d-flex justify-content-between align-items-center"
        >
          <button
            className="toggler-btn"
            type="button"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <i className="bi bi-list text-align-left" />
          </button>
          <img
            src="/szn-logo-3.jpg"
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
            }}
          />
        </nav>
        <main className="p-3 main">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminApp;
