import { Component, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppingListgService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('form', {static: false}) form: NgForm
  subscription: Subscription
  editMode = false
  editItemIndex: number
  editedItem: Ingredients

  constructor(private shoppingListService: ShoppingListgService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index
        this.editMode = true
        this.editedItem = this.shoppingListService.getIngredient(this.editItemIndex)
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    )
  }

  onSubmit(form: NgForm) {
    const {name, amount} = form.value

    const newIngredient: Ingredients = {name,amount}

    this.editMode ?
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient) :
      this.shoppingListService.addIngredient(newIngredient)

    this.onClear()
  }

  onClear() {
    this.editMode = false
    this.form.reset()
  }

  onDelete() {
    this.onClear()
    this.shoppingListService.deleteIngredient(this.editItemIndex)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
