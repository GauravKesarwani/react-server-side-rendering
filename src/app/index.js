import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../actions/todos';
import  TodoList from '../components/TodoList';

class App extends Component {
  static fetchData({ store }) {
    return store.dispatch(fetchTodos());
  }

  render() {
    console.log('this.props.todos', this.props.todos);
    return (
      <div>
        <header>
        	<h1>Todo Application</h1>
        	<form action="/todos" method="post">
        		<input name="todo" type="text"/>
        		<input type="submit" value="Add Todo" />
        	</form>
        </header>
        <section>
         <TodoList
           todos={this.props.todos}
          />
        </section>
        <footer>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps, { fetchTodos })(App);
