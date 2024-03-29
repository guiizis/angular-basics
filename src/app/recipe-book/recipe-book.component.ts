import { Component } from '@angular/core';
import { Recipe } from './recipe.interface';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent {
  selectedRecipe: Recipe;

  constructor() {}

  ngOnInit() {}
}
