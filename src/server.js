import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import baseTemplate from './baseTemplate';
import bodyParser from 'body-parser';
import fs from 'fs';
import middleware from './middleware';

const app = express();
const router = express.Router();

const port = 8080;
// app.use('/assets', express.static('assets'));

// app.use('/assets', express.static('assets'));

// Configure bodyParser middleware. Extended allows to choose between parsing the data with querystring library or qs library.
// A new body object containing the parsed data is populated on the request object.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Apis

// Get list of todos

router.get('/api/todos', (req, res) => {
  fs.readFile('todos.json', 'utf8', function (err, data) {
    if (err) {
      console.log('Error while reading todo', err);
    }
    res.send(data);
  });
});


// API Create todo
router.post('/todos', (req, res) => {

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

// send all requests to index.html so browserHistory works.
router.get('*', middleware);

// mount the router on the app
app.use('/', router);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.info(`app running on http://localhost:${port}`);
});
