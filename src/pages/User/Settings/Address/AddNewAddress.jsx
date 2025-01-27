import { Container, Card } from "react-bootstrap";
import AddressForm from "../../../../components/AddressForm/AddressForm";
import { useCreateAddressMutation } from "../../../../libs/rtk/api/addressApiSlice";
import { toast } from "react-toastify";

function AddNewAddress() {
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const onSubmit = async (formData) => {
    try {
      await createAddress(formData).unwrap();
      toast.success("Address created successfully");
    } catch (error) {
      toast.error("An error occurred while creating the address");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "600px" }} className="mt-3">
        <Card.Header>
          <div className="fw-bold fs-2">CREATE A NEW ADDRESS</div>
        </Card.Header>
        <Card.Body>
          <AddressForm onSubmit={onSubmit} isLoading={isLoading} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddNewAddress;
