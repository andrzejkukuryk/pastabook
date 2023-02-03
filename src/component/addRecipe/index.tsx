import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { AddRecipeIngredients } from "../addRecipeIngredients";
import { AddRecipeName } from "../addRecipeName";
import { AddRecipePastaType } from "../addRecipePastaType";
import { AddRecipeMethod } from "../addRecipeMethod";
import { AddRecipePhoto } from "../addRecipePhoto";
import { Recipe } from "../../models/recipe";
import draftToHtml from "draftjs-to-html";
import { useRecipeContext } from "../../data/recipeProvider";
import { Col, Container, Form, Row } from "react-bootstrap";

export interface NewIngredient {
  main: boolean;
  name: string;
  ingredientId?: number;
}

export function AddRecipe() {
  const intialNewIngredients: NewIngredient[] = [
    { main: false, name: "", ingredientId: 0 },
  ];

  const { sendNewRecipe } = useRecipeContext();

  const [newRecipeName, setNewRecipeName] = useState<string>("");
  const [newPastaType, setNewPastaType] = useState<string>("");
  const [newMethod, setNewMethod] = useState<any>({});
  const [methodHasText, setMethodHasText] = useState<boolean>(false);
  const [newIngredients, setNewIngredients] =
    useState<NewIngredient[]>(intialNewIngredients);
  const [noError, setNoError] = useState<boolean>(false);

  const newMethodHtml = draftToHtml(newMethod);

  const createRecipeForUpload = () => {
    const newMainIngredients: string[] = [];
    const newOtherIngredients: string[] = [];
    newIngredients.forEach((ingredient) => {
      if (ingredient.main) {
        newMainIngredients.push(ingredient.name.toLowerCase());
      } else {
        newOtherIngredients.push(ingredient.name.toLowerCase());
      }
    });

    const recipe: Recipe = {
      dishName: newRecipeName,
      pastaType: newPastaType,
      mainIngredients: newMainIngredients,
      ingredients: newOtherIngredients,
      method: newMethodHtml,
      imageSource:
        "https://www.insidetherustickitchen.com/wp-content/uploads/2017/11/Italian-Beef-Ragu-740px-Inside-the-Rustic-Kitchen-26.jpg",
      rate: 2.1,
    };

    return recipe;
  };

  const errorCheck = () => {
    setNoError(
      newRecipeName.length > 0 &&
        newPastaType.length > 0 &&
        methodHasText &&
        newIngredients.some((ingredient) => ingredient.name.length > 0)
    );
  };
  useEffect(
    () => errorCheck(),
    [newRecipeName, newPastaType, newMethod, newIngredients]
  );

  return (
    // <div className={styles.container}>
    //   <h2>Add new recipe</h2>
    //   <AddRecipeName
    //     newRecipeName={newRecipeName}
    //     setNewRecipeName={setNewRecipeName}
    //   />
    //   <AddRecipePastaType setNewPastaType={setNewPastaType} />
    //   <AddRecipeIngredients
    //     newIngredients={newIngredients}
    //     setNewIngredients={setNewIngredients}
    //   />
    //   <AddRecipeMethod
    //     setNewMethod={setNewMethod}
    //     setMethodHasText={setMethodHasText}
    //   />
    //   <AddRecipePhoto />
    //   {noError && (
    //     <button onClick={() => sendNewRecipe(createRecipeForUpload())}>
    //       Add new recipe
    //     </button>
    //   )}
    // </div>
    <Container>
      <Row>
        <Col>
          <h2 className="h2">Add new recipe</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Label>General</Form.Label>
            <AddRecipeName
              newRecipeName={newRecipeName}
              setNewRecipeName={setNewRecipeName}
            />
            <AddRecipePastaType setNewPastaType={setNewPastaType} />
            <AddRecipeIngredients
              newIngredients={newIngredients}
              setNewIngredients={setNewIngredients}
            />
            {/* <AddRecipeMethod
              setNewMethod={setNewMethod}
              setMethodHasText={setMethodHasText}
            /> */}
            <AddRecipePhoto />
          </Form>
        </Col>
      </Row>
      {noError && (
        <button onClick={() => sendNewRecipe(createRecipeForUpload())}>
          Add new recipe
        </button>
      )}
    </Container>
  );
}
