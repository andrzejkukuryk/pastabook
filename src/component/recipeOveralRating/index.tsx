import React, { useEffect, useState } from "react";
import starFull from "./graph/star_full.png";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";

interface RecipeOveralRatingProps {
  rates: number[];
}

export function RecipeOveralRating({ rates }: RecipeOveralRatingProps) {
  const [recipeHasRates, setRecipeHasRates] = useState<boolean>(false);

  const checkRecipeHasRates = () => {
    if (rates.length > 1) {
      setRecipeHasRates(true);
    } else {
      setRecipeHasRates(false);
    }
  };

  useEffect(() => {
    checkRecipeHasRates();
  }, [rates]);

  const countAverageRate = () => {
    if (rates.length > 1) {
      const avg = rates.reduce((a, b) => a + b) / (rates.length - 1);
      if (Number.isInteger(avg)) {
        return avg;
      } else {
        return avg.toFixed(1).replace(".", ",");
      }
    }
    return 1;
  };

  const averageRate = countAverageRate();

  return (
    <Container className="p-0">
      {recipeHasRates && (
        <Row>
          <Col xs={12} className="starContainer  d-flex">
            <p className="h6 my-0">
              Rated: <span className="h5 m-0">{averageRate}</span> / 3
              <img src={starFull} alt="rating star" className="mb-2" /> (
              {rates.length - 1} {rates.length === 2 ? "vote" : "votes"})
            </p>
          </Col>
        </Row>
      )}
      {!recipeHasRates && (
        <Row>
          <Col>
            <p className="h6 my-0">Not rated yet </p>
          </Col>
        </Row>
      )}
    </Container>
  );
}
