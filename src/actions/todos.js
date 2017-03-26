var fetch = require('node-fetch');

export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';


// Action creators can return functions instead of action object when using redux-thunk.
// The returned function will be executed by redux-thunk middleware.

export function fetchTodos() {
  return (dispatch, getState) => {
    const url = `http://localhost:8080/api/todos`;
    try {
      dispatch({ type: FETCH_TODOS });
      return fetch(url, { credentials: 'same-origin' })
        .then(response => {
          const result = response.json();
          return result;
        })
        .then(todos => {
          dispatch({ type: FETCH_TODOS_SUCCESS, todos });
        });
    } catch (e) {
      console.log('Error fetching todos');
    }
  }
}
