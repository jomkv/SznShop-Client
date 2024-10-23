import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MyNavbar from "./components/Navbar";
function App() {
  return (
    <div>
      <MyNavbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
