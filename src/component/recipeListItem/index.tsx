import React from "react";
import { RecipeRatingStars } from "../recipeRatingStars";
import "./style.css";
import { Card } from "react-bootstrap";

interface RecipeListItemProps {
  imageSource: string;
  dishName: string;
  rate: number;
}

export function RecipeListItem({
  dishName,
  imageSource,
  rate,
}: RecipeListItemProps) {
  return (
    <>
      <Card style={{ width: 370, height: 210 }}>
        <Card.Img variant="top" src={imageSource} />
        <Card.Body
          className="d-flex justify-content-between"
          style={{ height: 70 }}
        >
          <Card.Title>{dishName}</Card.Title>
          <RecipeRatingStars rate={rate} />
        </Card.Body>
      </Card>
    </>
  );
}
