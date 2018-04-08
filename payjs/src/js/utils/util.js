import md5 from 'md5'
import {
    domain
} from '../modules/base_url.js'
const isWeiXin = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
const isAliPay = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/alipay/i) == 'alipay') {
        return true;
    } else {
        return false;
    }
}

const sign = (body, key) => {
    var signString = '';
    var keys1 = [];
    if (body) {
        var newObj = {}
        // 获取keys
        function getKeyList(params) {
            var targetObj = {};
            let keyList = []
            for (var i in params) {
                keyList.push(i);
            }
            keyList.sort().forEach(function (element) {
                var item = params[element];
                if (Object.prototype.toString.call(item) === "[object Array]") {
                    var arraylist = []
                    for (var i = 0; i < item.length; i++) {
                        var subTargetArr;
                        if (Object.prototype.toString.call(item[i]) === "[object Object]") {
                            subTargetArr = getKeyList(params[element][i]);
                        } else {
                            subTargetArr = item[i]
                        }
                        arraylist.push(subTargetArr);
                    }
                    targetObj[element] = arraylist;
                } else if (Object.prototype.toString.call(item) === "[object Object]") {
                    var subTargetObj = getKeyList(params[element]);
                    targetObj[element] = subTargetObj;
                } else {
                    targetObj[element] = params[element];
                }
            });
            return targetObj;
        }
        console.log(JSON.stringify(getKeyList(body)) + key)
        return JSON.stringify(getKeyList(body)) + key
    } else {
        return signString
    }
}
const machineParam = opt => {
    let key = "f3c842d8df414eb58aa66891bfd9224d"
    if (opt.success) {
        delete (opt.success)
    }
    if (opt.goods_title) {
        delete (opt.goods_title)
    }
    if (opt.error) {
        delete (opt.error)
    }
    return md5(sign(opt, key))
}
const post = (url, data, fn, type) => {
    try {
        var obj;
        try {
            obj = new XMLHttpRequest();
        }
        catch (e) {
            try {
                obj = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    obj = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    alert("您的浏览器不支持AJAX！");
                    return false;
                }
            }
        }
        obj.open("POST", url, true);
        obj.setRequestHeader('Content-Type', 'application/json');
        obj.onreadystatechange = function () {
            if (obj.readyState == 4) {
                if (obj.status == 200) {
                    fn.call(this, obj.responseText);
                    let resp = JSON.parse(obj.responseText);
                    if (resp.ret_code) {
                    }
                } else if (type && type === 'log') {
                    console.log('系统繁忙,请稍后再试')
                } else {
                    alert('系统繁忙,请稍后再试')
                }
            }
        };
        obj.send(data);
    }
    catch (error) {
        alert(error)
    }
}
const paramStr = (optCopy) => {
    let sign = machineParam(optCopy);
    let reqParam = {
        "head": {
            "charset": "UTF-8",
            "clientIp": "172.0.0.1",
            "signInfo": sign,
            "signType": "MD5",
            "timestamp": +new Date(),
            "version": "1.0.0",
            "companyCode": ''
        },
        "body": optCopy
    }
    return JSON.stringify(reqParam)
}

const printLog = (param) => {
    var value = JSON.stringify(param).replace(/\\/g, "").replace(/\"/g, "'");
    let paramPost = paramStr({ param: `"${value}"` })
    post(domain + '/otheropt/outputLog', paramPost, (res) => {
        console.log("log返回：", res)
    }, 'log')
}
const wxpayNative = (payInfos, resp, goods_title, success, error) => {
    let payInfo = JSON.parse(payInfos);
    //取参数
    let appId = payInfo.appId;
    let timeStamp = payInfo.timeStamp;
    let nonceStr = payInfo.nonceStr;
    let prepay_id = payInfo.package;
    let paySign = payInfo.paySign;
    let signType = payInfo.signType;
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": appId,
            "timeStamp": timeStamp,
            "nonceStr": nonceStr,
            "package": prepay_id,
            "signType": signType,
            "paySign": paySign
        },
        function (result) {
            var status = result.err_msg;
            if ("get_brand_wcpay_request:ok" == status) {
                success({
                    orderNo: resp.body.orderNo,
                    createTime: resp.body.createTime,
                    goods_title: goods_title,
                    retCode: resp.head.retCode,
                    retMsg: resp.head.retMsg,
                    payAmt: resp.body.payAmt,
                    result: result
                })
            }
            if ("get_brand_wcpay_request:cancel" == status) {
                error({
                    retCode: '100',
                    retMsg: '用户中途取消',
                    result: result                    
                })
            }
            if ("get_brand_wcpay_request:fail" == status) {
                error({
                    retCode: '200',
                    retMsg: '交易处理失败',
                    result: result
                })
            }
        }
    );
}
const alipayNative = (payInfo, resp, goods_title, success, error) => {
    var payInfo = JSON.parse(payInfo);
    AlipayJSBridge.call("tradePay", {
        tradeNO: payInfo.tradeNO
    }, function (result) {
        var status = result.resultCode;
        if (result.resultCode != "6001") {
            success({
                orderNo: resp.body.orderNo,
                createTime: resp.body.createTime,
                goods_title: goods_title,
                retCode: resp.head.retCode,
                retMsg: resp.head.retMsg,
                payAmt: resp.body.payAmt,
                result: result
            })
        } else {
            error({
                retCode: '100',
                retMsg: '用户中途取消或交易失败',
                result: result
            })
        }
    });
}
export {
    isWeiXin,
    isAliPay,
    alipayNative,
    post,
    paramStr,
    wxpayNative
};