import { Button } from "react-bootstrap";

function AddressCard({ address }) {
  return (
    <div
      style={{
        padding: "10px",
        minHeight: "15rem",
        border: "1px solid rgba(0, 0, 0, 0.3)",
      }}
      className="w-100 d-flex flex-column"
    >
      <p className="fw-bolder fs-4">{address.addressLabel}</p>
      <p className="fw-semibold fs-5 mb-0">{`${address.firstName} ${address.lastName}`}</p>
      <p className="mb-0">{address.address}</p>
      <p className="mb-0">
        {address.municipality}, {address.postalCode}
      </p>
      <p className="mb-0">{address.province}</p>
      <p className="mb-0">{address.region}</p>
      <br />
      <p className="mb-0">PHONE</p>
      <p>+63 {address.phoneNumber}</p>
      <div className="d-flex justify-content-between">
        <Button variant="dark" className="fw-semibold">
          Edit
        </Button>
        <Button variant="dark" className="fw-semibold">
          Set as Default
        </Button>
        <Button variant="dark" className="fw-semibold">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
