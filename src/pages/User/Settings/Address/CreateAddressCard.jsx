import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CreateAddressCard() {
  return (
    <Link to="/addnewaddress" className="text-decoration-none">
      <Button
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          height: "22rem",
          width: "15rem",
          border: "1px solid rgba(0, 0, 0, 0.3)",
        }}
        variant="light"
        className="text-decoration-none w-100 s"
      >
        <i className="bi bi-plus-lg" style={{ fontSize: "2rem" }}></i>
        <span style={{ marginTop: "10px" }}>CREATE A NEW ADDRESS</span>
      </Button>
    </Link>
  );
}

export default CreateAddressCard;
