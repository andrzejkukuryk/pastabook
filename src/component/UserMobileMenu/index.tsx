import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";

interface UserMobileMenuProps {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UserMobileMenu({
  showMobileMenu,
  setShowMobileMenu,
}: UserMobileMenuProps) {
  const { token, user, logoutUser } = useAuthContext();
  const location = useLocation();
  const closeMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <Offcanvas
      show={showMobileMenu}
      onHide={closeMenu}
      placement="end"
      responsive="md"
    >
      <Offcanvas.Header className="mt-5">
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-md-none">
        {!token && (
          <>
            <Link
              to="/login"
              state={{ from: location }}
              className="text-dark"
              style={{ textDecoration: "none", fontWeight: 600 }}
              onClick={closeMenu}
            >
              <div className="ms-4">Login</div>
            </Link>
            <hr />
          </>
        )}
        {!token && (
          <>
            <Link
              to="/register"
              className="text-dark"
              style={{ textDecoration: "none", fontWeight: 600 }}
              onClick={closeMenu}
            >
              <div className="ms-4">Sign up</div>
            </Link>
            <hr />
          </>
        )}
        {token && (
          <p className="ms-4 mb-5 ">
            {user && `Hi, ${user.name ? user.name : "Pastalover"}!`}
          </p>
        )}
        {token && (
          <>
            <Link
              to="/profile"
              className="text-dark"
              style={{ textDecoration: "none", fontWeight: 600 }}
              onClick={closeMenu}
            >
              <div className="ms-4">My account</div>
            </Link>
            <hr />
          </>
        )}
        {token && (
          <>
            <div
              className="ms-4 text-dark"
              style={{ fontWeight: 600 }}
              onClick={() => {
                logoutUser();
                closeMenu();
              }}
            >
              Log out
            </div>

            <hr />
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
