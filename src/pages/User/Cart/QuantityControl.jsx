import { Button, FormControl, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useIncrementQuantityMutation,
  useDecrementQuantityMutation,
} from "../../../libs/rtk/api/cartApiSlice";

function QuantityControl({ productId, quantity, stocks }) {
  const [incrementQuantity, { isLoading: incrementLoading }] =
    useIncrementQuantityMutation();
  const [decrementQuantity, { isLoading: decrementLoading }] =
    useDecrementQuantityMutation();

  const handleIncrement = async () => {
    try {
      await incrementQuantity(productId).unwrap();
    } catch (error) {
      toast.error("An error occurred, please try again later.");
    }
  };

  const handleDecrement = async () => {
    try {
      await decrementQuantity(productId).unwrap();
    } catch (error) {
      toast.error("An error occurred, please try again later.");
    }
  };

  return (
    <InputGroup>
      <Button
        variant="dark"
        disabled={decrementLoading | (quantity <= 1)}
        onClick={handleDecrement}
      >
        -
      </Button>
      <FormControl readOnly className="fs-6" value={quantity} />
      <Button
        variant="dark"
        disabled={incrementLoading | (quantity >= stocks)}
        onClick={handleIncrement}
      >
        +
      </Button>
    </InputGroup>
  );
}

export default QuantityControl;
