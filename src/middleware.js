import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

export default (req, res) => {
  let store = configureStore()
  // match - matches a set of routes to a location, without rendering, and calls a callback.
  // RouterContext - synchronous rendering of route components. This method is internally used by Router Component.

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if(error) {
      res.status(500).send(error.message);
    } else if(redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if(renderProps) {
      console.log('renderProps', renderProps);
      console.log('renderProps end');

      // Asynchronous loading of todos

      let { query, params } = renderProps
      let comp = renderProps.components[renderProps.components.length - 2].WrappedComponent

      console.log('Component', comp.fetchData);
      let promise = comp.fetchData ?
        comp.fetchData({ query, params, store }) :
        Promise.resolve()

      let appHtml;
      promise.then(() => {
        //let reduxState = escape(JSON.stringify(store.getState()))

        console.log ('store state', store.getState());
        appHtml = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        console.log('appHtml', appHtml);

         // Grab the state from redux store
      const reduxState = store.getState();

      res.status(200).send(`
        <!doctype html>
        <html>
          <head>
            <meta charset=utf-8/>
            <title>Todo App</title>
            <link rel=stylesheet href=/index.css>
          </head>
          <body>
            <div id=app>${appHtml}</div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(reduxState).replace(/</g, '\\x3c')}
            </script>
          </body>
        </html>
      `);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
};
