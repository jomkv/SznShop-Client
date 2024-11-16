import { Col, Container, Image, Row } from "react-bootstrap";
import CategoryCarousel from "./CategoryCarousel";
import { useGetAllCategoriesQuery } from "../../../libs/rtk/api/categoryApiSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";

function Home() {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const {
    data: res,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetAllCategoriesQuery(true);

  useEffect(() => {
    if (isError) {
      console.log(error);
      toast.warn(
        "An error has occured while getting the products, please try again later."
      );
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setCategoriesWithProducts(res.categoryWithProducts);
    }
  }, [isSuccess, res]);

  return (
    <Container className="mt-4 mb-4">
      <div
        className="d-flex w-100 mb-2"
        style={{
          height: "70vh",
        }}
      >
        <Row className="w-100">
          <Col sm={12} xl={10}>
            <Image
              style={{
                objectFit: "fill",
              }}
              className="w-100 h-100"
              src="public/sample1.png"
              fluid
            />
          </Col>
          <Col sm={12} xl={2}>
            <div className="h-100 d-flex align-items-end">
              <p className="fw-bolder fs-2 p-0 m-0">LESS TALK, VISION ON.</p>
            </div>
          </Col>
        </Row>
      </div>
      {isLoading && <Spinner large />}
      {isSuccess && (
        <>
          {categoriesWithProducts.map((cwp, index) => (
            <CategoryCarousel
              key={index}
              categoryName={cwp.category.name}
              products={cwp.products}
            />
          ))}
        </>
      )}
    </Container>
  );
}

export default Home;
