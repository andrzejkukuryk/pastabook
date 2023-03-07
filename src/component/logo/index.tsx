import React from "react";
import bookHeart from "./graph/book-heart.png";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";

interface LogoProps {
  showMobileMenu: boolean;
}

export function Logo({ showMobileMenu }: LogoProps) {
  return (
    <>
      {!showMobileMenu && (
        <Link to="/" style={{ textDecoration: "none" }}>
          <Container>
            <Row>
              <Col xs={12}>
                <Image
                  src={bookHeart}
                  alt="pastabook logo"
                  className="float-start me-1"
                  style={{ width: 30, height: 30 }}
                />
                <h1 className="h4 text-dark fw-bold">Pastabook</h1>
              </Col>
            </Row>
          </Container>
        </Link>
      )}
      {showMobileMenu && (
        <Container>
          <Row>
            <Col xs={12}>
              <Image
                src={bookHeart}
                alt="pastabook logo"
                className="float-start me-1"
                style={{ width: 30, height: 30 }}
              />
              <h1 className="h4 text-dark fw-bold">Pastabook</h1>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
