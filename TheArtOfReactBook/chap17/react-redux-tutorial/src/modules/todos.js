import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export const CHANGE_INPUT = 'todos/CHANGE_INPUT'; //인풋 값을 변경함
export const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
export const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제함
export const REMOVE = 'todos/REMOVE'; // todo를 제거함

export const changeInput = createAction(CHANGE_INPUT, (input) => input);
// export const changeInput = (input) => ({ type: CHANGE_INPUT, input });

let id = 3; //insert가 호출될 때마다 1씩 더해집니다.
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, (id) => id);

export const remove = createAction(REMOVE, (id) => id);

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
        draft.input = input;
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
        const index = draft.todos.findIndex(
          (todo) => todo.id === action.payload,
        );
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
);

export default todos;
