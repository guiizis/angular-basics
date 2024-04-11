import { Injectable } from '@angular/core';
import { Recipe } from './recipe.interface';
import { Ingredients } from '../shared/ingredients.interface';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>()

  private _recipes: Recipe[] = [
    {
      name: 'teste',
      description: 'teste',
      imagePath: 'https://www.foodandwine.com/thmb/-wrVEmLnndHnIzla-W2g2x-LLQA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Korean-Style-Seared-Tuna-FT-RECIPE0822-2000-1e6d136c69684c0a9e31f584b3161a81.jpg',
      ingredients: [
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
      ingredients: [
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

  constructor(private slService: ShoppingListService) { }

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.slService.addingredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe)
    this.recipeChanged.next(this.recipes)
  }

  updateRecipe(index:number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes)
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes)
  }
}
