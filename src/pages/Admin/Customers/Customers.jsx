import React from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";

const columns = [
  {
    name: "Customer ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <Button
        className="btn btn-danger btn-sm"
        onClick={() => banCustomer(row.id)}
      >
        Ban
      </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Springfield, IL",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    address: "456 Elm St, Springfield, IL",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-555-5555",
    address: "789 Oak St, Springfield, IL",
  },
  // Add more data as needed
];
const banCustomer = (id) => {
  // Implement the ban logic here
  console.log(`Customer with id ${id} has been banned.`);
};
function Customers() {
  return (
    <div>
      <DataTable
        title="Customers"
        columns={columns}
        data={data}
        pagination
        customStyles={{
          headCells: {
            style: {
              fontSize: "1.25rem", // Adjust the size as needed
              fontWeight: "bold",
            },
          },
        }}
      />
    </div>
  );
}

export default Customers;
