import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RecipeListItem } from "../recipeListItem";
import { useRecipeContext } from "../../../data/recipeProvider";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RecipeListPagination } from "../recipeListPagination";
import { ReactComponent as BiPlusLg } from "../../../assets/bi-plus-lg.svg";
import { useNavContext } from "../../../data/navProvider";

export function RecipeList() {
  const { recipes, isErrorRecipe } = useRecipeContext();
  const { updateStatesForNavContext, listPage } = useNavContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const itemsPerPage: number = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const countNumberOfPages = () => {
    const pages = Math.ceil(recipes.length / itemsPerPage);
    setNumberOfPages(pages);
  };

  useEffect(() => countNumberOfPages(), [recipes, itemsPerPage]);

  const currentPath = location.pathname;

  useEffect(() => {
    updateStatesForNavContext(currentPath, currentPage);
  }, [location, currentPage]);

  useEffect(() => {
    setCurrentPage(listPage);
  }, []);

  const handleClickAddRecipe = () => navigate("/add");

  return (
    <Container>
      <Row>
        <Col>
          <h2>Last recipes</h2>
        </Col>

        <Col className="d-none d-sm-block">
          <Button
            variant="primary"
            className="float-end"
            onClick={handleClickAddRecipe}
          >
            <BiPlusLg />
            Add a new recipe
          </Button>
        </Col>
        <Col className="d-sm-none">
          <Button
            variant="primary"
            className="float-end"
            onClick={handleClickAddRecipe}
          >
            <BiPlusLg />
            Add recipe
          </Button>
        </Col>
      </Row>
      {isErrorRecipe && (
        <Row>
          <Col>
            <p className="h4 my-5 text-primary text-center">
              Vaffanapoli! Something went wrong!
            </p>
          </Col>
        </Row>
      )}
      <Row className="g-4 mt-1 d-flex justify-content-between">
        {recipes
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((recipe, index) => (
            <Col
              sm={12}
              md={6}
              xl={4}
              className="d-flex justify-content-center"
              key={`recipe${index}`}
            >
              <Link
                to={`/recipes/${recipe.path}`}
                key={recipe.path}
                className="text-dark noUnderline"
              >
                <RecipeListItem
                  dishName={recipe.fullName}
                  imageSource={recipe.imageSource}
                  rate={recipe.rate}
                  path={recipe.path}
                />
              </Link>
            </Col>
          ))}
      </Row>
      {numberOfPages > 1 && (
        <Row className="mt-5">
          <Col>
            <RecipeListPagination
              numberOfPages={numberOfPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}
