import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductForm from "./ProductForm";
import Spinner from "../../../components/Spinner/Spinner";
import { useEditProductMutation } from "../../../libs/rtk/api/productApiSlice";
import { toast } from "react-toastify";

function EditProductModal(props) {
  const [editProduct, { isLoading, isSuccess }] = useEditProductMutation();

  const handleSubmit = async (formData) => {
    try {
      await editProduct({ productId: props.product._id, formData }).unwrap();
      toast.success("Product updated successfully");
    } catch (error) {
      toast.warn("An error has occurred while updating the product");
    }
  };

  return (
    <Modal {...props} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm
          onSubmit={handleSubmit}
          hideModal={props.onHide}
          defaultValues={props.product}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          className="p-3 pt-2 pb-2 fs-5 fw-semibold"
          type="submit"
          style={{
            color: "white",
            width: "10rem",
          }}
          form="productForm"
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProductModal;
