import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
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
  const [filter, setFilter] = useState("6m"); // Default filter is 6 months

  // Example data for sales
  const salesDataFull = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales ($)",
        data: [
          5000, 7000, 8000, 6000, 9000, 10000, 11000, 15000, 12000, 17000,
          16000, 20000,
        ],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Data for Revenue by Product Categories
  const categoryData = {
    labels: [
      "Electronics",
      "Fashion",
      "Home & Garden",
      "Toys",
      "Beauty",
      "Sports",
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [20000, 15000, 18000, 12000, 9000, 15000],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
        ],
      },
    ],
  };

  // Function to filter sales data
  const filterSalesData = (filter) => {
    const allLabels = salesDataFull.labels;
    const allData = salesDataFull.datasets[0].data;

    switch (filter) {
      case "6m":
        return {
          labels: allLabels.slice(-6),
          datasets: [
            {
              ...salesDataFull.datasets[0],
              data: allData.slice(-6),
            },
          ],
        };
      case "12m":
        return salesDataFull; // Full year
      case "1y":
        return {
          labels: ["2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              ...salesDataFull.datasets[0],
              data: [50000, 70000, 80000, 90000, 100000], // Example yearly data
            },
          ],
        };
      default:
        return salesDataFull;
    }
  };

  const filteredSalesData = filterSalesData(filter);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Data",
      },
    },
  };

  return (
    <Container fluid>
      <h1 className="my-4">Sales Report Overview</h1>
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>$50,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>1,200</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>800</Card.Text>
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
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                Sales Chart
                <Form.Select
                  className="w-auto d-inline-block ms-3"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="6m">Last 6 Months</option>
                  <option value="12m">Last 12 Months</option>
                  <option value="1y">Last 5 Years</option>
                </Form.Select>
              </Card.Title>
              <Line data={filteredSalesData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Orders Chart</Card.Title>
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Orders",
                      data: [200, 400, 600, 800, 1000, 1200],
                      borderColor: "#2196f3",
                      backgroundColor: "rgba(33, 150, 243, 0.2)",
                      tension: 0.3,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Revenue by Product Categories</Card.Title>
              <Bar
                data={categoryData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Overview;
