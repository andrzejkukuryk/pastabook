import { Recipe } from "../models/recipe";
import { Dish } from "../models/dish";

const loremMethod =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const aglioOlio = new Dish(
  "Aglio Olio",
  "Spaghetti",
  ["garlic", "olive oil"],
  ["chili pepper", "parsley"],
  loremMethod,
  "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/F5853F13-70A5-4A54-B38A-8F229C3050F5/Derivates/7C5F0049-A335-40D1-8EF5-D2702653584E.jpg",
  2.6
);
const carbonara = new Dish(
  "Carbonara",
  "Spaghetti",
  ["guanciale", "egg", "pecorino"],
  ["black pepper"],
  loremMethod,
  "https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/11/ricetta-spaghetti-carbonara/_jcr_content/header-par/image_single.img.jpg/1617198167116.jpg",
  3
);

const arrabbiata = new Dish(
  "Arrabbiata",
  "Penne",
  ["pelati tomatoes"],
  ["olive oil", "garlic", "parsley", "chili pepper"],
  loremMethod,
  "https://www.saltandlavender.com/wp-content/uploads/2019/04/easy-pasta-arrabiata-recipe-1-720x1080.jpg",
  2.1
);
const pesto = new Dish(
  "al Pesto",
  "Trofie",
  ["basil", "olive oil"],
  ["parmigiano-reggiano", "garlic", "pine nuts"],
  loremMethod,
  "https://blog.giallozafferano.it/incucinaconmara/wp-content/uploads/2013/06/Trofie-al-pesto-720x517.jpg",
  3
);
const ragu = new Dish(
  "al Ragu",
  "Tagliatelle",
  ["minced beef", "minced pork"],
  [
    "pancetta",
    "carrot",
    "onion",
    "celery",
    "tomato puree",
    "tomato concentrate",
    "milk",
    "broth",
    "olive oil",
  ],
  loremMethod,
  "https://www.insidetherustickitchen.com/wp-content/uploads/2017/11/Italian-Beef-Ragu-740px-Inside-the-Rustic-Kitchen-26.jpg",
  1.9
);

const carbonara2 = new Dish(
  "Carbonara",
  "Rigatoni",
  ["guanciale", "egg", "pecorino"],
  ["black pepper"],
  loremMethod,
  "https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/11/ricetta-spaghetti-carbonara/_jcr_content/header-par/image_single.img.jpg/1617198167116.jpg",
  3
);

export const recipes: Recipe[] = [
  aglioOlio,
  carbonara,
  arrabbiata,
  pesto,
  ragu,
  carbonara2,
];

export const allMainIngredients: string[] = [];
const getAllMainIngerdients = () => {
  recipes.map((recipe) => {
    recipe.mainIngredients.map((ingredient: string) => {
      if (allMainIngredients.includes(ingredient)) {
        return;
      } else {
        allMainIngredients.push(ingredient);
      }
    });
  });
};

getAllMainIngerdients();

export const allPastaTypes: string[] = [];
const getAllPastaTypes = () => {
  recipes.map((recipe) => {
    let newPastaType = recipe.pastaType.toLowerCase();
    if (allPastaTypes.includes(newPastaType)) {
      return;
    } else {
      allPastaTypes.push(newPastaType);
    }
  });
};

getAllPastaTypes();
