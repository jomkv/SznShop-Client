import {
  Container,
  Accordion,
  Form,
  Button,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { useGetCategoriesQuery } from "../../libs/rtk/api/searchApiSlice";
import { useState } from "react";

function ProductFilter({ applyFilter }) {
  const { data: categories, isSuccess } = useGetCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleApply = () => {
    applyFilter({
      category: selectedCategory,
      size: selectedSize,
      minPrice,
      maxPrice,
      rating: selectedRating,
    });
  };

  const handleClearAll = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedRating("");
  };

  return (
    <Container className="p-4 border rounded bg-light">
      <h4 className="mb-4">Filters</h4>

      {/* Category Filter */}
      <Accordion defaultActiveKey="0" className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body>
            {categories &&
              isSuccess &&
              categories.map((category, index) => (
                <Form.Check
                  type="radio"
                  label={category.name}
                  value={category.name}
                  key={index}
                  checked={selectedCategory === category.name}
                  onChange={handleCategoryChange}
                  name="category"
                />
              ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Size Filter */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Size</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              aria-label="Select size"
              value={selectedSize}
              onChange={handleSizeChange}
            >
              <option value="">Select size</option>
              <option value="xs">Extra Small</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="xxl">Extra Extra Large</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Price Filter */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <Form.Label>Price Range</Form.Label>
            <Row>
              <Col className="d-flex">
                <FormControl
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
                <p className="ps-2 pe-2 fs-2 fw-light">-</p>
                <FormControl
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Ratings Filter */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Ratings</Accordion.Header>
          <Accordion.Body>
            <Form.Check
              type="radio"
              label="5 Stars"
              value="5"
              checked={selectedRating === "5"}
              onChange={handleRatingChange}
            />
            <Form.Check
              type="radio"
              label="4 Stars & Up"
              value="4"
              checked={selectedRating === "4"}
              onChange={handleRatingChange}
            />
            <Form.Check
              type="radio"
              label="3 Stars & Up"
              value="3"
              checked={selectedRating === "3"}
              onChange={handleRatingChange}
            />
            <Form.Check
              type="radio"
              label="2 Stars & Up"
              value="2"
              checked={selectedRating === "2"}
              onChange={handleRatingChange}
            />
            <Form.Check
              type="radio"
              label="1 Stars & Up"
              value="1"
              checked={selectedRating === "1"}
              onChange={handleRatingChange}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="text-center mt-4">
        <Button
          variant="dark"
          className="w-100"
          style={{
            height: "50px",
          }}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
        <Button
          variant="dark"
          className="w-100 mt-2"
          style={{
            height: "50px",
          }}
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </Container>
  );
}

export default ProductFilter;
