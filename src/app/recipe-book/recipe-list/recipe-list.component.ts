import { Component } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[]

  constructor(private recipeService: RecipeService){ }

  ngOnInit() {
    this.recipes = this.recipeService.recipes;
  }

}
