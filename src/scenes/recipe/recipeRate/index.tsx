import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import starEmpty from "./graph/star_empty.png";
import starFull from "./graph/star_full.png";
import classNames from "classnames";
import { useAuthContext } from "../../../data/authProvider";
import { useRecipeContext } from "../../../data/recipeProvider";

interface RecipeRateProps {
  recipeUrl: string;
}

export function RecipeRate({ recipeUrl }: RecipeRateProps) {
  const [rate, setRate] = useState(0);
  const { user, rateRecipe } = useAuthContext();
  const { getRecipes } = useRecipeContext();

  const handleSubmit = async () => {
    if (user) {
      await rateRecipe(user?.email, rate, recipeUrl);
      getRecipes();
    }
  };

  const firstStarEmptyClass = classNames({
    starDisabled: rate > 0,
    starEnabled: rate === 0,
  });

  const firstStarFullClass = classNames({
    starDisabled: rate === 0,
    starEnabled: rate > 0,
  });

  const secondStarEmptyClass = classNames({
    starDisabled: rate > 1,
    starEnabled: rate <= 1,
  });

  const secondStarFullClass = classNames({
    starDisabled: rate <= 1,
    starEnabled: rate > 1,
  });

  const thirdStarEmptyClass = classNames({
    starDisabled: rate > 2,
    starEnabled: rate <= 2,
  });

  const thirdStarFullClass = classNames({
    starDisabled: rate <= 2,
    starEnabled: rate > 2,
  });

  return (
    <Container className="p-0">
      <Row>
        <Col className="starsContainer d-flex flex-row align-items-end">
          <p className="h6 me-2 my-0">Rate this recipe: </p>
          <div className={firstStarEmptyClass}>
            <img
              src={starEmpty}
              alt=""
              onMouseOver={() => setRate(1)}
              onMouseLeave={() => setRate(0)}
              onTouchStart={() => setRate(1)}
            />
          </div>
          <div className={firstStarFullClass}>
            <img
              src={starFull}
              alt=""
              onMouseOver={() => setRate(1)}
              onMouseLeave={() => setRate(0)}
              onMouseDown={handleSubmit}
              onTouchEnd={handleSubmit}
            />
          </div>
          <div className={secondStarEmptyClass}>
            <img
              src={starEmpty}
              alt=""
              onMouseOver={() => setRate(2)}
              onMouseLeave={() => setRate(0)}
              onTouchStart={() => setRate(2)}
            />
          </div>
          <div className={secondStarFullClass}>
            <img
              src={starFull}
              alt=""
              onMouseOver={() => setRate(2)}
              onMouseLeave={() => setRate(0)}
              onMouseDown={handleSubmit}
              onTouchEnd={handleSubmit}
            />
          </div>
          <div className={thirdStarEmptyClass}>
            <img
              src={starEmpty}
              alt=""
              onMouseOver={() => setRate(3)}
              onMouseLeave={() => setRate(0)}
              onTouchStart={() => setRate(3)}
            />
          </div>
          <div className={thirdStarFullClass}>
            <img
              src={starFull}
              alt=""
              onMouseOver={() => setRate(3)}
              onMouseLeave={() => setRate(0)}
              onMouseDown={handleSubmit}
              onTouchEnd={handleSubmit}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
