import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
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
    <>
      {recipe && (
        <Container>
          <Row className="mt-3">
            <Col>
              <h2>{recipe?.fullName}</h2>
              <Button variant="outline-primary">Guzik testowy</Button>
            </Col>
            <Col>
              {token && (
                <Button variant="outline-secondary" className="float-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="20"
                    fill="currentColor"
                    className="bi bi-suit-heart me-1"
                    viewBox="0 2 16 16"
                  >
                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                  </svg>
                  {/* <i className="bi bi-suit-heart"></i> */}
                  Add to favourites
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
                <div dangerouslySetInnerHTML={{ __html: recipe.method }}></div>

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
