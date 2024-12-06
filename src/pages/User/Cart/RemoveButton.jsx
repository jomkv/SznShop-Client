import { Button } from "react-bootstrap";
import { useRemoveFromCartMutation } from "../../../libs/rtk/api/cartApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";

function RemoveButton({ id }) {
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  const handleClick = async () => {
    try {
      await removeFromCart(id).unwrap();
      toast.success("Product removed from cart");
    } catch (error) {
      toast.warn("Something went wrong, please try again later");
    }
  };

  return (
    <Button variant="dark" size="sm" disabled={isLoading} onClick={handleClick}>
      {isLoading ? <Spinner /> : <i className="bi bi-trash-fill" />}
    </Button>
  );
}

export default RemoveButton;
