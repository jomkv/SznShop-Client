import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { createPortal } from "react-dom";
import "datatables.net-responsive-bs5";
import "datatables.net-scroller-bs5";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLazyGetProductsAdminQuery } from "../../../libs/rtk/api/productApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import ActionsButton from "./ActionsButton";
import StocksButton from "./StocksButton";

function ProductsTable({ showmodal, filter }) {
  const [buttonDiv, setButtonDiv] = useState(null);
  const [getProducts, { data: products, isLoading }] =
    useLazyGetProductsAdminQuery(filter);
  const navigate = useNavigate();

  const fetchProductsOrRedirect = async () => {
    try {
      await getProducts().unwrap();
    } catch (error) {
      navigate("/admin");
      toast.warn("An error has occured while fetching products.");
    }
  };

  useEffect(() => {
    fetchProductsOrRedirect();

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    setButtonDiv(buttonContainer);
  }, []);

  DataTable.use(DT);

  return (
    <>
      {isLoading && (
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{
            height: "70vh",
          }}
        >
          <Spinner large />
        </div>
      )}
      {buttonDiv && !isLoading && (
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
            isLoading: isLoading,
            columnDefs: [
              {
                orderable: false,
                searchable: false,
                targets: [0, 3, 4],
              },
              {},
            ],
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
              <th className="text-center">Manage Stocks</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              products &&
              products[filter] &&
              products[filter].map((product, index) => (
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
                  <td className="text-center">
                    <StocksButton stocks={product.stocks} />
                  </td>
                  <td className="text-center">
                    <ActionsButton product={product} />
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
