import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import starEmpty from "./graph/star_empty.png";
import starHalf from "./graph/star_half.png";
import starFull from "./graph/star_full.png";

interface RecipeRatingStarsProps {
  rate: number[];
}

export function RecipeRatingStars({ rate }: RecipeRatingStarsProps) {
  const [rated, setRated] = useState<boolean>(true);
  const countAverageRate = () => {
    if (rate.length > 1) {
      const avg = rate.reduce((a, b) => a + b) / (rate.length - 1);
      return avg;
    }
    return 1;
  };

  const checkIsRated = () => {
    setRated(rate.length > 1 ? true : false);
  };

  useEffect(() => {
    checkIsRated();
  }, [rate]);

  const averageRate = countAverageRate();

  const classFirstStar = classNames({
    [styles.starEnabled]: true,
  });

  const classSecondStarEmpty = classNames({
    [styles.starEnabled]: averageRate < 1.5,
    [styles.starDisabled]: averageRate >= 1.5,
  });

  const classSecondStarHalf = classNames({
    [styles.starEnabled]: averageRate >= 1.5 && averageRate < 2,
    [styles.starDisabled]: averageRate < 1.5 || averageRate >= 2,
  });

  const classSecondStarFull = classNames({
    [styles.starEnabled]: averageRate >= 2,
    [styles.starDisabled]: averageRate < 2,
  });

  const classThirdStarEmpty = classNames({
    [styles.starEnabled]: averageRate < 2.5,
    [styles.starDisabled]: averageRate >= 2.5,
  });

  const classThirdStarHalf = classNames({
    [styles.starEnabled]: averageRate >= 2.5 && averageRate < 2.9,
    [styles.starDisabled]: averageRate < 2.5 || averageRate >= 2.9,
  });

  const classThirdStarFull = classNames({
    [styles.starEnabled]: averageRate >= 2.9,
    [styles.starDisabled]: averageRate < 2.9,
  });

  return (
    <>
      {rated && (
        <div className="col-3 d-flex flex-column">
          <p className={styles.rating}>Rating:</p>
          <div className={styles.container}>
            <div className={styles.starContainer}>
              <img className={classFirstStar} src={starFull} alt=""></img>
            </div>
            <div className={styles.starContainer}>
              <img
                className={classSecondStarEmpty}
                src={starEmpty}
                alt=""
              ></img>
              <img className={classSecondStarHalf} src={starHalf} alt=""></img>
              <img className={classSecondStarFull} src={starFull} alt=""></img>
            </div>
            <div className={styles.starContainer}>
              <img className={classThirdStarEmpty} src={starEmpty} alt=""></img>
              <img className={classThirdStarHalf} src={starHalf} alt=""></img>
              <img className={classThirdStarFull} src={starFull} alt=""></img>
            </div>
          </div>
        </div>
      )}
      {!rated && (
        <div className="col-3 d-flex flex-column">
          <p className={styles.notRated}>Not rated yet</p>
        </div>
      )}
    </>
  );
}
