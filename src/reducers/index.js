import { combineReducers } from 'redux'
import todos from './todos'
import todoDetail from './todoDetail'

const rootReducer = combineReducers({
  todos,
  todoDetail
})

export default rootReducer
