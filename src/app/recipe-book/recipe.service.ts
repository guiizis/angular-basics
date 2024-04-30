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

  private _recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes
    this.recipeChanged.next(this._recipes.slice())
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
