import { Button } from "react-bootstrap";
import AcceptModal from "./AcceptModal";
import { useState } from "react";
import RejectModal from "./RejectModal";
import ReceiveModal from "./ReceiveModal";
import DetailsModal from "./DetailsModal";
import ReturnModal from "./ReturnModal";

function ActionButtons({ order }) {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

  return (
    <>
      <div className="d-flex">
        <Button
          size="sm"
          variant="dark"
          className="fw-semibold px-2 py-1 me-2"
          onClick={() => setShowDetails(true)}
        >
          Details
        </Button>
        {order.status === "REVIEWING" && (
          <>
            <Button
              size="sm "
              variant="dark"
              className="fw-semibold px-2 py-1 me-2"
              onClick={() => setShowAccept(true)}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="dark"
              className="fw-semibold px-2 py-1"
              onClick={() => setShowReject(true)}
            >
              Reject
            </Button>
          </>
        )}
        {order.status === "SHIPPING" && (
          <Button
            size="sm"
            className="fw-semibold px-2 py-1"
            variant="dark"
            onClick={() => setShowReceive(true)}
          >
            Receive
          </Button>
        )}
        {order.status === "RECEIVED" && (
          <Button
            size="sm"
            className="fw-semibold px-2 py-1 "
            variant="dark"
            onClick={() => setShowReturn(true)}
          >
            Return
          </Button>
        )}
      </div>
      <AcceptModal
        show={showAccept}
        setShow={setShowAccept}
        orderId={order._id}
      />
      <RejectModal
        show={showReject}
        setShow={setShowReject}
        orderId={order._id}
      />
      <ReceiveModal
        show={showReceive}
        setShow={setShowReceive}
        orderId={order._id}
      />
      <ReturnModal
        orderId={order._id}
        show={showReturn}
        setShow={setShowReturn}
      />
      <DetailsModal order={order} show={showDetails} setShow={setShowDetails} />
    </>
  );
}

export default ActionButtons;
