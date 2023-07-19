1. <a href='#私有属性和私有方法的继承'>私有属性和私有方法的继承 </a>
2. <a href='#静态属性和静态方法的继承'>静态属性和静态方法的继承 </a>
3. <a href='#Object.getPrototypeOf()'>Object.getPrototypeOf()</a>
4. <a href='#super关键字'>super 关键字</a>
5. <a href='#类的 prototype 属性和__proto__属性'>类的 prototype 属性和**proto**属性</a>
6. <a href='#原生构造函数的继承'>原生构造函数的继承</a>
7. <a href='#Mixin 模式实现'>Mixin 模式实现</a>

# class 的继承

    class Point { /* ... */ }

    class ColorPoint extends Point {
        constructor(x, y, color) {
            super(x, y); // 调用父类的constructor(x, y)
            this.color = color;
        }

        toString() {
            return this.color + ' ' + super.toString(); // 调用父类的toString()
        }
    }

    //constructor()方法和toString()方法内部，都出现了super关键字。super在这里表示父类的构造函数，用来新建一个父类的实例对象

> ES6 规定，子类必须在 constructor()方法中调用 super()，否则就会报错。这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用 super()方法，子类就得不到自己的 this 对象。

> ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。

> 这就是为什么 ES6 的继承必须先调用 super()方法，因为这一步会生成一个继承父类的 this 对象，没有这一步就无法继承父类这意味着新建子类实例时，父类的构造函数必定会先运行一次。

> 这就是为什么 ES6 的继承必须先调用 super()方法，因为这一步会生成一个继承父类的 this 对象，没有这一步就无法继承父类

> 如果子类没有定义 constructor()方法，这个方法会默认添加，并且里面会调用 super()。也就是说，不管有没有显式定义，任何一个子类都有 constructor()方法

## <a name='私有属性和私有方法的继承'>私有属性和私有方法的继承</a>

> 父类所有的属性和方法，都会被子类继承，除了私有的属性和方法

> 子类无法继承父类的私有属性，或者说，私有属性只能在定义它的 class 里面使用

> 如果父类定义了私有属性的读写方法，子类就可以通过这些方法，读写私有属性。

        class Foo {
            #p = 1;
            getP() {
                return this.#p;
            }
        }

        class Bar extends Foo {
            constructor() {
                super();
                console.log(this.getP()); // 1
            }
        }

## <a name='静态属性和静态方法的继承'>静态属性和静态方法的继承</a>

> 父类的静态属性和静态方法，也会被子类继承。

    class A {
        static hello() {
            console.log('hello world');
        }
    }

    class B extends A {
    }

    B.hello()  // hello world

> 静态属性是通过软拷贝实现继承的

    class A { static foo = 100; }
    class B extends A {
        constructor() {
            super();
            B.foo--;
        }
    }

    const b = new B();
    B.foo // 99
    A.foo // 100

> foo 是 A 类的静态属性，B 类继承了 A 类，因此也继承了这个属性。但是，在 B 类内部操作 B.foo 这个静态属性，影响不到 A.foo，原因就是 B 类继承静态属性时，会采用浅拷贝，拷贝父类静态属性的值，因此 A.foo 和 B.foo 是两个彼此独立的属性。

> 由于这种拷贝是浅拷贝，如果父类的静态属性的值是一个对象，那么子类的静态属性也会指向这个对象，因为浅拷贝只会拷贝对象的内存地址。

    class A {
    static foo = { n: 100 };
    }

    class B extends A {
        constructor() {
            super();
            B.foo.n--;
        }
    }

    const b = new B();
    B.foo.n // 99
    A.foo.n // 99

## <a name="Object.getPrototypeOf()">Object.getPrototypeOf()</a>

> Object.getPrototypeOf()方法可以用来从子类上获取父类。

    class Point { /*...*/ }

    class ColorPoint extends Point { /*...*/ }

    Object.getPrototypeOf(ColorPoint) === Point
    // true

## <a name='super关键字'>super 关键字</a>

> super 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

> 第一种情况，super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super()函数。

        class A {}

        class B extends A {
            constructor() {
                super();
            }
        }

> 调用 super()的作用是形成子类的 this 对象，把父类的实例属性和方法放到这个 this 对象上面。子类在调用 super()之前，是没有 this 对象的，任何对 this 的操作都要放在 super()的后面

> 这里的 super 虽然代表了父类的构造函数，但是因为返回的是子类的 this（即子类的实例对象），所以 super 内部的 this 代表子类的实例，而不是父类的实例，这里的 super()相当于 A.prototype.constructor.call(this)（在子类的 this 上运行父类的构造函数）

        class A {
            constructor() {
                console.log(new.target.name);
            }
        }
        class B extends A {
            constructor() {
                super();
            }
        }
        new A() // A
        new B() // B

> 由于 super()在子类构造方法中执行时，子类的属性和方法还没有绑定到 this，所以如果存在同名属性，此时拿到的是父类的属性

        class A {
            name = 'A';
            constructor() {
                console.log('My name is ' + this.name);
            }
        }

        class B extends A {
            name = 'B';
        }

        const b = new B(); // My name is A

> 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

> 第二种情况，super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类

        class A {
            p() {
                return 2;
            }
        }

        class B extends A {
            constructor() {
                super();
                console.log(super.p()); // 2
            }
        }

        let b = new B();

