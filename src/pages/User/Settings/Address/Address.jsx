import { Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetAddressesQuery } from "../../../../libs/rtk/api/addressApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AddressCard from "./AddressCard";
import CreateAddressCard from "./CreateAddressCard";

function Address() {
  const {
    data: addresses,
    isLoading,
    isError,
    isSuccess,
  } = useGetAddressesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("An error occurred while fetching addresses");
    }
  }, [isError]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="outline-secondary"
        className="mt-3 align-self-start"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-chevron-left"></i>
      </Button>
      <div className="fw-bold fs-3">ADD ADDRESS</div>
      <p>Manage your shipping addresses for a faster checkout.</p>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4 w-100">
        {isSuccess &&
          addresses &&
          addresses.map((address, index) => (
            <Col key={index}>
              <AddressCard address={address} />
            </Col>
          ))}
        <Col>
          <CreateAddressCard />
        </Col>
      </Row>
    </Container>
  );
}

export default Address;
