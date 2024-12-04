import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "../../../../libs/rtk/api/categoryApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import { useGetProductsAdminQuery } from "../../../../libs/rtk/api/productApiSlice";
import CategoryForm from "./CategoryForm";
import { useEffect } from "react";

function CreateCategoryModal(props) {
  const [createCategory, { isLoading: isSubmitting }] =
    useCreateCategoryMutation();
  const { data: products, isLoading, isError } = useGetProductsAdminQuery();

  useEffect(() => {
    if (isError) {
      toast.warn("An error has occurred while fetching products");
      props.onHide();
    }
  }, [isError]);

  const onSubmit = async (data) => {
    try {
      await createCategory(data).unwrap();
      toast.success("Category created successfully");
    } catch (error) {
      toast.warn("An error has occurred while creating the category");
    }

    props.onHide();
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          products={products}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          type="submit"
          form="categoryForm"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? <Spinner /> : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCategoryModal;
