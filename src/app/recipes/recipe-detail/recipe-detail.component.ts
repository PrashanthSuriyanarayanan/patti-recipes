import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private route: Router
  ) {
    // this.selectedRecipe = this.recipeService.getSelectedRecipe();
    // this.recipeService.selectedRecipeFired.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
  }

  ngOnInit() {
    // const id = +this.activatedRoute.snapshot.params['id'];
    // this.selectedRecipe = this.recipeService.getRecipe(id);

    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipe(this.id);
    });
  }

  addToCart() {
    this.store.dispatch(new shoppingListActions.AddIngredients(this.selectedRecipe.ingredients));
    // this.shoppingService.addIngredients(this.selectedRecipe.ingredients);
  }

  editRecipe() {
    this.route.navigate(['edit'], { relativeTo: this.activatedRoute });
    // this.route.navigate(['../', this.id, 'edit'], { relativeTo: this.activatedRoute });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.route.navigate([''], { relativeTo: this.activatedRoute });
  }

}
