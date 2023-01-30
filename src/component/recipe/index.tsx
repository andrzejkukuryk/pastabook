import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../authProvider";
import { recipes } from "../../data/dummyData";
import { Recipe as RecipeType } from "../../models/recipe";
import styles from "./style.module.css";
import "./style.css";
import heartRed from "./graph/heartRed.png";
import { Dish } from "../../models/dish";
import { useRecipeContext } from "../../data/recipeProvider";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

export function Recipe() {
  const { recipePath } = useParams();
  const { recipes } = useRecipeContext();

  const recipe: Dish | undefined = recipes.find(
    (rcp) => rcp.path === recipePath
  );

  const { token } = useAuthContext();

  const createMethod = () => {
    const parser = new DOMParser();
    let method;
    if (recipe) {
      method = parser.parseFromString(recipe.method, "text/html");
    }
    return method?.body.children;
  };

  const method = createMethod();

  const methodDiv = document.getElementById("methodDiv");
  console.log(methodDiv);

  console.log(method?.item(0));
  return (
    //TODO: kolor aktywnego buttona ulubionych
    <>
      {recipe && (
        <Container>
          <Row className="mt-3">
            <Col>
              <h2>{recipe?.fullName}</h2>
            </Col>
            <Col>
              {token && (
                <Button variant="outline-secondary" className="float-end">
                  <Image src={heartRed} className="me-1" /> Add to favourites
                </Button>
              )}
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <Image
                fluid
                src={recipe?.imageSource}
                alt={recipe?.fullName}
                style={{ height: 233, width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={4}>
              {recipe && <h3 className="h5">Ingredients</h3>}
              <ul>
                {recipe?.ingredients.map(
                  (ingredient: string, index: number) => (
                    <li key={`ingredient${recipe?.fullName}${index}`}>
                      {ingredient}
                    </li>
                  )
                )}
              </ul>
            </Col>
            <Col sm={12} md={8}>
              <>
                <h3 className="h5">Method</h3>
                <div id="methodDiv">
                  <p></p>
                </div>
                {recipe?.method}
                {/* Jak wstawić tutaj html collection? */}
                {/* {method?.item(0)} */}
              </>
            </Col>
          </Row>
          {/* <div>
        {recipe && <h3>Ingredients:</h3>}
        <ul>
          {recipe?.ingredients.map((ingredient: string, index: number) => (
            <li key={`ingredient${recipe?.fullName}${index}`}>{ingredient}</li>
          ))}
        </ul>
      </div> */}
          {/* TODO: lista ulubionych */}
        </Container>
      )}
      {!recipe && (
        <Container className="mt-5">
          <p>There's no such dish here</p>
          <Link to="/">Back to home page</Link>
        </Container>
      )}
    </>
    // </Container>
  );
}
