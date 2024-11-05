import Spinner from "../Spinner/Spinner";

function LoadingSreen() {
  return (
    <div
      className="d-flex align-items-center justify-content-center bg"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spinner large={true} />
    </div>
  );
}

export default LoadingSreen;
