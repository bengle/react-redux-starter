import { getData, postData } from '../../utils/fetch';
import { message } from 'antd';
import apis from '../constants/apis';
import { userActions } from '../constants/actionTypes';
export function getCheckCode(response) {
    return {
        type: userActions.GET_CHECKCODE,
        payload: response
    }
}
export function handleLoginSubmit(data) {
    return {
        type: userActions.LOGIN_SUBMIT,
        payload: data
    }
}

export function doInputChange(data) {
    return {
        type: userActions.INPUT_CHANGE,
        payload: data
    }
}

export function initLoginState() {
    return {
        type: userActions.INIT_LOGIN_STATE
    }
}

export const handleInputChange = (e) => (dispatch, getState) => {
    let data = {
        key: e.target.name,
        value: e.target.value
    }
    dispatch(doInputChange(data));
}
// 判断用户是否已经登录
export const checkUserLogin = () => async (dispatch, getState) => {
    try {
        let response = await getData(apis.checkUserLogined);
        if (response.status == 200) {
            window.location.href = '/#/products';
        }
    } catch (error) {
        // message.error('系统错误，请稍后刷新重试。');
    }
}

export const doLoginSubmit = (params) => async (dispatch, getState) => {
    let loginUrlParams = getUrlParams(window.location.href);
    try {
        let state = getState();
        let response = await postData(apis.loginSubmit, params)
        if (response.data.success) {
            if (loginUrlParams.redirectUrl) {
                window.location.href = loginUrlParams.redirectUrl;
            } else if (response.data.data.jumpUrl != '') {
                window.location.href = response.data.data.jumpUrl
            } else {
                window.location.href = '/#/products'
            }
        } else {
            document.getElementById('v_code').setAttribute('src', apis.getCheckCode + "?r=" + Math.random());
            message.error(response.data.message);
        }
    } catch (error) {
        // message.error(error.message);
    }
}

function getUrlParams(url) { // 返回url中的参数的json对象
    var aQuery = url.split("?");  //取得Get参数
    var aGET = {};
    if (aQuery.length > 1) {
        var aBuf = aQuery[1].split("&");
        for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
            var aTmp = aBuf[i].split("=");  //分离key与Value
            aGET[aTmp[0]] = aTmp[1];
        }
    }
    return aGET;
}