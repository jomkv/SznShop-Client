import { useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useGetAllOrdersQuery } from "../../../libs/rtk/api/orderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrdersTable from "./OrdersTable";

function Orders() {
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

  console.log(orders);

  return (
    <Container fluid>
      <Tabs id="order-tabs" defaultActiveKey="all">
        <Tab eventKey="all" title="All">
          <OrdersTable
            orders={orders?.all}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
        <Tab eventKey="reviewing" title="Reviewing">
          <OrdersTable
            orders={orders?.reviewing}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
        <Tab eventKey="shipping" title="Shipping">
          <OrdersTable
            orders={orders?.shipping}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
        <Tab eventKey="received" title="Received">
          <OrdersTable
            orders={orders?.received}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <OrdersTable
            orders={orders?.completed}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
        <Tab eventKey="cancelled" title="Cancelled">
          <OrdersTable
            orders={orders?.cancelled}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
        <Tab eventKey="returned" title="Returned">
          <OrdersTable
            orders={orders?.returned}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
        <Tab eventKey="refunded" title="Refunded">
          <OrdersTable
            orders={orders?.refunded}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Orders;
