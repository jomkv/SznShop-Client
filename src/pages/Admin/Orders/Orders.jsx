import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Tabs, Tab, Container, Button, Dropdown } from "react-bootstrap";

const commonColumns = [
  {
    name: "Order ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row) => row.customerName,
    sortable: true,
  },
  {
    name: "Order Date",
    selector: (row) => row.orderDate,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Total",
    selector: (row) => row.total,
    sortable: true,
  },
  {
    name: "View",
    cell: (row) => (
      <Button variant="dark" size="sm" onClick={() => handleView(row.id)}>
        <i className="bi bi-eye-fill"></i>
      </Button>
    ),
  },
];

const pendingColumns = [
  ...commonColumns,
  {
    name: "Actions",
    cell: (row) =>
      row.status === "Pending" && (
        <Dropdown>
          <Dropdown.Toggle variant="dark" size="sm"></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleAccept(row.id)}>
              <i className="bi bi-check"></i> Accept
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCancel(row.id)}>
              <i className="bi bi-x"></i> Cancel
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
  },
];

const data = [
  {
    id: 1,
    customerName: "John Doe",
    orderDate: "2021-10-10",
    status: "Pending",
    total: "$100.00",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    orderDate: "2021-10-11",
    status: "Confirmed",
    total: "$150.00",
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    orderDate: "2021-10-12",
    status: "Cancelled/Return",
    total: "$200.00",
  },
  {
    id: 4,
    customerName: "Alice Brown",
    orderDate: "2021-10-13",
    status: "Received",
    total: "$250.00",
  },
];

function Orders() {
  const [key, setKey] = useState("pending");

  const filteredData = data.filter((order) => {
    if (key === "pending") return order.status === "Pending";
    if (key === "confirmed") return order.status === "Confirmed";
    if (key === "cancelled") return order.status === "Cancelled/Return";
    if (key === "received") return order.status === "Received";
    return true;
  });

  const handleView = (id) => {
    // Implement view functionality
    console.log(`View order ${id}`);
  };

  const handleAccept = (id) => {
    // Implement accept functionality
    console.log(`Accept order ${id}`);
  };

  const handleCancel = (id) => {
    // Implement cancel functionality
    console.log(`Cancel order ${id}`);
  };

  const getColumns = () => {
    if (key === "pending") return pendingColumns;
    return commonColumns;
  };

  return (
    <Container>
      <Tabs
        id="order-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="pending" title="Pending">
          <DataTable
            title="Pending Orders"
            columns={getColumns()}
            data={filteredData}
            pagination
            customStyles={{
              table: {
                style: {
                  width: "100%", // Adjust the width as needed
                  height: "500px", // Adjust the height as needed
                },
              },
              headCells: {
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                },
              },
              cells: {
                style: {
                  fontSize: "18px", // Adjust the font size as needed
                },
              },
            }}
          />
        </Tab>
        <Tab eventKey="confirmed" title="Confirmed">
          <DataTable
            title="Confirmed Orders"
            columns={getColumns()}
            data={filteredData}
            pagination
            customStyles={{
              table: {
                style: {
                  width: "100%", // Adjust the width as needed
                  height: "500px", // Adjust the height as needed
                },
              },
              headCells: {
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                },
              },
              cells: {
                style: {
                  fontSize: "18px", // Adjust the font size as needed
                },
              },
            }}
          />
        </Tab>
        <Tab eventKey="cancelled" title="Cancelled/Return">
          <DataTable
            title="Cancelled/Return Orders"
            columns={getColumns()}
            data={filteredData}
            pagination
            customStyles={{
              table: {
                style: {
                  width: "100%", // Adjust the width as needed
                  height: "500px", // Adjust the height as needed
                },
              },
              headCells: {
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                },
              },
              cells: {
                style: {
                  fontSize: "18px", // Adjust the font size as needed
                },
              },
            }}
          />
        </Tab>
        <Tab eventKey="received" title="Received">
          <DataTable
            title="Received Orders"
            columns={getColumns()}
            data={filteredData}
            pagination
            customStyles={{
              table: {
                style: {
                  width: "100%", // Adjust the width as needed
                  height: "500px", // Adjust the height as needed
                },
              },
              headCells: {
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                },
              },
              cells: {
                style: {
                  fontSize: "18px", // Adjust the font size as needed
                },
              },
            }}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Orders;
