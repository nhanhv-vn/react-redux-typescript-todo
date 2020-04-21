import React, { FC, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { Todo } from "../../models";
import { todoActions } from "../../store/todo";
import { RootState } from "../../store";
import { EditModal } from "../../components/EditModal";
import { Item } from "../../components/Item";
import { Form } from "../../components/Form";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      maxWidth: 600,
      margin: "80px auto",
    },
    indicator: {
      paddingTop: "2rem",
    },
  })
);

const TodoListBase: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    title: "",
    completed: false,
  });

  const classes = useStyles();
  const { list, loading } = useSelector((state: RootState) => state.todos, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    todoActions.getTodos(dispatch);
  }, [dispatch]);

  const addTodo = useCallback(
    (todo: Todo) => todoActions.addTodo(todo, dispatch),
    [dispatch]
  );

  const deleteTodo = useCallback(
    (id: number) => todoActions.deleteTodo(id, dispatch),
    [dispatch]
  );

  const updateTodo = useCallback(
    (todo: Todo) => todoActions.updateTodo(todo, dispatch),
    [dispatch]
  );

  const handleEditModal = useCallback((todo: Todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  }, []);

  const onClose = useCallback(() => {
    setIsEditing(false);
  }, []);

  const RenderList: FC = () => {
    if (list.length) {
      return (
        <>
          {list.map((todo: Todo) => (
            <Item
              key={todo.id}
              item={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onEditModal={handleEditModal}
            />
          ))}
        </>
      );
    } else {
      return <Typography align="center">Empty</Typography>;
    }
  };

  return (
    <Grid classes={{ root: classes.container }}>
      <Form onSave={addTodo} />
      <RenderList />
      {loading && (
        <Grid
          container={true}
          direction="row"
          justify="center"
          alignItems="center"
          classes={{ root: classes.indicator }}
        >
          <CircularProgress disableShrink />
        </Grid>
      )}
      <EditModal
        open={isEditing}
        item={currentTodo}
        onClose={onClose}
        onSave={updateTodo}
      />
    </Grid>
  );
};

export const TodoList = TodoListBase;
