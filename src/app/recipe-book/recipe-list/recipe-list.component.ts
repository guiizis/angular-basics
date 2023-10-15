import { Component } from '@angular/core';
import { Recipe } from '../recipe.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    {
      name: 'teste',
      description: 'teste',
      imagePath: 'https://www.foodandwine.com/thmb/-wrVEmLnndHnIzla-W2g2x-LLQA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Korean-Style-Seared-Tuna-FT-RECIPE0822-2000-1e6d136c69684c0a9e31f584b3161a81.jpg'
    }
  ];

}
