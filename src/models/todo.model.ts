export class Todo {
  id?: number;
  title: string;
  completed: boolean;
  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.completed = todo.completed;
  }
}
