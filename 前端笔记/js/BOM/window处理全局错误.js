// 抛到全局的错误，可以用 unhandledrejection 事件来捕获
window.addEventListener('unhandledrejection', (event) => {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] —— 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! —— 未处理的 error 对象
})