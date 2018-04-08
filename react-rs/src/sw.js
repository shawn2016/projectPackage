//cachestorage名称，可以加上版本号予以区分
const OFFLINE_CACHE_PREFIX = 'network_my_'
const CACHE_VERSION = 'v1.0'
const OFFLINE_CACHE_NAME = OFFLINE_CACHE_PREFIX + CACHE_VERSION
let updatefile = []
//Service Worker安装事件，其中可以预缓存资源
this.addEventListener('install', (event) => {
  //需要缓存的页面资源
  let urlsToPrefetch = [
    'http://localhost:8080/assets/images/logo.png'
  ]
  event.waitUntil(
    caches.open(OFFLINE_CACHE_NAME).then((cache) => {
      console.log('添加缓存')
      return cache.addAll(urlsToPrefetch)
    }
    ))
})

//Service Worker激活事件

this.addEventListener('activate', function (event) {
  //在激活事件中清除非当前版本的缓存避免用户存储空间急剧膨胀
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheName !== OFFLINE_CACHE_NAME) {
        if (cacheName.indexOf(OFFLINE_CACHE_PREFIX) !== -1) {
          return caches.delete(cacheName)
        }
      }
      return null
    }))
  }).then(function () {
    return self.clients.matchAll().then(function (clients) {
      if (clients && clients.length) {
        clients.forEach(function (client) {
       // 给每个已经打开的标签都 postMessage
          client.postMessage('sw.update')
        })
      }
    })
  }))
})


/*页面sw通讯*/
self.addEventListener('message', (event) => {
  const data = event.data
  updatefile = data.arrayFile
  if (updatefile && updatefile.length > 0) {
    event.waitUntil(caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (cacheName) {
        if (cacheName.indexOf(OFFLINE_CACHE_PREFIX) !== -1) {
          console.log('删除缓存~~')
          return caches.delete(cacheName)
        }
        return null
      }))
    }))
  }
  if (data.command === 'twoWayCommunication') {
    event.ports[0].postMessage({
      message: 'success'
    })
  }
})

/*1.网络优先*/
/*Service Worker 请求拦截事件 */
/*this.addEventListener('fetch', function(event)  {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
        return cache.match(event.request.url)
      })
    })
  )
})*/

/*2.缓存优先*/
/*Service Worker 请求拦截事件*/
/*this.addEventListener('fetch', function(event)  {
  event.respondWith(
    caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
      return cache.match(event.request.url)
    }).then(function(response){
      //response为空表明未匹配成功，交由fetch方法去网络拉取
      if(response) {
        return response
      }
      return fetch(event.request)
    })
  )
})*/


/*3.速度优先*/
/*function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    promises = promises.map(p => Promise.resolve(p))
    promises.forEach(p => p.then(resolve))
    promises.reduce((a, b) => a.catch(() => b))
      .catch(() => reject(Error("All failed")))
  })
}

//Service Worker 请求拦截事件
this.addEventListener('fetch', function(event)  {
  event.respondWith(
    promiseAny([
      caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
        return cache.match(event.request.url)
      }).then(function(response) {
        if(response)
          return response
        return fetch(event.request)
      }),
      fetch(event.request)
    ])
  )
})*/

/*4.仅使用缓存*/

//Service Worker 请求拦截事件
/*this.addEventListener('fetch', function(event)  {
  event.respondWith(
    caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
      return cache.match(event.request.url)
    })
  )
})*/

/*5.渐进式缓存*/

let addToCache = function (req) {
  return fetch(req.clone()).then(function (resp) {
    let cacheResp = resp.clone()
    if (resp.status !== 200 || (resp.type !== 'basic' && resp.type !== 'cors')) {
      return resp
    }
    if (req.method !== 'POST') {
      if (req.url.indexOf('getVersion') !== -1) {
        console.log('不缓存", req.url')
      } else {
        updatefile.forEach(function (obj, index, array) {
          console.log(array)
          if (obj !== req.url) {
            return resp
          }
          caches.open(OFFLINE_CACHE_NAME).then(function (cache) {
            cache.put(req.clone(), cacheResp)
          })
        })
      }
    }
    return resp
  })
}


//Service Worker 请求拦截事件
this.addEventListener('fetch', function (event) {
  let req, url
  url = event.request.url

  if (url.indexOf('cors=1') !== -1) {
    req = new Request(url, { mode: 'cors' })
  } else {
    req = event.request.clone()
  }

  event.respondWith(
    caches.open(OFFLINE_CACHE_NAME).then(function (cache) {
      return cache.match(event.request)
    }).then(function (response) {
      if (response) {
        updatefile.forEach(function (obj) {
          // console.log(index)
          // console.log(array)
          if (obj !== event.request.url) {
            return response
          }
          return addToCache(event.request)
        })
        return response
      }
      return addToCache(req)
    })
  )
})

