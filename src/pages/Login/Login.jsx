import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { LOGIN_URL } from "../../constants";

function Login() {
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <div className="w-100 h-100 d-flex justify-content-evenly align-items-center ">
        <Link to="/" className="d-none d-md-block w-100">
          <img className="w-100" alt="logo" src="/logo_with_quote.png" />
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
              <a href={LOGIN_URL}>
                <GoogleLoginButton />
              </a>
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
    </div>
  );
}

export default Login;
