import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import starEmpty from "./graph/star_empty.png";
import starHalf from "./graph/star_half.png";
import starFull from "./graph/star_full.png";

interface RecipeRatingStarsProps {
  rate: number;
}

export function RecipeRatingStars({ rate }: RecipeRatingStarsProps) {
  const classFirstStar = classNames({
    [styles.starEnabled]: true,
  });

  const classSecondStarEmpty = classNames({
    [styles.starEnabled]: rate < 1.5,
    [styles.starDisabled]: rate >= 1.5,
  });

  const classSecondStarHalf = classNames({
    [styles.starEnabled]: rate >= 1.5 && rate < 2,
    [styles.starDisabled]: rate < 1.5 || rate >= 2,
  });

  const classSecondStarFull = classNames({
    [styles.starEnabled]: rate >= 2,
    [styles.starDisabled]: rate < 2,
  });

  const classThirdStarEmpty = classNames({
    [styles.starEnabled]: rate < 2.5,
    [styles.starDisabled]: rate >= 2.5,
  });

  const classThirdStarHalf = classNames({
    [styles.starEnabled]: rate >= 2.5 && rate !== 3,
    [styles.starDisabled]: rate < 2.5 || rate === 3,
  });

  const classThirdStarFull = classNames({
    [styles.starEnabled]: rate === 3,
    [styles.starDisabled]: rate < 3,
  });

  return (
    <div className={styles.container}>
      <div className={styles.starContainer}>
        <img className={classFirstStar} src={starFull} alt=""></img>
      </div>
      <div className={styles.starContainer}>
        <img className={classSecondStarEmpty} src={starEmpty} alt=""></img>
        <img className={classSecondStarHalf} src={starHalf} alt=""></img>
        <img className={classSecondStarFull} src={starFull} alt=""></img>
      </div>
      <div className={styles.starContainer}>
        <img className={classThirdStarEmpty} src={starEmpty} alt=""></img>
        <img className={classThirdStarHalf} src={starHalf} alt=""></img>
        <img className={classThirdStarFull} src={starFull} alt=""></img>
      </div>
    </div>
  );
}
