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
  filteredRecipes: [],
  allPastaTypes: [],
  allMainIngredients: [],
  sendNewRecipe: () => {},
  filterByName: () => {},
  filterByType: () => {},
  filterByMain: () => {},
  getRecipes: () => {},
} as unknown as ValueProp;

export const RecipeContext = createContext<ValueProp>(initialRecipeContext);

interface ValueProp {
  recipes: Dish[];
  filteredRecipes: Dish[];
  allPastaTypes: string[];
  allMainIngredients: string[];
  sendNewRecipe: (newRecipe: Recipe) => Promise<void>;
  filterByName: (name: string) => void;
  filterByType: (types: string[]) => void;
  filterByMain: (mains: string[]) => void;
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
  const [filteredRecipes, setFilteredRecipes] = useState<Dish[]>([]);
  const [filteredByType, setFilteredByType] = useState<Dish[]>([]);
  const [filteredByMain, setFilteredByMain] = useState<Dish[]>([]);
  const [mergedFilteredRecipes, setMergedFilteredRecipes] = useState<Dish[]>(
    []
  );
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

    setFilteredRecipes(temporaryRecipes);
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

  const filterByName = (name: string) => {
    const temporaryFilteredRecipes = mergedFilteredRecipes.filter((recipe) =>
      recipe.fullName.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredRecipes(temporaryFilteredRecipes);
  };

  const filterByType = (types: string[]) => {
    let temporaryFilteredRecipes: Dish[] = [];

    types.forEach((type) => {
      [...recipes].forEach((recipe) => {
        if (recipe.pastaType === type) {
          temporaryFilteredRecipes.push(recipe);
        }
      });
    });

    setFilteredByType(temporaryFilteredRecipes);
  };

  const filterByMain = (mains: string[]) => {
    let temporaryFilteredRecipes: Dish[] = [];

    mains.forEach((main) =>
      [...recipes].forEach((recipe) => {
        if (
          recipe.mainIngredients
            .map((ingr) => ingr.toLowerCase())
            .includes(main)
        ) {
          if (!temporaryFilteredRecipes.includes(recipe)) {
            temporaryFilteredRecipes.push(recipe);
          }
        }
      })
    );
    setFilteredByMain(temporaryFilteredRecipes);
  };

  const mergeFilters = () => {
    const mergedFilteredRecipes = [...filteredByType, ...filteredByMain];
    const uniqueRecipes: Dish[] = [];
    mergedFilteredRecipes.forEach((recipe) => {
      if (!uniqueRecipes.includes(recipe)) {
        uniqueRecipes.push(recipe);
      }
    });
    if (uniqueRecipes.length > 0) {
      setFilteredRecipes(uniqueRecipes);
      setMergedFilteredRecipes(uniqueRecipes);
    } else {
      setFilteredRecipes(recipes);
      setMergedFilteredRecipes(recipes);
    }
  };

  useEffect(() => {
    mergeFilters();
  }, [filteredByMain, filteredByType]);

  const value: ValueProp = {
    recipes: recipes,
    filteredRecipes: filteredRecipes,
    allPastaTypes: allPastaTypes,
    allMainIngredients: allMainIngredients,
    sendNewRecipe: sendNewRecipe,
    filterByName: filterByName,
    filterByType: filterByType,
    filterByMain: filterByMain,
    getRecipes: getRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
