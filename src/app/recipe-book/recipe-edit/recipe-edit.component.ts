import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean
  recipeForm: FormGroup
  routeSubscription: Subscription

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        this.initForm()
      }
    )
  }

  private initForm() {
    const recipe = this.recipeService.getRecipe(this.id)
    let recipeName = ''
    let imgPath =  ''
    let description =  ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      recipeName = recipe.name
      imgPath = recipe.imagePath
      description = recipe.description

      if (recipe.ingredients) {
        for (let ingredients of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredients.name),
            'amount': new FormControl(ingredients.amount),
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imgPath),
      'description': new FormControl(description),
      'ingredients': recipeIngredients
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log({...this.recipeForm.value})
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }))
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }
}
