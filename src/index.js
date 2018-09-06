import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './react-redux/store/configureStore';
// import { setSelectedCourse } from "./react-redux/actions/selectedCourse";
import registerServiceWorker from './registerServiceWorker';
import './semantic-ui-css-imports';
import './index.css';

const store = configureStore();

// console.log(store.getState());
// store.dispatch(setSelectedCourse('some course'));
// console.log(store.getState());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
