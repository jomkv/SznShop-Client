import React from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import ProductCard from "../../../components/ProductCard/ProductCard";

function Home() {
  return (
    <Container className="mt-5">
      <Image src="public/sample1.png" fluid />
      <h2 className="mt-5 fw-bold">SZN-ONE</h2>
      <Carousel className="mt-5" interval={null}>
        <Carousel.Item>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
      <h2 className="mt-5 fw-bold">SZN-TWO</h2>
      <Carousel className="mt-5" interval={null}>
        <Carousel.Item>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
            <Col className="d-flex justify-content-center">
              <ProductCard />
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;
