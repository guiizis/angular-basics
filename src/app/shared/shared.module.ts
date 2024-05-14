import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './placeHolder/placeHolder.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    AlertComponent
  ],
  exports: [
    DropdownDirective,
    PlaceHolderDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
})
export class SharedModule { }
