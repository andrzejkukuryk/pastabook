import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { Logo } from "../logo";
import { UserLoginMenu } from "../userLoginMenu";

export function Header() {
  const { token } = useAuthContext();
  const location = useLocation();

  return (
    <Navbar className="navbar rounded-2" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Nav>
          {!token && (
            <Link
              to="/login"
              state={{ from: location }}
              className="text-dark me-4"
              style={{ textDecoration: "none", fontWeight: 600 }}
            >
              Login
            </Link>
          )}
          {!token && (
            <Link
              to="/register"
              className="text-dark me-3"
              style={{ textDecoration: "none", fontWeight: 600 }}
            >
              Sign up
            </Link>
          )}
          {token && <UserLoginMenu />}
        </Nav>
      </Container>
    </Navbar>
  );
}
