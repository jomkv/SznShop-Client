import { useGetDashboardQuery } from "../../../libs/rtk/api/adminApiSlice";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
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
import Spinner from "../../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate, getOrderTotal } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

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
  const [orderPerDay, setOrdersPerDay] = useState([]);
  const { data, isLoading, isError, isSuccess } = useGetDashboardQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.warn("Something went wrong, please try again later.");
    }
  }, [isError]);

  useEffect(() => {
    if (!data && !isSuccess) return;

    setOrdersPerDay([
      data.dailyOrderCount.monday,
      data.dailyOrderCount.tuesday,
      data.dailyOrderCount.wednesday,
      data.dailyOrderCount.thursday,
      data.dailyOrderCount.friday,
      data.dailyOrderCount.saturday,
      data.dailyOrderCount.sunday,
    ]);
  }, [data, isSuccess]);

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: orderPerDay,
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

  const handleCreateProduct = () => {
    navigate("/admin/products?action=createProduct");
  };

  return (
    <>
      {isLoading && <Spinner large />}
      {isSuccess && data && (
        <>
          <Row>
            <Col xs={12} md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={12}>
                      <Card.Title className="fw-bold">
                        Orders Per Day
                      </Card.Title>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <Card.Title className="fw-bold">
                        {data.dailyOrderAverage} (avg)
                      </Card.Title>
                    </Col>
                    <Col xs={9} style={{ height: "150px" }}>
                      <Bar data={barData} options={barOptions} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col
              xs={12}
              md={6}
              className="mb-3 d-flex flex-column justify-content-between gap-3"
            >
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={9}>
                      <Card.Title className="fw-bold fs-6">
                        Total Revenue
                      </Card.Title>
                    </Col>
                    <Col xs={3} className="text-end">
                      <i className="bi bi-wallet2 fs-3" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Card.Title className="fw-bold fs-4">
                        ₱{data.totalRevenue.toLocaleString()}
                      </Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={9}>
                      <Card.Title className="fw-bold fs-6">
                        Active Users
                      </Card.Title>
                    </Col>
                    <Col xs={3} className="text-end">
                      <i className="bi bi-people fs-3" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Card.Title className="fw-bold fs-4">
                        {data.activeUsers}
                      </Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} lg={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Row className="align-items-center mb-3">
                    <Col>
                      <Card.Title className="fw-bold">
                        Newest Products
                      </Card.Title>
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={handleCreateProduct}
                      >
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
                      {data.recentProducts.map((product) => (
                        <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>₱{product.price.toLocaleString()}</td>
                          <td>{formatDate(product.createdAt)}</td>
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
                      {data.recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>
                            {order.address.firstName} {order.address.lastName}
                          </td>
                          <td>₱{getOrderTotal(order).toLocaleString()}</td>
                          <td>{formatDate(order.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default Dashboard;
