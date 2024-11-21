import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeaveHover = () => {
    setIsHovered(false);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card className="w-100">
        <Card.Img
          variant="top"
          style={{ height: "24rem", objectFit: "cover" }}
          src={isHovered ? product.images[1].url : product.images[0].url}
          onMouseOver={handleHover}
          onMouseLeave={handleLeaveHover}
        />
        <Card.Body className="text-center">
          <Card.Title className="mt-2 mb-1 fw-bold fs-6">
            {product.name}
          </Card.Title>
          <Card.Text className="fs-6 ps-2 pe-2">
            {product.description}
          </Card.Text>
          <Card.Text className="fs-6 fw-semibold">
            ₱{product.price.toLocaleString()}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
