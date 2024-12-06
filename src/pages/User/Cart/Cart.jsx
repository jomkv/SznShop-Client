import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "./Cart.css";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import { useGetCartQuery } from "../../../libs/rtk/api/cartApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import RemoveButton from "./RemoveButton";
import QuantityControl from "./QuantityControl";

const Cart = () => {
  const { data: products, isLoading, isError, isSuccess } = useGetCartQuery();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("An error occurred, please try again later.");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      let sum = 0;

      products.forEach((product) => {
        sum += product.productId.price * product.quantity;
      });

      setTotal(sum);
    }
  }, [products, isSuccess]);

  const columns = [
    {
      name: "IMAGE",
      cell: (row) => (
        <img
          src={row.productId.images[0].url}
          alt="product"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      name: "PRODUCT",
      selector: (row) => row.productId.name,
      sortable: true,
      cell: (row) => (
        <div>
          <div className="text-wrap">{row.productId.name}</div>
          <p className="fw-bold">{`[${row.size.toUpperCase()}]`}</p>
        </div>
      ),
    },
    {
      name: "PRICE",
      selector: (row) => row.productId.price,
      sortable: true,
      cell: (row) => <p>{`₱${row.productId.price.toLocaleString()}`}</p>,
    },
    {
      name: "QUANTITY",
      cell: (row) => (
        <QuantityControl productId={row._id} quantity={row.quantity} />
      ),
    },
    {
      name: "TOTAL",
      selector: (row) => row.productId.price * row.quantity || 0,
      sortable: true,
      cell: (row) => (
        <p>{`₱${(row.productId.price * row.quantity).toLocaleString()}`}</p>
      ),
    },
    {
      name: "REMOVE",
      cell: (row) => <RemoveButton id={row._id} />,
    },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold">SHOPPING BAG</h2>
      <Row>
        <Col md={8}>
          <div className="table-container table-responsive mt-4">
            {isLoading && <Spinner large />}
            {products && isSuccess && (
              <DataTable
                columns={columns}
                data={products}
                striped
                bordered
                hover
                fixedHeader
                fixedHeaderScrollHeight="150rem"
              />
            )}
          </div>
        </Col>
        <Col md={4}>
          <OrderSummary isCart total={total} />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
