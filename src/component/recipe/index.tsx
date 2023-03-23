import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { Dish } from "../../models/dish";
import { useRecipeContext } from "../../data/recipeProvider";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { RecipeRate } from "../recipeRate";
import { RecipeOveralRating } from "../recipeOveralRating";
import { RecipeUsersRate } from "../recipeUsersRate";
import { ReactComponent as BiSuitHeartFill } from "../../assets/bi-suit-heart-fill.svg";
import { ReactComponent as BiSuitHeart } from "../../assets/bi-suit-heart.svg";
import "./style.css";

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
              <h2 className="title" style={{ marginBottom: 3 }}>
                {recipe?.fullName} {isFavorite && <BiSuitHeartFill />}
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
                  <BiSuitHeart />
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
                className="recipeImage"
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
                    <li
                      key={`ingredient${recipe?.fullName}${index}`}
                      className="text-break"
                    >
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
                        className="sign-up-link ms-2 noUnderline"
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
          <Link to="/" className="noUnderline">
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
