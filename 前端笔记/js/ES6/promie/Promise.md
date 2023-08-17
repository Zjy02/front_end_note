# Promise

> 是一种异步编程的解决方案
> 所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
> 所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

- promise 对象有两个特点

1. 对象的状态不受外界影响

   Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

2. 一旦状态改变，就不会在改变。

   Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的

- Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 基本用法

     const promise = new Promise(function(resolve, reject) {
        // ... some code

        if (/* 异步操作成功 */){
            resolve(value);
        } else {
            reject(error);
        }
    });

> Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署

- resolve 函数的作用是，将 promise 对象的状态从 pending 变为 resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去

- reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

- then 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。这两个函数都是可选的，不一定要提供。它们都接受 Promise 对象传出的值作为参数

- promise 创建后就会立即执行

        let promise = new Promise(function(resolve, reject) {
          console.log('Promise');
          resolve();
        });

        promise.then(function() {
           console.log('resolved.');
        });

        console.log('Hi!');

        // Promise
        // Hi!
        // resolved

- 使用 promise 封装 AJAX

  const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
  const handler = function() {
  if (this.readyState !== 4) {
  return;
  }
  if (this.status === 200) {
  resolve(this.response);
  } else {
  reject(new Error(this.statusText));
  }
  };
  const client = new XMLHttpRequest();
  client.open("GET", url);
  client.onreadystatechange = handler;
  client.responseType = "json";
  client.setRequestHeader("Accept", "application/json");
  client.send();

  });

  return promise;
  };

  getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
  }, function(error) {
  console.error('出错了', error);
  });

> 如果调用 resolve 函数和 reject 函数时带有参数，那么它们的参数会被传递给回调函数。reject 函数的参数通常是 Error 对象的实例，表示抛出的错误；resolve 函数的参数除了正常的值以外，还可能是另一个 Promise 实例

    const p1 = new Promise(function (resolve, reject) {
    // ...
    });

    const p2 = new Promise(function (resolve, reject) {
    // ...
    resolve(p1);
    })

    这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行

> 一般来说，调用 resolve 或 reject 以后，Promise 的使命就完成了，后继操作应该放到 then 方法里面，而不应该直接写在 resolve 或 reject 的后面。所以，最好在它们前面加上 return 语句，这样就不会有意外。

    new Promise((resolve, reject) => {
        return resolve(1);
        // 后面的语句不会执行
        console.log(2);
    })

## Promise.Prototype.then()

> then 方法返回的是一个新 promise 实例(不是以前的那个实例)，因此可以采用链式写法

> 采用链式的 then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用

    getJSON("/post/1.json").then(function(post) {
      return getJSON(post.commentURL);
    }).then(function (comments) {
      console.log("resolved: ", comments);
    }, function (err){
    console.log("rejected: ", err);
    });

    //使用箭头函数
    getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
    ).then(
    comments => console.log("resolved: ", comments),
    err => console.log("rejected: ", err)
    );

## Promise.Prototype.catch()

> Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数

    getJSON('/posts.json').then(function(posts) {
    // ...
    }).catch(function(error) {
      // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log('发生错误！', error);
    });

> 上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为 resolved，则会调用 then()方法指定的回调函数；如果异步操作抛出错误，状态就会变为 rejected，就会调用 catch()方法指定的回调函数，处理这个错误。另外，then()方法指定的回调函数，如果运行中抛出错误，也会被 catch()方法捕获

    p.then((val) => console.log('fulfilled:', val))

    .catch((err) => console.log('rejected', err));

    // 等同于
    p.then((val) => console.log('fulfilled:', val))
    .then(null, (err) => console.log("rejected:", err));

> 如果 Promise 状态已经变成 resolved，再抛出错误是无效的。

> Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获。

> 一般使用 catch 方法，catch 可以捕获 then 方法中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用 catch()方法，而不使用 then()方法的第二个参数。

> 跟传统的 try/catch 代码块不同的是，如果没有使用 catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

    const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
    });
    };

    someAsyncThing().then(function() {
    console.log('everything is great');
    });

    setTimeout(() => { console.log(123) }, 2000);
    // Uncaught (in promise) ReferenceError: x is not defined
    // 123

    上面代码中，someAsyncThing()函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

