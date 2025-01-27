import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetUsernamesAndNamesQuery,
  useEditProfileMutation,
  useGetMeQuery,
} from "../../../../libs/rtk/api/userApiSlice";

const schema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name must be atleast 3 characters long")
    .max(255, "Full Name must not exceed 255 characters"),
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters long")
    .max(255, "Username must not exceed 255 characters")
    .regex(/^\S*$/, "Username should not contain spaces"),
});

function Profile() {
  const navigate = useNavigate();
  const { data: me, isLoading, isError, isSuccess, refetch } = useGetMeQuery();
  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetUsernamesAndNamesQuery();

  const [editProfile, { isLoading: isSubmitting }] = useEditProfileMutation();

  const [usernameTaken, setUsernameTaken] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors, isDirty } = formState;

  useEffect(() => {
    if (isError || isDataError) {
      navigate("/");
      toast.warn("Something went wrong, please try again later.");
    }
  }, [isError, isDataError]);

  useEffect(() => {
    if (isSuccess && me) {
      setValue("fullName", me.displayName);
      setValue("username", me.username);
    }
  }, [isSuccess, me]);

  const handleFormSubmit = async (formData) => {
    if (data.usernames.includes(formData.username)) {
      setUsernameTaken(true);
      return;
    }

    try {
      await editProfile(formData).unwrap();
      navigate("/settings");
      toast.success("Profile updated");
      refetch();
    } catch (error) {
      navigate("/");
      toast.warn("Something went wrong, please try again later.");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg rounded-3">
        <Card.Header className="d-flex align-items-center bg-light p-3 rounded-3">
          <Button
            onClick={() => navigate(-1)}
            variant="outline-secondary"
            className="p-2 me-2"
          >
            <i className="bi bi-chevron-left"></i>
          </Button>
          <Card.Title className="fs-3 fw-bold mb-0">Profile</Card.Title>
        </Card.Header>
        <Card.Body className="pt-4">
          {(isLoading || isDataLoading) && <Spinner large />}
          {isSuccess && me && (
            <Form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-4"
              id="profileForm"
            >
              <Row className="g-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      className="shadow-sm"
                      {...register("fullName")}
                      isInvalid={errors.fullName?.message ? true : false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName?.message}
                    </Form.Control.Feedback>
                    <Form.Group className="mb-3"></Form.Group>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      className="shadow-sm"
                      {...register("username")}
                      isInvalid={
                        (errors.username?.message ? true : false) ||
                        usernameTaken
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {usernameTaken
                        ? "Username is already taken"
                        : errors.username?.message}
                    </Form.Control.Feedback>
                    <Form.Group className="mb-3"></Form.Group>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Card.Body>
        <div className="d-flex justify-content-center mb-4">
          <Button
            variant="dark"
            size="sm"
            style={{ width: "250px", height: "50px", borderRadius: "30px" }}
            className="shadow-sm"
            type="submit"
            form="profileForm"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Profile;
