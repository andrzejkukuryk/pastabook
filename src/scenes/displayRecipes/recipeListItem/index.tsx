import React, { useState, useEffect } from "react";
import "./style.css";
import { Card } from "react-bootstrap";
import { useAuthContext } from "../../../data/authProvider";
import { RecipeListItemOveralRating } from "../recipeListItemOveralRating";
import { ReactComponent as BiSuitHeartSm } from "../../../assets/bi-suit-heart-sm.svg";

interface RecipeListItemProps {
  imageSource: string;
  dishName: string;
  rate: number[];
  path: string;
}

export function RecipeListItem({
  dishName,
  imageSource,
  rate,
  path,
}: RecipeListItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { currentFavorites } = useAuthContext();

  const checkFavorites = () => {
    if (currentFavorites.length > 0) {
      setIsFavorite(currentFavorites.includes(path));
    } else {
      setIsFavorite(false);
    }
  };
  useEffect(() => checkFavorites(), [currentFavorites]);

  return (
    <>
      <Card
        className="cardContainer"
        style={{ width: 353, height: 240, flexShrink: 3 }}
      >
        <Card.Img variant="top" src={imageSource} alt={dishName} />
        <Card.Body
          className="d-flex flex-column justify-content-between cardBody"
          style={{ height: 100, paddingTop: 8 }}
        >
          <Card.Title
            style={{ paddingTop: 7, marginBottom: 15, fontWeight: 600 }}
          >
            <div className="d-flex justify-content-between">
              <div className="text-truncate">{dishName}</div>
              {isFavorite && (
                <div className="text-primary">
                  <BiSuitHeartSm />
                </div>
              )}
            </div>
          </Card.Title>
          <RecipeListItemOveralRating rates={rate} />
        </Card.Body>
      </Card>
    </>
  );
}
