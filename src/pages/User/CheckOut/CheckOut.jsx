import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import CreateAddressCard from "../Settings/Address/CreateAddressCard";
import {
  useLazyGetProductsCartCheckoutQuery,
  useLazyGetProductBuyNowQuery,
} from "../../../libs/rtk/api/productApiSlice";
import { useGetAddressesQuery } from "../../../libs/rtk/api/addressApiSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./CheckOut.css";
import Spinner from "../../../components/Spinner/Spinner";
import { useCreateOrderMutation } from "../../../libs/rtk/api/orderApiSlice";

function CheckOut({ isCart }) {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: addresses,
    isError,
    isSuccess,
    isLoading: isAddressLoading,
  } = useGetAddressesQuery();
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const { id } = useParams();
  const size = searchParams.get("size");
  const quantity = searchParams.get("quantity");

  const [getProductsCart, { isLoading: isCartLoading }] =
    useLazyGetProductsCartCheckoutQuery();
  const [getProductBuyNow, { isLoading: isBuyNowLoading }] =
    useLazyGetProductBuyNowQuery();

  const handleCreateOrder = async () => {
    if (addresses.length <= 0) {
      toast.warn("Please add an address first.");
      return;
    }

    try {
      await createOrder({
        addressId: selectedAddress,
        products: products.map((product) => ({
          productId: product.product._id,
          size: product.size,
          quantity: product.quantity,
        })),
        isCart,
      }).unwrap();

      toast.success("Order created successfully");
      navigate("/");
    } catch (error) {
      toast.warn("An error occurred, please try again later.");
      navigate("/");
    }
  };

  const fetchProducts = async () => {
    try {
      const data = isCart
        ? await getProductsCart().unwrap()
        : await getProductBuyNow({ productId: id, size, quantity }).unwrap();

      if (isCart && data.length <= 0) {
        navigate("/");
        return;
      }

      let total = 0;

      data.forEach((product) => {
        total += product.product.price * product.quantity;
      });

      setProducts(data);
      setTotal(total);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setIsLoading(isCartLoading || isBuyNowLoading);
  }, [isCartLoading, isBuyNowLoading]);

  useEffect(() => {
    if (selectedAddress && addresses) {
      const address = addresses.find(
        (address) => address._id === selectedAddress
      );

      if (!address) return;

      if (address.province === "Cavite") {
        setShippingFee(50);
      } else {
        setShippingFee(100);
      }
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("An error occurred, please try again later.");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      if (addresses.length > 0) {
        const defaultAddress = addresses.find((address) => address.isDefault);
        setSelectedAddress(defaultAddress._id);
      }
    }
  }, [isSuccess]);

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Button
            onClick={() => navigate(-1)}
            variant="light"
            className=" mt-3"
          >
            <i className="bi bi-chevron-left"></i> Back
          </Button>
          <div className="text-start fs-1 fw-bold">CheckOut Process</div>
          <Row className="align-items-start">
            <div className="fs-4 fw-bold mb-3">Choose a Address</div>
            {isAddressLoading && <Spinner />}
            <div className="d-flex flex-wrap gap-3">
              {addresses &&
                addresses.map((address, index) => (
                  <Card
                    key={index}
                    className={`address-card shadow-sm p-3 rounded-4 ${
                      selectedAddress === address._id
                        ? "border border-dark shadow-lg"
                        : ""
                    }`}
                    style={{
                      height: "22rem",
                      width: "15rem",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      wordWrap: "break-word",
                    }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-between h-100">
                      <div>
                        <Form.Check
                          type="radio"
                          name="address"
                          checked={selectedAddress === address._id}
                          onChange={() => handleSelectAddress(address._id)}
                          label={
                            <>
                              <Card.Title className="fw-bold fs-5 text-dark">
                                {address.addressLabel}
                              </Card.Title>
                              <Card.Text className="mb-1 fw-semibold text-dark">
                                {`${address.firstName} ${address.lastName}`}
                              </Card.Text>
                              <Card.Text className="mb-1 text-muted text-wrap">
                                {address.address}
                              </Card.Text>
                              <Card.Text className="mb-1 text-muted">
                                {address.city}
                              </Card.Text>
                              <Card.Text className="mb-1 text-muted">
                                {address.province}
                              </Card.Text>
                              <Card.Text className="mb-1 text-muted">
                                {address.region}
                              </Card.Text>
                              <Card.Text className="mb-1 text-muted fw-bold">
                                Phone: {address.phoneNumber}
                              </Card.Text>
                            </>
                          }
                        />
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              <CreateAddressCard />
            </div>
          </Row>
          <Card className="mt-3">
            <Card.Header className="text-end">
              <div className="text-start fw-bold">ORDER DETAILS</div>
            </Card.Header>
            <Card.Body>
              {isLoading && <Spinner />}
              {products &&
                products.map((product, index) => (
                  <Row key={index}>
                    <Col md={2}>
                      <Card.Img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                        }}
                        variant="top"
                        src={product.product.images[0].url}
                        className="mb-2 mt-2"
                      />
                    </Col>
                    <Col md={7}>
                      <Card.Title className="fw-bold">
                        {product.product.name}
                      </Card.Title>
                      <Card.Text>Size: {product.size.toUpperCase()}</Card.Text>
                      <Card.Text>Quantity: {product.quantity}</Card.Text>
                    </Col>
                    <Col md={3} className="text-end fs-4">
                      <Card.Text className="fw-bold">
                        ₱
                        {(
                          product.product.price * product.quantity
                        ).toLocaleString()}
                      </Card.Text>
                    </Col>
                  </Row>
                ))}
            </Card.Body>
            <Card.Footer>
              <div className="text-end">
                <Card.Text className="fw-bold">
                  Order Total:{" "}
                  <span className="fs-4">₱{total.toLocaleString()}</span>
                </Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4} className="mt-5">
          <Card style={{ width: "100%" }} className="mt-4">
            <Card.Body>
              <Card.Header className="fw-bold text-center fs-5">
                <Card.Title>ORDER SUMMARY</Card.Title>
              </Card.Header>
              <Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <span>SUBTOTAL</span>
                  <span className="fw-bold">₱{total.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>SHIPPING FEE</span>
                  <span className="fw-bold">₱{shippingFee}</span>
                </div>

                <div className="d-flex justify-content-between mt-5">
                  <span className="fs-5 fw-bold">ORDER TOTAL</span>
                  <span className="fw-bold">
                    ₱{(total + shippingFee).toLocaleString()}
                  </span>
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button
                className="w-100"
                variant="dark"
                disabled={isCreatingOrder}
                onClick={handleCreateOrder}
              >
                {isCreatingOrder ? <Spinner /> : "Checkout"}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckOut;
