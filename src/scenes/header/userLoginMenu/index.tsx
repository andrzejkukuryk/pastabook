import React from "react";
import { useAuthContext } from "../../../data/authProvider";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as BiPersonCircle } from "../../../assets/bi-person-circle.svg";

export function UserLoginMenu() {
  const { user, logoutUser } = useAuthContext();

  const navigate = useNavigate();
  const handleClickProfile = () => navigate("/profile");

  return (
    <Container className="d-flex justify-content-end">
      <Row>
        <Col md={12} className="px-0 d-flex align-items-center">
          <p className="h6 d-inline-block mt-2 me-2 text-break">
            {user && `Hello, ${user.name ? user.name : "Pastalover"}!`}
          </p>
          <Dropdown style={{ marginTop: 7, marginBottom: 15 }}>
            <Dropdown.Toggle
              variant="secondary"
              className="px-0 me-4 text-primary"
            >
              <BiPersonCircle />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="shadow">
              <Dropdown.Item onClick={handleClickProfile}>
                {/* <Link to="/profile" className="text-dark noUnderline"> */}
                My account
                {/* </Link> */}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutUser}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}
