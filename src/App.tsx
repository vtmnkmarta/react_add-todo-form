import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoAggregate } from './components/Types/TodoAggregate';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './components/Types/Todo';
import { User } from './components/Types/User';

const createToDoAggregates = (
  todosFromServerPar: Todo[],
  usersFromServerPar: User[],
): TodoAggregate[] => {
  return todosFromServerPar.map(todo => {
    const user =
      usersFromServerPar.find(({ id }) => id === todo.userId) ?? null;

    const todoAggregate: TodoAggregate = {
      ...todo,
      user,
    };

    return todoAggregate;
  });
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (todo: Omit<Todo, 'id'>) => {
    const maxId = Math.max(...todos.map(({ id }) => id));

    setTodos(currentTodos => [...currentTodos, { ...todo, id: maxId + 1 }]);
  };

  const aggregatedTodos = createToDoAggregates(todos, usersFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={handleAddTodo} users={usersFromServer} />
      <TodoList todos={aggregatedTodos} />
    </div>
  );
};
