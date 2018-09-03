import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './react-redux/store/configureStore';
import {setSelectedCourse, clearSelectedCourse} from "./react-redux/actions/selectedCourse";
import './semantic-css-imports';
import './styles/styles.scss';

const store = configureStore();

// store.dispatch(addSelectedCourse('some course'));
//
// console.log(store.getState());
//
// store.dispatch(clearSelectedCourse());
//
// console.log(store.getState());

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
