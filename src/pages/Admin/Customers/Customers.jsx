import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetUsersQuery } from "../../../libs/rtk/api/userApiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";

const columns = [
  {
    name: "Customer ID",
    selector: (row) => row._id,
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row) => row.displayName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
];

function Customers() {
  const { data: customers, isLoading, isError, isSuccess } = useGetUsersQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong, please try again later");
    }
  }, [isError]);

  return (
    <div>
      {isLoading && <Spinner large />}
      {isSuccess && customers && (
        <DataTable
          title="Customers"
          columns={columns}
          data={customers}
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
      )}
    </div>
  );
}

export default Customers;
