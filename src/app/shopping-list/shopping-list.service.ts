import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppinListgService {

  private _ingredients: Ingredients[] = [
    {
      name: 'Apples',
      amount: 5
    },
    {
      name: 'Tomatoes',
      amount: 2
    }
  ];

  get ingridients(): Ingredients[] {
    return this._ingredients.slice();
  }

  constructor() { }

  addIngridient(ingridient: Ingredients) {
    this._ingredients.push(ingridient)
  }
}
