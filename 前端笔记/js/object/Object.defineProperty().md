# Object.defineProperty()

> Object.defineProperty() 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。
> 返回传入的对象

    Object.defineProperty(obj, prop, descriptor)

    obj:要定义属性的对象
    prop:一个字符串或者symbol，指定要定义的或者要修改的属性键
    decriptor:要定义或者修改的属性的描述符

# Object.defineProperties()

> Object.defineProperties() 静态方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

    Object.defineProperties(obj, props)

    obj:定义或修改属性的对象
    props:一个对象，其中每个键表示要定义或修改的属性的名称，每个值是描述该属性的对象。在 props 中的每个值必须是且只能是数据描述符或访问器描述符之一；不能同时为两者（更多详细信息，请参见Object.defineProperty()）。


        const obj = {};
        Object.defineProperties(obj, {
            property1: {
                value: true,
                writable: true,
            },
            property2: {
                value: "Hello",
                writable: false,
            },
            // 等等……
        });

# Object.getOwnPropertyDescriptor()

> Object.getOwnPropertyDescriptor() 静态方法返回一个对象，该对象描述给定对象上特定属性（即直接存在于对象上而不在对象的原型链中的属性）的配置。返回的对象是可变的，但对其进行更改不会影响原始属性的配置。

> 如果指定的属性存在于对象上，则返回其属性描述符，否则返回 undefined。

    Object.getOwnPropertyDescriptor(obj, prop)

    obj:要查找的对象
    prop:要查找的属性的名称

    const object1 = {
        property1: 42
    };

    const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

    console.log(descriptor1.configurable);
    // Expected output: tx

> 在 ES5 中，如果该方法的第一个参数不是对象（而是一个基本类型值），则会导致 TypeError。在 ES2015 中，首先会将非对象的第一个参数强制转换为对象。
