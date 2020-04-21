import React, { FC, memo, useState, useRef } from "react";
import { isEqual } from "lodash";
import { Grid, Button, TextField } from "@material-ui/core";
import { Todo } from "../../models";
import { useFormStyles } from "./index.styles";

type FormProps = {
  onSave: (todo: Todo) => void;
};

const areEqual = (prevProps: FormProps, nextProps: FormProps): boolean => {
  return isEqual(prevProps, nextProps);
};

const FormBase: FC<FormProps> = ({ onSave }: FormProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const classes = useFormStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddNew = () => {
    if (title) {
      const todo = new Todo({
        title,
        completed: false,
      });
      onSave(todo);
      handleResetInput();
    } else {
      setError(true);
    }
  };

  const handleResetInput = () => {
    if (inputRef?.current) {
      inputRef.current.blur();
      inputRef.current.value = "";
      setTitle("");
    }
  };

  const onFocus = () => setError(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.currentTarget.value);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container={true} classes={{ root: classes.root }}>
        <TextField
          error={error}
          label="Add Todo"
          inputRef={inputRef}
          classes={{ root: classes.rootInput }}
          onChange={handleInputChange}
          onFocus={onFocus}
        />
        <Button
          classes={{ root: classes.rootButton }}
          variant="outlined"
          onClick={handleAddNew}
        >
          ADD
        </Button>
      </Grid>
    </form>
  );
};

export const Form = memo(FormBase, areEqual);
