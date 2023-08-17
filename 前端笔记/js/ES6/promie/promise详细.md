## 总结

> 在 new Promise 被创建，executor会自动执行

  let promise = new Promise(function(resolve, reject) {
    // executor
  });

> executor获得结构后，无论早晚都应该回调 resolve 和 reject 两个之一来告诉promise执行结果

    let promise = new Promise(function(resolve, reject) {
      // executor
      // resolve(value)
      // reject(err)
    });

> then函数接受两个参数 一个是成功的回调，一个是失败的回调(就是catch)

  promise
  .then(
    function(result){},
    function(err){}
  )

> 无论是什么结果都会执行的finally
> 同样finally接受一个函数，但是这个函数没有接受参数

  promise
  .finally(
    function(){
      returen 'promise ready'
    })
  .then(res=>{

  })

> finally 处理程序也不应该返回任何内容。如果它返回了，返回的值会默认被忽略。
> 当 finally 抛出 error 时，执行将转到最近的 error 的处理程序
> finally 处理程序没有得到前一个处理程序的结果（它没有参数）。而这个结果被传递给了下一个合适的处理程序。

> promise链中，如果 .then（或 catch/finally 都可以）处理程序返回一个 promise，那么链的其余部分将会等待，直到它
> 状态变为 settled。当它被 settled 后，其 result（或 error）将被进一步传递下去。

### promise Api
### promise.all
> 接受一个可迭代对象（通常是一个数组项为 promise 的数组），并返回一个新的 promise。
> promise.all 可以执行一次执行多个promise

  Promise.all([
    new Promise(resolve => resolve(1)),
    new Promise(resolve => resolve(1)),
    new Promise(resolve => resolve(1))
  ]).then(res => {
    console.log(res);
  })

> 如果数组中的promise都成功了 promise.all 的 then 方法接受的参数是一个数组，数组元素是每个
> promise resolve传递的参数
> 如果其中一个执行了reject，promise.all 不会管其余的，直接有catch来捕获错误

> 数组中的元素可以不是promise对象，它将被“按原样”传递给结果数组

    Promise.all([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000)
      }),
      2,
      3
    ]).then(alert); // 1, 2, 3

> promise.all执行顺序,会按顺序执行每个promise，等所有的promise执行完成
> 再改变promise.all状态，在执行then

    Promise.all([
      new Promise((resolve, reject) => {
        console.log('第一个开始');
        setTimeout(() => {
          resolve(1)
          console.log('第一个完成');
        }, 2000);
      }),
      new Promise((resolve, reject) => {
        console.log('第二个开始');
        setTimeout(() => {
          resolve(1)
          console.log('第二个完成');
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        console.log('第三个开始');
        setTimeout(() => {
          resolve(1)
          console.log('第三个完成');
        }, 5000);
      })
    ]).then(res => {
      console.log('执行then');
      console.log(res);
    })
      //第一个开始
      //第二个开始
      //第三个开始
      //第二个完成
      //第一个完成
      //第三个完成
      //执行then
      //[ 1, 1, 1 ]
### promise.allSettled

> promise.allSettled() es2021引入
> 或等待每一个promise执行完成，并且在 then 方法中传递的参数说明每个promise结果

    Promise.allSettled([
      new Promise((resolve, reject) => reject(1)),
      new Promise((resolve, reject) => resolve(1)),
      new Promise((resolve, reject) => reject(1))
    ]).then(res => {
      console.log(res);
    })


    //[
        { status: 'rejected', reason: 1 },
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: 1 }
      ]

> 如果浏览器不兼容 promise.allSettled

  if (!Promise.allSettled) {
    const rejectHandler = reason => ({ status: 'rejected', reason });

    const resolveHandler = value => ({ status: 'fulfilled', value });

    Promise.allSettled = function (promises) {
      把promises数组中的promise使用map遍历，结果放到数组中，并结果传给 promise.all,返回出去
      const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
      return Promise.all(convertedPromises);
    };
  }

### promise.race()

> promise.race 和 promise.all 类似，接受一个promse数组，但是他只等待一个改变状态的promise并取得结果
> 其他的都会忽略

  Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then(alert); // 1

### promise.any()

