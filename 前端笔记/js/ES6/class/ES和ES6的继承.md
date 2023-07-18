# ES5 和 ES6 中的继承

> ES5 继承

<img src='../../../image/ES5 extends.png'>

    function Super() {}

    function Sub() {}
    Sub.prototype = new Super()
    Sub.prototype.constructor = Sub

    var sub = new Sub()

    Sub.prototype.constructor === Sub // ② true
    sub.constructor === Sub // ④ true
    sub.__proto__ === Sub.prototype // ⑤ true
    Sub.prototype.__proto__ == Super.prototype // ⑦ true

> 实质上就是将子类的原型设置为父类的实例。

> ES6

<img src='../../../image/ES6 extends.png'>

    class Super {}

    class Sub extends Super {}

    var sub = new Sub()

    Sub.prototype.constructor === Sub // ② true
    sub.constructor === Sub // ④ true
    sub.__proto__ === Sub.prototype // ⑤ true
    Sub.__proto__ === Super // ⑥ true
    Sub.prototype.__proto__ === Super.prototype // ⑦ true

> ES6 和 ES5 的继承是一模一样的，只是多了 class 和 extends ，ES6 的子类和父类，子类原型和父类原型，通过**proto** 连接

> 参考[ES5 和 ES6 中的继承](https://keenwon.com/1524/)
