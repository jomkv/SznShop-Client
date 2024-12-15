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
      selector: (row) => `₱${getOrderTotal(row).toLocaleString()}`,
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

  const [key, setKey] = useState("all");

  return (
    <Container fluid>
      <Tabs id="order-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="all" title="All">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.all}
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
        </Tab>
        <Tab eventKey="reviewing" title="Reviewing">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.reviewing}
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
        </Tab>
        <Tab eventKey="shipping" title="Shipping">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.shipping}
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
        </Tab>
        <Tab eventKey="received" title="Received">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.received}
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
        </Tab>
        <Tab eventKey="completed" title="Completed">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.completed}
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
        </Tab>
        <Tab eventKey="cancelled" title="Cancelled">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.cancelled}
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
        </Tab>
        <Tab eventKey="returned" title="Returned">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.returned}
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
        </Tab>
        <Tab eventKey="refunded" title="Refunded">
          {isLoading && <Spinner />}
          {isSuccess && (
            <DataTable
              columns={columns}
              data={orders.refunded}
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
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Orders;
