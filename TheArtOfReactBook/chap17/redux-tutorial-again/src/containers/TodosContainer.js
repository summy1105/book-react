import React from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { changeInput, insert, remove, toggle } from '../modules/todos';

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <div>
      <Todos
        input={input}
        todos={todos}
        onChangeInput={changeInput}
        onInsert={insert}
        onToggle={toggle}
        onRemove={remove}
      />
    </div>
  );
};

export default connect(
  (state) => ({ input: state.todos.input, todos: state.todos.todos }),
  (dispatch) => ({
    changeInput: (input) => {
      dispatch(changeInput(input));
    },
    insert: (todo) => {
      dispatch(insert(todo));
    },
    toggle: (id) => {
      dispatch(toggle(id));
    },
    remove: (id) => {
      dispatch(remove(id));
    },
  }),
)(TodosContainer);
