import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { createPortal } from "react-dom";
import "datatables.net-responsive-bs5";
import "datatables.net-scroller-bs5";

import mockProducts from "./mockProducts";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function ProductsTable({ showmodal }) {
  const [buttonDiv, setButtonDiv] = useState(null);

  useEffect(() => {
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    setButtonDiv(buttonContainer);
  }, []);

  DataTable.use(DT);

  // const [tableData, setTableData] = useState([
  //   ["Tiger Nixon", "System Architect"],
  //   ["Garrett Winters", "Accountant"],
  // ]);

  return (
    <>
      {buttonDiv && (
        <DataTable
          className="display table table-striped compact mt-0 pt-0"
          options={{
            scroller: true,
            info: false,
            paging: true,
            responsive: true,
            scrollY: "40rem",
            language: {
              search: "Search product",
            },
            layout: {
              topStart: "search",
              topEnd: buttonDiv,
            },
            destroy: true,
          }}
        >
          {createPortal(
            <Button
              className="d-flex align-items-center p-0 ps-2 pe-3"
              variant="dark"
              onClick={() => showmodal()}
            >
              <i className="bi bi-plus fs-3 m-0 p-0" />
              <p className="fs-6 m-0">Create Product</p>
            </Button>,
            buttonDiv
          )}
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Stocks</th>
              <th className="text-center">View</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product, index) => (
              <tr key={index}>
                <td className="text-center">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td className="text-center">{product.name}</td>
                <td className="text-center">₱{product.price}</td>
                <td className="text-center">10</td>
                <td className="text-center">
                  <button className="btn btn-primary">View</button>
                </td>
                <td className="text-center">
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}
    </>
  );
}

export default ProductsTable;
