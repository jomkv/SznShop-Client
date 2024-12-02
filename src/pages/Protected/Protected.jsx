import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const token = Cookies.get("x-auth-cookie");

  return token ? children : <Navigate to="/" />;
}

export default Protected;
