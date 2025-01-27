import { useEffect, useState } from "react";
import { Col, Form, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { formatDate, getOrderTotal } from "../../../utils/helper";
import ActionButtons from "./ActionButtons";

function OrdersTable({ orders, isLoading, isSuccess }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchLower = search.toLowerCase();
    const result = orders.filter((order) =>
      [
        order._id,
        `${order.address.firstName} ${order.address.lastName}`,
        formatDate(order.createdAt),
        order.status,
        getOrderTotal(order).toString(),
      ].some((field) => field.toLowerCase().includes(searchLower))
    );
    setFilteredOrders(result);
  }, [search, orders]);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row._id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Customer Name",
      selector: (row) => `${row.address.firstName} ${row.address.lastName}`,
      sortable: true,
      wrap: true,
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
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "180px",
    },
  ];

  return (
    <>
      {isLoading && <Spinner animation="border" />}
      {isSuccess && orders.length > 0 && (
        <>
          <div className="d-flex w-100 align-items-center mt-2 mb-2">
            <p className="fs-5 mb-0 me-2 fw-semibold">Search:</p>
            <Form.Control
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "15rem" }}
            />
          </div>

          <Col sm={12}>
            <DataTable
              columns={columns}
              data={filteredOrders}
              fixedHeader
              fixedHeaderScrollHeight="500px"
              responsive
              customStyles={{
                headCells: {
                  style: {
                    fontWeight: "bold",
                    fontSize: "15px",
                    backgroundColor: "#f8f9fa",
                    textAlign: "center",
                  },
                },
                cells: {
                  style: {
                    fontSize: "14px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  },
                },
                rows: {
                  style: {
                    minHeight: "70px",
                  },
                },
              }}
            />
          </Col>
        </>
      )}
    </>
  );
}

export default OrdersTable;
