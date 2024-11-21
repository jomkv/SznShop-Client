import { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeaveHover = () => {
    setIsHovered(false);
  };

  const handleRedirect = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card className="w-100 prod-card">
      <Card.Img
        variant="top"
        className="clickable"
        style={{ height: "24rem", objectFit: "cover" }}
        src={isHovered ? product.images[1].url : product.images[0].url}
        onMouseOver={handleHover}
        onMouseLeave={handleLeaveHover}
        onClick={handleRedirect}
      />
      <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
        <p
          className="mt-2 mb-1 fw-bold fs-6 pointer clickable"
          onClick={handleRedirect}
        >
          {product.name}
        </p>
        <p className="fs-6 ps-2 pe-2 clickable" onClick={handleRedirect}>
          {product.description}
        </p>
        <p className="fs-6 fw-semibold clickable" onClick={handleRedirect}>
          ₱{product.price.toLocaleString()}
        </p>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
