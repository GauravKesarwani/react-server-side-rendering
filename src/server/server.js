import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import baseTemplate from './baseTemplate';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();

const port = 8080;
// app.use('/assets', express.static('assets'));


// app.use('/assets', express.static('assets'));

// Configure bodyParser middleware. Extended allows to choose between parsing the data with querystring library or qs library.
// A new body object containing the parsed data is populated on the request object.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Create todo
app.post('/todos', (req, res) => {

  // Return a Buffer instance
  let todos = fs.readFileSync('todos.json');

  if (!todos.length) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }

  todos.push(req.body);

  fs.writeFile('todos.json', JSON.stringify(todos), function (err) {
    if (err) {
      console.log('Error while storing todo', err);
    }
  });
  res.send(req.body);
});

app.get('/', (req, res) => {
  const appString = renderToString(<App />);

  res.send(baseTemplate({
    body: appString,
    title: 'Hello World from the app',
  }));
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.info(`app running on http://localhost:${port}`);
});
