import { Button } from "react-bootstrap";
import CompleteOrderModal from "./CompleteOrderModal";
import { useState } from "react";
import CancelOrderModal from "./CancelOrderModal";
import RateModal from "./RateModal";
import { Link } from "react-router-dom";

function ActionButtons({ order }) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRate, setShowRate] = useState(false);
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
          {!order.isRated && (
            <Button
              style={{ width: "150px" }}
              variant="dark"
              className="me-2"
              onClick={() => setShowRate(true)}
            >
              Rate
            </Button>
          )}

          <Link to={`/product/${order.orderProducts[0].productId._id}`}>
            <Button variant="dark" style={{ width: "150px" }}>
              Buy Again
            </Button>
          </Link>
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
      <RateModal show={showRate} setShow={setShowRate} order={order} />
    </>
  );
}

export default ActionButtons;
