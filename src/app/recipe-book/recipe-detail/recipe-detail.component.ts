import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppinListgService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe

  constructor(private shoppingListService: ShoppinListgService) {}

  onAddShoppingItems(ingridients: Ingredients[]): void {
    this.shoppingListService.addIngridients(ingridients)
  }
}
