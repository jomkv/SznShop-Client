import { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";

function RateRow({ orderProduct }) {
  const [stars, setStars] = useState(0);

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
          <p className="fs-5">{orderProduct.name}</p>
          <p className="fs-6">Size: {orderProduct.size.toUpperCase()}</p>
        </div>
      </Col>
      <Col sm={12} md={12}>
        <Form>
          <div className="d-flex align-content-center mb-2">
            <p className="mb-0 me-2 align-content-center">Rating</p>
            <div>
              <Button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  margin: 0,
                  padding: 0,
                }}
                className="me-1"
                onClick={() => setStars(1)}
              >
                <i
                  className={`bi ${stars >= 1 ? "bi-star-fill" : "bi-star"} h2`}
                  style={{
                    color: "black",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
              <Button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  margin: 0,
                  padding: 0,
                }}
                className="me-1"
                onClick={() => setStars(2)}
              >
                <i
                  className={`bi ${stars >= 2 ? "bi-star-fill" : "bi-star"} h2`}
                  style={{
                    color: "black",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
              <Button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  margin: 0,
                  padding: 0,
                }}
                className="me-1"
                onClick={() => setStars(3)}
              >
                <i
                  className={`bi ${stars >= 3 ? "bi-star-fill" : "bi-star"} h2`}
                  style={{
                    color: "black",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
              <Button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  margin: 0,
                  padding: 0,
                }}
                className="me-1"
                onClick={() => setStars(4)}
              >
                <i
                  className={`bi ${stars >= 4 ? "bi-star-fill" : "bi-star"} h2`}
                  style={{
                    color: "black",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
              <Button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  margin: 0,
                  padding: 0,
                }}
                onClick={() => setStars(5)}
              >
                <i
                  className={`bi ${stars >= 5 ? "bi-star-fill" : "bi-star"} h2`}
                  style={{
                    color: "black",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows="3" type="text" />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

export default RateRow;
