import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import Routes from './containers/App/routes';

import * as serviceWorker from './serviceWorker';
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }
ReactDOM.render(<Routes />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
