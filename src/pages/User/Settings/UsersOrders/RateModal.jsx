import { Button, Container, Modal } from "react-bootstrap";
import Spinner from "../../../../components/Spinner/Spinner";
import RateRow from "./RateRow";
import { useEffect, useState } from "react";
import { useCreateRatingMutation } from "../../../../libs/rtk/api/ratingApiSlice";
import { toast } from "react-toastify";

function RateModal({ show, setShow, order }) {
  const [ratings, setRatings] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [createRating, { isLoading }] = useCreateRatingMutation();

  useEffect(() => {
    const initialRatings = {};

    order.orderProducts.forEach((op) => {
      initialRatings[op._id] = {
        stars: 0,
        comment: "",
      };
    });

    setRatings(initialRatings);
  }, []);

  const handleRateChange = (orderProductId, stars, comment) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [orderProductId]: { stars, comment },
    }));
  };

  useEffect(() => {
    let isCurrValid = true;

    for (const orderProductId in ratings) {
      if (Object.prototype.hasOwnProperty.call(ratings, orderProductId)) {
        const { stars } = ratings[orderProductId];

        if (stars <= 0) {
          isCurrValid = false;
        }
      }
    }

    setIsValid(isCurrValid);
  }, [ratings]);

  const handleSubmit = async () => {
    try {
      await createRating({ orderId: order._id, ratings }).unwrap();
      toast.success("Rating Submitted");
    } catch (error) {
      console.log(error);
      toast.warn("Something went wrong, please try again later");
    }

    setShow(false);
  };

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
            <RateRow
              orderProduct={op}
              key={index}
              onRateChange={handleRateChange}
            />
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
        <Button
          variant="dark"
          className="fw-semibold"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RateModal;
