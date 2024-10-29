import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";

function AdminApp() {
  return (
    <div>
      <AdminNavbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default AdminApp;
