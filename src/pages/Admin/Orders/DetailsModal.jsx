import { Button, Card, CardHeader, Modal } from "react-bootstrap";
import OrderDetails from "../../../components/OrderDetails/OrderDetails";
import { formatDate } from "../../../utils/helper";

function DetailsModal({ order, show, setShow }) {
  return (
    <Modal
      show={show}
      size="xl"
      centered
      onHide={() => {
        setShow(false);
      }}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">
        <Card>
          <CardHeader>
            <p className="fw-bold mb-0">Details</p>
            <p className="mb-0">Customer Email: {order.userId.email}</p>
            <p className="mb-0">
              Customer Full Name:{" "}
              {`${order.address.firstName} ${order.address.lastName}`}
            </p>
            <p className="mb-0">Order made at: {formatDate(order.createdAt)}</p>
          </CardHeader>
          <OrderDetails order={order} showActions={false} />
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          className="fw-semibold"
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailsModal;
