import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent
  ],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent
  ],
})
export class SharedModule { }
