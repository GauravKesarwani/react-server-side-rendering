import App from './app';
import TodoList from './components/todoList';
import Todo from './components/Todo';

const routes = {
  path: '/', component: App,
  indexRoute: { component: TodoList },
  childRoutes: [
    { path: 'todo', component: Todo }
  ]
}

module.exports = routes;
