'use strict';
import selectPayType from './modules/pay/selectPayType.js'
import singleOrder from './modules/payInfo/singleOrder.js'
const RSWALLET = (() => {
    let pay = opt => {
        let domain = ''
        let opts = opt
        if (!navigator.onLine) {
            alert('网络通信出现问题，请检查网络并重试。');
            opt.error && opt.error({ retCode: '100', retMsg: '网络错误' })
            return;
        }

        if (opt.payType) {
            let success = opt.success
            let error = opt.error
            selectPayType(opts, success, error);
        }
    }
    let payInfo = opt => {
        let opts = opt
        if (!navigator.onLine) {
            alert('网络通信出现问题，请检查网络并重试。');
            opts.error && opts.error({ retCode: '100', retMsg: '网络错误' })
            return;
        }
        if (!opt.company_code || !opt.order_no) {
            alert('参数错误，请校验！');
        }
        if (opt.company_code && opt.order_no) {
            singleOrder(opts);
        }
    }
    return {
        pay,
        payInfo
    };
})();

window.RSWALLET = RSWALLET;
if (typeof module !== 'function' && module.exports) {
    module.exports = RSWALLET;
} else if (typeof define === 'function' && define.amd) {
    define(function () { return RSWALLET; });
}