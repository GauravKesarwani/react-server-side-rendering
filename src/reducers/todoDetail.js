import * as ActionType from '../actions/todos'
import _ from 'lodash'

let initialState = {
  todo: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
