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
          <h1>CheckOut Process</h1>
          <Row>
            <div className="fs-3">Choose a Address</div>
            {isAddressLoading && <Spinner />}
            {addresses &&
              addresses.map((address, index) => (
                <Col key={index}>
                  <Card
                    className={`address-card ${
                      selectedAddress === "address1" ? "glow" : ""
                    }`}
                  >
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        name="address"
                        checked={selectedAddress === address._id}
                        onChange={() => handleSelectAddress(address._id)}
                        label={
                          <>
                            <Card.Title className="fw-bold fs-3 mb-1">
                              {address.addressLabel}
                            </Card.Title>
                            <Card.Text className="text-truncate mb-1">
                              {`${address.firstName} ${address.lastName}`}
                            </Card.Text>
                            <Card.Text className="text-truncate mb-1 text-wrap">
                              {address.address}
                            </Card.Text>
                            <Card.Text className="text-truncate mb-1">
                              {address.city}
                            </Card.Text>
                            <Card.Text className="text-truncate mb-1">
                              {address.province}
                            </Card.Text>
                            <Card.Text className="text-truncate mb-1">
                              {address.region}
                            </Card.Text>
                            <Card.Title className="fw-bold fs-3 mb-1">
                              PHONE
                            </Card.Title>
                            <Card.Text className="text-truncate mb-1">
                              {address.phoneNumber}
                            </Card.Text>
                          </>
                        }
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            <Col>
              <CreateAddressCard />
            </Col>
          </Row>
          <Card className="mt-3">
            <Card.Header className="text-end">
              <div className="fw-bold">ORDER DETAILS</div>
            </Card.Header>
            <Card.Body>
              {isLoading && <Spinner />}
              {products &&
                products.map((product, index) => (
                  <Row key={index}>
                    <Col md={2}>
                      <Card.Img
                        style={{ width: "100px", height: "100px" }}
                        variant="top"
                        src={product.product.images[0].url}
                      />
                    </Col>
                    <Col md={7}>
                      <Card.Title>{product.product.name}</Card.Title>
                      <Card.Text>Size: {product.size.toUpperCase()}</Card.Text>
                    </Col>
                    <Col md={3} className="text-end fs-4">
                      <Card.Text>
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
                  <span>₱{total.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>SHIPPING FEE</span>
                  <span>₱{shippingFee}</span>
                </div>

                <div className="d-flex justify-content-between mt-5">
                  <span className="fs-5 fw-bold">ORDER TOTAL</span>
                  <span>₱{(total + shippingFee).toLocaleString()}</span>
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
