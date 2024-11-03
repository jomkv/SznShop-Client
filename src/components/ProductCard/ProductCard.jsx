import { Card } from "react-bootstrap";

const mockData = {
  name: "GOOPIMADE",
  description: "GOOPiMADE® “X_Model-01” New-Form Pocket T-shirt",
  price: 3460,
};

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: "22rem" }}>
      <Card.Img
        variant="top"
        style={{ height: "27rem", objectFit: "cover" }}
        src={
          product
            ? product.images[0].url
            : "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fa7%2F6f%2FVest-1-1-c99de.jpg?fit=max&w=720&q=90"
        }
      />
      <Card.Body className="text-center">
        <Card.Title className="mt-2 mb-1 fw-bold fs-6">
          {product ? product.name : mockData.name}
        </Card.Title>
        <Card.Text className="fs-6 ps-2 pe-2">
          {product ? product.description : mockData.description}
        </Card.Text>
        <Card.Text className="fs-6 fw-semibold">
          ₱
          {product
            ? product.price.toLocaleString()
            : mockData.price.toLocaleString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
