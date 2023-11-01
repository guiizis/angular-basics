import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.interface';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingridientAdded = new EventEmitter<Ingredients>();

  addIngridient() {
    this.ingridientAdded.emit({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value
    });
  }
}
