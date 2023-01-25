import React from "react";
import { RecipeRatingStars } from "../recipeRatingStars";
import styles from "./style.module.css";
import { Card, Container } from "react-bootstrap";

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
      <style type="text/css">
        {`
    .card-body {
      display: flex;
      justify-content: space-between;
    }
    a {
      color: #212529;
      text-decoration: none;
    }
    `}
      </style>

      <Card style={{ width: 370, height: 210 }}>
        <Card.Img
          variant="top"
          src={imageSource}
          style={{ height: 157, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{dishName}</Card.Title>
          <RecipeRatingStars rate={rate} />
        </Card.Body>
      </Card>
    </>
  );
}
