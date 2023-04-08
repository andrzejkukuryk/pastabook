import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../data/authProvider";
import { Logo } from "../logo";
import { UserLoginMenu } from "../userLoginMenu";
import { UserMobileMenu } from "../userMobileMenu";
import { ReactComponent as BiList } from "../../../../assets/bi-list.svg";
import { ReactComponent as BiXLg } from "../../../../assets/bi-x-lg.svg";
import "./style.css";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { token } = useAuthContext();
  const location = useLocation();

  const handleClickShowMobileMenu = () => setShowMobileMenu(true);
  const handleClickHideMobileMenu = () => setShowMobileMenu(false);

  return (
    <Navbar
      className="navbar rounded-2 navbarContainer"
      bg="secondary"
      variant="dark"
    >
      <Container className="d-flex">
        <Navbar.Brand className="col-7 col-md-4">
          <Logo showMobileMenu={showMobileMenu} />
        </Navbar.Brand>

        <Nav className="d-none d-md-flex justify-content-end col-md-8">
          {!token && (
            <Link
              to="/login"
              state={{ from: location }}
              className="text-dark me-4 linkText"
            >
              Login
            </Link>
          )}
          {!token && (
            <Link to="/register" className="text-dark me-3 me-lg-4 linkText">
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
            onClick={handleClickShowMobileMenu}
          >
            <BiList />{" "}
          </Button>
        )}
        {showMobileMenu && (
          <Button
            variant="secondary"
            className="d-md-none"
            aria-label="close menu"
            onClick={handleClickHideMobileMenu}
          >
            <BiXLg />{" "}
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
