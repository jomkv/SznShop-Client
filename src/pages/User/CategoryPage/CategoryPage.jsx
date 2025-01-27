import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";
import { Container, Row, Col } from "react-bootstrap";
import { useGetProductsByCategoryQuery } from "../../../libs/rtk/api/productApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import ProductCard from "../../../components/ProductCard/ProductCard"; // Import ProductCard component

function CategoryPage() {
  const { categoryName } = useParams(); // Get category name from URL params
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);

  const {
    data, // Destructure response, with default to empty object
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsByCategoryQuery(categoryName);

  // Handle errors
  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Category not found.");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      setCategory(data.category);
      setProducts(data.products);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isLoading && <Spinner large />}
      {isSuccess && data && category && products && (
        <Container fluid>
          <div className="fs-2 fw-bold">{category.name}</div>
          <p>{category.description}</p>
          <Row className="mt-3">
            <Col>
              {isError && (
                <div>Something went wrong, please try again later.</div>
              )}
              {isSuccess && products && (
                <Row>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <Col
                        key={product._id}
                        lg={3}
                        md={4}
                        sm={6}
                        className="mb-4"
                      >
                        <ProductCard product={product.product} />{" "}
                        {/* Use ProductCard component */}
                      </Col>
                    ))
                  ) : (
                    <p>No products found in this category.</p>
                  )}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default CategoryPage;
