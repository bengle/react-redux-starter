export const setCookie = function (c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}
export const getCookie = function (c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(decodeURIComponent(document.cookie.substring(c_start, c_end)));
        }
    }
    return "";
}
export const delCookie = function (c_name) {
    let exp = new Date();
    let domain = document.domain;
    exp.setTime(exp.getTime()  -  1);
    var cval = getCookie(name);
    document.cookie = c_name + "=" + cval + ";domain="+domain+";expires="+ exp.toGMTString() + ";path=/";
}