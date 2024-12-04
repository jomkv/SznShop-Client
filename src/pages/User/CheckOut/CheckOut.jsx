import React, { useState } from "react";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import CreateAddressCard from "../Settings/Address/CreateAddressCard";
import "./CheckOut.css";

function CheckOut() {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>CheckOut Process</h1>
          <Row>
            <div className="fs-3">Choose a Address</div>
            <Col>
              <Card
                className={`address-card ${
                  selectedAddress === "address1" ? "glow" : ""
                }`}
              >
                <Card.Body>
                  <Form.Check
                    type="radio"
                    name="address"
                    id="address1"
                    checked={selectedAddress === "address1"}
                    onChange={() => handleSelectAddress("address1")}
                    label={
                      <>
                        <Card.Title className="fw-bold fs-3 mb-1">
                          Home
                        </Card.Title>
                        <Card.Text className="text-truncate mb-1">
                          Name
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          Address
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          City
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          Province
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          Region
                        </Card.Text>
                        <Card.Title className="fw-bold fs-3 mb-1">
                          PHONE
                        </Card.Title>
                        <Card.Text className="text-truncate mb-1">
                          Phone Number
                        </Card.Text>
                      </>
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                className={`address-card ${
                  selectedAddress === "address2" ? "glow" : ""
                }`}
              >
                <Card.Body>
                  <Form.Check
                    type="radio"
                    name="address"
                    id="address2"
                    checked={selectedAddress === "address2"}
                    onChange={() => handleSelectAddress("address2")}
                    label={
                      <>
                        <Card.Title className="fw-bold fs-3 mb-1">
                          Home
                        </Card.Title>
                        <Card.Text className="text-truncate mb-1">
                          Name
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          Address
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          City
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          Province
                        </Card.Text>
                        <Card.Text className="text-truncate mb-1">
                          Region
                        </Card.Text>
                        <Card.Title className="fw-bold fs-3 mb-1">
                          PHONE
                        </Card.Title>
                        <Card.Text className="text-truncate mb-1">
                          Phone Number
                        </Card.Text>
                      </>
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <CreateAddressCard />
            </Col>
          </Row>
          <Card className="mt-3">
            <Card.Header className="text-end">
              <div className="fw-bold">ORDER STATUS</div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={2}>
                  <Card.Img
                    style={{ width: "100px", height: "100px" }}
                    variant="top"
                    src="https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2F52%2F94%2FlongTshirt-1-1-90e40.jpg?fit=max&w=2160&q=90"
                  />
                </Col>
                <Col md={7}>
                  <Card.Title>PTC Basic Long Sleeve T-shirt</Card.Title>
                  <Card.Text>Size: M</Card.Text>
                </Col>
                <Col md={3} className="text-end fs-4">
                  <Card.Text> $100</Card.Text>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="text-end">
                <Card.Text className="fw-bold">
                  Order Total: <span className="fs-4">$100</span>
                </Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4} className="mt-5">
          <OrderSummary />
        </Col>
      </Row>
    </Container>
  );
}

export default CheckOut;
