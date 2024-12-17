import { Button, Modal } from "react-bootstrap";
import Spinner from "../../../components/Spinner/Spinner";
import { useReceiveOrderMutation } from "../../../libs/rtk/api/orderApiSlice";
import { toast } from "react-toastify";

function ReceiveModal({ show, setShow, orderId }) {
  const [receiveOrder, { isLoading }] = useReceiveOrderMutation();

  const handleReceive = async () => {
    try {
      await receiveOrder(orderId).unwrap();

      setShow(false);
      toast.success("Order marked as received");
    } catch (error) {
      toast.warn("An error has occurred while updating the order");
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
        <Modal.Title>Receive Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">
        <p>Are you sure you want to mark order {orderId} as received?</p>
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
            handleReceive();
          }}
          variant="dark"
          className="fw-semibold"
        >
          {isLoading ? <Spinner /> : "Yes, mark as received"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReceiveModal;
