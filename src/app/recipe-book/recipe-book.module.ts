import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    RecipeBookComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  exports: [
    RecipeBookComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent
  ]
})
export class RecipeBookModule { }
