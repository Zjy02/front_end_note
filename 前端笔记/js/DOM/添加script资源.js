function loadscript(url, callback) {
  let script = document.createElement('script')
  script.src = url
  script.onload = () => {
    // callback接受两个参数一个是err，一个是script
    callback(null, script)
  }

  script.onerror = () => {
    callback(new Error('加载失败'))
  }

  document.head.append(script)
}

export default loadscript;