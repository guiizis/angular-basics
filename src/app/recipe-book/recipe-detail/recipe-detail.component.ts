import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppinListgService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  recipe: Recipe
  paramsSubscription: Subscription

  constructor(
    private shoppingListService: ShoppinListgService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(data => {
      const { id } = data;
      this.recipe = this.recipeService.getRecipe(id);
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onAddShoppingItems(ingridients: Ingredients[]): void {
    this.shoppingListService.addIngridients(ingridients)
  }
}
