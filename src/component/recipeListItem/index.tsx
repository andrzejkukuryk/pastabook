import React from "react";
import { RecipeRatingStars } from "../recipeRatingStars";
import styles from "./style.module.css";
import "./style.css";
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
      <Card style={{ width: 370, height: 210, marginBottom: 25 }}>
        <Card.Img variant="top" src={imageSource} />
        <Card.Body style={{ height: 70 }}>
          <Card.Title>{dishName}</Card.Title>
          <RecipeRatingStars rate={rate} />
        </Card.Body>
      </Card>
    </>
  );
}
