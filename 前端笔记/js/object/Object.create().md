# Object.create

> 以现有的对象作为原型，创建一个新的对象
> Object.create(proto,propertiesObject)
> proto 为新对象的原型对象
> propertiesObject 可选
> 第二个参数将键映射到属性描述符，这意味着你还可以控制每个属性的可枚举性、可配置性等
> 对象初始化语法是 Object.create() 的一种语法糖

    如果该参数被指定且不为 undefined，则该传入对象可枚举的自有属性将为新创建的对象添加具有对应属性名称的属性描述符。这些属性对应于 Object.defineProperties() 的第二个参数。

> 返回值为指定的原型对象和属性创建的新对象

示例:
// Shape——父类
function Shape() {
this.x = 0;
this.y = 0;
}

    // 父类方法
    Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
    };

    // Rectangle——子类
    function Rectangle() {
    Shape.call(this); // 调用父类构造函数。
    }

    // 子类继承父类
    Rectangle.prototype = Object.create(Shape.prototype, {
    // 如果不将 Rectangle.prototype.constructor 设置为 Rectangle，
    // 它将采用 Shape（父类）的 prototype.constructor。
    // 为避免这种情况，我们将 prototype.constructor 设置为 Rectangle（子类）。
    constructor: {
        value: Rectangle,
        enumerable: false,
        writable: true,
        configurable: true,
    },
    });

    const rect = new Rectangle();

    console.log("rect 是 Rectangle 类的实例吗？", rect instanceof Rectangle); // true
    console.log("rect 是 Shape 类的实例吗？", rect instanceof Shape); // true
    rect.move(1, 1); // 打印 'Shape moved.'

> 需要注意的是，使用 create() 也有一些要注意的地方，比如重新添加 constructor 属性以确保正确的语义。虽然 Object.create() 被认为比使用 Object.setPrototypeOf() 修改原型更具有性能优势，但如果没有创建实例并且属性访问还没有被优化，它们之间的差异实际上是可以忽略不计的
