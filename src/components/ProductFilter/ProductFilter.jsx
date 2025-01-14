import React from "react";
import { Container, Accordion, Form, Button, Row, Col, InputGroup, FormControl } from "react-bootstrap";

function ProductFilter() {
  return (
    <Container className="p-4 border rounded bg-light">
      <h4 className="mb-4">Filters</h4>

      {/* Category Filter */}
      <Accordion defaultActiveKey="0" className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Clothing" />
            <Form.Check type="checkbox" label="Accessories" />
          </Accordion.Body>
        </Accordion.Item>

        {/* Size Filter */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Size</Accordion.Header>
          <Accordion.Body>
            <Form.Select aria-label="Select size">
              <option value="">Select size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Price Filter */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <Form.Label>Price Range</Form.Label>
            <Row>
              <Col>
                <InputGroup>
                  <InputGroup.Text>Min</InputGroup.Text>
                  <FormControl type="number" placeholder="0" />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Text>Max</InputGroup.Text>
                  <FormControl type="number" placeholder="1000" />
                </InputGroup>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Ratings Filter */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Ratings</Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="5 Stars" />
            <Form.Check type="checkbox" label="4 Stars & Up" />
            <Form.Check type="checkbox" label="3 Stars & Up" />
            <Form.Check type="checkbox" label="2 Stars & Up" />
            <Form.Check type="checkbox" label="1 Star & Up" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Clear Filters Button */}
      <div className="text-center mt-4">
        <Button variant="primary" className="w-100">
          Clear All Filters
        </Button>
      </div>
    </Container>
  );
}

export default ProductFilter;
