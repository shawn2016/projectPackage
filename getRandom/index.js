var array = []

function getRandomTime() {
    // 获取当前时间戳
    var nowtemp = +new Date('1970-01-01');
    // 获取随机数值
    var randomData = Math.round(Math.random() * 10**13)
    console.log(randomData)
    var time = (randomData + nowtemp);
    return timestampToTime(time)
}
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + '';
    return Y + M + D;
}
var x = 0
function getAli(time) {
    if (time === 'NaN-NaN-NaN') {
        getStart()
        return false
    }
    if (array.length == 0) {
        array.push(time)
    } else {
        for (var i = 0; i < array.length; i++) {
            if (array[i] != time) {
                array.push(time)
                break
            }
        }
    }
    getStart()
}
function getStart() {
    if (array.length < 100) {
        getAli(getRandomTime())
    }
    return false
}
getStart()
console.log(array)