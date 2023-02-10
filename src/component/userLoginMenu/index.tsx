import React, { useState } from "react";
import { useAuthContext } from "../../data/authProvider";
import { Col, Container, Dropdown, Row } from "react-bootstrap";

export function UserLoginMenu() {
  const { user, logoutUser } = useAuthContext();

  {
    return (
      <Container>
        <Row>
          <Col className="px-0 d-flex align-items-end">
            <p className="h6 text-nowrap">
              {user && `Hello, ${user.name ? user.name : "Pastalover"}!`}
            </p>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                className="px-0 text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="shadow">
                <Dropdown.Item href="/profile">My account</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutUser}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    );
  }
}
