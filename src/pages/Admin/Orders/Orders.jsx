import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useGetAllOrdersQuery } from "../../../libs/rtk/api/orderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDate, getOrderTotal } from "../../../utils/helper";
import Spinner from "../../../components/Spinner/Spinner";
import ActionButtons from "./ActionButtons";

function Orders() {
  const columns = [
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
      name: "Actions",
      cell: (row) => <ActionButtons order={row} />,
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

  const [key, setKey] = useState("pending");

  return (
    <Container fluid>
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
              columns={columns}
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
