import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';
import React from 'react';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
};

export default App;
