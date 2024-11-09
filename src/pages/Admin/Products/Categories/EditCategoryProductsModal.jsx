import { Button, Modal, ToggleButton } from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  useGetCategoryProductsQuery,
  useEditCategoryProductsMutation,
} from "../../../../libs/rtk/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetProductsAdminQuery } from "../../../../libs/rtk/api/productApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";

function EditCategoryProductsModal({ categoryId, ...props }) {
  const {
    data: productIds,
    isLoading,
    isError,
    isSuccess,
  } = useGetCategoryProductsQuery(categoryId);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    isSuccess: isProductsSuccess,
  } = useGetProductsAdminQuery();

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

  const handleSaveChanges = async () => {
    try {
      await editCategoryProducts({
        categoryId,
        productIds: includedProductIds,
      }).unwrap();
      props.onHide();
      toast.success("Category products edited successfully.");
    } catch (error) {
      props.onHide();
      toast.warn("An error has occured while editing category products.");
    }
  };

  const handleIncludeProduct = (productId) => {
    setIncludedProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId); // remove id
      } else {
        return [...prev, productId]; // add id
      }
    });
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => row.name,
      sortable: false,
      cell: (row) => (
        <img
          src={row.images[0].url}
          alt="Image"
          style={{
            width: "5rem",
            height: "5rem",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <ToggleButton
          type="radio"
          variant="outline-dark"
          checked={includedProductIds.includes(row._id)}
          onClick={() => handleIncludeProduct(row._id)}
        >
          Include
        </ToggleButton>
      ),
    },
  ];

  return (
    <Modal {...props} centered size="lg">
      <Modal.Header closeButton>SZN ONE Products</Modal.Header>
      <Modal.Body className="fs-5">
        {(isLoading || isProductsLoading) && (
          <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            <Spinner large />
          </div>
        )}
        {isSuccess && isProductsSuccess && products.all && productIds && (
          <DataTable
            columns={columns}
            data={products.all}
            fixedHeader={true}
            fixedHeaderScrollHeight="60vh"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          className="fw-semibold"
          disabled={isLoading || isProductsLoading || isEditing}
          onClick={handleSaveChanges}
        >
          {isLoading || isProductsLoading || isEditing ? (
            <Spinner />
          ) : (
            "Save Changes"
          )}
        </Button>
        <Button variant="secondary" className="fw-semibold">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCategoryProductsModal;
