// import React from "react";
// import { Link } from "react-router-dom";
// import { Dish } from "../../models/dish";
// import { Recipe } from "../../models/recipe";
// import { RecipeListItem } from "../recipeListItem";
// import styles from "./style.module.css";

// interface SearchResultListProps {
//   searchResult: Dish[];
// }

// export function SearchResultListOld({ searchResult }: SearchResultListProps) {
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.foundRecipesTitle}>Found recipes:</h2>

//       <div className={styles.flexContainer}>
//         {searchResult.map((recipe) => (
//           <Link to={`/recipes/${recipe.path}`} key={recipe.path}>
//             <RecipeListItem
//               dishName={recipe.fullName}
//               imageSource={recipe.imageSource}
//               rate={recipe.rate}
//             />
//           </Link>
//         ))}
//       </div>
//       <div className={styles.addRecipe}>
//         <Link to={"/add"}>
//           <button>Add new recipe</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecipeListItem } from "../recipeListItem";
import { useRecipeContext } from "../../data/recipeProvider";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RecipeListPagination } from "../recipeListPagination";
//@ts-ignore
import Breakpoints from "breakpoints-js";

export function SearchResultList() {
  const { filteredRecipes } = useRecipeContext();
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
            variant="secondary"
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
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Add a new recipe
          </Button>
        </Col>
      </Row>
      <Row className="g-4 d-flex justify-content-between">
        {filteredRecipes
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((recipe) => (
            <Col
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
