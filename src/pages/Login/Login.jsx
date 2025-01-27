import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import ToastContainer from "../../components/ToastContainer/ToastContainer";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectIfLoggedIn = () => {
    if (!user) return;

    if (user.role === "admin") {
      toast.info("You are already logged in");
      navigate("/admin");
    } else {
      toast.info("You are already logged in");
      navigate("/");
    }
  };

  useEffect(() => {
    redirectIfLoggedIn();
  }, []);

  useEffect(() => {
    redirectIfLoggedIn();
  }, [user]);

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <div className="w-100 h-100 d-flex justify-content-evenly align-items-center ">
        <Link to="/" className="d-none d-md-block w-100">
          <img className="w-100" alt="logo" src="/login-banner.png" />
        </Link>
        <div className="w-100 d-flex justify-content-center">
          <Card
            className="text-center pt-3"
            style={{
              width: "450px",
            }}
          >
            <Card.Body>
              <Card.Title className="fw-semibold">
                WELCOME TO <span className="fw-bolder">SZN</span>
              </Card.Title>
              <Card.Text className="mb-0 text-body-secondary">
                Login to your account and experience the
              </Card.Text>
              <Card.Text className="fw-bold text-body-secondary">
                “WORLD’S FINEST”
              </Card.Text>
              <GoogleLoginButton />
            </Card.Body>
            <Card.Header
              style={{
                backgroundColor: "#D9D9D9",
              }}
            >
              <div className="w-100 h-100 d-flex justify-content-center align-items-center pt-3 text-body-secondary">
                <p className="fs-6">
                  Make sure you agree to our{" "}
                  <u className="fw-bold">Terms and Conditions</u>
                </p>
              </div>
            </Card.Header>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
