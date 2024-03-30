import { EventEmitter, Injectable } from '@angular/core'
import { Ingredients } from '../shared/ingredients.interface'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShoppingListgService {
  ingridientsChanged = new Subject<Ingredients[]>()
  startEditing = new Subject<number>()
  private _ingredients: Ingredients[] = [
    {
      name: 'Apples',
      amount: 5
    },
    {
      name: 'Tomatoes',
      amount: 2
    }
  ]

  get ingridients(): Ingredients[] {
    return this._ingredients.slice()
  }

  getIngredient(index: number): Ingredients {
    return this.ingridients[index]
  }

  constructor() { }

  addIngredient(ingridient: Ingredients) {
    this._ingredients.push(ingridient)
    this.ingridientsChanged.next(this._ingredients.slice())
  }

  addIngridients(ingridient: Ingredients[]) {
    this._ingredients.push(...ingridient)
    this.ingridientsChanged.next(this._ingredients.slice())
  }

  updateIngredient(index: number, newIngridient: Ingredients): void {
    this._ingredients[index] = newIngridient
    this.ingridientsChanged.next(this._ingredients.slice())
  }

  deleteIngredient(index: number): void {
    this._ingredients.splice(index, 1)
    this.ingridientsChanged.next(this._ingredients.slice())
  }
}
