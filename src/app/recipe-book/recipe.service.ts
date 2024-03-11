import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private _recipes: Recipe[] = [
    {
      name: 'teste',
      description: 'teste',
      imagePath: 'https://www.foodandwine.com/thmb/-wrVEmLnndHnIzla-W2g2x-LLQA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Korean-Style-Seared-Tuna-FT-RECIPE0822-2000-1e6d136c69684c0a9e31f584b3161a81.jpg',
      ingridients: [
        {
          name: 'Meat',
          amount: 5
        }
      ]
    },
    {
      name: 'outro teste',
      description: 'mais um teste',
      imagePath: 'https://www.foodandwine.com/thmb/-wrVEmLnndHnIzla-W2g2x-LLQA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Korean-Style-Seared-Tuna-FT-RECIPE0822-2000-1e6d136c69684c0a9e31f584b3161a81.jpg',
      ingridients: [
        {
          name: 'French Fries',
          amount: 20
        },
        {
          name: 'Buns',
          amount: 3
        }
      ]
    }
  ];

  constructor() { }

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }
}
