import React from "react";
import "./App.css";
import { Logo } from "./component/logo";
import styles from "./style.module.css";
import { RecipeList } from "./component/recipeList";
import { UserLoginMenu } from "./component/userLoginMenu";

function App() {
  return (
    <div className="App">
      <header className={styles.header}>
        <Logo />
        <UserLoginMenu />
      </header>
      <hr />
      <main>
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
