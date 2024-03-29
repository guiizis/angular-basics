import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinListgService {
  ingridientsChanged = new Subject<Ingredients[]>()
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
    this._ingredients.push(ingridient);
    this.ingridientsChanged.next(this._ingredients.slice());
  }

  addIngridients(ingridient: Ingredients[]) {
    this._ingredients.push(...ingridient);
    this.ingridientsChanged.next(this._ingredients.slice());
  }
}
