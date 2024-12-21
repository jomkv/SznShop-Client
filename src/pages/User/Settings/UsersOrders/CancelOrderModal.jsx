import { Button, Modal } from "react-bootstrap";
import { useCancelOrderMutation } from "../../../../libs/rtk/api/orderApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";

function CancelOrderModal({ show, setShow, orderId }) {
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  const handleCancel = async () => {
    try {
      await cancelOrder(orderId).unwrap();
      toast.success("Order cancelled.");
    } catch (error) {
      toast.warn("Something went wrong, please try again later.");
    }

    setShow(false);
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
      <Modal.Body className="fs-5">
        Are you sure you want to cancel this order?
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          onClick={handleCancel}
          variant="danger"
          className="fw-semibold"
        >
          {isLoading ? <Spinner /> : "Yes, cancel"}
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

export default CancelOrderModal;
