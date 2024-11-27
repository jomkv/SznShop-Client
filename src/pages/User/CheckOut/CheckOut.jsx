import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import { Container, Row, Col } from "react-bootstrap";

function CheckOut() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>CheckOut</h1>
        </Col>
        <Col>
          <OrderSummary />
        </Col>
      </Row>
    </Container>
  );
}

export default CheckOut;
