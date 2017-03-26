import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import baseTemplate from './baseTemplate';
import {Server} from 'hapi';

const app = new Server();

app.connection({
  port: 3000
});

app.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('Hello World !!');
  }
});

app.start((err) => {
  if(err) {
    throw err;
  }

  console.log(`Server running at port', ${app.info.uri}`);
});

