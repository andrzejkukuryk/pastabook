import React, { useState } from "react";
import styles from "./style.module.css";
import "./style.css";
import userIcon from "./graph/userIcon.png";
import { useAuthContext } from "../authProvider";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Row,
} from "react-bootstrap";

export function UserLoginMenu() {
  const { user, logoutUser } = useAuthContext();

  {
    return (
      <Container>
        <Row>
          <Col className="px-0">
            <p className="h6 mt-2 text-nowrap">
              {user && `Hello, ${user.name ? user.name : "Pastalover"}!`}
            </p>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="px-0">
                <Image src={userIcon} className="align-top"></Image>
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
