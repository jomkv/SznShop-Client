import {
  Row,
  Container,
  Col,
  Card,
  Dropdown,
  Button,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../../libs/rtk/api/productApiSlice";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../../../libs/rtk/api/cartApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import Cookies from "js-cookie";
import SizeButton from "./SizeButton";
import Ratings from "./Ratings";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [totalStocks, setTotalStocks] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const isLoggedIn = Cookies.get("x-auth-cookie");

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductQuery(id);
  const [addToCart, { isLoading: isCartLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (quantity > product.stocks[size]) {
      toast.warn("Not enough stocks");
      return;
    }

    try {
      const payload = { productId: id, quantity, size };
      await addToCart(payload).unwrap();
      toast.success("Product added to cart");
    } catch (error) {
      toast.warn("Something went wrong, please try again later");
    }

    setQuantity(1);
    setSize(null);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (quantity > product.stocks[size]) {
      toast.warn("Not enough stocks");
      return;
    }

    navigate(`/checkout/${id}?size=${size}&quantity=${quantity}`);
  };

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Product not found");
    }
  }, [isError]);

  useEffect(() => {
    if (product) {
      const { xs, sm, md, lg, xl, xxl } = product.stocks;
      const total =
        xs + sm + md + lg + xl + xxl > 0 ? xs + sm + md + lg + xl + xxl : 0;
      setTotalStocks(total);

      // Set default size
      if (xs > 0) setSize("xs");
      else if (sm > 0) setSize("sm");
      else if (md > 0) setSize("md");
      else if (lg > 0) setSize("lg");
      else if (xl > 0) setSize("xl");
      else if (xxl > 0) setSize("xxl");
    }
  }, [product]);

  return (
    <>
      {isLoading && <Spinner large />}
      {isSuccess && product && (
        <Container>
          <div className="fs-1 fw-bold">{product.name}</div>
          <div>{product.description}</div>

          {/* Rest of the product UI */}
          <Row className="mt-3">
            <Col md={7}>
              <Row>
                <Col>
                  <Card>
                    <Card.Img
                      src={
                        product.images[0]?.url ||
                        "https://via.placeholder.com/500"
                      }
                      className="fixed-size-img"
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Img
                      src={
                        product.images[1]?.url ||
                        "https://via.placeholder.com/500"
                      }
                      className="fixed-size-img"
                    />
                  </Card>
                </Col>
              </Row>
              {product.images.length > 2 && (
                <Row className="mt-3">
                  {product.images[2] && (
                    <Col>
                      <Card>
                        <Card.Img
                          src={
                            product.images[2]?.url ||
                            "https://via.placeholder.com/500"
                          }
                          className="fixed-size-img"
                        />
                      </Card>
                    </Col>
                  )}
                  {product.images[3] && (
                    <Col>
                      <Card>
                        <Card.Img
                          src={
                            product.images[3]?.url ||
                            "https://via.placeholder.com/500"
                          }
                          className="fixed-size-img"
                        />
                      </Card>
                    </Col>
                  )}
                </Row>
              )}
            </Col>
            <Col md={5}>
              {totalStocks <= 0 && (
                <p
                  className="mt-3 mb-2 ms-2 fs-5"
                  style={{
                    color: "#e34a27",
                  }}
                >
                  <i className="bi bi-emoji-frown-fill me-2" />
                  Out of Stock
                </p>
              )}

              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    height: "50px",
                  }}
                  className="text-start"
                >
                  {size ? `Size: ${size.toUpperCase()}` : "Select Size"}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ width: "100%", borderRadius: "20px" }}
                  className="p-2"
                >
                  <Container className="text-center">
                    <Card.Text className="text-start mt-5">
                      Select Sizes:
                    </Card.Text>
                    <Row>
                      <Col>
                        <SizeButton
                          size="xs"
                          stock={product.stocks.xs}
                          selectedSize={size}
                          setSelectedSize={setSize}
                        />
                      </Col>
                      <Col>
                        <SizeButton
                          size="sm"
                          stock={product.stocks.sm}
                          selectedSize={size}
                          setSelectedSize={setSize}
                        />
                      </Col>
                      <Col>
                        <SizeButton
                          size="md"
                          stock={product.stocks.md}
                          selectedSize={size}
                          setSelectedSize={setSize}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-5 mt-3">
                      <Col>
                        <SizeButton
                          size="lg"
                          stock={product.stocks.lg}
                          selectedSize={size}
                          setSelectedSize={setSize}
                        />
                      </Col>
                      <Col>
                        <SizeButton
                          size="xl"
                          stock={product.stocks.xl}
                          selectedSize={size}
                          setSelectedSize={setSize}
                        />
                      </Col>
                      <Col>
                        <SizeButton
                          size="xxl"
                          stock={product.stocks.xxl}
                          selectedSize={size}
                          setSelectedSize={setSize}
                        />
                      </Col>
                    </Row>
                    {/* Size Chart Modal */}
                    <Button
                      variant="link"
                      className="text-decoration-none text-primary mb-3"
                      onClick={() => setShowModal(true)}
                    >
                      SIZE CHART &gt;
                    </Button>

                    <Modal
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      centered
                      size="lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Size Chart</Modal.Title>
                      </Modal.Header>
                      <img
                        src="/size-chart-2.png"
                        alt="Size Chart Image Here"
                        className="img-fluid"
                        style={{ borderRadius: "8px" }}
                      />

                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
                      <Card.Text className="fw-bold fs-4">
                        ₱{product.price.toLocaleString()}
                      </Card.Text>
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
                        value={quantity}
                        min={1}
                        max={product.stocks[size]}
                        disabled={!size}
                        style={{ width: "100px" }}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    </Col>
                  </Row>
                  {product && size && (
                    <Row>
                      <Col xs={12} sm={12}>
                        <p className="text-end fs-6 me-2 fw-light mb-0">
                          Available Stocks: {product.stocks[size]}
                        </p>
                      </Col>
                    </Row>
                  )}

                  <Row className="mt-3 mb-3">
                    <Col>
                      <Button
                        variant="light"
                        className="w-100 mb-2"
                        style={{ height: "50px" }}
                        disabled={isCartLoading || !size}
                        onClick={handleAddToCart}
                      >
                        {isCartLoading ? (
                          <Spinner />
                        ) : (
                          <>
                            <i className="bi bi-cart-plus"></i>Add to Cart
                          </>
                        )}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="dark"
                        className="w-100"
                        style={{ height: "50px" }}
                        onClick={handleBuyNow}
                        disabled={!size}
                      >
                        Buy Now
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <div className="mt-3">
                <h5 className="fw-bold">Product Details</h5>
                <p>
                  Category: SZN Male {">"} Shirt {">"} Plain
                </p>
                <p>Stock: {totalStocks}</p>
                <p>Ships From: Imus, Cavite</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Ratings productId={id} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Product;
