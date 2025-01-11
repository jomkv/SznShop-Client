import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { formatDate, getOrderTotal } from "../../../utils/helper";
import ActionButtons from "./ActionButtons";

function OrdersTable({ orders, isLoading, isSuccess }) {
  const [ordersResult, setOrdersResult] = useState(orders);
  const [search, setSearch] = useState("");

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
      selector: (row) => `₱${getOrderTotal(row).toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons order={row} />,
    },
  ];

  useEffect(() => {
    if (!isSuccess) return;

    // const result = orders.filter((order) => {
    //   return order.
    // })
  }, [search]);

  console.log(orders);

  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess && (
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
      )}
    </>
  );
}

export default OrdersTable;
