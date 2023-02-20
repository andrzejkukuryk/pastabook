import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import "./style.css";

export function LoadingSpinner() {
  return (
    <div className="loadingDivContainer">
      <Container>
        <Row>
          <Spinner />
        </Row>
        <Row>
          <p>Loading...</p>
        </Row>
      </Container>
    </div>
  );
}
