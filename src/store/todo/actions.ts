import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { TodoActionTypes, TodoAction } from "./types";
import { Todo } from "../../models";
import { ROOT_URL } from "./../../constants";

const ROUTE = {
  todo: {
    list: () => `${ROOT_URL}/todos`,
    withId: (id: number) => `${ROOT_URL}/todos/${id}`,
  },
};

export const todoActions = {
  getTodos: async (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: TodoActionTypes.FetchTodosRequest,
    });
    try {
      await axios.get<Todo[]>(ROUTE.todo.list()).then((res: AxiosResponse) => {
        const todos: Todo[] = res.data.map((item: Todo) => {
          return new Todo(item);
        });
        dispatch({
          type: TodoActionTypes.FetchTodosSuccess,
          payload: todos,
        });
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.FetchTodosFailed,
        payload: { error: error.message },
      });
    }
  },

  addTodo: async (todo: Todo, dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: TodoActionTypes.AddTodoRequest,
    });

    try {
      await axios
        .post<Todo>(ROUTE.todo.list(), todo)
        .then((res: AxiosResponse) => {
          dispatch({
            type: TodoActionTypes.AddTodoSuccess,
            payload: new Todo(res.data),
          });
        });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.AddTodoFailed,
        payload: { error: error.message },
      });
    }
  },

  deleteTodo: async (id: number, dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: TodoActionTypes.DeleteTodoRequest,
    });

    try {
      await axios.delete(ROUTE.todo.withId(id)).then(() => {
        dispatch({
          type: TodoActionTypes.DeleteTodoSuccess,
          payload: id,
        });
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.DeleteTodoFailed,
        payload: { error: error.message },
      });
    }
  },

  updateTodo: async (todo: Todo, dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: TodoActionTypes.UpdateTodoRequest,
    });
    try {
      const id = todo.id;
      if (id) {
        await axios
          .put(ROUTE.todo.withId(id), todo)
          .then((res: AxiosResponse) => {
            dispatch({
              type: TodoActionTypes.UpdateTodoSuccess,
              payload: new Todo(res.data),
            });
          });
      } else {
        throw new Error();
      }
    } catch (error) {
      dispatch({
        type: TodoActionTypes.UpdateTodoFailed,
        payload: { error: error.message },
      });
    }
  },
};
