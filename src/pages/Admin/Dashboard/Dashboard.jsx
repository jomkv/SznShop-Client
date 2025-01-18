import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: [50, 60, 70, 80, 90, 100, 110],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  const productRows = [
    { id: 1, name: "Product A", amount: "₱1,200.00", date: "2021-10-01" },
    { id: 2, name: "Product B", amount: "₱1,500.00", date: "2021-10-02" },
    { id: 3, name: "Product C", amount: "₱1,800.00", date: "2021-10-03" },
    { id: 4, name: "Product D", amount: "₱1,200.00", date: "2021-10-04" },
    { id: 5, name: "Product E", amount: "₱1,200.00", date: "2021-10-05" },
  ];

  return (
    <Container fluid>
      <Row>
        {["Daily Average Orders", "Active Users", "Total Revenue"].map(
          (title, index) => (
            <Col xs={12} md={4} className="mb-3" key={index}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={9}>
                      <Card.Title className="fw-bold">{title}</Card.Title>
                    </Col>
                    <Col xs={3} className="text-end">
                      <i
                        className={`bi ${
                          title === "Daily Average Orders"
                            ? "bi-clipboard-data-fill"
                            : title === "Active Users"
                            ? "bi-people-fill"
                            : "bi-cash-coin"
                        } fs-1`}
                      ></i>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <Card.Title className="fw-bold">
                        {title === "Daily Average Orders"
                          ? "₱23,000.00"
                          : title === "Active Users"
                          ? "1,200"
                          : "₱1,200,000.00"}
                      </Card.Title>
                    </Col>
                    <Col xs={6} style={{ height: "150px" }}>
                      {title === "Active Users" ? (
                        <Line data={lineData} options={lineOptions} />
                      ) : (
                        <Bar data={barData} options={barOptions} />
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
      <Row className="mt-3">
        <Col xs={12} lg={6} className="mb-3">
          <Card>
            <Card.Body>
              <Row className="align-items-center mb-3">
                <Col>
                  <Card.Title className="fw-bold">Products</Card.Title>
                </Col>
                <Col xs="auto">
                  <Button variant="dark" size="sm" className="me-2">
                    Most Sell
                  </Button>
                  <Button variant="dark" size="sm">
                    <i className="bi bi-plus"></i> Add Product
                  </Button>
                </Col>
              </Row>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.amount}</td>
                      <td>{product.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="fw-bold">Recent Orders</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.amount}</td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
