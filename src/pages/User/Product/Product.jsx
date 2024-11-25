import { Row, Container, Col, Card, Dropdown } from "react-bootstrap";
import "./Product.css";

function Product() {
  return (
    <Container>
      <Row>
        <h1>PRODUCT NAME</h1>
        <p>PRODUCT COLOR</p>
        <Col>
          <Card.Img src="https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2F52%2F94%2FlongTshirt-1-1-90e40.jpg?fit=max&w=2160&q=90" />
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              style={{ width: "100%" }}
              className="text-start"
            >
              Sizes:
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }} className="p-2">
              <Container className="text-start mt-5 mb-3">
                <div>Select Sizes:</div>
              </Container>
              <Container className="text-center mb-5">
                <Row>
                  <Col>
                    <Card>
                      <Dropdown.Item className="size-card">XS</Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item className="size-card">S</Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item className="size-card">M</Dropdown.Item>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Card>
                      <Dropdown.Item className="size-card">L</Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item className="size-card">XL</Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item className="size-card">XXL</Dropdown.Item>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Dropdown.Menu>
          </Dropdown>
          <Card className="mt-3">
            <Card.Header>ORDER INFORMATION</Card.Header>
            <Card.Body>
              <Card.Title>PRODUCT PRICE</Card.Title>
              <Card.Text>PRODUCT DESCRIPTION</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
