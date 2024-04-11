import { EventEmitter, Injectable } from '@angular/core'
import { Ingredients } from '../shared/ingredients.interface'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredients[]>()
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

  get ingredients(): Ingredients[] {
    return this._ingredients.slice()
  }

  getIngredient(index: number): Ingredients {
    return this.ingredients[index]
  }

  constructor() { }

  addIngredient(ingridient: Ingredients) {
    this._ingredients.push(ingridient)
    this.ingredientsChanged.next(this._ingredients.slice())
  }

  addingredients(ingridient: Ingredients[]) {
    this._ingredients.push(...ingridient)
    this.ingredientsChanged.next(this._ingredients.slice())
  }

  updateIngredient(index: number, newIngridient: Ingredients): void {
    this._ingredients[index] = newIngridient
    this.ingredientsChanged.next(this._ingredients.slice())
  }

  deleteIngredient(index: number): void {
    this._ingredients.splice(index, 1)
    this.ingredientsChanged.next(this._ingredients.slice())
  }
}
