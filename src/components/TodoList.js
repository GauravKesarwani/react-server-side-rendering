import React, { Component } from 'react';

class TodoList extends Component {
  render () {
    console.log(' props in todos', this.props.todos);
    return (
      <ul className="todolist">
        {this.props.todos.map((todo) => <li>{todo.todo}</li>)}
      </ul>
    );
  }
}

export default TodoList;
