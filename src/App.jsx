import { Outlet } from "react-router-dom";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
