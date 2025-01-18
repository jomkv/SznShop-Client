import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";
import { Container, Row, Col } from "react-bootstrap";
import { useGetProductsByCategoryQuery } from "../../../libs/rtk/api/productApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import ProductCard from "../../../components/ProductCard/ProductCard"; // Import ProductCard component

function CategoryPage() {
  const { categoryName } = useParams(); // Get category name from URL params
  const {
    data: products, // Destructure response, with default to empty object
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProductsByCategoryQuery(categoryName);
  console.log(products); // Log category name for debugging
  // Ensure response has 'products' array or an empty array

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.warn(
        "An error occurred while fetching products. Please try again later."
      );
      console.error("Error fetching products:", error); // Log error for debugging
    }
  }, [isError]);

  // Log successful response (for debugging)
  useEffect(() => {
    if (isSuccess) {
      console.log("Fetched Products:", products); // Debugging API response
    }
  }, [isSuccess, products]);

  // Log response data to verify structure

  return (
    <Container fluid>
      <div className="fs-2 fw-bold">{categoryName}</div>
      <p>
        Browse the best products in the <strong>{categoryName}</strong>{" "}
        category.
      </p>
      <Row className="mt-3">
        <Col lg={2} md={3} sm={3}>
          <ProductFilter />
        </Col>
        <Col>
          {isLoading && <Spinner large />}
          {isError && <div>Something went wrong, please try again later.</div>}
          {isSuccess && products && (
            <Row>
              {products.length > 0 ? (
                products.map((product) => (
                  <Col key={product._id} lg={3} md={4} sm={6} className="mb-4">
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
  );
}

export default CategoryPage;
