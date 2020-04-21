import { combineReducers } from "redux";
import { todoReducers, TodoState } from "./todo";

export interface RootState {
  todos: TodoState
}

export const rootReducer = combineReducers<RootState>({
  todos: todoReducers,
});
