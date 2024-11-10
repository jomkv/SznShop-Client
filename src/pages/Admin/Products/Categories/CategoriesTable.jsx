import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditCategoryProductsModal from "./EditCategoryProductsModal";
import { useGetAllCategoriesQuery } from "../../../../libs/rtk/api/categoryApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function CategoriesTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const handleShowModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const columns = [
    {
      name: "Category Name",
      sortable: true,
      selector: (row) => row.name,
      cell: (row) => <div className="fs-5">{row.name}</div>,
    },
    {
      name: "Product Count",
      sortable: true,
      selector: (row) => row.productCount,
      cell: (row) => <div className="fs-5">{row.productCount}</div>,
    },
    {
      name: "Show at Home",
      sortable: true,
      selector: (row) => row.showInMenu,
      cell: (row) => <div className="fs-5">{row.showInMenu.toString()}</div>,
    },
    {
      name: "Actions",
      sortable: false,
      cell: (row) => (
        <button
          className="btn btn-dark fw-bold fs-5"
          onClick={() => handleShowModal(row._id)}
        >
          Edit
        </button>
      ),
    },
  ];

  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (isError) {
      navigate("/admin");
      toast.warn("An error has occured while fetching categories.");
    }
  }, [isError, navigate]);

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
      {isSuccess && categories && (
        <>
          <div className="w-100 d-flex justify-content-end mt-2 mb-2">
            <Button
              className="d-flex align-items-center p-0 ps-2 pe-3"
              variant="dark"
            >
              <i className="bi bi-plus fs-3 m-0 p-0" />
              <p className="fs-6 m-0">Create Category</p>
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={categories}
            striped
            sortable={true}
            highlightOnHover
          />
        </>
      )}
      {selectedId && (
        <EditCategoryProductsModal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          categoryId={selectedId}
        />
      )}
    </>
  );
}

export default CategoriesTable;
