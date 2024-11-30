import { useEffect } from "react";
import {
  useGetAddressQuery,
  useEditAddressMutation,
} from "../../../../libs/rtk/api/addressApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Container } from "react-bootstrap";
import AddressForm from "../../../../components/AddressForm/AddressForm";

function EditAddress() {
  const { id } = useParams();
  const { data: address, isSuccess, isError } = useGetAddressQuery(id);
  const [editAddress, { isLoading: isSubmitting }] = useEditAddressMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/address");
      toast.warn("Something went wrong, please try again later");
    }
  }, [isError]);

  const onSubmit = async (formData) => {
    try {
      await editAddress({ id, formData }).unwrap();
      toast.success("Address updated successfully");
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
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <Card.Header>
          <div className="fw-bold fs-2">EDIT ADDRESS</div>
        </Card.Header>
        <Card.Body>
          {isSuccess && address && (
            <AddressForm
              onSubmit={onSubmit}
              isLoading={isSubmitting}
              defaultValues={address}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditAddress;
