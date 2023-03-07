import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { Logo } from "../logo";
import { UserLoginMenu } from "../userLoginMenu";
import { UserMobileMenu } from "../UserMobileMenu";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { token } = useAuthContext();
  const location = useLocation();

  return (
    <Navbar
      className="navbar rounded-2"
      bg="secondary"
      variant="dark"
      style={{ zIndex: 1050, height: 62 }}
    >
      <Container className="d-flex">
        <Navbar.Brand className="col-4">
          <Logo showMobileMenu={showMobileMenu} />
        </Navbar.Brand>

        <Nav className="d-none d-md-flex justify-content-end col-8">
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
              className="text-dark me-3 me-lg-4"
              style={{ textDecoration: "none", fontWeight: 600 }}
            >
              Sign up
            </Link>
          )}
          {token && <UserLoginMenu />}
        </Nav>
        {!showMobileMenu && (
          <Button
            variant="secondary"
            className="d-md-none"
            aria-label="open menu"
            onClick={() => setShowMobileMenu(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>{" "}
          </Button>
        )}
        {showMobileMenu && (
          <Button
            variant="secondary"
            className="d-md-none"
            aria-label="close menu"
            onClick={() => setShowMobileMenu(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>{" "}
          </Button>
        )}
        <UserMobileMenu
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
      </Container>
    </Navbar>
  );
}
