import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { Dish } from "../../models/dish";
import { useRecipeContext } from "../../data/recipeProvider";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { RecipeRate } from "../recipeRate";
import { RecipeOveralRating } from "../recipeOveralRating";
import { RecipeUsersRate } from "../recipeUsersRate";

export function Recipe() {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isRated, setIsRated] = useState<boolean>(false);
  const { recipePath } = useParams();
  const { recipes, isErrorRecipe } = useRecipeContext();

  const recipe: Dish | undefined = recipes.find(
    (rcp) => rcp.path === recipePath
  );

  const {
    token,
    user,
    addToFavorites,
    removeFromFavorites,
    currentFavorites,
    currentRated,
  } = useAuthContext();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkFavorites = () => {
    if (recipe && currentFavorites.length > 0) {
      setIsFavorite(currentFavorites.includes(recipe?.path));
    } else {
      setIsFavorite(false);
    }
  };
  useEffect(() => checkFavorites(), [currentFavorites]);

  const checkRated = () => {
    if (recipe && currentRated.length > 0) {
      setIsRated(currentRated.includes(recipe?.path));
    } else {
      setIsRated(false);
    }
  };

  useEffect(() => {
    checkRated();
  }, [currentRated]);

  return (
    <>
      {recipe && (
        <Container className="mb-5">
          <Row className="mt-3">
            <Col
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 5 }}
              xl={{ span: 6 }}
              className="mb-sm-3 mb-md-0"
            >
              <h2 style={{ marginBottom: "3px" }}>
                {recipe?.fullName}{" "}
                {isFavorite && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#B54942"
                    className="bi bi-suit-heart-fill ms-2"
                    viewBox="0 3 20 16"
                  >
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                  </svg>
                )}
              </h2>
            </Col>
            <Col
              xs={{ order: 1, span: 12 }}
              sm={{ order: 2, span: 6 }}
              md={{ order: 4, span: 5 }}
              lg={{ order: 1, span: 4 }}
              xl={{ order: 1, span: 3 }}
              className="d-flex align-items-end align-items-lg-start mt-2 mt-sm-0 mt-lg-2 mb-3 mb-md-0"
            >
              <RecipeOveralRating rates={recipe.rate} />
            </Col>
            <Col
              xs={{ order: 2, span: 12 }}
              sm={{ order: 4, span: "auto" }}
              md={{ order: 2, span: 4 }}
              lg={{ order: 2, span: 3 }}
              xl={{ order: 2, span: 3 }}
            >
              {token && user && !isFavorite && (
                <Button
                  variant="outline-primary"
                  className="float-start float-sm-end"
                  onClick={() => addToFavorites(user.email, recipe.path)}
                >
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
                  Add to favourites
                </Button>
              )}
              {token && user && isFavorite && (
                <Button
                  variant="outline-primary"
                  className="float-start float-sm-end"
                  onClick={() => removeFromFavorites(user.email, recipe.path)}
                >
                  Remove from favourites
                </Button>
              )}
            </Col>
            {token && user && (
              <Col
                xs={{ order: 3, span: 12 }}
                sm={{ order: 1, span: 6 }}
                md={{ order: 3, span: 7 }}
                lg={{ order: 3, span: 12 }}
                xl={{ order: 3, span: 12 }}
                className="mt-3 mt-sm-0 mt-md-3"
              >
                {!isRated && <RecipeRate recipeUrl={recipe.path} />}
                {isRated && <RecipeUsersRate recipeUrl={recipe.path} />}
              </Col>
            )}
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
            <Col sm={12} md={4} className="mb-4 mb-md-0">
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
                <div
                  dangerouslySetInnerHTML={{ __html: recipe.method }}
                  className="mb-5"
                ></div>
                <hr />
                {user && token && (
                  <div className="mt-5">
                    {!isRated && (
                      <div>
                        <p className="h6">How did you like that recipe?</p>
                        <RecipeRate recipeUrl={recipe.path} />
                      </div>
                    )}
                    {isRated && (
                      <div>
                        <p className="h6">Thank you for rating the recipe!</p>
                        <RecipeUsersRate recipeUrl={recipe.path} />
                      </div>
                    )}
                  </div>
                )}
                {!user && !token && (
                  <div>
                    <p className="h6">
                      Would you like to rate this recipe?{" "}
                      <Link
                        to="/login"
                        state={{ from: location }}
                        className="sign-up-link ms-2"
                        style={{ textDecoration: "none" }}
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                )}
              </>
            </Col>
          </Row>
        </Container>
      )}
      {!recipe && !isErrorRecipe && (
        <Container className="mt-5">
          <p>There's no such dish here</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            Back to home page
          </Link>
        </Container>
      )}
      {isErrorRecipe && (
        <Container>
          <Row>
            <Col>
              <p className="h4 my-5 text-primary text-center">
                Vaffanapoli! Something went wrong!
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
