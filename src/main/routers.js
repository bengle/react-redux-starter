import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainPage from './container.js';

/*
 * 路由模块
 * */
import TestPage from './pages/test';
import LoginPage from './pages/login';

/*
 * 完整路由
 * */
const Routers = 
	<div>
		<Route path="/">
			<IndexRoute component={MainPage}></IndexRoute>
			<Route path="backend" component={MainPage}>
				<Route path="test" component={TestPage} />
			</Route>
			<Route path="login" component={LoginPage}></Route>
		</Route>
		
	</div>

export default Routers;
