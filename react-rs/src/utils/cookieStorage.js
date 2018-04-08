/* eslint-disable */
const getCookie = (key) => {
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return JSON.parse(decodeURIComponent(arr[2]));
    else
        return {};
}
const setCookie = (key, value) => {
    let time = 0.5;
    let exp = new Date();
    exp.setTime(exp.getTime() + time * 60 * 60 * 1000);
    document.cookie = key + "=" + encodeURIComponent(JSON.stringify(value)) + ";expires=" + exp.toGMTString() + "; path=/";
}
const clearCookie = () => {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + "; path=/";
    }
}
const removeCookie = (key) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(key);
    if (cval != null)
        document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
}
let cookieStorage = {
    getCookie,
    setCookie,
    clearCookie,
    removeCookie
}
export default cookieStorage