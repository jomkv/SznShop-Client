import { Button, Card, Modal } from "react-bootstrap";
import OrderDetails from "../../../components/OrderDetails/OrderDetails";
import { formatDate } from "../../../utils/helper";

function DetailsModal({ order, show, setShow }) {
  return (
    <Modal
      show={show}
      size="lg"
      centered
      onHide={() => setShow(false)}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">Order Details</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Card className="border-0">
          <Card.Body>
            <div className="mb-3">
              <strong>Customer Email:</strong> {order.userId.email}
            </div>
            <div className="mb-3">
              <strong>Customer Name:</strong>{" "}
              {`${order.address.firstName} ${order.address.lastName}`}
            </div>
            <div className="mb-3">
              <strong>Order Date:</strong> {formatDate(order.createdAt)}
            </div>
            <OrderDetails order={order} showActions={false} />
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-dark" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailsModal;
