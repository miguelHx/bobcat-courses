import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './react-redux/store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './semantic-ui-css-imports';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
