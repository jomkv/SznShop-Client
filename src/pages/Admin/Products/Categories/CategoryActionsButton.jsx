import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useState } from "react";
import {
  useDeleteCategoryMutation,
  useToggleShowCategoryMutation,
} from "../../../../libs/rtk/api/categoryApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import EditCategoryProductsModal from "./EditCategoryProductsModal";

function CategoryActionsButton({ category }) {
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const [toggleCategory, { isLoading: isToggling }] =
    useToggleShowCategoryMutation();

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

  const handleToggle = async () => {
    try {
      await toggleCategory(category._id).unwrap();
      setShowToggle(false);
      toast.success(
        `Category ${category.showInMenu ? "hidden" : "shown"} successfully`
      );
    } catch (error) {
      setShowToggle(false);
      toast.warn("An error has occurred while toggling the category");
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

  const ToggleShowModal = (props) => {
    return (
      <Modal
        {...props}
        centered
        onHide={() => {
          setShowToggle(false);
        }}
      >
        <Modal.Header closeButton />
        <Modal.Body className="fs-5">
          <p>
            Are you sure you want to {category.showInMenu ? "hide" : "show"}{" "}
            this category?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isToggling}
            onClick={() => {
              handleToggle();
            }}
            variant="dark"
            className="fw-semibold"
          >
            {isToggling ? (
              <Spinner />
            ) : (
              `Yes, ${category.showInMenu ? "hide" : "show"}`
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowToggle(false);
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
            setShowToggle(true);
          }}
        >
          {category.showInMenu ? "Hide" : "Show"}
        </Dropdown.Item>
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
      <ToggleShowModal show={showToggle} />
    </>
  );
}

export default CategoryActionsButton;
