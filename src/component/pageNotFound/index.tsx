import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export function PageNotFound() {
  return (
    <Container>
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/">go back to homepage</Link>
    </Container>
  );
}
