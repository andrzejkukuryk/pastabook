import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecipeListItem } from "../recipeListItem";
import styles from "./style.module.css";
import "./style.css";
// import { recipes } from "../../data/dummyData";
import { useRecipeContext } from "../../data/recipeProvider";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RecipeListPagination } from "../recipeListPagination";

export function RecipeList() {
  const { recipes } = useRecipeContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const countNumberOfPages = () => {
    const pages = Math.ceil(recipes.length / itemsPerPage);
    setNumberOfPages(pages);
  };

  useEffect(() => countNumberOfPages(), [recipes, itemsPerPage]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Last recipes</h2>
        </Col>

        <Col>
          <Button
            variant="secondary"
            className="float-end"
            onClick={() => navigate("/add")}
          >
            + Add a new recipe
          </Button>
        </Col>
      </Row>
      <Row>
        {recipes.slice(indexOfFirstItem, indexOfLastItem).map((recipe) => (
          <Col sm={12} md={6} xl={4}>
            <Link
              to={`/recipes/${recipe.path}`}
              key={recipe.path}
              style={{ textDecoration: "none", color: "#212529" }}
            >
              <RecipeListItem
                dishName={recipe.fullName}
                imageSource={recipe.imageSource}
                rate={recipe.rate}
              />
            </Link>
          </Col>
        ))}
      </Row>
      {numberOfPages > 1 && (
        <Row>
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
