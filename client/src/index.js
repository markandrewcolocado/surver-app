import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';

// 1) Import ReactDOM library
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk as reduxThunk } from 'redux-thunk';

// 2) Import App component as usual
import App from './components/App';
import reducers from './reducers';

// use createStore to create a new instace of Redux store
// first argument is the reducer
// second argument is the initial state
// third argument is the middleware to run
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// 3) Get a reference to the div with ID root
const el = document.getElementById('root');

// 4) Tell React to take control of that element
const root = ReactDOM.createRoot(el);

// 5) Show the component on the screen
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
