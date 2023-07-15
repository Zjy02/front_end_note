# Object.getPrototypeOf()

> Object.getPrototypeOf() 静态方法返回指定对象的原型（即内部 [[Prototype]] 属性的值）。
> Object.getPrototypeOf(obj)

    obj 为要返回原型的对象

> 返回值为要返回原型的对象
> ES5 中，如果 obj 参数不是对象，则会抛出 TypeError 异常。在 ES2015 中，该参数将被强制转换为 Object。
