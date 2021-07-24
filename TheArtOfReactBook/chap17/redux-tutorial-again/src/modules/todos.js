import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const changeInput = (input) => ({ type: CHANGE_INPUT, input });

let id = 3;
export const insert = (text) => ({
  type: INSERT,
  todo: { id: id++, text, done: false },
});

export const toggle = (id) => ({ type: TOGGLE, id });
export const remove = (id) => ({ type: REMOVE, id });

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return produce(state, (draft) => {
        draft.input = action.input;
      });
    case INSERT:
      return produce(state, (draft) => {
        draft.todos.push(action.todo);
      });
    case TOGGLE:
      return produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === action.id);
        todo.done = !todo.done;
      });
    case REMOVE:
      return produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === action.id);
        draft.todos.splice(index, 1);
      });
    default:
      return state;
  }
}

export default todos;
