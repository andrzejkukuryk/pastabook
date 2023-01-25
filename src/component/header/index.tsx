import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Logo } from "../logo";
import { UserLoginMenu } from "../userLoginMenu";
import styles from "./style.module.css";

export function Header() {
  return (
    // <div className={styles.container}>
    //   <Logo />
    //   <UserLoginMenu />
    // </div>
    <Navbar className="navbar" bg="warning" variant="dark">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <UserLoginMenu />
      </Container>
    </Navbar>
  );
}
