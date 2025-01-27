import { Container, Carousel } from "react-bootstrap";
import CategoryCarousel from "./ProductsCarousel";
import { useGetCategoriesHomeQuery } from "../../../libs/rtk/api/categoryApiSlice";
import { useGetProductsHomeQuery } from "../../../libs/rtk/api/productApiSlice";
import { useGetHomeImagesQuery } from "../../../libs/rtk/api/adminApiSlice";
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

  const {
    data: homeImages,
    isLoading: isImagesLoading,
    isSuccess: isImagesSuccess,
  } = useGetHomeImagesQuery();

  useEffect(() => {
    if (isError || isProductError) {
      toast.warn(
        "An error has occured while getting the products, please try again later."
      );
    }
  }, [isError, isProductError]);

  return (
    <Container className="p-0" fluid>
      {/* Banner Section */}
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {isImagesLoading && <Spinner large />}
        {homeImages && isImagesSuccess && (
          <Carousel
            controls
            indicators={false} // Hide dots
            interval={3000} // Auto-slide every 3 seconds
            pause="hover" // Pause on hover
            fade // Smooth transition
          >
            {homeImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image.url} // Replace with another image
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100vh", // Fixed height for the banner
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
      <div className="ms-5 me-5">
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
          <CategoryCarousel name="All Products" products={products} />
        )}
      </div>
    </Container>
  );
}

export default Home;
