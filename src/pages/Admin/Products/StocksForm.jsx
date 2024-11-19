import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  xs: z
    .number()
    .int("Stocks must be a whole number")
    .min(0, "Stocks must be a positive number"),
  sm: z
    .number()
    .int("Stocks must be a whole number")
    .min(0, "Stocks must be a positive number"),
  md: z
    .number()
    .int("Stocks must be a whole number")
    .min(0, "Stocks must be a positive number"),
  lg: z
    .number()
    .int("Stocks must be a whole number")
    .min(0, "Stocks must be a positive number"),
  xl: z
    .number()
    .int("Stocks must be a whole number")
    .min(0, "Stocks must be a positive number"),
  xxl: z
    .number()
    .int("Stocks must be a whole number")
    .min(0, "Stocks must be a positive number"),
});

function StocksForm({ isEdit, stocks, onSubmit }) {
  const form = useForm({
    defaultValues: {
      xs: stocks.xs || 0,
      sm: stocks.sm || 0,
      md: stocks.md || 0,
      lg: stocks.lg || 0,
      xl: stocks.xl || 0,
      xxl: stocks.xxl || 0,
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const handleFormSubmit = async (data) => {
    if (!isEdit) return;

    await onSubmit(data);

    reset();
  };

  useEffect(() => {
    if (!isEdit) {
      reset();
    }
  }, [isEdit]);

  return (
    <Form id="stocksForm" noValidate onSubmit={handleSubmit(handleFormSubmit)}>
      <Row className="mb-3">
        <Col sm={2} as="label" htmlFor="xs" className="col-form-label">
          XS
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            id="xs"
            isInvalid={errors.xs?.message ? true : false}
            {...register("xs", { valueAsNumber: true })}
            disabled={!isEdit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.xs?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={2} as="label" htmlFor="sm" className="col-form-label">
          SM
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            id="sm"
            isInvalid={errors.sm?.message ? true : false}
            {...register("sm", { valueAsNumber: true })}
            disabled={!isEdit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.sm?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={2} as="label" htmlFor="md" className="col-form-label">
          MD
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            id="md"
            isInvalid={errors.md?.message ? true : false}
            {...register("md", { valueAsNumber: true })}
            disabled={!isEdit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.md?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={2} as="label" htmlFor="lg" className="col-form-label">
          LG
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            id="lg"
            isInvalid={errors.lg?.message ? true : false}
            {...register("lg", { valueAsNumber: true })}
            disabled={!isEdit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lg?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={2} as="label" htmlFor="xl" className="col-form-label">
          XL
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            id="xl"
            isInvalid={errors.xl?.message ? true : false}
            {...register("xl", { valueAsNumber: true })}
            disabled={!isEdit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.xl?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={2} as="label" htmlFor="xl" className="col-form-label">
          XXL
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            id="xl"
            isInvalid={errors.xxl?.message ? true : false}
            {...register("xxl", { valueAsNumber: true })}
            disabled={!isEdit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.xxl?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
}

export default StocksForm;
