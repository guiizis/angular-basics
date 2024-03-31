import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        this.initForm()
      }
    )
  }

  private initForm() {
    let recipeName = ''
    let imgPath =  ''
    let description =  ''

    if (this.editMode) {
      recipeName = this.recipeService.getRecipe(this.id).name
      imgPath = this.recipeService.getRecipe(this.id).imagePath
      description = this.recipeService.getRecipe(this.id).description
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imgPath),
      'description': new FormControl(description),
    })
  }
}
