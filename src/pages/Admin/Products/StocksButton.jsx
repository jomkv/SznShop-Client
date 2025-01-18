import { Button, Modal } from "react-bootstrap";
import { useEditStocksMutation } from "../../../libs/rtk/api/productApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import StocksForm from "./StocksForm";
import { toast } from "react-toastify";

function StocksButton({ stocks }) {
  const [editStocks, { isLoading }] = useEditStocksMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [totalStocks, setTotalStocks] = useState(null);
  const [color, setColor] = useState(null);

  const hideModal = () => {
    setShow(false);
    setIsEdit(false);
  };

  const showModal = () => {
    setIsEdit(false);
    setShow(true);
  };

  useEffect(() => {
    let total = 0;

    if (stocks.xs > 0) total += stocks.xs;
    if (stocks.sm > 0) total += stocks.sm;
    if (stocks.md > 0) total += stocks.md;
    if (stocks.lg > 0) total += stocks.lg;
    if (stocks.xl > 0) total += stocks.xl;
    if (stocks.xxl > 0) total += stocks.xxl;

    setTotalStocks(total);
  }, []);

  useEffect(() => {
    if (totalStocks < 20) {
      setColor("#FF6961"); // red
    } else if (totalStocks < 30) {
      setColor("#ffd400"); // yellow
    } else {
      setColor("#77DD77");
    }
  }, [totalStocks, stocks]);

  const onSubmit = async (formData) => {
    try {
      await editStocks({ productId: stocks.productId, ...formData }).unwrap();
      hideModal();
      toast.success("Stocks updated successfully.");
    } catch (error) {
      hideModal();
      toast.warn("An error has occured while updating stocks.");
    }
  };

  return (
    <>
      <Button
        variant="dark"
        onClick={() => {
          showModal();
        }}
      >
        <i className="bi bi-list-ul fs-5 fw-bold" />
      </Button>
      {color && (
        <i
          className="bi bi-circle-fill ms-1"
          style={{
            color: color,
          }}
        />
      )}

      <Modal
        centered
        scrollable
        show={show}
        onHide={() => {
          hideModal();
        }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StocksForm stocks={stocks} isEdit={isEdit} onSubmit={onSubmit} />
        </Modal.Body>
        <Modal.Footer>
          {isEdit && (
            <>
              <Button
                id="saveButton"
                variant="dark"
                className="p-3 pt-2 pb-2 fs-5 fw-semibold"
                type="submit"
                style={{
                  color: "white",
                  width: "10rem",
                }}
                form="stocksForm"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
              <Button
                variant="secondary"
                className="p-3 pt-2 pb-2 fs-5 fw-semibold"
                type="button"
                style={{
                  color: "white",
                  width: "10rem",
                }}
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
          {!isEdit && (
            <Button
              id="editButton"
              variant="dark"
              className="p-3 pt-2 pb-2 fs-5 fw-semibold"
              type="button"
              style={{
                color: "white",
                width: "10rem",
              }}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StocksButton;
