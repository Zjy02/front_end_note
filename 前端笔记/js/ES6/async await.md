# async 函数

> async 是 Generator 的语法糖

- 示例

  const fs = require('fs');

  const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
  fs.readFile(fileName, function(error, data) {
  if (error) return reject(error);
  resolve(data);
  });
  });
  };

  //使用 generator 函数

        const gen = function\* () {
         const f1 = yield readFile('/etc/fstab');
         const f2 = yield readFile('/etc/shells');
         console.log(f1.toString());
         console.log(f2.toString());
        };

  // 使用 async await

        const asyncReadFile = async function () {
         const f1 = await readFile('/etc/fstab');
         const f2 = await readFile('/etc/shells');
         console.log(f1.toString());
         console.log(f2.toString());
        };

  async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await

- async 函数对 Generator 函数的改进，体现在以下四点

1. 内置执行器

   generator 函数执行必须有执行器，所以才有了 co 模块，而 async 函数自带执行器，async 函数执行与普通函数一样

2. 更好的语义

   async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果

3. 更广的适用性

   co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）

4. 返回 promise 对象

   async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。

   进一步说，async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖

## 基本用法

> async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

      async function getStockPriceByName(name) {
      const symbol = await getStockSymbol(name);
      const stockPrice = await getStockPrice(symbol);
      return stockPrice;
      }

      getStockPriceByName('goog').then(function (result) {
      console.log(result);
      });

## 语法

> async 函数内部的 return 语句返回的值，会成为 then 方法的回调函数的参数

> async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到

      async function f() {
      throw new Error('出错了');
      }

      f().then(
      v => console.log('resolve', v),
      e => console.log('reject', e)
      )
      //reject Error: 出错了

## promise 对象的状态变化

> async 函数返回的 Promise 对象，必须等到内部所有 await 命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到 return 语句或者抛出错误。也就是说，只有 async 函数内部的异步操作执行完，才会执行 then 方法指定的回调函数

## await

> await 命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值

      async function f() {
      // 等同于
      // return 123;
      return await 123;
      }

      f().then(v => console.log(v))
      // 123

> 另一种情况是，await 命令后面是一个 thenable 对象（即定义了 then 方法的对象），那么 await 会将其等同于 Promise 对象

      class Sleep {
      constructor(timeout) {
      this.timeout = timeout;
      }
      then(resolve, reject) {
      const startTime = Date.now();
      setTimeout(
            () => resolve(Date.now() - startTime),
            this.timeout
      );
      }
      }

      (async () => {
      const sleepTime = await new Sleep(1000);
      console.log(sleepTime);
      })();
      // 1000

      await命令后面是一个Sleep对象的实例。这个实例不是 Promise 对象，但是因为定义了then方法，await会将其视为Promise处理

- sleep 函数实现、

            function sleep(interval) {
             return new Promise(resolve => {
              setTimeout(resolve, interval);
             })
            }

            // 用法
            async function one2FiveInAsync() {
             for(let i = 1; i <= 5; i++) {
              console.log(i);
              await sleep(1000);
             }
            }

            one2FiveInAsync();

> await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到。

      async function f() {
      await Promise.reject('出错了');
      }

      f()
      .then(v => console.log(v))
      .catch(e => console.log(e))
      // 出错了

> 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行

      async function f() {
        await Promise.reject('出错了');
        await Promise.resolve('hello world'); // 不会执行
      }

> 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个 await 放在 try...catch 结构里面，这样不管这个异步操作是否成功，第二个 await 都会执行

      async function f() {
      try {
      await Promise.reject('出错了');
      } catch(e) {
      }
      return await Promise.resolve('hello world');
      }

      f()
      .then(v => console.log(v))
      // hello world

> 另一种方法是 await 后面的 Promise 对象再跟一个 catch 方法，处理前面可能出现的错误。

            async function f() {
              await Promise.reject('出错了')
              .catch(e => console.log(e));
              return await Promise.resolve('hello world');
            }

            f()
            .then(v => console.log(v))
            // 出错了
            // hello world

## 错误处理

- 下面的例子使用 try...catch 结构，实现多次重复尝试。

            const superagent = require('superagent');
            const NUM_RETRIES = 3;

            async function test() {
            let i;
             for (i = 0; i < NUM_RETRIES; ++i) {
              try {
                  await superagent.get('http://google.com/this-throws-an-error');
                  break;
              } catch(err) {}
             }
              console.log(i); // 3
            }

            test();

      上面代码中，如果await操作成功，就会使用break语句退出循环；如果失败，会被catch语句捕捉，然后进入下一轮循环。

- 多个 await 命令后面的一步操作，不存在继发关系，最好同时触发

      let foo = await getFoo()
      let bar = await getBar()

      只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发

      let [foo, bar] = await Promise.all([getFoo(), getBar()]);

      // 写法二
      let fooPromise = getFoo();
      let barPromise = getBar();
      let foo = await fooPromise;
      let bar = await barPromise;

- await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。

- async 函数可以保留运行堆栈。

      const a = () => {
      b().then(() => c());
      };

      上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。如果b()或c()报错，错误堆栈将不包括a()。

- 改成 async

      const a = async () => {
      await b();
      c();
      };

      上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。

# async 原理实现

> async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里

      async function fn(args){}
      //等同于
      function fn(args){
            return spawn(function*(){
            })
      }

      所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器

- spawn 函数的实现

      function spawn(genF) {
        return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
              next = nextF();
            } catch(e) {
              return reject(e);
            }
            if(next.done) {
              return resolve(next.value);
            }
             Promise.resolve(next.value).then(function(v) {
             step(function() { return gen.next(v); });
            }, function(e) {
             step(function() { return gen.throw(e); });
            });
         }
         step(function() { return gen.next(undefined); });
       });
      }

## 与其他异步处理方法的比较

> async 与 promise 和 generator 函数的比较

## 顶层 await

> 早期语法规定 await 只能出现在 async 函数内部中
> 从 ES2022 开始，允许在模块的顶层独立使用 await，主要是解决模块异步加载的问题
