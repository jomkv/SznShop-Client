import { Button } from "react-bootstrap";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useRef } from "react";
import Slider from "react-slick";
import useBreakpoint from "use-breakpoint";
import "./Carousel.css";
const BREAKPOINTS = { sm: 0, md: 768, xl: 1200 };

function CategoryCarousel({ categoryName, products }) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slickPrev();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="mt-5 fw-bold">{categoryName}</h2>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="transparent" className="p-0" onClick={handlePrev}>
            <i className="bi bi-arrow-left-short fs-1" />
          </Button>
          <Button variant="transparent" className="p-0" onClick={handleNext}>
            <i className="bi bi-arrow-right-short fs-1" />
          </Button>
        </div>
      </div>

      <div className="w-100">
        <Slider
          infinite={false}
          speed={500}
          slidesToShow={
            {
              sm: 1,
              md: 2,
              xl: 3,
            }[breakpoint] || 1
          }
          slidesToScroll={
            {
              sm: 1,
              md: 2,
              xl: 3,
            }[breakpoint] || 1
          }
          ref={carouselRef}
        >
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </Slider>
      </div>
    </>
  );
}

export default CategoryCarousel;
