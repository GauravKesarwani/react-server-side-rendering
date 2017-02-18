import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import baseTemplate from './baseTemplate';

const server = express();

const port = 8080;
server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const appString = renderToString(<App />);

  res.send(baseTemplate({
    body: appString,
    title: 'Hello World from the server',
  }));
});

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server running on http://localhost:${port}`);
});
