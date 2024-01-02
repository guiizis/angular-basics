import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppinListgService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppinListService: ShoppinListgService) {}

  addIngridient() {
    const newIngridient: Ingredients = {
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value
    };

    this.shoppinListService.addIngridient(newIngridient);
  }
}
