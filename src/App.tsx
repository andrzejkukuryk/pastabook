import React from "react";
import "./App.css";
import { RecipeList } from "./component/recipeList";
import { UserLoginMenu } from "./component/userLoginMenu";

function App() {
  return (
    <div className="App">
      <header>
        <UserLoginMenu />
      </header>
      <main>
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
