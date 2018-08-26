import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
