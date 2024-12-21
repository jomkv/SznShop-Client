import { Button, Modal } from "react-bootstrap";
import { useCompleteOrderMutation } from "../../../../libs/rtk/api/orderApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";

function CompleteOrderModal({ show, setShow, orderId }) {
  const [completeOrder, { isLoading }] = useCompleteOrderMutation();

  const handleComplete = async () => {
    try {
      await completeOrder(orderId).unwrap();
      toast.success("Order completed successfully.");
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
        Are you sure you want to complete this order?
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          onClick={handleComplete}
          variant="dark"
          className="fw-semibold"
        >
          {isLoading ? <Spinner /> : "Yes, complete"}
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

export default CompleteOrderModal;
