import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = +params['id'];
        this.editMode = this.id !== null;
      }
      this.initForm();
    });
  }

  private initForm() {
    let recipe = new Recipe('', '', '', []);
    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, { updateOn: 'blur', validators: [Validators.required] }),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': new FormArray([])
    });
    if (recipe.ingredients.length > 0) {
      recipe.ingredients.map(this.onAddIngredient.bind(this));
    } else {
      this.onAddIngredient();
    }
  }

  onAddIngredient(ingredient?: Ingredient) {
    let ing = new Ingredient('', null);
    if (ingredient) {
      ing = ingredient;
    }
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(ing.name, Validators.required),
        'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      // const recipe = new Recipe(
      //   this.recipeForm.value.name,
      //   this.recipeForm.value.imagePath,
      //   this.recipeForm.value.description,
      //   this.recipeForm.value.ingredients
      // );
      if (this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
        this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.onCancel();
    }
  }

  onCancel() {
    this.route.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
