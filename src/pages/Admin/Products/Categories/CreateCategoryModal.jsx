import { Button, Form, Modal, ToggleButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "../../../../libs/rtk/api/categoryApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import { useGetProductsAdminQuery } from "../../../../libs/rtk/api/productApiSlice";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const schema = z.object({
  name: z
    .string()
    .min(3, "Category Name must be atleast 3 characters long")
    .max(255, "Category Name must not exceed 255 characters"),
});

function CreateCategoryModal(props) {
  const [createCategory, { isSubmitting }] = useCreateCategoryMutation();
  const { data: products, isLoading, isError } = useGetProductsAdminQuery();
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    if (isError) {
      props.onHide();
      toast.warn("An error has occured while fetching products.");
    }
  }, [isError]);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const handleFormSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        productIds,
      };

      await createCategory(formData).unwrap();
      toast.success("Category created successfully");
    } catch (error) {
      toast.warn("An error has occurred while creating the category");
    }

    props.onHide();
    reset();
    setProductIds([]);
  };

  const handleIncludeProduct = (productId) => {
    setProductIds((prev) => {
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
          checked={productIds.includes(row._id)}
          onClick={() => handleIncludeProduct(row._id)}
        >
          Include
        </ToggleButton>
      ),
    },
  ];

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleFormSubmit)} id="categoryForm">
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Name</Form.Label>
            <Form.Control
              className="fs-5"
              type="text"
              {...register("name")}
              isInvalid={errors.name?.message ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 fw-medium">Products</Form.Label>

            {isLoading && (
              <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                <Spinner large />
              </div>
            )}
            {products && (
              <DataTable
                columns={columns}
                data={products.all}
                fixedHeader={true}
                fixedHeaderScrollHeight="55vh"
                highlightOnHover
                striped
              />
            )}
          </Form.Group>
        </Form>
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
