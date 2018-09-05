import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import './semantic-ui-css-imports';
import './index.css';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
