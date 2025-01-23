import { Col, Container, Image, Row, Carousel } from "react-bootstrap";
import CategoryCarousel from "./ProductsCarousel";
import { useGetCategoriesHomeQuery } from "../../../libs/rtk/api/categoryApiSlice";
import { useGetProductsHomeQuery } from "../../../libs/rtk/api/productApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

function Home() {
  const {
    data: categoriesWithProducts,
    isError,
    isLoading,
    isSuccess,
  } = useGetCategoriesHomeQuery();

  const {
    data: products,
    isError: isProductError,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
  } = useGetProductsHomeQuery();

  useEffect(() => {
    if (isError || isProductError) {
      toast.warn(
        "An error has occured while getting the products, please try again later."
      );
    }
  }, [isError || isProductError]);

  return (
    <Container className="p-0" fluid >
      {/* Banner Section */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Carousel
          controls
          indicators={false} // Hide dots
          interval={3000} // Auto-slide every 3 seconds
          pause="hover" // Pause on hover
          fade // Smooth transition
        >
          {/* Slide 1 */}
          <Carousel.Item>
            <img
              src="public/banner1.png" // Replace with your image
              alt="Slide 1"
              style={{
                width: "100%",
                height: "100vh", // Fixed height for the banner
                objectFit: "cover",
              }}
            />
            
          </Carousel.Item>

          {/* Slide 2 */}
          <Carousel.Item>
            <img
              src="public/banner2.png" // Replace with another image
              alt="Slide 3"
              style={{
                width: "100%",
                height: "100vh", // Fixed height for the banner
                objectFit: "cover",
              }}
            />
           
          </Carousel.Item>

          {/* Slide 3 */}
          <Carousel.Item>
            <img
              src="public/banner4.png" // Replace with another image
              alt="Slide 4"
              style={{
                width: "100%",
                height: "100vh", // Fixed height for the banner
                objectFit: "cover",
              }}
            />
          </Carousel.Item>

          {/* Slide 4 */}
        <Carousel.Item>
            <img
              src="public/banner3.png" // Replace with your image
              alt="Slide 1"
              style={{
                width: "100%",
                height: "100vh", // Fixed height for the banner
                objectFit: "cover",
              }}
            />
            
          </Carousel.Item>

          {/* Slide 5 */}
          <Carousel.Item>
            <img
              src="public/banner5.png" // Replace with another image
              alt="Slide 5"
              style={{
                width: "100%",
                height: "100vh", // Fixed height for the banner
                objectFit: "cover",
              }}
            />
          </Carousel.Item>
        </Carousel>

        
        
      </div>
      {isLoading && <Spinner large />}
      {isSuccess && (
        <>
          {categoriesWithProducts.map((cwp, index) => (
            <CategoryCarousel
              key={index}
              name={
                <Link
                  to={`/category/${cwp.category.name}`}
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  {cwp.category.name}
                </Link>
              }
              products={cwp.products}
            />
          ))}
        </>
      )}
      {isProductLoading && <Spinner large />}
      {isProductSuccess && (
        <CategoryCarousel
          name={
            <Link
              to="/category/all-products"
              className="text-decoration-none"
              style={{ color: "black" }}
            >
              All Products
            </Link>
          }
          products={products}
        />
      )}
    </Container>
  );
}

export default Home;
