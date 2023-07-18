# Object.getOwnPropertyNames()

> 静态方法返回一个数组，其包含给定对象中所有自有属性（包括不可枚举属性，但不包括使用 symbol 值作为名称的属性）。

    Object.getOwnPropertyNames(obj)

> 在 ES5 中，如果该方法的参数不是一个对象（而是基本类型值），则会导致 TypeError。在 ES2015 中，非对象参数会被强制转换为对象
