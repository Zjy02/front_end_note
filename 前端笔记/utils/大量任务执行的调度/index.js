// 同步执行 阻塞
// promise 阻塞
// settimeOut 卡顿
// requestAnimationFrame 阻塞
// requestIdleCallback 兼容性 不能在 Safari中使用
// requestAnimationFrame + 判断
// webworker 多线程，但是补鞥操作dom

// promise

// function runtask(task) {
//   return new Promise((resolve, reject) => {
//     Promise.resolve().then(() => {
//       task()
//       resolve()
//     })
//   })
// }

// requestIdleCallback

// function runTime(task, callback) {
//   // 可以获取当前一帧还剩多久 (一帧 16.6ms)
//   requestIdleCallback((idle) => {
//     // 拿到剩余时间
//     if (idle.timeRemaining() > 0) {
//       task()
//       callback()
//     } else {
//       runTime(task, callback)
//     }
//   })
// }

// requestAnimationFrame + 判断

// function runTime(task, callback) {
//   const start = Date.now()
//   requestAnimationFrame(() => {
//     if (Date.now() - start < 20) {
//       task()
//       callback()
//     } else {
//       runTime(task, callback)
//     }
//   })
// }


// function runtask(task) {
//   return new Promise((resolve, reject) => {
//     runTime(task, resolve)
//   })
// }


function runtask(task) {
  return new Promise((resolve, reject) => {
    task()
    resolve()
  })
}