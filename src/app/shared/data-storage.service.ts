import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private static API_URL = 'https://myangularjourney.firebaseio.com/data.json';
  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {
  }

  storeRecipes() {
    // return this.http.put(DataStorageService.API_URL, this.recipeService.getRecipes(), {
    //   observe: 'events',
    //   params: new HttpParams().set('auth', token)
    //   // headers: new HttpHeaders()
    //   //   .set('Authorization', 'Bearer ')
    //   //   .append('', '')
    // }).pipe(
    //   catchError((err) => throwError('Something went wrong'))
    // );
    const req = new HttpRequest('PUT', DataStorageService.API_URL, this.recipeService.getRecipes(), { reportProgress: true });
    return this.httpClient.request(req);
  }

  getRecipes() {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>(DataStorageService.API_URL, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ),
      catchError((err) => throwError('Something went wrong'))
    ).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
