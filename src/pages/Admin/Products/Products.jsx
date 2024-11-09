import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./Products.css";
import ProductsTable from "./ProductsTable";
import CreateProductModal from "./CreateProductModal";
import CategoriesTable from "./Categories/CategoriesTable";

function Products() {
  const [tab, setTab] = useState("active");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

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
        <Tab eventKey="active" title="Listed Products">
          {tab === "active" && (
            <ProductsTable showmodal={handleShowModal} filter="active" />
          )}
        </Tab>
        <Tab eventKey="inactive" title="Unlisted Products">
          {tab === "inactive" && (
            <ProductsTable showmodal={handleShowModal} filter="inactive" />
          )}
        </Tab>
        <Tab eventKey="categories" title="Categories">
          {tab === "categories" && <CategoriesTable />}
        </Tab>
      </Tabs>
      <CreateProductModal onHide={handleHideModal} show={showModal} />
    </div>
  );
}

export default Products;
