import fs from 'fs';

export const fetchTodos = (callback) => {

  // never call readFileSync in a node server
  fs.readFile('todos.json', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.error(err)
    }
    console.log('data from file', data);
    callback(data.toString());
  });
}
