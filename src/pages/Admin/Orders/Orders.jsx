import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tabs, Tab, Container, Button, Dropdown } from "react-bootstrap";
import { useGetAllOrdersQuery } from "../../../libs/rtk/api/orderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDate, getOrderTotal } from "../../../utils/helper";
import Spinner from "../../../components/Spinner/Spinner";

function Orders() {
  const commonColumns = [
    {
      name: "Customer Name",
      selector: (row) => `${row.address.firstName} ${row.address.lastName}`,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => `₱${getOrderTotal(row.products).toLocaleString()}`,
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

  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllOrdersQuery();

  useEffect(() => {
    if (isError) {
      toast.warn("Something went wrong, please try again later.");
      navigate("/admin");
    }
  }, [isError]);

  console.log(orders);

  const [key, setKey] = useState("pending");

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
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              title="Pending Orders"
              columns={getColumns()}
              data={orders}
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
          )}
        </Tab>
        {/* <Tab eventKey="confirmed" title="Confirmed">
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
        </Tab> */}
      </Tabs>
    </Container>
  );
}

export default Orders;
