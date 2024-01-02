import { Component } from '@angular/core';
import { Ingredients } from '../shared/ingredients.interface';
import { ShoppinListgService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredients[];

  constructor(private shoppingListService: ShoppinListgService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.ingridients
  }
}
