import { useState } from "react";
import { Button } from "react-bootstrap";
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
      <div
        style={{
          padding: "10px",
          minHeight: "15rem",
          border: "1px solid rgba(0, 0, 0, 0.3)",
        }}
        className="w-100 d-flex flex-column"
      >
        {address.isDefault && <p>DEFAULT</p>}
        <p className="fw-bolder fs-4">{address.addressLabel}</p>
        <p className="fw-semibold fs-5 mb-0">{`${address.firstName} ${address.lastName}`}</p>
        <p className="mb-0 text-wrap">{address.address}</p>
        <p className="mb-0">
          {address.municipality}, {address.postalCode}
        </p>
        <p className="mb-0">{address.province}</p>
        <p className="mb-0">{address.region}</p>
        <br />
        <p className="mb-0">PHONE</p>
        <p>+63 {address.phoneNumber}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/edit-address/${address._id}`}>
            <Button variant="dark" className="fw-semibold text-decoration-none">
              Edit
            </Button>
          </Link>
          {!address.isDefault && (
            <Button
              disabled={isLoading}
              variant="dark"
              className="fw-semibold"
              onClick={handleSetDefault}
            >
              {isLoading ? <Spinner /> : "Set as default"}
            </Button>
          )}

          <Button
            variant="dark"
            className="fw-semibold"
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
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
