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
import { useGetProductQuery } from "../../../libs/rtk/api/productApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../../../libs/rtk/api/cartApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import Cookies from "js-cookie";
import SizeButton from "./SizeButton";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
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

    try {
      const payload = { productId: id, quantity: quantity, size: size };

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
      let total = xs + sm + md + lg + xl + xxl;

      if (total < 0) {
        total = 0;
      }

      setTotalStocks(total);

      // Set the default size based on the available stocks
      if (xs > 0) {
        setSize("xs");
      } else if (sm > 0) {
        setSize("sm");
      } else if (md > 0) {
        setSize("md");
      } else if (lg > 0) {
        setSize("lg");
      } else if (xl > 0) {
        setSize("xl");
      } else if (xxl > 0) {
        setSize("xxl");
      }
    }
  }, [product]);

  return (
    <>
      {isLoading && <Spinner large />}
      {isSuccess && product && (
        <Container>
          <div className="fs-1 fw-bold">{product.name}</div>
          <div>{product.description}</div>
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
        </Container>
      )}
    </>
  );
}

export default Product;
