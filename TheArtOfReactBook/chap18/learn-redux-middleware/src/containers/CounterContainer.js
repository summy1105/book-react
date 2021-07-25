import React from "react";
import { connect } from "react-redux";
import Counter from "../components/Counter";
import { decrease, increase } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

export default connect(
  (state) => ({
    number: state.counter,
  }),
  (dispatch) => ({
    increase: () => {
      setTimeout(() => {
        dispatch(increase());
      }, 1000);
    },
    decrease: () => {
      setTimeout(() => {
        dispatch(decrease());
      }, 1000);
    },
  })
)(CounterContainer);
