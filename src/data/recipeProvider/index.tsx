import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { Dish } from "../../models/dish";

import { Recipe } from "../../models/recipe";
import { recipes as dummyRecipes } from "../dummyData";

const initialRecipeContext = {
  recipes: [],
  allPastaTypes: [],
  allMainIngredients: [],
  sendNewRecipe: () => {},
  getRecipes: () => {},
} as unknown as ValueProp;

export const RecipeContext = createContext<ValueProp>(initialRecipeContext);

interface ValueProp {
  recipes: Dish[];
  allPastaTypes: string[];
  allMainIngredients: string[];
  sendNewRecipe: (newRecipe: Recipe) => Promise<void>;
  getRecipes: () => Promise<void>;
}

interface RecipeProviderProps {
  children?: ReactNode;
}

export const useRecipeContext = () => {
  return useContext(RecipeContext);
};

const endpoint =
  "https://pastabook-e1b8c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";

export const RecipeProvider: FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Dish[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Dish[]>(recipes);
  const [allPastaTypes, setAllPastaTypes] = useState<string[]>([]);
  const [allMainIngredients, setAllMainIngredients] = useState<string[]>([]);

  useEffect(() => {
    getRecipes();
    getAllPastaTypes();
    getAllMainIngerdients();
  }, []);

  const getRecipes = async () => {
    const temporaryRecipes: Dish[] = [];
    const jsonResponse = await fetch(endpoint, {
      method: "GET",
    });
    const response = await jsonResponse.json();
    const downloadedRecipes = Object.values(response) as Recipe[];
    console.log("z firebase: ", downloadedRecipes);
    downloadedRecipes.forEach((recipe) => {
      const dishIngredients = recipe.ingredients ? recipe.ingredients : [];
      const dishMainIngredients = recipe.mainIngredients
        ? recipe.mainIngredients
        : [];

      const dish = new Dish(
        recipe.dishName,
        recipe.pastaType,
        dishMainIngredients,
        dishIngredients,
        recipe.method,
        recipe.imageSource,
        recipe.rate
      );
      temporaryRecipes.push(dish);
    });
    setRecipes(temporaryRecipes);
  };

  const sendNewRecipe = async (newRecipe: Recipe) => {
    const body = newRecipe;
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const getAllPastaTypes = async () => {
    const temporaryAllPastaTypes: string[] = [];
    const jsonResponse = await fetch(endpoint, {
      method: "GET",
    });
    const response = await jsonResponse.json();
    const downloadedRecipes = Object.values(response) as Recipe[];
    downloadedRecipes.forEach((recipe) => {
      const newPastaType = recipe.pastaType.toLowerCase();
      if (temporaryAllPastaTypes.includes(newPastaType)) {
        return;
      } else {
        temporaryAllPastaTypes.push(newPastaType);
      }
    });
    setAllPastaTypes(temporaryAllPastaTypes);
  };

  const getAllMainIngerdients = async () => {
    const temporaryAllMainIngredients: string[] = [];
    const jsonResponse = await fetch(endpoint, {
      method: "GET",
    });
    const response = await jsonResponse.json();
    const downloadedRecipes = Object.values(response) as Recipe[];
    downloadedRecipes.forEach((recipe) => {
      recipe.mainIngredients.forEach((ingredient: string) => {
        if (temporaryAllMainIngredients.includes(ingredient)) {
          return;
        } else {
          temporaryAllMainIngredients.push(ingredient.toLowerCase());
        }
      });
    });

    setAllMainIngredients(temporaryAllMainIngredients);
  };


  const value: ValueProp = {
    recipes: recipes,
    allPastaTypes: allPastaTypes,
    allMainIngredients: allMainIngredients,
    sendNewRecipe: sendNewRecipe,
    getRecipes: getRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
