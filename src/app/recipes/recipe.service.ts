// import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable, RenderComponentType } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RecipeService {
  private static API_URL = 'https://myangularjourney.firebaseio.com/data.json';
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty combo',
      'Burger and french fries combo pack',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_oxe6kyZ-XK-LXWKWwbmRAk-ryx0OX4442Amz0U0q8RTdAQH',
      [
        new Ingredient('Meat', 4),
        new Ingredient('Eggs', 1),
        new Ingredient('Cheese', 2),
        new Ingredient('Fries', 2)
      ]
    ),
    new Recipe('Burger',
      'A tasty burger',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2),
        new Ingredient('Tomatoes', 1),
        new Ingredient('Cheese', 2)
      ]
    )
  ];
  recipeObserver = new Subject();
  // private selectedRecipe: Recipe;
  // selectedRecipeFired = new EventEmitter<Recipe>();

  constructor(private http: HttpClient, private auth: AuthService) {
    // this.selectedRecipeFired.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
  }

  getRecipes() {
    return this.recipes.slice();
  }

  // getSelectedRecipe() {
  //   return this.selectedRecipe;
  // }

  getRecipe(id) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeObserver.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeObserver.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeObserver.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeObserver.next(this.recipes.slice());
  }

}
