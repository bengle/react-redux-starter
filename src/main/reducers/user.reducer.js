import { userActions } from '../constants/actionTypes';
let defaultState = {
    result: true,
    message: '',
    username: PARAMCONFIG.DEFAULTNAME || '',
    password: PARAMCONFIG.DEFAULTPASS || '',
    verify_code: '',
    csrf_token: '',
    callback_url: ''
}
export default function LoginReducer(state = defaultState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case userActions.GET_CHECKCODE:
            newState.checkCodeImg = action.payload;
            return newState
        case userActions.LOGIN_SUBMIT:
            newState.result = action.payload.result;
            newState.message = action.payload.message;
            return newState
        case userActions.INPUT_CHANGE:
            newState[action.payload.key] = action.payload.value;
            return newState;
        case userActions.INIT_LOGIN_STATE:
            return defaultState;
        default:
            return state
    }
}