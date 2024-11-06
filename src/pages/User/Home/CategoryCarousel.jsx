import { Button, Carousel, Col, Row } from "react-bootstrap";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useRef } from "react";

function CategoryCarousel({ categoryName, products }) {
  const carouselRef = useRef(null);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="mt-5 fw-bold">{categoryName}</h2>
        <div className="d-none d-lg-flex align-items-center justify-content-center">
          <Button variant="transparent" className="p-0" onClick={handlePrev}>
            <i className="bi bi-arrow-left-short fs-1" />
          </Button>
          <Button variant="transparent" className="p-0" onClick={handleNext}>
            <i className="bi bi-arrow-right-short fs-1" />
          </Button>
        </div>
      </div>

      <Carousel
        className="mt-2 d-none d-lg-block"
        interval={null}
        indicators={false}
        controls={false}
        ref={carouselRef}
      >
        <Carousel.Item className="d-flex justify-content-between align-items-center ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Carousel.Item>
        <Carousel.Item className="d-flex justify-content-between align-items-center  ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Carousel.Item>
      </Carousel>
      <div className="d-flex d-lg-none w-100 overflow-auto gap-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
}

export default CategoryCarousel;
