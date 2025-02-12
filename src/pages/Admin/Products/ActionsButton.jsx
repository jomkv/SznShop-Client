import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useState } from "react";
import EditProductModal from "./EditProductModal";
import { useDeleteProductMutation } from "../../../libs/rtk/api/productApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";

function ActionsButton({ product }) {
  const [showPreview, setShowPreview] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id).unwrap();
      setShowDelete(false);
      toast.success("Product deleted successfully");
    } catch (error) {
      setShowDelete(false);
      toast.warn("An error has occurred while deleting the product");
    }
  };

  const PreviewModal = (props) => {
    return (
      <Modal
        {...props}
        centered
        scrollable
        onHide={() => {
          setShowPreview(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.name} Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <ProductCard product={product} />
        </Modal.Body>
      </Modal>
    );
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
          <p>Are you sure you want to delete product {product.name}?</p>
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
          onClick={() => setShowPreview(true)}
        >
          Preview
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
      <PreviewModal show={showPreview} />
      <DeleteModal show={showDelete} />
      <EditProductModal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
        product={product}
      />
    </>
  );
}

export default ActionsButton;
