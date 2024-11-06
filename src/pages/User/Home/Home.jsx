import { Col, Container, Image, Row } from "react-bootstrap";
import CategoryCarousel from "./CategoryCarousel";

function Home() {
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
      <CategoryCarousel categoryName="SZN-ONE" products={{}} />
      <CategoryCarousel categoryName="SZN-TWO" products={{}} />
    </Container>
  );
}

export default Home;
