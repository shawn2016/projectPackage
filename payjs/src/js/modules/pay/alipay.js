
import {
    alipayNative,
    post,
    paramStr,
    isAliPay
} from '../../utils/util.js';
import {
    payUrl
} from '../base_url.js'
const alipay = (opt, success, error,goods_title) => {
    let url = payUrl;
    let param = paramStr(opt);
    post(url, param, (res) => {
        let resp = JSON.parse(res);
        console.log(resp)
        if (resp.head.retCode === '000000') {
            if (isAliPay()) {
                alipayNative(resp.body.payInfo, resp, goods_title, success, error)
            } else {
                error && error({ retCode: resp.head.retCode, retMsg: resp.head.retMsg })
            }
        } else {
            error && error({ retCode: resp.head.retCode, retMsg: resp.head.retMsg })
        }
    })
}
export default alipay