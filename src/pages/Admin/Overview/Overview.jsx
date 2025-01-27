import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useGetOverviewQuery } from "../../../libs/rtk/api/adminApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Overview() {
  const { data, isLoading, isSuccess, isError } = useGetOverviewQuery();
  const [salesData, setSalesData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong, please try again later.");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      setSalesData({
        labels: data.salesData.labels,
        datasets: [
          {
            label: "Sales (₱)",
            data: data.salesData.data,
            borderColor: "#4caf50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            tension: 0.3,
          },
        ],
      });

      setCategoriesData({
        labels: data.categoryData.labels,
        datasets: [
          {
            label: "Revenue (₱)",
            data: data.categoryData.data,
            backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
          },
        ],
      });

      setOrdersData({
        labels: data.ordersData.labels,
        datasets: [
          {
            label: "Orders",
            data: data.ordersData.data,
            borderColor: "#2196f3",
            backgroundColor: "rgba(33, 150, 243, 0.2)",
            tension: 0.3,
          },
        ],
      });
    }
  }, [isSuccess, data]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Container fluid>
      <h1 className="my-4">Sales Report Overview</h1>
      {isLoading && <Spinner large />}
      {isSuccess && data && (
        <>
          <Row>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Total Sales</Card.Title>
                  <Card.Text>₱{data.totalSales.toLocaleString()}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text>{data.totalOrders.toLocaleString()}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Total Customers</Card.Title>
                  <Card.Text>{data.totalCustomers.toLocaleString()}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>New Customers</Card.Title>
                  <Card.Text>50</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            {salesData && (
              <Col md={12}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Sales Chart</Card.Title>
                    <Line data={salesData} options={chartOptions} />
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
          <Row>
            {ordersData && (
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Orders Chart</Card.Title>
                    <Line data={ordersData} options={chartOptions} />
                  </Card.Body>
                </Card>
              </Col>
            )}
            {categoriesData && (
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Revenue by Product Categories</Card.Title>
                    <Bar
                      data={categoriesData}
                      options={{
                        responsive: true,
                        plugins: { legend: { position: "top" } },
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Overview;
