import React from "react";
import { RecipeListItem } from "../recipeListItem";
import styles from "./style.module.css";

export function RecipeList() {
  return (
    <div className={styles.container}>
      <h2 className={styles.lastRecipesTitle}>Last recipes:</h2>

      <div className={styles.flexContainer}>
        <RecipeListItem
          dishName="Spaghetti Carbonara"
          imageSource="https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/11/ricetta-spaghetti-carbonara/_jcr_content/header-par/image_single.img.jpg/1617198167116.jpg"
          rate={3}
        />
        <RecipeListItem
          dishName="Penne Arrabbiata"
          imageSource="https://www.saltandlavender.com/wp-content/uploads/2019/04/easy-pasta-arrabiata-recipe-1-720x1080.jpg"
          rate={2.6}
        />
        <RecipeListItem
          dishName="Tagliatelle Ragu"
          imageSource="https://www.insidetherustickitchen.com/wp-content/uploads/2017/11/Italian-Beef-Ragu-740px-Inside-the-Rustic-Kitchen-26.jpg"
          rate={1.9}
        />
        <RecipeListItem
          dishName="Spaghetti Aglio Olio"
          imageSource="https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/F5853F13-70A5-4A54-B38A-8F229C3050F5/Derivates/7C5F0049-A335-40D1-8EF5-D2702653584E.jpg"
          rate={3}
        />
        <RecipeListItem
          dishName="Trofie al Pesto"
          imageSource="https://blog.giallozafferano.it/incucinaconmara/wp-content/uploads/2013/06/Trofie-al-pesto-720x517.jpg"
          rate={2.4}
        />
      </div>
    </div>
  );
}
