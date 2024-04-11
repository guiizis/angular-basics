import { Component } from '@angular/core';
import { Ingredients } from '../shared/ingredients.interface';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredients[];
  ingredientsChangedSubscription: Subscription

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.ingredients
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredients[]) =>{
      this.ingredients = ingredients
    });
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe()
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index)
  }
}
