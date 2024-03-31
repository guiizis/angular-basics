import { Ingredients } from "../shared/ingredients.interface";

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredients[];
}
