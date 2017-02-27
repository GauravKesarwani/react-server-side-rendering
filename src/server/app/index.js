import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  render() {
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
        </section>
        <footer>
        </footer>
      </div>
    );
  }
}