> Node.js 有一个 unhandledRejection 事件，专门监听未捕获的 reject 错误，上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误。

- unhandledRejection 事件的监听函数有两个参数，第一个是错误对象，第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。

  process.on('unhandledRejection', function (err, p) {
  throw err;
  });

- Node 有计划在未来废除 unhandledRejection 事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。

> catch()方法之中，还能再抛出错误

    const someAsyncThing = function() {
      return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
       });
    };

    someAsyncThing().then(function() {
      return someOtherAsyncThing();
    }).catch(function(error) {
      console.log('oh no', error);
    // 下面一行会报错，因为 y 没有声明
    y + 2;
    }).then(function() {
      console.log('carry on');
    });
    // oh no [ReferenceError: x is not defined]

- catch()方法抛出一个错误，因为后面没有别的 catch()方法了，导致这个错误不会被捕获，也不会传递到外层。如果改写一下，结果就不一样了。

  someAsyncThing().then(function() {
  return someOtherAsyncThing();
  }).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为 y 没有声明
  y + 2;
  }).catch(function(error) {
  console.log('carry on', error);
  });
  // oh no [ReferenceError: x is not defined]
  // carry on [ReferenceError: y is not defined]

  第二个 catch()方法用来捕获前一个 catch()方法抛出的错误。

## Promise.Prototype.finally()

> finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

> finally 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是 fulfilled 还是 rejected。这表明，finally 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

> finally 本质上是 then 方法的特例

## Promise.all()

> Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

- Promise.all()方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例,如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理

  const p = Promise.all([p1, p2, p3]);

> Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

- p 的状态由 p1、p2、p3 决定，分成两种情况。

1. 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。

2. 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

## Promise.race()

> Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例

    const p = Promise.race([p1, p2, p3]);

> 只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

> 只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

## Promise.allSettled()

> 我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求,ES2020 引入了 Promise.allSettled()方法，用来确定一组异步操作是否都结束了（不管成功或失败）

> Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是 fulfilled 还是 rejected），返回的 Promise 对象才会发生状态变更

## Promise.any()

> ES2021 引入了 Promise.any()方法。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

    Promise.any([
    fetch('https://v8.dev/').then(() => 'home'),
    fetch('https://v8.dev/blog').then(() => 'blog'),
    fetch('https://v8.dev/docs').then(() => 'docs')
    ]).then((first) => {  // 只要有一个 fetch() 请求成功
    console.log(first);
    }).catch((error) => { // 所有三个 fetch() 全部请求失败
    console.log(error);
    });

> 只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态。

## Promise.resolve()

> 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

    Promise.resolve('foo')
    // 等价于
    new Promise(resolve => resolve('foo'))

## Promise.reject()

> Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected

## Promise.try()

> 事实上，Promise.try 就是模拟 try 代码块，就像 promise.catch 模拟的是 catch 代码块

# 手写 Promise

    const p = new Mypromise((resolve,reject)=>{

    })

## 构造函数

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Mypromise {

#state = PENDING
#result = undefined

    construtor(executor){

        const resolve = (data)=>{
            #changestate(FULFILLED,data)
        }

        const reject = (reason)=>{
           #changestate(REJECTED,reason)
        }
        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }

    }

#changestate(state,result){
if(this.#state !== PENDING) return
this.#state = state
this.#result = result
this.#run()
}

}

## then

#run(){
if(this.#state === PENDING) return
while(this.#handlers.length){
const { onFulfilled,onRjected,reject,resolve} = this.#handlers.shift()

        if(this.#state === FULFILLED){
            if(typeof onFulfilled === 'function'){
                onFulfilled(this.#result)
            }
        }
        else{
            if(typeof onRjected === 'function'){
                onRjected(this.#result)
            }
        }
    }

}

then(onFulfilled,onRjected) {
return new Mypromise((resolve, reject)=>{

        this.#handlers.push({
            onFulfilled,
            onRjected,
            resolve,
            reject
        })

        this.#run()
    })

}

