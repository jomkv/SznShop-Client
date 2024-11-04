import { Button, Modal } from "react-bootstrap";
import { useEditStocksMutation } from "../../../libs/rtk/api/productApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { useState } from "react";
import StocksForm from "./StocksForm";
import { toast } from "react-toastify";

function StocksButton({ stocks }) {
  const [editStocks, { isLoading }] = useEditStocksMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);

  const hideModal = () => {
    setShow(false);
    setIsEdit(false);
  };

  const showModal = () => {
    setIsEdit(false);
    setShow(true);
  };

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
