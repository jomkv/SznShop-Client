import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  FormControl,
  Button,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import "./Cart.css";

const Cart = () => {
  const [products, setProducts] = useState([
    {
      name: "TC Basic Long Sleeve T-shirt",
      quantity: 1,
      price: 10.0,
      total: 10.0,
      image:
        "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2F52%2F94%2FlongTshirt-1-1-90e40.jpg?fit=max&w=2160&q=90",
    },
    {
      name: "HYUKOH & SUNSET ROLLERCOASTER [AAA] Short Sleeve T-shirt",
      quantity: 2,
      price: 15.0,
      total: 30.0,
      image:
        "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fc2%2Fc2%2Ftshirt-3-1-9621a.jpg?fit=max&w=2160&q=90",
    },
    {
      name: "HYUKOH & SUNSET ROLLERCOASTER [AAA] Short Sleeve T-shirt",
      quantity: 3,
      price: 15.0,
      total: 45.0,
      image:
        "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fc2%2Fc2%2Ftshirt-3-1-9621a.jpg?fit=max&w=2160&q=90",
    },
    {
      name: "HYUKOH & SUNSET ROLLERCOASTER [AAA] Short Sleeve T-shirt",
      quantity: 4,
      price: 15.0,
      total: 60.0,
      image:
        "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fc2%2Fc2%2Ftshirt-3-1-9621a.jpg?fit=max&w=2160&q=90",
    },
    {
      name: "HYUKOH & SUNSET ROLLERCOASTER [AAA] Short Sleeve T-shirt",
      quantity: 5,
      price: 15.0,
      total: 75.0,
      image:
        "https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fc2%2Fc2%2Ftshirt-3-1-9621a.jpg?fit=max&w=2160&q=90",
    },
  ]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    updatedProducts[index].total = newQuantity * updatedProducts[index].price;
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return products
      .reduce((total, product) => total + product.total, 0)
      .toFixed(2);
  };

  const columns = [
    {
      name: "IMAGE",
      cell: (row) => (
        <img
          src={row.image}
          alt="product"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      name: "PRODUCT",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div className="text-wrap">{row.name}</div>,
    },
    {
      name: "PRICE",
      selector: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "QUANTITY",
      cell: (row, index) => (
        <FormControl
          type="number"
          value={row.quantity}
          min="1"
          onChange={(e) =>
            handleQuantityChange(index, parseInt(e.target.value))
          }
        />
      ),
    },
    {
      name: "TOTAL",
      selector: (row) => `$${row.total.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "REMOVE",
      cell: (row, index) => (
        <Button
          variant="dark"
          size="sm"
          onClick={() => handleRemoveProduct(index)}
        >
          <i class="bi bi-trash-fill"></i>
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
            <DataTable
              columns={columns}
              data={products}
              striped
              bordered
              hover
              fixedHeader
              fixedHeaderScrollHeight="400px"
            />
          </div>
        </Col>
        <Col md={4}>
          <Card style={{ width: "100%" }} className="mt-4">
            <Card.Body>
              <Card.Header className="fw-bold text-center fs-5">
                ORDER SUMMARY
              </Card.Header>
              <Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <span>SUBTOTAL</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>SHIPPING FEE</span>
                  <span>$10.00</span>
                </div>
                <div className="d-flex justify-content-between mt-5">
                  <span className="fs-5 fw-bold">ORDER TOTAL</span>
                  <span>
                    ${(parseFloat(calculateTotal()) + 10.0).toFixed(2)}
                  </span>
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button className="w-100" variant="dark">
                Checkout
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
