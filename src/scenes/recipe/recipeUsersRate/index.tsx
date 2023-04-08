import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAuthContext } from "../../../data/authProvider";
import starEmpty from "./graph/star_empty.png";
import starFull from "./graph/star_full.png";

interface RecipeUsersRateProps {
  recipeUrl: string;
}

export function RecipeUsersRate({ recipeUrl }: RecipeUsersRateProps) {
  const [rate, setRate] = useState(0);
  const { currentRatings } = useAuthContext();

  const checkUsersRate = () => {
    const thisRating = currentRatings.filter(
      (rating) => rating.name === recipeUrl
    );

    setRate(thisRating[0].value);
  };

  useEffect(() => {
    checkUsersRate();
  }, [currentRatings]);

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
          <p className="h6 my-0 pe-4 me-3">Your rating:</p>
          <div className={firstStarEmptyClass}>
            <img src={starEmpty} alt="" />
          </div>
          <div className={firstStarFullClass}>
            <img src={starFull} alt="" />
          </div>
          <div className={secondStarEmptyClass}>
            <img src={starEmpty} alt="" />
          </div>
          <div className={secondStarFullClass}>
            <img src={starFull} alt="" />
          </div>
          <div className={thirdStarEmptyClass}>
            <img src={starEmpty} alt="" />
          </div>
          <div className={thirdStarFullClass}>
            <img src={starFull} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
