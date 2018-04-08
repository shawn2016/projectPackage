let twoWayCommunication = () => {
  let version
  const messageChannel = new MessageChannel()
  //请求版本  和 arrayFile
  // `${API_ORIGIN}/get`
  fetch('http://localhost:8080/api/getVersion', {
    method: 'GET',
    headers: { 'Content-Type': 'multipart/form-data', },
    body: { name: 'servicework' },
  })
    .then((response) => response.json())
    .then((responseData) => {
      version = responseData.versionNo

      let oldVersion = sessionStorage.getItem('version')
      if (version !== oldVersion) {
        if (navigator.serviceWorker.controller) {
          console.log('发送通知~~~~~~~~~')
          messageChannel.port1.onmessage = function (event) {
            //双向通信 返回信息
            sessionStorage.setItem('version', version)
            console.log(`sw: ${event.data.message}`)
          }
          navigator.serviceWorker.controller.postMessage({
            command: 'twoWayCommunication',
            message: version,
            arrayFile: responseData.reqUrl
          }, [messageChannel.port2])
        }
      } else {
        navigator.serviceWorker.controller.postMessage({
          command: 'twoWayCommunication',
          message: version,
          arrayFile: []
        }, [messageChannel.port2])
        console.log('没有要更新的')
      }
    })
    .catch((error) => {
      console.error('error', error)
    })
}
// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js?v=0.2').then(function (reg) {
    twoWayCommunication()
    console.log('注册service worker')
    if (reg.installing) {
      console.log('安装')
    } else if (reg.waiting) {
      console.log('安装成功等待激活')
    } else if (reg.active) {
      console.log('激活成功')
    }
  }).catch(function (error) {
    console.log('注册失败')
    console.log('Registration failed with', error)
  })
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('message', function (e) {
    if (e.data === 'sw.update') {
        //server worker 更新完毕
      alert('版本更新，点击刷新')
      // location.reload()
    }
  })
}