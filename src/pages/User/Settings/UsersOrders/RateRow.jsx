import { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";

const starsEquivalent = ["Terrible", "Poor", "Fair", "Good", "Amazing"];

function RateRow({ orderProduct, onRateChange }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const handleStarsChange = (newStars) => {
    setStars(newStars);
    onRateChange(orderProduct._id, newStars, comment);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    onRateChange(orderProduct._id, stars, e.target.value);
  };

  return (
    <Row>
      <Col sm={12} md={12} className="d-flex">
        <Image
          src={orderProduct.productId.images[0].url}
          className="me-2"
          thumbnail
          style={{
            height: "80px",
            width: "80px",
            objectFit: "cover",
          }}
        />
        <div className="d-flex flex-column">
          <p className="fs-5 mb-0">{orderProduct.name}</p>
          <p className="fs-6">Size: {orderProduct.size.toUpperCase()}</p>
        </div>
      </Col>
      <Col sm={12} md={12}>
        <Form className="mt-2">
          <div className="d-flex align-content-center mb-2">
            <p className="mb-0 me-2 align-content-center">Rating</p>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  value={value}
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    margin: 0,
                    padding: 0,
                  }}
                  className="me-1"
                  onClick={() => handleStarsChange(value)}
                >
                  <i
                    className={`bi ${
                      stars >= value ? "bi-star-fill" : "bi-star"
                    } h2`}
                    style={{
                      color: "black",
                      margin: 0,
                      padding: 0,
                    }}
                  />
                </Button>
              ))}
            </div>
            {stars > 0 && (
              <p className="fs-6 ms-2 mb-0 align-content-center">
                {starsEquivalent[stars - 1]}
              </p>
            )}
          </div>
          <Form.Group
            className="mb-3 p-3"
            controlId="formBasicEmail"
            style={{
              backgroundColor: "#f5f5f5",
            }}
          >
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              type="text"
              placeholder="Share your thoughts about this purchase"
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

export default RateRow;
