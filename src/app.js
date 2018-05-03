import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
// import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './main/configureStore';
import routers from './main/routers';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={ store }>
      <Router routes={ routers } history={ history } />
    </Provider>,
    document.getElementById('app')
);

