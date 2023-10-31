import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.interface';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() selectedRecipe = new EventEmitter<void>();

  onSelected() {
    this.selectedRecipe.emit();
  }

}
