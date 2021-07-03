import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';
import React, { useCallback, useRef, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 5000; i++) {
    array.push({ id: i, text: `할일 ${i}`, checked: false });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos());

  // 고유값으로 사용될 ID
  const nextID = useRef(5001);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextID.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextID.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
