import * as ActionType from '../actions/todos';

const initialState = [];

export default function (state = initialState, action) {
  switch(action.type) {
    case ActionType.FETCH_TODOS_SUCCESS:
      return action.todos;
      break
    default:
      return state
  }
};
