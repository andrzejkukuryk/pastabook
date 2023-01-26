export class Dish {
  dishName: string;
  pastaType: string;
  mainIngredients: string[];
  otherIngredients: string[];
  method: string;
  imageSource: string;
  rate: number;

  constructor(
    dishName: string,
    pastaType: string,
    mainIngredients: string[],
    otherIngredients: string[],
    method: string,
    imageSource: string,
    rate: number
  ) {
    this.dishName = dishName;
    this.pastaType = pastaType;
    this.mainIngredients = mainIngredients;
    this.otherIngredients = otherIngredients;
    this.method = method;
    this.imageSource = imageSource;
    this.rate = rate;
  }
  get path() {
    return this.dishName.toLowerCase().replace(/\s+/g, "");
  }

  get fullName() {
    return `${this.pastaType[0].toUpperCase()}${this.pastaType.slice(1)} ${
      this.dishName
    }`;
  }

  get ingredients() {
    let allIngredients: string[] = [
      ...this.mainIngredients,
      ...this.otherIngredients,
    ];
    allIngredients.unshift(this.pastaType.toLowerCase());

    return allIngredients;
  }
}
