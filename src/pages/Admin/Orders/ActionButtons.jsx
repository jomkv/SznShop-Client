import { Button } from "react-bootstrap";
import AcceptModal from "./AcceptModal";
import { useState } from "react";
import RejectModal from "./RejectModal";

function ActionButtons({ order }) {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  return (
    <>
      <div className="d-flex">
        <Button variant="dark" className="me-2">
          Details
        </Button>
        {order.status === "REVIEWING" && (
          <>
            <Button
              variant="dark"
              className="me-2"
              onClick={() => setShowAccept(true)}
            >
              Accept
            </Button>
            <Button variant="dark" onClick={() => setShowReject(true)}>
              Reject
            </Button>
          </>
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
    </>
  );
}

export default ActionButtons;
