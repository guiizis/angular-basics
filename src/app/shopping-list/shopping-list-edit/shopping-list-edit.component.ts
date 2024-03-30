import { Component } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppinListgService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  constructor(private shoppinListService: ShoppinListgService) {}

  addIngridient(form: NgForm) {
    const {name, amount} = form.value

    const newIngridient: Ingredients = {name,amount}

    this.shoppinListService.addIngridient(newIngridient);
  }
}
