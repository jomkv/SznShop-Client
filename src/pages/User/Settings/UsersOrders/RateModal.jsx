import { Button, Container, Modal } from "react-bootstrap";
import Spinner from "../../../../components/Spinner/Spinner";
import RateRow from "./RateRow";

function RateModal({ show, setShow, order }) {
  const isLoading = false;

  // const [completeOrder, { isLoading }] = useCompleteOrderMutation();

  // const handleComplete = async () => {
  //   try {
  //     await completeOrder(orderId).unwrap();
  //     toast.success("Order completed successfully.");
  //   } catch (error) {
  //     toast.warn("Something went wrong, please try again later.");
  //   }

  //   setShow(false);
  // };

  return (
    <Modal
      centered
      onHide={() => {
        setShow(false);
      }}
      show={show}
      size="xl"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Rate Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">
        <Container>
          {order.orderProducts.map((op, index) => (
            <RateRow orderProduct={op} key={index} />
          ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="fw-semibold"
          onClick={() => {
            setShow(false);
          }}
        >
          No
        </Button>
        <Button variant="dark" className="fw-semibold">
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RateModal;