> 与 promise.race 类似，但是他只等待第一个 fullfilled 的 promise，并将这个 promise 返回出去
> 如果 所有的 promise 都为 rejected, 返回一个 AggregateError 特殊对象

      Promise.any([
        new Promise((resolve, reject) => reject(1)),
        new Promise((resolve, reject) => reject(1)),
        new Promise((resolve, reject) => reject(1))
      ]).catch((err) => {
        console.log(err.name);
        console.log(err.errors);
        console.log(err.constructor.name);
      })

      AggregateError
      [ 1, 1, 1 ]
      AggregateError

### promise.resolve/reject

> promise.resolve 使用场景: 在处理异步时，如果在缓存中提前拿到了数据，但是预期但是一个 promise，
> 使用 promise.resolve 将结果包装成一个 fullfilled的 promie

  let cache = new Map();

  function loadCached(url) {
    if (cache.has(url)) {
      return Promise.resolve(cache.get(url)); // (*)
    }

    return fetch(url)
      .then(response => response.text())
      .then(text => {
        cache.set(url,text);
        return text;
      });
  }

> Promise.reject(error) 用 error 创建一个 rejected 的 promise。

  let promise = new Promise((resolve, reject) => reject(error));

## Promisification

> 将一个接受回调的函数转换为 返回promise的函数

    function loadScript(src, callback){
      let script =  document.createElement('script')
      script.src = src
      script.onload = ()=>{ callback(null,script) }
      script.onerror = ()=>{ callback(new Error(`error ${src}`)) }
      document.head.append(script)
    }

    将这个就收回调的函数转换为返回 promise 的函数

    function loadScriptPromise(src){
        return new Promise((resolve, reject)=>{
            loadScript(src, (resolve,reject)=>{
              if(err) resolve(src)
              else reject(err)
            })
        })
    }

    loadScriptPromise('/api/user').then()

### promisify(f)
> 它接受一个需要被 promise 化的函数 f，并返回一个包装（wrapper）函数。

  function promisify(f){
    return function(...args){
      return new Promise((resolve,reject)=>{

          function callback(err,result){
            if(err) reject(err)
            else resolve(resolve)
          }

          args.push(callback) // 将我们的自定义的回调附加到 f 参数（arguments）的末尾
          f.apply(this,args)  // 调用原始的函数
      })
    }
  }

  let loadScriptPromise = promisify(loadScript)

  loadScriptPromise('/api/user').then()....

### 进阶promisify(f, manyArgs = true)

> 如果f带有跟多的参数

    // promisify(f, true) 来获取结果数组

    function promisify(f, manyArgs = false) {
      return function (...args) {
        return new Promise((resolve, reject) => {
          function callback(err, ...results) { // 我们自定义的 f 的回调
            if (err) {
              reject(err);
            } else {
              // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
              resolve(manyArgs ? results : results[0]);
            }
          }

          args.push(callback);

          f.call(this, ...args);
        });
      };
    }

    // 用法：
    f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);


## await/async

>  在一个函数前面加上一个 async 表达的意思是 这个函数总是返回一个 promise，其他值将自动被包装在一个 resolved 的 promise 中。

    async function a(){}
    a().then(alert)

> 也可以显示返回一个promise

    async function a(){ return new Promise.resolve(1)}
    a().then(alert)

> await 会等到 promise 状态改变，然后再执行下面的代码，这个行为不会耗费CPU资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等。

> 在现在的浏览器中 可以在 modules中使用顶层await

> 如果使用旧版本浏览器

    (async ()=>{
      let result = await fetch('/')
    })()

> await 接受thenable

    class Thenable {
      constructor(num) {
        this.num = num;
      }
      then(resolve, reject) {
        alert(resolve);
        // 1000ms 后使用 this.num*2 进行 resolve
        setTimeout(() => resolve(this.num * 2), 1000); // (*)
      }
    }

    async function f() {
      // 等待 1 秒，之后 result 变为 2
      let result = await new Thenable(1);
      alert(result);
    }

    f();


> class 中的 async

    clas a{
      async wait(){
        await new Promise.resolve(1)
      }
    }

    new a()
    .wait()
    .then()

## Error处理

> 如果一个 promise 正常 resolve，await promise 返回的就是其结果。但是如果 promise 被 reject，它将 throw 这个 error，就像在这一行有一个 throw 语句那样

    async function f() {
      await Promise.reject(new Error("Whoops!"));
    }

    等价
    async function f() {
      throw new Error("Whoops!");
    }

> 我们可以使用 try/catch 来捕获await等待的错误

    async function f(){

      try {
        let result = await fetch('/')
      } catch(err) {
        console.log(err)
      }
    }