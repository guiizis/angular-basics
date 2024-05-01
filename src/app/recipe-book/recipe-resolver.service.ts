import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.interface";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
//@ts-ignore-next-line
export class RecipesResolverService implements ResolveFn<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.recipes

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes()
    }
    return recipes
  }

}
