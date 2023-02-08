import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuthContext } from "../../data/authProvider";
import { Logo } from "../logo";
import { UserLoginMenu } from "../userLoginMenu";



export function Header() {
  const { token } = useAuthContext();

  return (
    <Navbar className="navbar rounded-2" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Nav>
          {!token && (
            <Nav.Link href="/login" className="text-dark">
              Login
            </Nav.Link>
          )}
          {!token && (
            <Nav.Link href="/register" className="text-dark">
              Sign Up
            </Nav.Link>
          )}
          {token && <UserLoginMenu />}
        </Nav>
      </Container>
    </Navbar>
  );
}
