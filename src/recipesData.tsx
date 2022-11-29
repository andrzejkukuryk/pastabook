interface Recipe {
  dishName: string;
  pastaType: string;
  ingredients: string[];
  fullName: string;
  imageSource: string;
  rate: number;
  path: string;
}

class Dish {
  dishName: string;
  pastaType: string;
  ingredients: string[];
  imageSource: string;
  rate: number;

  constructor(
    dishName: string,
    pastaType: string,
    ingredients: string[],
    imageSource: string,
    rate: number
  ) {
    this.dishName = dishName;
    this.pastaType = pastaType;
    this.ingredients = ingredients;
    // this.fullName = () => `${this.pastaType} ${this.dishName}`;
    this.imageSource = imageSource;
    this.rate = rate;
  }
  get path() {
    return this.dishName.toLowerCase().replace(/\s+/g, "");
  }

  get fullName() {
    return `${this.pastaType} ${this.dishName}`;
  }
}

const aglioOlio = new Dish(
  "Aglio Olio",
  "Spaghetti",
  ["garlic", "olive oil", "chili pepper", "parsley"],
  "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/F5853F13-70A5-4A54-B38A-8F229C3050F5/Derivates/7C5F0049-A335-40D1-8EF5-D2702653584E.jpg",
  2.6
);
const carbonara = new Dish(
  "Carbonara",
  "Spaghetti",
  ["guanciale", "egg", "pecorino", "black pepper"],
  "https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/11/ricetta-spaghetti-carbonara/_jcr_content/header-par/image_single.img.jpg/1617198167116.jpg",
  3
);
const arrabbiata = new Dish(
  "Arrabbiata",
  "Penne",
  ["pelati tomatoes", "olive oil", "garlic", "parsley", "chili pepper"],
  "https://www.saltandlavender.com/wp-content/uploads/2019/04/easy-pasta-arrabiata-recipe-1-720x1080.jpg",
  2.1
);
const pesto = new Dish(
  "al Pesto",
  "Trofie",
  ["basil", "olive oil", "parmigiano-reggiano", "garlic", "pine nuts"],
  "https://blog.giallozafferano.it/incucinaconmara/wp-content/uploads/2013/06/Trofie-al-pesto-720x517.jpg",
  3
);
const ragu = new Dish(
  "al Ragu",
  "Tagliatelle",
  [
    "minced beef",
    "minced pork",
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
  "https://www.insidetherustickitchen.com/wp-content/uploads/2017/11/Italian-Beef-Ragu-740px-Inside-the-Rustic-Kitchen-26.jpg",
  1.9
);

export const recipes: Recipe[] = [
  aglioOlio,
  carbonara,
  arrabbiata,
  pesto,
  ragu,
];

export const recipesCollection = document.getElementsByClassName("Dish");
export const allIngredients: string[] = [];
const getAllIngerdients = () => {
  recipes.map((recipe) => {
    recipe.ingredients.map((ingredient: string) => {
      if (allIngredients.includes(ingredient)) {
        return;
      } else {
        allIngredients.push(ingredient);
      }
    });
  });
};

getAllIngerdients();

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

// const createRecipes = () => {
//     for(let i = 0; i < recipesCollection.length; i++){
//         recipes.push(recipesCollection[i]);
//     }
// }
