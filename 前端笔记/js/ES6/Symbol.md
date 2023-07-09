# Symbol

> 为了解决对象的属性名造成冲突，ES6 引进了 Symbol 原始数据结构
> symbol 值有 Symbol()函数生成，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型
> 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

        let s = Symbol();

        typeof s
        // "symbol"

- 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。这是因为生成的 Symbol 是一个原始类型的值，不是对象，所以不能使用 new 命令来调用
- 由于 Symbol 值不是对象，所以也不能添加属性。基本上，它是一种类似于字符串的数据类型。

> Symbol()函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述,这主要是为了在控制台显示，或者转为字符串时，比较容易区分。

        let s1 = Symbol('foo');
        let s2 = Symbol('bar');

        s1 // Symbol(foo)
        s2 // Symbol(bar)

        s1.toString() // "Symbol(foo)"
        s2.toString() // "Symbol(bar)"

- 如果 Symbol 的参数是一个对象，就会调用该对象的 toString()方法，将其转为字符串，然后才生成一个 Symbol 值

        const obj = {
        toString() {
            return 'abc';
        }
        };
        const sym = Symbol(obj);
        sym // Symbol(abc)

- Symbol()函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的。

- Symbol 值不能与其他类型的值进行运算，会报错

- 但是，Symbol 值可以显式转为字符串。

        let sym = Symbol('My symbol');

        String(sym) // 'Symbol(My symbol)'
        sym.toString() // 'Symbol(My symbol)'

- Symbol 值也可以转为布尔值，但是不能转为数值。

## Symbol.prototype.description

> Symbol.prototype.description 可以返回 symbol 值的描述

        const sym = Symbol('foo');

        sym.description // "foo"

## 作为属性名的 Symbol

> 由于每一个 Symbol 值都是不相等的，这意味着只要 Symbol 值作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

        let mySymbol = Symbol();

        // 第一种写法
        let a = {};
        a[mySymbol] = 'Hello!';

        // 第二种写法
        let a = {
        [mySymbol]: 'Hello!'
        };

        // 第三种写法
        let a = {};
        Object.defineProperty(a, mySymbol, { value: 'Hello!' });

        // 以上写法都得到同样结果
        a[mySymbol] // "Hello!"

- Symbol 值作为对象属性名时，不能用点运算符。

                const mySymbol = Symbol();
                const a = {};

                a.mySymbol = 'Hello!';
                a[mySymbol] // undefined
                a['mySymbol'] // "Hello!"

        因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。

- 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中

        let s = Symbol();

        let obj = {
        [s]: function (arg) { ... }
        };

        obj[s](123);

        //等价
        let obj = {
          [s](arg) { ... }
        };.0

- 如果 s 不放在方括号中，该属性的键名就是字符串 s，而不是 s 所代表的那个 Symbol 值。

- Symbol 值作为属性名时，该属性还是公开属性，不是私有属性

### 魔术字符串

> 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替

        function getArea(shape, options) {
        let area = 0;

        switch (shape) {
        case 'Triangle': // 魔术字符串
        area = .5 * options.width * options.height;
        break;
        /* ... more code ... */
        }

        return area;
        }

        getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串

        //修改之后

        const shapeType = {
        triangle: 'Triangle'
        };

        function getArea(shape, options) {
          let area = 0;
          switch (shape) {
           case shapeType.triangle:
           area = .5 * options.width * options.height;
           break;
        }
        return area;
        }

        getArea(shapeType.triangle, { width: 100, height: 100 });

## 属性名的遍历

> Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回

> 但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名.该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

                const obj = {};
                let a = Symbol('a');
                let b = Symbol('b');

                obj[a] = 'Hello';
                obj[b] = 'World';

                const objectSymbols = Object.getOwnPropertySymbols(obj);

                objectSymbols
                // [Symbol(a), Symbol(b)]

> 另一个新的 API，Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

                let obj = {
                [Symbol('my_key')]: 1,
                enum: 2,
                nonEnum: 3
                };

                Reflect.ownKeys(obj)
                //  ["enum", "nonEnum", Symbol(my_key)]

- 由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法

## Symbol.for()，Symbol.keyFor()

### Symbol.for()

> 我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局

        let s1 = Symbol.for('foo');
        let s2 = Symbol.for('foo');

        s1 === s2 // true

### symbol() 与 symbol.for()区别

> Symbol.for()与 Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值

### Symbol.keyFor()

> Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key

                let s1 = Symbol.for("foo");
                Symbol.keyFor(s1) // "foo"

                let s2 = Symbol("foo");
                Symbol.keyFor(s2) // undefined

- Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。

                function foo() {
                return Symbol.for('bar');
                }

                const x = foo();
                const y = Symbol.for('bar');
                console.log(x === y); // true

                上面代码中，Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值

- Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

        iframe = document.createElement('iframe');
        iframe.src = String(window.location);
        document.body.appendChild(iframe);

        iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')

        上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。

## 模块的 Singleton 模式

> Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例

## 内置的 Symbol 值 § ⇧

> 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

### Symbol.hasInstance

> 对象的 Symbol.hasInstance 属性，指向一个内部方法。当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo 在语言内部，实际调用的是 Foo[Symbol.hasInstance](foo)

1.            class MyClass {
         [Symbol.hasInstance](foo) {
           return foo instanceof Array;
          }
        }

        [1, 2, 3] instanceof new MyClass() // true

2.            class Even {
        static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
        }
        }

        // 等同于
        const Even = {
        [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
        }
        };

        1 instanceof Even // false
        2 instanceof Even // true
        12345 instanceof Even // false

### Symbol.isConcatSpreadable

> 对象的 Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开

### Symbol.species

> 对象的 Symbol.species 属性，指向一个构造函数。创建衍生对象时，会使用该属性

### Symbol.match

> 对象的 Symbol.match 属性，指向一个函数。当执行 str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。

### Symbol.replace

> 对象的 Symbol.replace 属性，指向一个方法，当该对象被 String.prototype.replace 方法调用时，会返回该方法的返回值

### Symbol.search

> 对象的 Symbol.search 属性，指向一个方法，当该对象被 String.prototype.search 方法调用时，会返回该方法的返回值

### Symbol.split

### Symbol.iterator

### Symbol.toPrimitive

### Symbol.toStringTag

### Symbol.unscopables
