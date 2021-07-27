export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    dispatch({ type, param });
    try {
      const result = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload: result });
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true });
    }
  };
};
