1. <a href='#class'>class</a>
2. <a href="#constructor()">constructor()</a>
3. <a href='#类的实例'>类的实例</a>
4. <a href='#实例属性的新写法'>实例属性的新写法</a>
5. <a href='#取值函数和存值函数'>取值函数和存值函数</a>
6. <a href='#属性表达式'>属性表达式</a>

# <a name='class'></a>

> JavaScript 语言中，生成实例对象的传统方法是通过构造函数

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.prototype.toString = function () {
        return '(' + this.x + ', ' + this.y + ')';
    };

    var p = new Point(1, 2);

> ES6 的 class 可以看做一个语法糖，他的绝大部分功能，ES5 都能做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }

> constrcutor()为构造方法，this 关键字代表实例对象

> 类的数据结构就是函数，类本身就就指向构造函数

> 构造函数的 prototype 属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面。

    class point {
        constructor(){

        }
        add(){

        }
    }

        //等价于

        point.prototype = {
            constructor(){}
            add(){}
        }

> constructor() add() 其实都定义在 point.prototype 上面

> prototype 对象的 constructor 属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

    Point.prototype.constructor === Point // true

> 类的内部所定义的方法，都是不可枚举的

            class Point {
        constructor(x, y) {
            // ...
        }

        toString() {
            // ...
        }
        }

        Object.keys(Point.prototype)
        // []
        Object.getOwnPropertyNames(Point.prototype)
        // ["constructor","toString"]

> 在 ES5 中 toString()是可枚举的

    var Point = function (x, y) {
    // ...
    };

    Point.prototype.toString = function () {
    // ...
    };

    Object.keys(Point.prototype)
    // ["toString"]
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]

## <a name="constructor()">constructor()方法</a>

> constructor()方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法

> 一个类必须有 constructor()方法，如果没有显式定义，一个空的 constructor()方法会被默认添加。

> constructor()方法默认返回实例对象（即 this），完全可以指定返回另外一个对象

> 类必须使用 new 调用，否则会报错

## <a name='类的实例'>类的实例</a>

> 生成类的实例的写法，与 ES5 完全一样，也是使用 new 命令。前面说过，如果忘记加上 new，像函数那样调用 Class()，将会报错

> 类的属性和方法，除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）。

> 与 ES5 一样，类的所有实例共享一个原型对象,这也意味着可以通过实例的**proto**给类添加方法

## <a name='实例属性的新写法'>实例属性的新写法</a>

> ES2022 为类的实例属性，又规定了一种新写法。实例属性现在除了可以定义在 constructor()方法里面的 this 上面，也可以定义在类内部的最顶层

    class IncreasingCounter {
        _count = 0;
        get value() {
            console.log('Getting the current value!');
            return this._count;
        }
        increment() {
            this._count++;
        }
    }

> 上面代码中，实例属性\_count 与取值函数 value()和 increment()方法，处于同一个层级。这时，不需要在实例属性前面加上 this。

> 写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面。

## <a name="取值函数和存值函数">取值函数和存值函数</a>

> 与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

    class MyClass {
        constructor() {
            // ...
        }
        get prop() {
            return 'getter';
        }
        set prop(value) {
            console.log('setter: '+value);
        }
    }

    let inst = new MyClass();

    inst.prop = 123;
    // setter: 123

    inst.prop

    // 'getter'

> 上面代码中，prop 属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了

> 存值函数和取值函数是设置在属性的 Descriptor 对象上的。

    var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "prop"
    );

    "get" in descriptor  // true
    "set" in descriptor

> 存值函数和取值函数是定义在 html 属性的描述对象上面，这与 ES5 完全一致

## <a name='属性表达式'>属性表达式</a>
