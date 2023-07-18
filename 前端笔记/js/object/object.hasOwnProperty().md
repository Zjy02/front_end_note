# Object.prototype.hasOwnProperty()

> hasOwnProperty() 方法返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性。

    hasOwnProperty(prop)

    prop: 要测试的属性的字符串名称或者 Symbol。

> 如果指定的属性是对象的直接属性——即使值为 null 或者 undefined，hasOwnProperty() 方法也会返回 true。如果属性是继承的，或者根本没有声明该属性，则该方法返回 false。与 in 运算符不同的是，该方法不会在对象原型链中检查指定的属性。

> 该方法可以在大多数 JavaScript 对象中使用，因为大多数对象都是从 Object 派生而来，因此会继承该方法。例如 Array 是一个 Object，所以你可以使用 hasOwnProperty () 方法来检查索引是否存在

        const fruits = ["Apple", "Banana", "Watermelon", "Orange"];
        fruits.hasOwnProperty(3); // 返回 true ('Orange')
        fruits.hasOwnProperty(4); // 返回 false——未定义
