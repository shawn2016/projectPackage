import wxpay from './wxpay.js'
import alipay from './alipay.js'

const selectPayType = (opt, success, error) => {
    if (typeof success !== 'function' || typeof error !== 'function' || !opt.companyCode || !opt.companyName || !opt.qrCodeNo || !opt.orderAmt || !opt.bizType || !opt.orderTitle || !opt.payType || !opt.buyerId) {
        alert('参数错误，请校验！');
        return;
    }
    switch (opt.payType) {
        case 20001:
            wxpay(opt, success, error,opt.goods_title);
            return;
        case 30001:
            alipay(opt, success, error,opt.goods_title);
            return;
        default:
            alert(`暂不支持该渠道${opt.payType}服务`)
            return
    }

}
export default selectPayType;