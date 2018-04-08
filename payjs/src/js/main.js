import {sdkUrl, ver} from './modules/base_url.js';
const init = () => {
    let srcString = '',
        script = document.createElement('script'),
        scriptEle = document.querySelectorAll('script');

    [].forEach.call(scriptEle, function(v){
        if(v.getAttribute('src')){
            srcString += v.getAttribute('src');
        }
    });

    if(srcString.indexOf('main.js') != -1){
        script.setAttribute('src', sdkUrl +  (ver ? '?' : '') + ver);
        document.body.appendChild(script);
    }
};

document.addEventListener('DOMContentLoaded', init, false);
