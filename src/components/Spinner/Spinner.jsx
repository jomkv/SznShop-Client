import { Spinner as BootstrapSpinner } from "react-bootstrap";

function Spinner({ large }) {
  const style = large
    ? {
        width: "5rem",
        height: "5rem",
      }
    : {};

  return (
    <BootstrapSpinner animation="border" role="status" style={style}>
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  );
}

export default Spinner;
