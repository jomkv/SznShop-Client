import {
  Row,
  Container,
  Col,
  Card,
  Dropdown,
  Button,
  FormControl,
} from "react-bootstrap";
import "./Product.css";

function Product() {
  return (
    <Container>
      <div className="fs-1 fw-bold">PRODUCT NAME</div>
      <div>PRODUCT DESCRIPTION</div>
      <Row className="mt-3">
        <Col md={7}>
          <Row>
            <Col>
              <Card>
                <Card.Img
                  src="https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fc2%2Fc2%2Ftshirt-3-1-9621a.jpg?fit=max&w=2160&q=90"
                  className="fixed-size-img"
                />
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img
                  src="https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png"
                  className="fixed-size-img"
                />
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Card>
                <Card.Img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbRUK7ANLLu2U7z3Ceaam4CFLV_ktNDkiWdb_sm-2idA8Y6fENFHU5NdsfqCTsB4s9b9YjvhFQSqjf6S_BXb1qFw"
                  className="fixed-size-img"
                />
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img
                  src="https://via.placeholder.com/500"
                  className="fixed-size-img"
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Dropdown>
            <Dropdown.Toggle
              variant="dark"
              id="dropdown-basic"
              style={{ width: "100%", borderRadius: "20px", height: "50px" }}
              className="text-start"
            >
              Size:
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ width: "100%", borderRadius: "20px" }}
              className="p-2"
            >
              <Container className="text-center">
                <Card.Text className="text-start mt-5">Select Sizes:</Card.Text>
                <Row>
                  <Col>
                    <Card>
                      <Dropdown.Item
                        className="center-text"
                        style={{ height: "60px" }}
                      >
                        XS
                      </Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item
                        className="center-text"
                        style={{ height: "60px" }}
                      >
                        S
                      </Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item
                        className="center-text"
                        style={{ height: "60px" }}
                      >
                        M
                      </Dropdown.Item>
                    </Card>
                  </Col>
                </Row>
                <Row className="mb-5 mt-3">
                  <Col>
                    <Card>
                      <Dropdown.Item
                        className="center-text"
                        style={{ height: "60px" }}
                      >
                        L
                      </Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item
                        className="center-text"
                        style={{ height: "60px" }}
                      >
                        XL
                      </Dropdown.Item>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Dropdown.Item
                        className="center-text"
                        style={{ height: "60px" }}
                      >
                        XXL
                      </Dropdown.Item>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Dropdown.Menu>
          </Dropdown>

          <Card className="mt-3" style={{ borderRadius: "20px" }}>
            <Card.Header className="text-start">
              <Card.Title className="fs-3 fw-bold">
                ORDER
                <div>
                  <span>INFORMATION</span>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={9}>
                  <Card.Text className="fs-5">PRICE:</Card.Text>
                </Col>
                <Col sm={3}>
                  <Card.Text className="fw-bold fs-4">₱7777</Card.Text>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={9}>
                  <Card.Text className="fs-5">QUANTITY:</Card.Text>
                </Col>
                <Col md={3}>
                  <FormControl
                    variant="light"
                    className="quantity-button"
                    type="number"
                    value="1"
                    min="1"
                    className="quantity-input"
                    style={{ width: "100px" }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Button
                    variant="light"
                    className="w-100 mb-2"
                    style={{ height: "50px" }}
                  >
                    <i className="bi bi-cart-plus"></i>Add to Cart
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="dark"
                    className="w-100"
                    style={{ height: "50px" }}
                  >
                    Buy Now
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <div className="mt-3">
            <h5 className="fw-bold">Product Details</h5>
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
