define(["app"], function (app) {
	app.register.factory("commonService", ["$state", "$http", function ($state, $http) {
		returnService = {
			setTitle: setTitle,
			is_weixn: is_weixn,
			getClientType: getClientType,
			getExamine: getExamine,
			uuid: uuid,
			switchType: switchType
		}
		return returnService;
		function setTitle(title) {
			setTimeout(function () {
				//利用iframe的onload事件刷新页面
				document.title = title;
				var iframe = document.createElement('iframe');
				iframe.style.visibility = 'hidden';
				iframe.src = '';
				iframe.onload = function () {
					setTimeout(function () {
						document.body.removeChild(iframe);
					}, 0);
				};
				document.body.appendChild(iframe);
			}, 0);
		};
		function is_weixn() {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		};
		function getClientType() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			console.log('是否是Android：' + isAndroid);
			console.log('是否是iOS：' + isiOS);
			if (isAndroid) {
				return 'android'
			}
			if (isiOS) {
				return 'ios'
			}
		};
		function getExamine(body, key) {
			var signString = '';
			var keys1 = [];
			if (body) {
				for (var p1 in body) {
					if (body.hasOwnProperty(p1))
						keys1.push(p1);
				}
				keys1.sort().forEach(function (key) {
					var value = body[key]
					if (value && typeof value !== 'object') {
						signString = signString + key + "=" + value + "&"
					}
				})
				return signString.substr(0, signString.length - 1) + '&key=' + key
			} else {
				return signString + '&key='
			}
		}
		function uuid() {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "";

			var uuid = s.join("");
			return uuid;
		}
		function switchType(type) {
			switch (type) {
				case 'wx':
					return '20001';
				case 'al':
					return '30001';
				default:
					return ''
			}
		}
	}])
})