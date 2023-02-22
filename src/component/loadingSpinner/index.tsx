import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import "./style.css";

export function LoadingSpinner() {
  return (
    <div className="loadingDivContainer">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <Spinner variant="primary" />
          </Col>
        </Row>
        <Row>
          <p className="h4 text-center">Loading...</p>
        </Row>
      </Container>
    </div>
  );
}
