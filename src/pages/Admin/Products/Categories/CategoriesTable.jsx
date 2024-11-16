import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useGetAllCategoriesQuery } from "../../../../libs/rtk/api/categoryApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import CreateCategoryModal from "./CreateCategoryModal";
import CategoryActionsButton from "./CategoryActionsButton";

function CategoriesTable() {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

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
        <CategoryActionsButton
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          category={row}
        />
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
              onClick={() => setShowCreateModal(true)}
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
      <CreateCategoryModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
    </>
  );
}

export default CategoriesTable;
