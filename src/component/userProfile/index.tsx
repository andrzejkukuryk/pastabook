import React from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { useRecipeContext } from "../../data/recipeProvider";
import { Dish } from "../../models/dish";
import styles from "./style.module.css";

export function UserProfile() {
  const { user, currentFavorites } = useAuthContext();
  const { recipes } = useRecipeContext();

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
        {/* <Link to={`/recipes/${recipe.path}`}> */}
        {recipe.fullName}
        {/* </Link> */}
      </ListGroupItem>
    ));
  };
  createFavoritesList();
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>User's account</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={2} lg={1}>
          <p>login: </p>
        </Col>
        <Col>{user?.email}</Col>
      </Row>
      <Row>
        <Col xs={2} lg={1}>
          <p>name: </p>
        </Col>
        <Col>{user?.name}</Col>
      </Row>
      <Row className="mt-3">
        <Col xs={2} lg={1}></Col>
        <Col>
          <Link to="/editprofile">
            <Button variant="primary">Edit profile</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3 className="h5">Your favorite recipes: </h3>
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
