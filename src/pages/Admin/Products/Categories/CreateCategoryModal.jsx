import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "../../../../libs/rtk/api/categoryApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";

const schema = z.object({
  name: z
    .string()
    .min(3, "Category Name must be atleast 3 characters long")
    .max(255, "Category Name must not exceed 255 characters"),
});

function CreateCategoryModal(props) {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const handleFormSubmit = async (formData) => {
    try {
      await createCategory(formData).unwrap();
      toast.success("Category created successfully");
    } catch (error) {
      toast.warn("An error has occurred while creating the category");
    }

    props.onHide();
    reset();
  };

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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          type="submit"
          form="categoryForm"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCategoryModal;
