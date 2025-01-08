import { Button, Modal } from "react-bootstrap";
import {
  useGetCategoryProductsQuery,
  useEditCategoryProductsMutation,
} from "../../../../libs/rtk/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetProductsAdminQuery } from "../../../../libs/rtk/api/productApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import CategoryForm from "./CategoryForm";

function EditCategoryProductsModal({ category, ...props }) {
  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    data: productIds,
    isLoading,
    isError,
    isSuccess,
  } = useGetCategoryProductsQuery(category._id);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsAdminQuery();

  useEffect(() => {
    setIsFormLoading(isLoading || isProductsLoading);
  }, [isFormLoading, isLoading, isProductsLoading]);

  const [editCategoryProducts, { isLoading: isEditing }] =
    useEditCategoryProductsMutation();

  const [includedProductIds, setIncludedProductIds] = useState([]);

  useEffect(() => {
    if (isError || isProductsError) {
      props.onHide();
      toast.warn("An error has occured while fetching category products.");
    }
  }, [isError, isProductsError]);

  useEffect(() => {
    if (productIds && isSuccess) {
      setIncludedProductIds(productIds);
    }
  }, [productIds, isSuccess]);

  const onSubmit = async (formData) => {
    console.log(formData);

    try {
      await editCategoryProducts({
        ...formData,
        categoryId: category._id,
      }).unwrap();
      props.onHide();
      toast.success("Category products edited successfully.");
    } catch (error) {
      props.onHide();
      toast.warn("An error has occured while editing category products.");
    }
  };

  return (
    <Modal {...props} centered size="lg">
      <Modal.Header closeButton>{category.name} Products</Modal.Header>
      <Modal.Body className="fs-5">
        {(isLoading || isProductsLoading) && (
          <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            <Spinner large />
          </div>
        )}
        <CategoryForm
          isLoading={isFormLoading}
          products={products}
          onSubmit={onSubmit}
          defaultValues={{ ...category, productIds: includedProductIds }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          className="fw-semibold"
          disabled={isLoading || isProductsLoading || isEditing}
          type="submit"
          form="categoryForm"
        >
          {isLoading || isProductsLoading || isEditing ? (
            <Spinner />
          ) : (
            "Save Changes"
          )}
        </Button>
        <Button
          variant="secondary"
          className="fw-semibold"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCategoryProductsModal;
