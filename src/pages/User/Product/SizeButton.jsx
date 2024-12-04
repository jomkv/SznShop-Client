import { ToggleButton } from "react-bootstrap";

function SizeButton({ size, stock, selectedSize, setSelectedSize }) {
  return (
    <ToggleButton
      type="radio"
      variant="outline-dark"
      checked={selectedSize === size}
      onClick={() => {
        setSelectedSize(size);
      }}
      className="w-100 h-100"
      disabled={stock <= 0}
    >
      {size.toUpperCase()}
    </ToggleButton>
  );
}

export default SizeButton;
