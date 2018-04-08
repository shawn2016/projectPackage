/* eslint-disable */
//时间戳日期转换,输出格式由 flag 决定,详情如下
// 1.  yyyy-MM-dd HH:mm:ss
// 2.  yyyy-M-d HH:mm:ss
// 3.  yyyy-MM-dd
// 4.  yyyy-M-d
// 5.  yyyy/MM/dd HH:mm:ss
// 6.  yyyy/M/d HH:mm:ss
// 7.  yyyy/MM/dd
// 8.  yyyy/M/d
// 9.  yyyy年MM月dd日 HH时mm分ss秒
// 10.  yyyy年M月d日 HH时mm分ss秒
// 11.  yyyy年MM月dd日
// 12.  yyyy年M月d日
// 13.  yyyy年M月d日 HH:mm
// 14.  yyyy.M
// 15.  yyyy年M月
// 16.  hh:mm
// 17.  M月d日
// 18.  M/d
// 19.  h:m
// 20.  yyyMMdd
// 21.  yyyyyMM
// 22.  yyyy年MM月dd日 hh:mm
// 23.  yyyy-MM-dd
// 24.  yyyy-MM-dd hh:mm
// 25.  yyyy-MM-dd hh:mm:ss
// 26.  hh:mm:ss
// 27.  MM-DD hh:mm
// 传 flag1 时,timestamp不会乘以1000(默认timestamp是以秒为单位,后台传回来的都是秒)
export const timestampFormat = (timestamp, flag, flag1) => {
    let date = new Date(timestamp * 1000)
    if (flag1) {
        date = new Date(timestamp)
    }
    let time = ''
    switch (flag) {
        case 1: {
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
            time = Y + M + D + h + m + s
            break
        }
        case 2: {
            let Y = date.getFullYear() + '-'
            let M = date.getMonth() + 1 + '-'
            let D = date.getDate() + ' '
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
            time = Y + M + D + h + m + s
            break
        }
        case 3: {
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate()
            time = Y + M + D
            break
        }
        case 4: {
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
            time = Y + M + D
            break
        }
        case 5: {
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
            time = Y + M + D + h + m + s
            break
        }
    }
    return time
}

export default timestampFormat