import { Component, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppinListgService } from '../shopping-list.service';
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

  constructor(private shoppinListService: ShoppinListgService) {}

  ngOnInit() {
    this.subscription = this.shoppinListService.startEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index
        this.editMode = true
        this.editedItem = this.shoppinListService.getIngridient(this.editItemIndex)
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    )
  }

  addIngridient(form: NgForm) {
    const {name, amount} = form.value

    const newIngridient: Ingredients = {name,amount}

    this.shoppinListService.addIngridient(newIngridient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
