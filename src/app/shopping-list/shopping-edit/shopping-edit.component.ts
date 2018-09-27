import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddIngredient, DeleteIngredient, UpdateIngredient, StopEdit } from '../store/shopping-list.actions';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') addForm: NgForm;
  editObserver: Subscription;
  editMode = false;
  editingItem: Ingredient;
  // editingItemIndex: number;

  constructor(private shoppingService: ShoppingService, private store: Store<AppState>) { }

  ngOnInit() {
    this.editObserver = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editingItem = data.editedIngredient;
          this.editMode = true;
          this.addForm.setValue({
            name: this.editingItem.name,
            amount: this.editingItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
    // this.editObserver = this.shoppingService.editObserver.subscribe((index: number) => {
    //   this.editMode = true;
    //   // this.editingItemIndex = index;
    //   this.editingItem = this.shoppingService.getIngredient(index);
    //   this.addForm.setValue({
    //     name: this.editingItem.name,
    //     amount: this.editingItem.amount
    //   });
    // });
  }

  onSubmit() {
    const ingredient: Ingredient = new Ingredient(this.addForm.value.name, this.addForm.value.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ingredient: ingredient}));
      // this.shoppingService.updateIngredient(this.editingItemIndex, ingredient);
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
      // this.shoppingService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.editingItem = null;
    this.addForm.reset();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    // this.shoppingService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEdit());
    this.editObserver.unsubscribe();
  }

}
