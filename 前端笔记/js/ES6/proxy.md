# Proxy

> Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
> let proxy = new Proxy(target,handle)
> proxy 是一个函数，要用 new 创建，创建时必须要传入参数 target 和 handle
> 传入的两个参数必须是 object
> 对对象进行代理，主要是通过 handle 对象中的拦截方法 拦截目标对象 target 的某些行为(如属性查找，赋值，枚举，函数调用等)

> 可以将 proxy 放在对象里，用 object.proxy 调用

    var object = { proxy: new Proxy(target, handler) };

> proxy 可以作为其他对象的原型对象

    var proxy = new Proxy({}, {
    get: function(target, propKey) {
        return 35;
    }
    });

    let obj = Object.create(proxy);
    obj.time

- Proxy.prototype 是 undefined

> 因此不能使用 instanceOf

    let proxy = new Proxy(target,handle)
    console.log(proxy instanceOf Proxy) //undefined
    console.log(target instanceOf Proxy) //undefined

- proxy 拦截操作有 13 种

  1.  get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。

      > 拦截的方法有

             proxy.property // obj.name
             proxy[property]
             Object.create(proxy)[property]
             Reflect.get(proxy,property,reeceiver)

  2.  set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。

      > 拦截的方法有

          proxy.property = value
          proxy[property] = value
          Object.create(proxy)[property] = value
          Reflec.set(proxy, property, value, receiver)

  3.  has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
  4.  deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
  5.  ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  6.  getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  7.  defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  8.  preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
  9.  getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
  10. isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
  11. setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
  12. apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
  13. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

### Proxy.revocable()

> Proxy.revocable() 方法可以用来创建一个可撤销的代理对象。
> 返回一个包含了代理对象本身和它的撤销方法的可撤销 Proxy 对象。

    Proxy.revocable(target, handler);

    //返回结构
    {"proxy": proxy, "revoke": revoke}
    proxy:表示新生成的代理对象本身，和用一般方式 new Proxy(target, handler)
      创建的代理对象没什么不同，只是它可以被撤销掉
    revoke:撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那个代理对象


          var revocable = Proxy.revocable({}, {
            get(target, name) {
              return "[[" + name + "]]";
            }
          });
          //也可以使用解构
          // const { proxy, revoke } = revocable
          var proxy = revocable.proxy;
          proxy.foo;              // "[[foo]]"

          revocable.revoke();

          console.log(proxy.foo); // 抛出 TypeError
          proxy.foo = 1           // 还是 TypeError
          delete proxy.foo;       // 又是 TypeError
          typeof proxy            // "object"，因为 typeof 不属于可代理操作

## 总结

1. 代理对象不等于目标对象，他是目标对象的包装品
2. 目标对象可以直接操作，也可以被代理对象直接操作
3. 直接操作会绕开拦截

> 使用捕获器几乎可以改变所有基本方法行为，但也不是没有限制，如果对象有一个不可配置不可写的属性
> 捕获器返回一个与属性不同的值时会抛出错误 TypeError

    const target = {}
    Object.defineProperty(target,'foo',{
      configurable:false,
      wirtable:false,
      value:'bar'
    })

    let handle = {
      get(){
        return 'que'
      }
    }
    let proxy = new Proxy(target,handle)

    proxy.foo //TypeError

> proxy 代理 Date()会无法访问方法，因为 Date 类型方法依赖 this 值上的内部卡槽 [[NumberDate]]
> proxy 对象在调用方法时，方法内部 this 指向 proxy 实例对象，所以 proxy 无法调用 Date 类型方法