> 子类 B 当中的 super.p()，就是将 super 当作一个对象使用。这时，super 在普通方法之中，指向 A.prototype，所以 super.p()就相当于 A.prototype.p()。

> 由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的。

        class A {
            constructor() {
                this.p = 2;
            }
        }

        class B extends A {
            get m() {
                return super.p;
            }
        }

        let b = new B();
        b.m // undefined

> 如果属性定义在父类的原型对象上，super 就可以取到。

        class A {}
        A.prototype.x = 2;

        class B extends A {
            constructor() {
                super();
                console.log(super.x) // 2
            }
        }

        let b = new B();

> ES6 规定，在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。

            class A {
                constructor() {
                    this.x = 1;
                }
            }

            class B extends A {
                constructor() {
                    super();
                    this.x = 2;
                    super.x = 3;
                    console.log(super.x); // undefined
                    console.log(this.x); // 3
                }
            }

            let b = new B();

> super.x 赋值为 3，这时等同于对 this.x 赋值为 3。而当读取 super.x 的时候，读的是 A.prototype.x，所以返回 undefined。

> 如果 super 作为对象，用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。

> 在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。

> 使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错

        class A {}

        class B extends A {
        constructor() {
            super();
            console.log(super); // 报错
        }
        }




        class A {}

        class B extends A {
            constructor() {
                super();
                console.log(super.valueOf() instanceof B); // true
            }
        }

        let b = new B();

> super.valueOf()表明 super 是一个对象，因此就不会报错。同时，由于 super 使得 this 指向 B 的实例，所以 super.valueOf()返回的是一个 B 的实例。

## <a name='类的 prototype 属性和__proto__属性'>类的 prototype 属性和**proto**属性</a>

> 每一个对象都有**proto**属性，指向对应的构造函数的 prototype 属性。Class 作为构造函数的语法糖，同时有 prototype 属性和**proto**属性，因此同时存在两条继承链。

> 子类的**proto**属性，表示构造函数的继承，总是指向父类。

> 子类 prototype 属性的**proto**属性，表示方法的继承，总是指向父类的 prototype 属性

        class A {
        }

        class B extends A {
        }

        B.__proto__ === A // true
        B.prototype.__proto__ === A.prototype // true

        //相当于
        // B 的实例继承 A 的实例
        Object.setPrototypeOf(B.prototype, A.prototype);

        // B 继承 A 的静态属性
        Object.setPrototypeOf(B, A);

        const b = new B();

> Object.setPrototypeOf 方法的实现。

        Object.setPrototypeOf = function (obj, proto) {
            obj.__proto__ = proto;
            return obj;
        }


        class B extends A{}

> 只要是一个有 prototype 属性的函数，就能被 B 继承。由于函数都有 prototype 属性（除了 Function.prototype 函数），因此 A 可以是任意函数

    class A {
    }

    A.__proto__ === Function.prototype // true
    A.prototype.__proto__ === Object.prototype // true

> A 作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承 Function.prototype。但是，A 调用后返回一个空对象（即 Object 实例），所以 A.prototype.**proto**指向构造函数（Object）的 prototype 属性。

- 实例的 **proto** 属性

> 子类实例的**proto**属性的**proto**属性，指向父类实例的**proto**属性。也就是说，子类的原型的原型，是父类的原型

## <a name='原生构造函数的继承'>原生构造函数的继承</a>

> 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

1. Boolean()
2. Number()
3. String()
4. Array()
5. Date()
6. Function()
7. RegExp()
8. Error()
9. Object()

> 以前，这些原生构造函数是无法继承的，比如，不能自己定义一个 Array 的子类。

> ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象 this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。下面是一个继承 Array 的例子。

        class VersionedArray extends Array {
            constructor() {
                super();
                this.history = [[]];
            }
            commit() {
                this.history.push(this.slice());
            }
            revert() {
                this.splice(0, this.length, ...this.history[this.history.length - 1]);
            }
        }

            var x = new VersionedArray();

            x.push(1);
            x.push(2);
            x // [1, 2]
            x.history // [[]]

            x.commit();
            x.history // [[], [1, 2]]

            x.push(3);
            x // [1, 2, 3]
            x.history // [[], [1, 2]]

            x.revert();
            x // [1, 2]

> VersionedArray 会通过 commit 方法，将自己的当前状态生成一个版本快照，存入 history 属性。revert 方法用来将数组重置为最新一次保存的版本。除此之外，VersionedArray 依然是一个普通数组，所有原生的数组方法都可以在它上面调用。

    class NewObj extends Object{
        constructor(){
            super(...arguments);
        }
    }

    var o = new NewObj({attr: true});
    o.attr === true  // false

> 继承 Object 的子类，有一个行为差异。

> NewObj 继承了 Object，但是无法通过 super 方法向父类 Object 传参。这是因为 ES6 改变了 Object 构造函数的行为，一旦发现 Object 方法不是通过 new Object()这种形式调用，ES6 规定 Object 构造函数会忽略参数。

## <a name='Mixin 模式实现'>Mixin 模式实现</a>

> Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下

    const a = {
        a: 'a'
    };
    const b = {
        b: 'b'
    };
    const c = {...a, ...b}; // {a: 'a', b: 'b'}
