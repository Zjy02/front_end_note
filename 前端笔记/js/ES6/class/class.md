1. <a href='#class'>class</a>
2. <a href="#constructor()">constructor()</a>
3. <a href='#类的实例'>类的实例</a>
4. <a href='#实例属性的新写法'>实例属性的新写法</a>
5. <a href='#取值函数和存值函数'>取值函数和存值函数</a>
6. <a href='#属性表达式'>属性表达式</a>
7. <a href='#class表达式'>class 表达式</a>
8. <a href='#静态方法'>class 静态方法</a>
9. <a href='#静态属性'>class 静态属性</a>
10. <a href='#私有方法和私有属性'>私有方法和私有属性</a>
11. <a href='#in 运算符'>in 运算符</a>
12. <a href='#静态块'>静态块</a>
13. <a href='#类的注意点'>类的注意点</a>
14. <a href='#new.target 属性'>new.target 属性</a>

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

> 类的属性名，可以采用表达式。

    let methodName = 'getArea';

    class Square {
    constructor(length) {
        // ...
    }

        [methodName]() {
            // ...
        }
    }

## <a name='class表达式'>class 表达式</a>

> 与函数一样，类也可以使用表达式的形式定义。

    const MyClass = class Me {
        getClassName() {
            return Me.name;
        }
    };

    上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。

    let inst = new MyClass();
    inst.getClassName() // Me
    Me.name // ReferenceError: Me is not defined

     Me只有在class内部有定义
    如果内部没有用上，可以省略Me

    const MyClass = class { /* ... */ };

> 采用 Class 表达式，可以写出立即执行的 Class。

    let person = new class {
        constructor(name) {
            this.name = name;
        }

        sayName() {
            console.log(this.name);
        }
    }('张三');

    person.sayName(); // "张三"

## <a name='静态方法'>静态方法</a>

> 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

        class Foo {
            static classMethod() {
                return 'hello';
            }
        }

        Foo.classMethod() // 'hello'

        var foo = new Foo();
        foo.classMethod()
        // TypeError: foo.classMethod is not a function

> 如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。

    class Foo {
        static bar() {
            this.baz();
        }
            static baz() {
            console.log('hello');
        }
        baz() {
            console.log('world');
        }
    }

Foo.bar() // hello

> 静态方法可以与非静态方法重名

> 父类的静态方法，可以被子类继承

    class Foo {
        static classMethod() {
            return 'hello';
        }
    }

    class Bar extends Foo {
    }

    Bar.classMethod() // 'hello'

> 静态方法也是可以从 super 对象上调用的。

        class Foo {
            static classMethod() {
                return 'hello';
            }
        }

        class Bar extends Foo {
            static classMethod() {
                return super.classMethod() + ', too';
            }
        }

        Bar.classMethod() // "hello, too"

## <a name='静态属性'>静态属性</a>

> 静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性

    class Foo {
    }

    Foo.prop = 1;
    Foo.prop // 1

> 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上 static 关键字

        class MyClass {
            static myStaticProp = 42;

            constructor() {
                console.log(MyClass.myStaticProp); // 42
            }
        }

## <a name='私有方法和私有属性'></a>

> ES2022 正式为 class 添加了私有属性，方法是在属性名之前使用#表示

        class IncreasingCounter {
            #count = 0;
            get value() {
                console.log('Getting the current value!');
                return this.#count;
            }
            increment() {
                this.#count++;
            }
        }

        //#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。

        const counter = new IncreasingCounter();
        counter.#count // 报错
        counter.#count = 42 // 报错

> 另外，不管在类的内部或外部，读取一个不存在的私有属性，也都会报错。这跟公开属性的行为完全不同，如果读取一个不存在的公开属性，不会报错，只会返回 undefined。

> 私有属性的属性名必须包括#，如果不带#，会被当作另一个属性。

> 这种写法不仅可以写私有属性，还可以用来写私有方法。

        class Foo {
          #a;
          #b;
          constructor(a, b) {
            this.#a = a;
            this.#b = b;
          }
          #sum() {
            return this.#a + this.#b;
          }
          printSum() {
             console.log(this.#sum());
          }
        }

> 私有属性也可以设置 getter 和 setter 方法。

        class Counter {
        #xValue = 0;

        constructor() {
            console.log(this.#x);
        }

        get #x() { return this.#xValue; }
            set #x(value) {
                this.#xValue = value;
            }
        }

> 私有属性不限于从 this 引用，只要是在类的内部，实例也可以引用私有属性

    class Foo {
        #privateValue = 42;
        static getPrivateValue(foo) {
            return foo.#privateValue;
        }
    }

Foo.getPrivateValue(new Foo()); // 42

> 私有属性和私有方法前面，也可以加上 static 关键字，表示这是一个静态的私有属性或私有方法

        class FakeMath {
          static PI = 22 / 7;
          static #totallyRandomNumber = 4;

            static #computeRandomNumber() {
                return FakeMath.#totallyRandomNumber;
            }

            static random() {
              console.log('I heard you like random numbers…')
              return FakeMath.#computeRandomNumber();
           }
        }

        FakeMath.PI // 3.142857142857143
        FakeMath.random()
        // I heard you like random numbers…
        // 4
        FakeMath.#totallyRandomNumber // 报错
        FakeMath.#computeRandomNumber() // 报错

    #totallyRandomNumber是私有属性，#computeRandomNumber()是私有方法，只能在FakeMath这个类的内部调用，外部调用就会报错。

## <a name='in运算符'>in 运算符</a>

