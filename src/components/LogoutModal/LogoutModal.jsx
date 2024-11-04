import { Button, Modal } from "react-bootstrap";
import { useLogoutMutation } from "../../libs/rtk/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../contexts/AuthContext";

function LogoutModal({ show, setShow }) {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const { logout: logoutContext } = useAuth();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      logoutContext();
      navigate("/login");
      toast.success("Logged out");
    } catch (error) {
      toast.warn("Something went wrong, please try again later.");
    }
  };

  return (
    <Modal
      centered
      onHide={() => {
        setShow(false);
      }}
      show={show}
    >
      <Modal.Header closeButton />
      <Modal.Body className="fs-5">Are you sure you want to logout?</Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          onClick={handleLogout}
          variant="dark"
          className="fw-semibold"
        >
          {isLoading ? <Spinner /> : "Yes, logout"}
        </Button>
        <Button
          variant="secondary"
          className="fw-semibold"
          onClick={() => {
            setShow(false);
          }}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;
