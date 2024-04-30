import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.interface";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
//@ts-ignore-next-line
export class RecipesResolverService implements ResolveFn<Recipe[]> {

  constructor(private dataStorageService: DataStorageService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.dataStorageService.fetchRecipes()
  }

}
