import { Link } from "react-router-dom";

function AdminNavbar({ collapsed }) {
  return (
    <aside
      id="sidebar"
      className={`sidebar-toggle ${collapsed ? "collapsed" : ""}`}
    >
      <p className="sidebar-logo">SZN</p>
      <ul className="sidebar-nav p-0">
        <li className="sidebar-item">
          <Link to="/admin" className="sidebar-link">
            <i className="bi bi-suitcase-lg me-3"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/products" className="sidebar-link">
            <i className="bi bi-tag me-3"></i>
            <span>Products</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/customers" className="sidebar-link">
            <i className="bi bi-people me-3"></i>
            <span>Customers</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/orders" className="sidebar-link">
            <i className="bi bi-basket3 me-3"></i>
            <span>Orders</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/overview" className="sidebar-link">
            <i className="bi bi-bar-chart me-3"></i>
            <span>Overview</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/settings" className="sidebar-link">
            <i className="bi bi-gear me-3"></i>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/admin/#" className="sidebar-link">
          <i className="bi bi-box-arrow-right me-3"></i>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

export default AdminNavbar;
