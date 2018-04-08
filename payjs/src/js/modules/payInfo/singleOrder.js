import {
    post,
    paramStr
} from '../../utils/util.js';
import {
    payInfoUrl
} from '../base_url.js'
const singleOrder = (opt, success, error) => {
    let optCopy = opt;
    if (optCopy.success) {
        delete (optCopy.success)
    };
    if (optCopy.error) {
        delete (optCopy.error)
    };
    let url = payInfoUrl;
    let param = paramStr(optCopy);
    post(url, param, (res) => {
        let resp = JSON.parse(res);
        if (resp.ret_code === '000000') {
        } else {
            error && error({ retCode: resp.ret_code, retMsg: resp.ret_msg })
        }
    })
}
export default singleOrder