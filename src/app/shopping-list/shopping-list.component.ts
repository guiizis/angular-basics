import { Component } from '@angular/core';
import { Ingredients } from '../shared/ingredients.interface';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredients[] = [
    {
      name: 'Apples',
      amount: 5
    },
    {
      name: 'Tomatoes',
      amount: 2
    }
  ];

  onIngridientAdded(ingridient: Ingredients) {
    this.ingredients.push(ingridient);
  }
}
