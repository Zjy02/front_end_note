# 模拟 call

1.  判断当前 this 是否为函数，防止 Function.prototype.myCall() 直接调用
2.  context 为可选参数，如果不传的话默认上下文为 window
3.  为 context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
4.  处理参数，传入第一个参数后的其余参数
5.  调用函数后即删除该 Symbol 属性

             Function.prototype.myCall = function (context = window, ...args) {

            if (this === Function.prototype) {
             return undefined; // 用于防止 Function.prototype.myCall() 直接调用
            }
             context = context || window;
             const fn = Symbol();
             context[fn] = this;
             const result = context[fn](...args);
             delete context[fn];
             return result;
            }


          Function.prototype.mycall = function (ctx, ...agrs){
            ctx =   ctx === undefined || ctx === null ? globalThis : Object(ctx)
            // ctx 一定是对象

            //获取到要执行的函数
            const fn = this

            //让属性名是唯一的，避免被覆盖
            const  key = Symbol('temp')

            //使用defineProperty让ctx(this)，变为不可枚举
            Object.defineProperty(ctx,key,{
              enumerable:false,
              value:fn
            })

            //将要执行的函数放到ctx对象中，让执行的函数的this执行向ctx
            ctx[key] = fn
            //执行函数
            ctx[key](...agrs)

          }

          function methods (a,b) {
            console.log(this,a,b)
            return a + b
          }

          let obj = {
            key : 1
          }
          methods.mycall(obj,1,2) // { key: 1 } 1 2

# 模拟实现 apply

> apply 和 call 类似，参数是数组

                Function.prototype.myApply = function (context = window, args) {
                if (this === Function.prototype) {
                    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
                }
                const fn = Symbol();
                context[fn] = this;
                let result;
                if (Array.isArray(args)) {
                    result = context[fn](...args);
                } else {
                    result = context[fn]();
                }
                delete context[fn];
                return result;
                }

# 模拟实现

1.  处理参数，返回一个闭包
2.  判断是否为构造函数调用，如果是则使用 new 调用当前函数
3.  如果不是，使用 apply，将 context 和处理好的参数传入

        Function.prototype.myBind = function (context,...args1) {
        if (this === Function.prototype) {
            throw new TypeError('Error')
        }
        const _this = this
        return function F(...args2) {
            // 判断是否用于构造函数
            if (this instanceof F) {
            return new _this(...args1, ...args2)
            }
            return _this.apply(context, args1.concat(args2))
        }
        }

# 扩展获取函数中的参数

          // 获取argument对象 类数组对象 不能调用数组方法
    function test1() {
      console.log('获取argument对象 类数组对象 不能调用数组方法', arguments);
    }

    // 获取参数数组  可以调用数组方法
    function test2(...args) {
      console.log('获取参数数组  可以调用数组方法', args);
    }

    // 获取除第一个参数的剩余参数数组
    function test3(first, ...args) {
      console.log('获取argument对象 类数组对象 不能调用数组方法', args);
    }

    // 透传参数
    function test4(first, ...args) {
      fn(...args);
      fn(...arguments);
    }

    function fn() {
      console.log('透传', ...arguments);
    }

    test1(1, 2, 3);
    test2(1, 2, 3);
    test3(1, 2, 3);
    test4(1, 2, 3);

    //获取argument对象 类数组对象 不能调用数组方法 [Arguments] { '0': 1, '1': 2, '2': 3 }
    //获取参数数组  可以调用数组方法 [ 1, 2, 3 ]
    //获取argument对象 类数组对象 不能调用数组方法 [ 2, 3 ]
    //透传 2 3
    //透传 1 2 3
