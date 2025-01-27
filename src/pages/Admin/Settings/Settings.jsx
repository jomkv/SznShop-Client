import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  useGetHomeImagesQuery,
  useSetHomeImagesMutation,
} from "../../../libs/rtk/api/adminApiSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import Skeleton from "react-loading-skeleton";

const schema = z.object({
  images: z.any().optional(),
});

function Settings() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const {
    data: homeImages,
    isLoading,
    isSuccess,
    isError,
  } = useGetHomeImagesQuery();
  const [setHomeImages, { isLoading: isSubmitting }] =
    useSetHomeImagesMutation();

  useEffect(() => {
    if (isError) {
      navigate("/admin");
      toast.warn("Something went wrong, please try again later.");
    }
  }, [isError, navigate]);

  const form = useForm({
    defaultValues: {
      images: [],
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit } = form;

  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const updateImages = (files) => {
    if (!files || files.length === 0) {
      return;
    }

    if (images.length + files.length > 6) {
      toast.warn("You can only upload a maximum of 6 images");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // check if file is an image
      if (file.type.split("/")[0] !== "image") {
        toast.warn("A non-image file was selected");
        continue;
      }

      // if file size too big
      if (file.size > 10485760) {
        toast.warn("File size too large, maximum is 10MB");
        continue;
      }

      // if image is already uploaded
      if (images.some((e) => e.name === file.name)) {
        continue;
      }

      setImages((prev) => [...prev, file]);
    }
  };

  const getImageFile = async (url) => {
    const fileName = url.split("/").slice(-1)[0].split(".")[0];
    const fileExt = url.split("/").slice(-1)[0].split(".")[1];

    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], fileName + fileExt, {
      type: blob.type,
    });

    return file;
  };

  const populateImages = async () => {
    if (homeImages) {
      // Set existing images to initial form value
      const cloudImages = await Promise.all(
        homeImages.map((image) => getImageFile(image.url))
      );
      setImages(cloudImages);
    }
  };

  useEffect(() => {
    populateImages();
  }, []);

  const onFileSelect = (event) => {
    const files = event.target.files;

    updateImages(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    updateImages(files);
  };

  const handleUploadDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async () => {
    let payload = new FormData();

    for (let i = 0; i < images.length; i++) {
      payload.append("images", images[i]);
    }

    try {
      await setHomeImages(payload);
      toast.success("Home images updated");
    } catch (error) {
      toast.warn("Something went wrong, please try again later.");
    }
  };

  return (
    <Container>
      <h2 className="my-4">Admin Setting</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5 fw-medium">Images</Form.Label>
              <div
                className={`w-100 pt-5 pb-5 rounded d-flex flex-column align-items-center justify-content-center fs-5 ${
                  images.length >= 6 ? "d-none" : ""
                }`}
                style={{
                  border: "2px dashed black",
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isDragging ? (
                  <p className="m-4">Drop images here</p>
                ) : (
                  <>
                    <p className="m-4">
                      Drag and drop images here or{" "}
                      <span
                        role="button"
                        style={{
                          color: "blue",
                        }}
                        onClick={selectFiles}
                      >
                        browse
                      </span>
                    </p>
                    <Form.Control
                      {...register("images")}
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={onFileSelect}
                      hidden
                    />
                  </>
                )}
              </div>
              <div className="d-flex mt-2 " style={{ columnGap: "10px" }}>
                {isLoading && (
                  <>
                    <div
                      style={{
                        height: "6rem",
                        width: "6rem",
                        position: "relative",
                      }}
                    >
                      <Skeleton
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        height: "6rem",
                        width: "6rem",
                        position: "relative",
                      }}
                    >
                      <Skeleton
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  </>
                )}
                {isSuccess &&
                  homeImages &&
                  images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        height: "6rem",
                        width: "6rem",
                        position: "relative",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload #${index}`}
                        className="w-100 h-100 rounded-1"
                        style={{
                          objectFit: "contain",
                          backgroundColor: "gray",
                        }}
                      />
                      <span
                        className="bg-danger"
                        style={{
                          position: "absolute",
                          height: "1.5rem",
                          width: "1.5rem",
                          top: 0,
                          right: 0,
                          marginRight: "0.2rem",
                          marginTop: "0.2rem",
                          padding: "0.05rem 0.47rem",
                          cursor: "pointer",
                          borderRadius: "50%",
                          color: "white",
                        }}
                        onClick={() => handleUploadDelete(index)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
              </div>
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? <Spinner /> : "Save Changes"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Settings;
