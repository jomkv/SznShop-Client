import { useEffect } from "react";
import { Tabs, Tab, Container, Alert } from "react-bootstrap";
import { useGetAllOrdersQuery } from "../../../libs/rtk/api/orderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrdersTable from "./OrdersTable";
import Spinner from "../../../components/Spinner/Spinner";

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

  const renderTabContent = (tabOrders) => {
    if (tabOrders && tabOrders.length === 0) {
      return (
        <Alert variant="dark" className="text-center">
          No orders available for this status.
        </Alert>
      );
    } else {
      return (
        <OrdersTable
          orders={tabOrders}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      );
    }
  };

  return (
    <Container fluid>
      {isLoading && <Spinner large />}
      {isSuccess && orders && (
        <Tabs id="order-tabs" defaultActiveKey="all">
          <Tab eventKey="all" title="All">
            {renderTabContent(orders?.all)}
          </Tab>
          <Tab eventKey="reviewing" title="Reviewing">
            {renderTabContent(orders?.reviewing)}
          </Tab>
          <Tab eventKey="shipping" title="Shipping">
            {renderTabContent(orders?.shipping)}
          </Tab>
          <Tab eventKey="received" title="Received">
            {renderTabContent(orders?.received)}
          </Tab>
          <Tab eventKey="completed" title="Completed">
            {renderTabContent(orders?.completed)}
          </Tab>
          <Tab eventKey="cancelled" title="Cancelled">
            {renderTabContent(orders?.cancelled)}
          </Tab>
          <Tab eventKey="returned" title="Returned">
            {renderTabContent(orders?.returned)}
          </Tab>
          <Tab eventKey="refunded" title="Refunded">
            {renderTabContent(orders?.refunded)}
          </Tab>
        </Tabs>
      )}
    </Container>
  );
}

export default Orders;
