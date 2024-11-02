import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

const schema = z.object({
  name: z
    .string()
    .min(3, "Name must be atleast 3 characters long")
    .max(255, "Name must not exceed 255 characters"),
  description: z
    .string()
    .min(3, "Description must be atleast 3 characters long")
    .max(255, "Description must not exceed 255 characters"),
  price: z
    .number({ message: "Price must be a number" })
    .min(0.01, "Price is too low")
    .max(999999.99, "Price is too high"),
  images: z.any().optional(),
});

const ProductForm = ({ onSubmit, hideModal }) => {
  const [isNoImage, setIsNoImage] = useState(true);
  const [images, setImages] = useState([]);
  const [isImageChange, setIsImageChange] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      images: [],
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (images.length > 0) {
      setIsNoImage(false);
    } else {
      setIsNoImage(true);
    }
  }, [images]);

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const updateImages = (files) => {
    if (!files || files.length === 0) {
      return;
    }

    if (images.length + files.length > 4) {
      toast.warn("You can only upload a maximum of 4 images");
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

      setIsImageChange(true);
      setImages((prev) => [...prev, file]);
    }
  };

  // const getImageFile = async (url) => {
  //   const fileName = url.split("/").slice(-1)[0].split(".")[0];
  //   const fileExt = url.split("/").slice(-1)[0].split(".")[1];

  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   const file = new File([blob], fileName + fileExt, {
  //     type: blob.type,
  //   });

  //   return file;
  // };

  // const populateImages = async () => {
  //   if (defaultValues?.images) {
  //     // Set images from cloudinary to default values
  //     const cloudImages = await Promise.all(
  //       defaultValues.images.map((image) => getImageFile(image.url))
  //     );
  //     setImages(cloudImages);
  //   }
  // };

  // useEffect(() => {
  //   populateImages();
  // }, []);

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
    setIsImageChange(true);
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data) => {
    if (isNoImage) {
      return;
    }

    let payload = new FormData();

    payload.append("name", data.title);
    payload.append("price", data.price);
    payload.append("description", data.description);

    for (let i = 0; i < images.length; i++) {
      payload.append("images", images[i]);
    }

    await onSubmit(payload);

    hideModal();
    reset();
    setImages([]);
  };

  return (
    <>
      <Form
        id="productForm"
        noValidate
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
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
          <Form.Label className="fs-5 fw-medium">Price</Form.Label>
          <Form.Control
            className="fs-5"
            type="number"
            {...register("price", { valueAsNumber: true })}
            isInvalid={errors.price?.message ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fs-5 fw-medium">Description</Form.Label>
          <Form.Control
            className="fs-5"
            as="textarea"
            rows={5}
            {...register("description")}
            isInvalid={errors.description?.message ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fs-5 fw-medium">Images</Form.Label>
          <div
            className={`w-100 pt-5 pb-5 rounded d-flex flex-column align-items-center justify-content-center fs-5 ${
              images.length >= 4 ? "d-none" : ""
            }`}
            style={{
              border: `2px dashed ${isNoImage ? "#dc3545" : "black"}`,
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
          {isNoImage && (
            <p
              className="text-danger fw-lighter mt-1"
              style={{
                fontSize: "0.9rem",
              }}
            >
              An image must be uploaded
            </p>
          )}

          <div className="d-flex mt-2" style={{ columnGap: "10px" }}>
            {images.map((image, index) => (
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
      </Form>
    </>
  );
};

export default ProductForm;
