import React from "react";
import styles from "./style.module.css";
import "./style.css";
import logoPNG from "./graph/logo.png";
import bookHeart from "./graph/book-heart.png";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";

export function Logo() {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Container>
        <Row>
          <Col xs={2}>
            <Image src={bookHeart} className="align-top" />
          </Col>
          <Col>
            <h1 className="h4 align-top">Pastabook</h1>
          </Col>
        </Row>
      </Container>
    </Link>
  );
}
