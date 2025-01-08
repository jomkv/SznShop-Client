import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, ToggleButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DataTable from "react-data-table-component";
import Spinner from "../../../../components/Spinner/Spinner";

const schema = z.object({
  name: z
    .string()
    .min(3, "Category Name must be atleast 3 characters long")
    .max(255, "Category Name must not exceed 255 characters"),
});

function CategoryForm({ onSubmit, defaultValues, isLoading, products }) {
  const [productIds, setProductIds] = useState(defaultValues?.productIds || []);
  const [search, setSearch] = useState("");
  const [productsResult, setProductsResult] = useState(products.active);

  const form = useForm({
    defaultValues: {
      name: defaultValues?.name || "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const handleFormSubmit = async (data) => {
    await onSubmit({ ...data, productIds });

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

  useEffect(() => {
    const result = products.active.filter((product) => {
      return product.name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setProductsResult(result);
  }, [search]);

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
            data={productsResult}
            fixedHeader={true}
            fixedHeaderScrollHeight="55vh"
            highlightOnHover
            striped
            subHeader
            subHeaderAlign="right"
            subHeaderComponent={
              <Form.Control
                type="text"
                placeholder="Search product name"
                value={search}
                className="w-50"
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        )}
      </Form.Group>
    </Form>
  );
}

export default CategoryForm;
