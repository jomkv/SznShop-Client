import { Button, Modal } from "react-bootstrap";
import Spinner from "../../../components/Spinner/Spinner";
import { useRejectOrderMutation } from "../../../libs/rtk/api/orderApiSlice";
import { toast } from "react-toastify";

function RejectModal({ show, setShow, orderId }) {
  const [rejectOrder, { isLoading }] = useRejectOrderMutation();

  const handleAccept = async () => {
    try {
      await rejectOrder(orderId).unwrap();

      setShow(false);
      toast.success("Order rejected");
    } catch (error) {
      toast.warn("An error has occurred while rejecting the order");
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
        <Modal.Title>Reject Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">
        <p>Are you sure you want to reject order {orderId}?</p>
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
          {isLoading ? <Spinner /> : "Yes, reject"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectModal;
