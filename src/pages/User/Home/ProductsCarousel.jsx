import { Button } from "react-bootstrap";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useRef } from "react";
import Slider from "react-slick";
import "./Carousel.css";

function CategoryCarousel({ name, products }) {
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
        <h2 className="mt-5 fw-bold">{name}</h2>
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
          arrows={false}
          dots={false}
          slidesToShow={4}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 765,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
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
