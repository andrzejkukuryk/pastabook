import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecipeListItem } from "../recipeListItem";
import { useRecipeContext } from "../../data/recipeProvider";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RecipeListPagination } from "../recipeListPagination";
//@ts-ignore
import Breakpoints from "breakpoints-js";

export function SearchResultList() {
  const { filteredRecipes, isErrorRecipe } = useRecipeContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const countNumberOfPages = () => {
    const pages = Math.ceil(filteredRecipes.length / itemsPerPage);
    setNumberOfPages(pages);
  };

  useEffect(() => countNumberOfPages(), [filteredRecipes, itemsPerPage]);
  useEffect(() => setCurrentPage(1), [filteredRecipes]);
  return (
    <Container>
      <Row>
        <Col>
          <h2>Found recipes</h2>
        </Col>

        <Col>
          <Button
            variant="primary"
            className="float-end"
            onClick={() => navigate("/add")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              fill="currentColor"
              className="bi bi-plus-lg me-2"
              viewBox="0 2 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Add a new recipe
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
        {filteredRecipes
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((recipe, index) => (
            <Col
              key={`result${index}`}
              sm={12}
              md={6}
              xl={4}
              className="d-flex justify-content-center"
            >
              <Link
                to={`/recipes/${recipe.path}`}
                key={recipe.path}
                style={{ textDecoration: "none", color: "#212529" }}
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
      {filteredRecipes.length === 0 && (
        <Row>
          <Col>
            <p className="h5 mt-5">Nothing found</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}
