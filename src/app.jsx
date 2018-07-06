import * as React from 'react';
import * as ReactDOM from "react-dom";
import Page from "./Components/Page";
import './style.scss';
import 'normalize.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

const initialState = {userId: localStorage.getItem('userId'), shared: false, email: '', sent: localStorage.getItem('sent')};

const middleware = ({getState}) => {
  return next => action => {
    if (action.type === 'ADD_ALL') {
      if (action.payload.userId) {
        localStorage.setItem('userId', action.payload.userId)
      }
    }
    return next(action);
  }
};

const userAction = (state = initialState, action) => {
  if (action.type === 'ADD_ACTION') {
    return Object.assign({}, state, {shared: true});
  }
  if (action.type === 'ADD_EMAIL') {
    return Object.assign({}, state, {email: action.payload.email});
  }
  if (action.type === 'ADD_ALL') {
    return Object.assign({}, state, action.payload)
  }
  if (action.type === 'ADD_SENT') {
    return Object.assign({}, state, {sent: true})
  }
  return state;
};

const store = createStore(userAction, initialState, applyMiddleware(middleware));

ReactDOM.render(<Provider store={store}><Page/></Provider>, document.getElementById('app'));