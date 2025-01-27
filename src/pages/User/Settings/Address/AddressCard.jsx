import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Link } from "react-router-dom";
import { useSetDefaultMutation } from "../../../../libs/rtk/api/addressApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";

function AddressCard({ address }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [setDefault, { isLoading }] = useSetDefaultMutation();

  const handleSetDefault = async () => {
    try {
      await setDefault(address._id).unwrap();
      toast.success("Address set as default");
    } catch (error) {
      toast.warn("Failed to set as default");
    }
  };

  return (
    <>
      <Card
        style={{
          padding: "15px",
          height: "22rem",
          width: "100%",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        className="d-flex flex-column justify-content-between"
      >
        <Card.Body className="d-flex flex-column">
          <div className="mb-2">
            {address.isDefault && (
              <Card.Text className="fw-bold text-secondary">DEFAULT</Card.Text>
            )}
          </div>

          <Card.Title className="fw-bold fs-5 mb-1 text-truncate">
            {address.addressLabel}
          </Card.Title>
          <Card.Text className="fw-semibold mb-1 text-truncate">
            {`${address.firstName} ${address.lastName}`}
          </Card.Text>
          <Card.Text className="text-muted mb-1 text-wrap">
            {address.address}
          </Card.Text>
          <Card.Text className="text-muted mb-1">
            {address.municipality}, {address.postalCode}
          </Card.Text>
          <Card.Text className="text-muted mb-1">{address.province}</Card.Text>
          <Card.Text className="text-muted mb-1">{address.region}</Card.Text>
          <Card.Text className="mb-1 text-muted">
            <span className="fw-bold">Phone:</span> +63 {address.phoneNumber}
          </Card.Text>
        </Card.Body>

        <div className="d-flex gap-2 mt-auto">
          <Link to={`/edit-address/${address._id}`} className="flex-fill">
            <Button
              variant="dark"
              className="fw-semibold w-100 py-2"
              style={{ fontSize: "0.85rem", borderRadius: "5px" }}
            >
              Edit
            </Button>
          </Link>

          {!address.isDefault && (
            <Button
              disabled={isLoading}
              variant="dark"
              className="fw-semibold flex-fill py-2"
              style={{ fontSize: "0.85rem", borderRadius: "5px" }}
              onClick={handleSetDefault}
            >
              {isLoading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                "Set Default"
              )}
            </Button>
          )}

          <Button
            variant="dark"
            className="fw-semibold flex-fill py-2"
            style={{ fontSize: "0.85rem", borderRadius: "5px" }}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </Card>

      <DeleteConfirmModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        addressId={address._id}
        addressLabel={address.addressLabel}
      />
    </>
  );
}

export default AddressCard;