## 手写 promise

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Mypromise {

#state = PENDING
#result = undefined
#handlers = []

    constructor(executor){

        const resolve = (data)=>{
            this.#changestate(FULFILLED,data)
        }

        const reject = (reason)=>{
           this.#changestate(REJECTED,reason)
        }

        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }

    }

#changestate(state,result){
if(this.#state !== PENDING) return
this.#state = state
this.#result = result
this.#run()
}

#run(){
if(this.#state === PENDING) return
while(this.#handlers.length){
const { onFulfilled,onRjected,reject,resolve} = this.#handlers.shift()

        if(this.#state === FULFILLED){
            if(typeof onFulfilled === 'function'){
                onFulfilled(this.#result)
            }
        }
        else{
            if(typeof onRjected === 'function'){
                onRjected(this.#result)
            }
        }
    }

}

then(onFulfilled,onRjected) {
return new Mypromise((resolve, reject)=>{

        this.#handlers.push({
            onFulfilled,
            onRjected,
            resolve,
            reject
        })

        this.#run()
    })

}  
}

const p = new Mypromise((resolve,reject)=>{
setTimeout(() => {
resolve(2)
}, 1000);

})

p.then((res)=>{
console.log(res+'wancheng')
},(err)=>{
console.log(err+'shibai')
})

# 手写 Promise(参考掘金)

## resolve 和 reject

        let p1 = new Promise((resolve, reject) => {
            resolve('成功')
            reject('失败')
        })
        console.log('p1', p1)

        let p2 = new Promise((resolve, reject) => {
            reject('失败')
            resolve('成功')
        })
        console.log('p2', p2)

        let p3 = new Promise((resolve, reject) => {
            throw('报错')
        })
        console.log('p3', p3)

- 执行了 resolve Promise 状态就是 fulfilled
- 执行了 reject Promise 状态就是 rejected
- promise 只以第一次为准，第一次成功就永久为 fulfilled，第一次失败就永远状态为 rejected、
- Promise 中有 throw 的话，就相当于执行了 reject

## 实现 resolve 和 reject

> promnise 原始状态是 pending
> 要为 reject 和 reject 绑定 this，为了 resolve 和 reject 的 this 指向永远指向当前的 MyPromise 实例，防止随着函数执行环境的改变而改变

    class MyPromise {
        // 构造方法
        constructor(executor) {

            // 初始化值
            this.initValue()
            // 初始化this指向
            this.initBind()
            // 执行传进来的函数
            executor(this.resolve, this.reject)
        }

        initBind() {
            // 初始化this
            this.resolve = this.resolve.bind(this)
            this.reject = this.reject.bind(this)
        }

        initValue() {
            // 初始化值
            this.PromiseResult = null // 终值
            this.PromiseState = 'pending' // 状态
        }

        resolve(value) {
            // state是不可变的
            if (this.PromiseState !== 'pending') return
            // 如果执行resolve，状态变为fulfilled
            this.PromiseState = 'fulfilled'
            // 终值为传进来的值
            this.PromiseResult = value
        }

        reject(reason) {
            // state是不可变的
            if (this.PromiseState !== 'pending') return
            // 如果执行reject，状态变为rejected
            this.PromiseState = 'rejected'
            // 终值为传进来的reason
            this.PromiseResult = reason
        }

    }

        /*测试代码

        const test1 = new MyPromise((resolve, reject) => {
            // 只以第一次为准
            resolve('成功')
            reject('失败')
        })
        console.log(test1) // MyPromise { PromiseState: 'fulfilled', PromiseResult: '成功' }


        */测试代码

## throw

> promise 中有 throw 的话就相当有执行 reject，这就要使用 try/catch

                try {
                    // 执行传进来的函数
                    executor(this.resolve, this.reject)
                } catch (e) {
                    // 捕捉到错误直接执行reject
                    this.reject(e)
                }

# then 方法

> then 接收两个回调，一个是成功回调，一个是失败回调

> 当 Promise 状态为 fulfilled 执行成功回调，为 rejected 执行失败回调

> 如 resolve 或 reject 在定时器里，则定时器结束后再执行 then

> then 支持链式调用，下一次 then 执行受上一次 then 返回值的影响
