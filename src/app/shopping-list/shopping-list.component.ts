import { Component } from '@angular/core';
import { Ingredients } from '../shared/ingredients.interface';
import { ShoppinListgService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredients[];
  ingridientsChangedSubscription: Subscription

  constructor(private shoppingListService: ShoppinListgService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.ingridients
    this.ingridientsChangedSubscription = this.shoppingListService.ingridientsChanged.subscribe((ingridients: Ingredients[]) =>{
      this.ingredients = ingridients
    });
  }

  ngOnDestroy() {
    this.ingridientsChangedSubscription.unsubscribe()
  }

  onEditItem(ingridient: Ingredients) {

  }
}
