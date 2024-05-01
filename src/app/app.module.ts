import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeBookModule } from './recipe-book/recipe-book.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { HeaderModule } from './header/header.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RecipeBookModule,
    ShoppingListModule,
    FormsModule,
    HeaderModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
