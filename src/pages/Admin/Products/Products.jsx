import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./Products.css";
import ProductsTable from "./ProductsTable";

function Products() {
  const [tab, setTab] = useState("active");

  return (
    <div
      className="p-2 rounded-3"
      style={{
        backgroundColor: "transparent",
        minHeight: "85vh",
        maxHeight: "85vh",
      }}
    >
      <Tabs
        activeKey={tab}
        onSelect={(k) => setTab(k)}
        className="fw-semibold m-0 p-0"
      >
        <Tab eventKey="active" title="Active">
          {tab === "active" && <ProductsTable />}
        </Tab>
        <Tab eventKey="inactive" title="Inactive">
          {tab === "inactive" && <ProductsTable />}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Products;
