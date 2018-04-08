let host = location.host
let href = host.split('.')
let domain = 'http://dev-wgw.rswallet.com'
switch (href[0]) {
    case 'scan':
        domain = "https://wgw.rswallet.com"
        break
    case 'test2scan':
        domain = "https://test2wgw.rswallet.com"
        break
    case 'csscan':
        domain = "http://cspay.rswallet.com"
        break
    case 'dev-scan':
        domain = "http://dev-wgw.rswallet.com"
        break
    default:
        domain = "http://dev-wgw.rswallet.com"
        break
}
const apiUrl = domain || 'http://dev-wgw.rswallet.com'
const payUrl = apiUrl + '/pay/scan/saveScanOrder'
const payInfoUrl = apiUrl + '/pay/query/queryOrder'
export {
    payUrl,
    domain,
    payInfoUrl
}