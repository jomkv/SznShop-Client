import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDeleteCategoryMutation } from "../../../../libs/rtk/api/categoryApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import EditCategoryProductsModal from "./EditCategoryProductsModal";

function CategoryActionsButton({ category }) {
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteCategory(category._id).unwrap();
      setShowDelete(false);
      setIsDeleted(true);
      toast.success("Category deleted successfully");
    } catch (error) {
      setShowDelete(false);
      toast.warn("An error has occurred while deleting the category");
    }
  };

  const DeleteModal = (props) => {
    return (
      <Modal
        {...props}
        centered
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header closeButton />
        <Modal.Body className="fs-5">
          <p>Are you sure you want to delete category {category.name}?</p>
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
              setShowDelete(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <DropdownButton title="" variant="dark">
        <Dropdown.Item
          className="fw-semibold"
          onClick={() => {
            setShowEdit(true);
          }}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          className="fw-semibold"
          onClick={() => {
            setShowDelete(true);
          }}
        >
          Delete
        </Dropdown.Item>
      </DropdownButton>

      <DeleteModal show={showDelete} />
      {!isDeleted && (
        <EditCategoryProductsModal
          show={showEdit}
          onHide={() => {
            setShowEdit(false);
          }}
          category={category}
        />
      )}
    </>
  );
}

export default CategoryActionsButton;
