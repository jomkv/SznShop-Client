import { Button, Modal } from "react-bootstrap";
import Spinner from "../../../components/Spinner/Spinner";
import { useAcceptOrderMutation } from "../../../libs/rtk/api/orderApiSlice";
import { toast } from "react-toastify";

function AcceptModal({ show, setShow, orderId }) {
  const [acceptOrder, { isLoading }] = useAcceptOrderMutation();

  const handleAccept = async () => {
    try {
      await acceptOrder(orderId).unwrap();

      setShow(false);
      toast.success("Order accepted");
    } catch (error) {
      toast.warn("An error has occurred while accepting the order");
    }
  };

  return (
    <Modal
      show={show}
      centered
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Accept Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">
        <p>Are you sure you want to accept order {orderId}?</p>
        <p>
          This action is <span className="fw-bold">not reversible</span>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="fw-semibold"
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => {
            handleAccept();
          }}
          variant="dark"
          className="fw-semibold"
        >
          {isLoading ? <Spinner /> : "Yes, accept"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AcceptModal;
