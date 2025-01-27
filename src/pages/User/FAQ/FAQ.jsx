import React from "react";
import { Container, Accordion } from "react-bootstrap";

function FAQ() {
  return (
    <Container>
      {/* Header Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "white",
          padding: "5rem 1rem",
          textAlign: "center",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: "1.3" }}
        >
          How Can We Help You Today?
        </h1>
        <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
          Explore our FAQ section to find answers to your questions.
        </p>
      </div>

      {/* FAQ Section */}
      <Accordion defaultActiveKey={"0"} className="mt-4">
        {/* Account Section */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Account</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <strong>How do I create an account?</strong> <br />
                You can create an account using your Google account or any other
                email.
              </li>
              <li>
                <strong>Is there a password recovery option?</strong> <br />
                No, there is no "forgot password" feature. Please keep your
                credentials secure.
              </li>
              <li>
                <strong>Can I update my account details?</strong> <br />
                Yes, you can update your profile details such as name and email
                address.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Order Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Order</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <strong>Can I modify my order?</strong> <br />
                You can modify your order as long as it hasn’t been accepted for
                processing.
              </li>
              <li>
                <strong>What happens if my order arrives damaged?</strong>{" "}
                <br />
                If the order is damaged, simply do not accept it from the
                courier.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Payment Section */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Payment</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <strong>What payment methods do you accept?</strong> <br />
                We accept cash on delivery (COD) only.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Delivery and Shipping Section */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Delivery and Shipping</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <strong>How long will my order take to arrive?</strong> <br />
                Delivery typically takes 7 days from the date of confirmation.
              </li>
              <li>
                <strong>Do you offer express shipping?</strong> <br />
                No, express shipping is not available at this time.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Return and Exchange Section */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Return</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <strong>How can I return an item?</strong> <br />
                Upon delivery, inspect the item. If you need to return it, hand
                it back to the courier or rider immediately.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default FAQ;
