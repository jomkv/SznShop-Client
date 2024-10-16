import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="h-screen w-screen bg-slate-700">
      <Navbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
