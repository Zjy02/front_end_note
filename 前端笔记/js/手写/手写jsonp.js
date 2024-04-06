(function () {
  "use strict"
  var jsonp = function (url, data, callback) {
    let dataString = url.indexOf('?') === -1 ? '?' : '&'
    for (let key in data) {
      dataString += key + '=' + data[key] + '&'
    }

    let cbFuncName = 'my_json_cb' + Math.random().toString().replace('.', '')
    dataString += 'callback' + cbFuncName

    let scripyEle = document.createElement('script')
    scripyEle.src = url + dataString

    window[cbFuncName] = function (data) {
      callback(data)
      document.body.removeChild(scripyEle)
    }
    document.body.appendChild(scripyEle)
  }
  window.$jsonp = jsonp
})(window, document)