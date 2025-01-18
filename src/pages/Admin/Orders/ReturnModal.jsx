import { Button, Modal } from "react-bootstrap";
import Spinner from "../../../components/Spinner/Spinner";
import { useReturnOrderMutation } from "../../../libs/rtk/api/orderApiSlice";
import { toast } from "react-toastify";

function ReturnModal({ show, setShow, orderId }) {
  const [returnOrder, { isLoading }] = useReturnOrderMutation();

  const handleReturn = async () => {
    try {
      await returnOrder(orderId).unwrap();

      setShow(false);
      toast.success("Order returned");
    } catch (error) {
      toast.warn("An error has occurred while returning the order");
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
        <Modal.Title>Return Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">
        <p>Are you sure you want to return order {orderId}?</p>
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
            handleReturn();
          }}
          variant="dark"
          className="fw-semibold"
        >
          {isLoading ? <Spinner /> : "Yes, return"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReturnModal;
