import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

function Settings() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the image upload logic here
    console.log("Image uploaded:", image);
  };

  return (
    <Container>
      <h2 className="my-4">Admin Setting</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Home Page Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <Button variant="dark" type="submit">
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Settings;
