import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  recipe: Recipe
  paramsSubscription: Subscription
  id: number

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(data => {
      this.id = data['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onAddShoppingItems(ingredients: Ingredients[]): void {
    this.shoppingListService.addingredients(ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
