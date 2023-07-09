# 事件循环

> 任务分为异步任务和同步任务

<img src='../image/事件循环.png'>

1. 同步任务和异步任务分别进入不同的执行场所，同步进入主线程

2. 放指定的事情完成时，Event Table 会将这个函数移入 Event Queue

3. 主线程内的任务执行完毕为空，会去 Event Queue 读取对应的函数，进入主线程执行。

4. 上述过程会不断重复，也就是常说的 Event Loop(事件循环)。

> js 引擎存在 monitoring process 进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去 Event Queue 那里检查是否有等待被调用的函数。

## 宏任务和微任务有哪些

- 宏任务

  1. script
  2. setTimeout / setInterval
  3. UI rendering
  4. postMessage MessageChannel
  5. setImmediate I/O (Node.js)

- 微任务

  1. Promise
  2. process.nextTick(Node.js)
  3. Object.observe
  4. MutationObserve
