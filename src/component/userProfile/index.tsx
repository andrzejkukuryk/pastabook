import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { useRecipeContext } from "../../data/recipeProvider";
import { Dish } from "../../models/dish";
import { UserProfileChangeName } from "../userProfileChangeName";
import { UserProfileChangePassword } from "../userProfileChangePassword";
import styles from "./style.module.css";

export function UserProfile() {
  const [passwordPanelExpanded, setPasswordPanelExpanded] =
    useState<boolean>(false);
  const [namePanelExpanded, setNamePanelExpanded] = useState<boolean>(false);
  const { user, currentFavorites } = useAuthContext();
  const { recipes } = useRecipeContext();
  const location = useLocation();

  const createFavoritesList = () => {
    const favorites: Dish[] = [];
    recipes.forEach((recipe) => {
      currentFavorites.forEach((fav) => {
        if (fav === recipe.path) {
          favorites.push(recipe);
        }
      });
    });
    return favorites.map((recipe, index) => (
      <ListGroupItem
        key={`fav${index}`}
        action
        href={`/recipes/${recipe.path}`}
      >
        {recipe.fullName}
      </ListGroupItem>
    ));
  };
  createFavoritesList();
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>My account</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="h5">General</h3>
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} className="my-0">
          <p className="h6 my-1">Email </p>
        </Col>
        <Col xs={12} className="my-0">
          {user?.email}
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} className="my-0">
          <p className="h6 my-1">Password </p>
        </Col>
        {!passwordPanelExpanded && (
          <Col>
            <Button
              variant="outline-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#changePasswordPanel"
              aria-expanded="false"
              aria-controls="changePasswordPanel"
              className="mt-2"
              onClick={() => setPasswordPanelExpanded(true)}
            >
              Change password
            </Button>
          </Col>
        )}
        <Col xs={12} className="my-0">
          <div className="collapse" id="changePasswordPanel">
            <UserProfileChangePassword
              setPasswordPanelExpanded={setPasswordPanelExpanded}
            />
          </div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} className="my-0">
          <p className="h6 my-1">Name </p>
        </Col>
        {!namePanelExpanded && <Col xs={12}>{user?.name}</Col>}
        {!namePanelExpanded && (
          <Col>
            <Button
              variant="outline-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#changeNamePanel"
              aria-expanded="false"
              aria-controls="changeNamePanel"
              className="mt-2"
              onClick={() => setNamePanelExpanded(true)}
            >
              Change name
            </Button>
          </Col>
        )}
        <Col xs={12} className="my-0">
          <div className="collapse" id="changeNamePanel">
            <UserProfileChangeName
              setNamePanelExpanded={setNamePanelExpanded}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3 className="h5">My favorites </h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} lg={4}>
          <ListGroup variant="flush">{createFavoritesList()}</ListGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
