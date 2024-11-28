import { Button, Modal } from "react-bootstrap";
import Spinner from "../../../../components/Spinner/Spinner";
import { useDeleteAddressMutation } from "../../../../libs/rtk/api/addressApiSlice";
import { toast } from "react-toastify";

function DeleteConfirmModal({ show, setShow, addressId, addressLabel }) {
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  const handleDelete = async () => {
    try {
      await deleteAddress(addressId).unwrap();
      toast.success("Address has been successfully deleted");
    } catch (error) {
      toast.warn("Something went wrong, please try again later");
    }

    setShow(false);
  };

  return (
    <Modal
      centered
      onHide={() => {
        setShow(false);
      }}
      show={show}
    >
      <Modal.Header closeButton />
      <Modal.Body className="fs-5">
        <p>Are you sure you want to delete {addressLabel}?</p>
        <p>
          This action is <span className="fw-bold">not reversible</span>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          onClick={() => {
            handleDelete();
          }}
          variant="danger"
          className="fw-semibold"
        >
          {isLoading ? <Spinner /> : "Yes, delete"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
