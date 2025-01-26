import { useEffect, useState } from "react";
import { Col, Form, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { formatDate, getOrderTotal } from "../../../utils/helper";
import ActionButtons from "./ActionButtons";

function OrdersTable({ orders, isLoading, isSuccess }) {
  const [ordersResult, setOrdersResult] = useState(orders);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const result = orders.filter((order) => {
      const searchLower = search.toLowerCase();
      return (
        order._id.toLowerCase().includes(searchLower) ||
        `${order.address.firstName} ${order.address.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        formatDate(order.createdAt).toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        getOrderTotal(order).toString().toLowerCase().includes(searchLower)
      );
    });
    setOrdersResult(result);
  }, [search, orders]);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row._id,
      sortable: true,
    },
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
      selector: (row) => `₱${getOrderTotal(row).toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons order={row} />,
    },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess && orders && (
        <>
          <div className="d-flex w-100 align-items-center mt-2 mb-2">
            <p className="fs-5 mb-0 me-1">Search:</p>
            <Form.Control
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "15rem",
              }}
            />
          </div>

          <Col sm={6}></Col>
          <DataTable
            columns={columns}
            data={ordersResult}
            fixedHeaderScrollHeight="500px"
            customStyles={{
              table: {
                style: {
                  width: "100%", // Adjust the width as needed
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
        </>
      )}
    </>
  );
}

export default OrdersTable;
