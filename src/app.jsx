import * as React from 'react';
import * as ReactDOM from "react-dom";
import Page from "./Components/Page";
import './style.scss';
import 'normalize.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

const initialState = {coordinates: [0, 0]};

const userAction = (state = initialState, action) => {
  if (action.type === 'ADD_COORDINATES') {
    return Object.assign({}, state, {coordinates: action.payload.coordinates});
  }
  return state;
};

const store = createStore(userAction, initialState);

ReactDOM.render(<Provider store={store}><Page/></Provider>, document.getElementById('app'));