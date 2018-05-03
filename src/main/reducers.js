import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

/*
 * 所有模块reducer
 * */
import UserReducer from './reducers/user.reducer';

const appReducer = combineReducers({
	routing,
	UserReducer
});
export default appReducer;
