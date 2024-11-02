import { Outlet } from "react-router-dom";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
