import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";
import { useLazyGetSearchResultsQuery } from "../../../libs/rtk/api/searchApiSlice";
import { toast } from "react-toastify";
import ProductCard from "../../../components/ProductCard/ProductCard";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [getSearchResults, { data: products, isLoading, isSuccess }] =
    useLazyGetSearchResultsQuery();

  useEffect(() => {
    handleSearchChange(searchParams.get("value"));
  }, [searchParams.get("value")]);

  const handleSearchChange = async (value) => {
    try {
      const payload = {
        search: value,
      };

      await getSearchResults(payload).unwrap();
    } catch (error) {
      navigate("/");
      toast.warn("Something went wrong, please try again later.");
    }
  };

  const applyFilter = async (values) => {
    try {
      const payload = {
        ...values,
        search: searchParams.get("value"),
      };

      await getSearchResults(payload).unwrap();
    } catch (error) {
      navigate("/");
      toast.warn("Something went wrong, please try again later.");
    }
  };

  console.log(products);

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col lg={2} md={3} sm={3}>
          <ProductFilter applyFilter={applyFilter} />
        </Col>
        <Col>
          <Row>
            {isLoading && <Spinner large />}
            {isSuccess && products && products.length > 0 ? (
              products.map((product) => (
                <Col key={product._id} lg={3} md={4} sm={6} className="mb-4">
                  <ProductCard product={product} />{" "}
                  {/* Use ProductCard component */}
                </Col>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
