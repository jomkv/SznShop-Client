import { useEffect, useState } from "react";
import { Container, Row, Col, FormControl, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "./Cart.css";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import { useGetCartQuery } from "../../../libs/rtk/api/cartApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";

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
    console.log(products);
  }, [products]);

  // const handleQuantityChange = (index, newQuantity) => {
  //   const updatedProducts = [...products];
  //   updatedProducts[index].quantity = newQuantity;
  //   updatedProducts[index].total = newQuantity * updatedProducts[index].price;
  //   setProducts(updatedProducts);
  // };

  // const calculateTotal = () => {
  //   return products
  //     .reduce((total, product) => total + product.total, 0)
  //     .toFixed(2);
  // };

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
      cell: (row, index) => (
        <FormControl
          type="number"
          value={row.quantity}
          min="1"
          // onChange={(e) =>
          //   // handleQuantityChange(index, parseInt(e.target.value))
          // }
        />
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
      cell: (row, index) => (
        <Button
          variant="dark"
          size="sm"
          // onClick={() => handleRemoveProduct(index)}
        >
          <i className="bi bi-trash-fill"></i>
        </Button>
      ),
    },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold">SHOPPING BAG</h2>
      <Row>
        <Col md={8}>
          <div className="table-container table-responsive mt-4">
            {isLoading && <Spinner large />}
            {products && (
              <DataTable
                columns={columns}
                data={products}
                striped
                bordered
                hover
                fixedHeader
                fixedHeaderScrollHeight="400px"
              />
            )}
          </div>
        </Col>
        <Col md={4}>
          <OrderSummary />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
