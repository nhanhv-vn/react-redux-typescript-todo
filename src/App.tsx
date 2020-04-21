import React, { FC } from "react";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import { rootReducer } from "./store";
import "./App.css";
import { TodoList } from "./pages/todos";

// Enable redux-devtools-extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

const App: FC = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
