import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { RecipeService } from "../recipe-book/recipe.service"
import { environment } from "src/environments/environment"
import { Recipe } from "../recipe-book/recipe.interface"
import { Observable, map, tap } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.recipes

    this.http.put(environment.fireBaseUrlRecipes, recipes).subscribe(response => {
      console.log(response)
    })
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(environment.fireBaseUrlRecipes)
      .pipe(
        map(data => {
          return data.map(recipes => {
            return {
              ...recipes,
              ingredients: recipes.ingredients ? recipes.ingredients : []
            }
          })
        }
        ),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      )
  }

}