> 前面说过，直接访问某个类不存在的私有属性会报错，但是访问不存在的公开属性不会报错。这个特性可以用来判断，某个对象是否为类的实例。

    class C {
    #brand;

    static isC(obj) {
        try {
        obj.#brand;
        return true;
        } catch {
        return false;
        }
    }
    }
    //在类的内部，实例可以访问私有属性
    //所以当obj.#brand 报错说明 obj不是C的实例，catch捕获后返回false

> try...catch 结构可以用来判断某个私有属性是否存在。但是，这样的写法很麻烦，代码可读性很差，ES2022 改进了 in 运算符，使它也可以用来判断私有属性。

        class C {
        #brand;

        static isC(obj) {
            if (#brand in obj) {
              // 私有属性 #brand 存在
              return true;
            } else {
              // 私有属性 #foo 不存在
              return false;
            }
         }
        }
    in运算符判断某个对象是否有私有属性#brand。它不会报错，而是返回一个布尔值。

> 这种用法的 in，也可以跟 this 一起配合使用。

    class A {
     #foo = 0;
     m() {
        console.log(#foo in this); // true
     }
    }

> 判断私有属性时，in 只能用在类的内部。另外，判断所针对的私有属性，一定要先声明，否则会报错。

> 子类从父类继承的私有属性，也可以使用 in 运算符来判断。

> in 运算符对于 Object.create()、Object.setPrototypeOf 形成的继承，是无效的，因为这种继承不会传递私有属性

## <a name='静态块'>静态块</a>

> ES2022 引入了静态块（static block），允许在类的内部设置一个代码块，在类生成时运行且只运行一次，主要作用是对静态属性进行初始化。以后，新建类的实例时，这个块就不运行了。

        class C {
        static x = ...;
        static y;
        static z;

        static {
            try {
            const obj = doSomethingWith(this.x);
            this.y = obj.y;
            this.z = obj.z;
          }
            catch {
            this.y = ...;
            this.z = ...;
            }
          }
        }

> 静态块内部可以使用类名或 this，指代当前类。

> 除了静态属性的初始化，静态块还有一个作用，就是将私有属性与类的外部代码分享

        let getX;

        export class C {
            #x = 1;
            static {
                getX = obj => obj.#x;
            }
        }

        console.log(getX(new C())); // 1

## <a name='类的注意点'>类的注意点</a>

- 严格模式

> 在类和模块的内部，默认都是严格模式
> 考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

> 类不存在变量提升,这一点与 ES5 完全不同

        {
            let Foo = class {};
                class Bar extends Foo {
            }
        }

上面的代码不会报错，因为 Bar 继承 Foo 的时候，Foo 已经有定义了。但是，如果存在 class 的提升，上面代码就会报错，因为 class 会被提升到代码头部，而定义 Foo 的那一行没有提升，导致 Bar 继承 Foo 的时候，Foo 还没有定义。

- name 属性

> 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 Class 继承，包括 name 属性。

    class Point {}
    Point.name // "Point"

> name 属性总是返回紧跟在 class 关键字后面的类名

- Generator 方法

> 如果某个方法之前加上星号（\*），就表示该方法是一个 Generator 函数。

        class Foo {
    constructor(...args) {
        this.args = args;
    }
    * [Symbol.iterator]() {
        for (let arg of this.args) {
        yield arg;
        }
      }
    }

    for (let x of new Foo('hello', 'world')) {
        console.log(x);
    }
    // hello
    // world

- this 指向

      class Logger {
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }

        print(text) {
            console.log(text);
        }
      }

      const logger = new Logger();
      const { printName } = logger;
      printName(); // TypeError: Cannot read property 'print' of undefined

  > 类的方法内部如果含有 this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。因为函数单独执行，this 默认绑定(也就是 指向运行时的环境，由于 class 内部是严格模式，所以 this 实际指向的是 undefined)

> 在构造方法中绑定 this，这样就不会找不到 print 方法了

        class Logger {
            constructor() {
                this.printName = this.printName.bind(this);
            }

        // ...
        }
    //或者使用箭头函数

    class Obj {
        constructor() {
            this.getThis = () => this;
        }
    }

    const myObj = new Obj();
    myObj.getThis() === myObj // true

> 箭头函数内部的 this 总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以 this 会总是指向实例对象。

> 也可以使用 proxy

## <a name='new.target 属性'>new.target 属性</a>

> new 是从构造函数生成实例对象的命令。ES6 为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数。如果构造函数不是通过 new 命令或 Reflect.construct()调用的，new.target 会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的。

        function Person(name) {
            if (new.target !== undefined) {
                this.name = name;
            } else {
                throw new Error('必须使用 new 命令生成实例');
            }
        }

        // 另一种写法
        function Person(name) {
            if (new.target === Person) {
                this.name = name;
            } else {
                throw new Error('必须使用 new 命令生成实例');
            }
        }

        var person = new Person('张三'); // 正确
        var notAPerson = Person.call(person, '张三');  // 报错

> class 内部调用 new.target,返回当前的 class

> 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

            class Shape {
                constructor() {
                    if (new.target === Shape) {
                    throw new Error('本类不能实例化');
                    }
                }
            }

            class Rectangle extends Shape {
                constructor(length, width) {
                    super();
                    // ...
                }
            }

            var x = new Shape();  // 报错
            var y = new Rectangle(3, 4);  // 正确
        //在函数外部，使用new.target会报错。

> 在函数外部，使用 new.target 会报错。
