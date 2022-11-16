import React from "react";
import "./App.css";
import { RecipeListItem } from "./component/recipeListItem";

function App() {
  return (
    <div className="App">
      <RecipeListItem
        dishName="Spaghetti Carbonara"
        imageSource="https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/11/ricetta-spaghetti-carbonara/_jcr_content/header-par/image_single.img.jpg/1617198167116.jpg"
        rate={3}
      />
    </div>
  );
}

export default App;
