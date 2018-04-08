
import {
    wxpayNative,
    post,
    paramStr,
    isWeiXin
} from '../../utils/util.js';
import {
    payUrl
} from '../base_url.js'
const wxpay = (opt, success, error, goods_title) => {
    let url = payUrl;
    let param = paramStr(opt);
    post(url, param, (res) => {
        console.log(res)
        console.log("res--------------", res)
        let resp = JSON.parse(res);
        console.log("resp--------------", resp)
        if (resp.head.retCode === '000000') {
            if (isWeiXin()) {
                wxpayNative(resp.body.payInfo, resp, goods_title, success, error)
            } else {
                error && error({ retCode: resp.head.retCode, retMsg: resp.head.retMsg })
            }
        } else {
            error && error({ retCode: resp.head.retCode, retMsg: resp.head.retMsg })
        }
    })
}

export default wxpay
