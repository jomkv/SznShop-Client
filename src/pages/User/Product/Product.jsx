import { Row, Container, Col, Card, Dropdown, Button } from "react-bootstrap";
import "./Product.css";

function Product() {
  return (
    <Container className="product-page">
      <Row className="justify-content-center align-items-center">
        {/* Product Image Section */}
        <Col md={6} lg={5} className="product-image-section">
          <Card className="product-image-card">
            <Card.Img
              src="https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2F52%2F94%2FlongTshirt-1-1-90e40.jpg?fit=max&w=2160&q=90"
              className="product-main-image"
            />
            <Row className="product-thumbnails mt-3">
              <Col>
                <Card.Img src="https://via.placeholder.com/70" />
              </Col>
              <Col>
                <Card.Img src="https://via.placeholder.com/70" />
              </Col>
              <Col>
                <Card.Img src="https://via.placeholder.com/70" />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Order Information Section */}
        <Col md={6} lg={5} className="product-info-section">
          <h1>PRODUCT NAME</h1>
          <p>PRODUCT COLOR</p>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              style={{ width: "100%" }}
              className="text-start"
            >
              Size:
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }} className="p-2">
              <Container>
                <Row>
                  <Col>XS</Col>
                  <Col>S</Col>
                  <Col>M</Col>
                </Row>
                <Row>
                  <Col>L</Col>
                  <Col>XL</Col>
                  <Col>XXL</Col>
                </Row>
              </Container>
            </Dropdown.Menu>
          </Dropdown>

          <Card className="mt-3">
            <Card.Header className="text-center">
              ORDER INFORMATION
            </Card.Header>
            <Card.Body>
              <h4>₱7,777</h4>
              <div className="quantity-section">
                <Button variant="light" className="quantity-btn">-</Button>
                <input type="number" className="quantity-input" value="1" readOnly />
                <Button variant="light" className="quantity-btn">+</Button>
              </div>
              <div className="mt-3">
                <Button variant="dark" className="w-100 mb-2">
                  Add to Cart
                </Button>
                <Button variant="light" className="w-100">
                  Buy Now
                </Button>
              </div>
            </Card.Body>
          </Card>

          <div className="product-details mt-3">
            <h5>Product Details</h5>
            <p>Category: SZN Male > Shirt > Plain</p>
            <p>Stock: 7777</p>
            <p>Ships From: Imus, Cavite</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
