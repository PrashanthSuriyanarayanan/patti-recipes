import { Ingredient } from '../../shared/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: shoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case shoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case shoppingListActions.UPDATE_INGREDIENT:
      const ing = state.ingredients[state.editedIngredientIndex];
      const updatedIng = {
        ...ing,
        ...action.payload.ingredient,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIng;
      return {
        ...state,
        ingredients: ingredients
      };
    case shoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case shoppingListActions.START_EDIT:
      const editedIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case shoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
