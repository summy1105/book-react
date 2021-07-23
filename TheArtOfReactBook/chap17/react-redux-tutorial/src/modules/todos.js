import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';

export const CHANGE_INPUT = 'todos/CHANGE_INPUT'; //인풋 값을 변경함
export const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
export const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제함
export const REMOVE = 'todos/REMOVE'; // todo를 제거함

export const changeInput = createActions(CHANGE_INPUT, (input) => input);

let id = 3; //insert가 호출될 때마다 1씩 더해집니다.
export const insert = createActions(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createActions(TOGGLE, (id) => id);

export const remove = createActions(REMOVE, (id) => id);

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

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.todos.push(input);
      }),
    [INSERT]: (state, action) => ({
      //action.payload : todo
      ...state,
      todos: state.todos.concat(action.payload),
    }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, action) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
);

export default todos;