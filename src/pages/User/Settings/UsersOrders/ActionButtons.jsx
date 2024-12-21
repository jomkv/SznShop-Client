import { Button } from "react-bootstrap";
import CompleteOrderModal from "./CompleteOrderModal";
import { useState } from "react";
import CancelOrderModal from "./CancelOrderModal";

function ActionButtons({ order }) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleComplete = (orderId) => {
    setOrderId(orderId);
    setShowCompleteModal(true);
  };

  const handleCancel = (orderId) => {
    setOrderId(orderId);
    setShowCancelModal(true);
  };

  return (
    <>
      {order.status === "COMPLETED" && (
        <>
          <Button style={{ width: "150px" }} variant="dark" className="me-2">
            Rate
          </Button>
          <Button variant="light" style={{ width: "150px" }}>
            Buy Again
          </Button>
        </>
      )}
      {order.status === "REVIEWING" && (
        <>
          <Button
            style={{ width: "150px" }}
            variant="dark"
            onClick={() => handleCancel(order._id)}
          >
            CANCEL
          </Button>
        </>
      )}
      {order.status === "RECEIVED" && (
        <>
          <Button
            style={{ width: "12rem" }}
            variant="dark"
            onClick={() => handleComplete(order._id)}
          >
            COMPLETE ORDER
          </Button>
        </>
      )}
      {orderId && (
        <>
          <CompleteOrderModal
            orderId={orderId}
            show={showCompleteModal}
            setShow={setShowCompleteModal}
          />
          <CancelOrderModal
            orderId={orderId}
            show={showCancelModal}
            setShow={setShowCancelModal}
          />
        </>
      )}
    </>
  );
}

export default ActionButtons;
