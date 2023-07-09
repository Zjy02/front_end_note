# Iterator

- Iterator 的作用有三个
- 一是为各种数据结构，提供一个统一的、简便的访问接口；
- 二是使得数据结构的成员能够按某种次序排列；
- 三是 ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。

- Iterator 的遍历过程：

1. 创建一个指正对象，指向当前数据结构的起始位置，遍历器本质就是一个指正对象
2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员
4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置

> 每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。

        var it = makeIterator(['a', 'b']);

        it.next() // { value: "a", done: false }
        it.next() // { value: "b", done: false }
        it.next() // { value: undefined, done: true }

        function makeIterator(array) {
        var nextIndex = 0;
        return {
            next: function() {
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {value: undefined, done: true};
            }
        };
        }

## 默认 Iterator 接口

> Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即 for...of 循环。当使用 for...of 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

> 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

> ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名 Symbol.iterator，它是一个表达式，返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。

            const obj = {
            [Symbol.iterator] : function () {
                return {
                next: function () {
                    return {
                    value: 1,
                    done: true
                    };
                }
                };
            }
            };

> ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被 for...of 循环遍历。原因在于，这些数据结构原生部署了 Symbol.iterator 属性，另外一些数据结构没有（比如对象）。凡是部署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

> 原生具备 Iterator 接口的数据结构如下。

        1. Array
        2. Map
        3. Set
        4. String
        5. TypedArray
        6. 函数的 arguments 对象
        7. NodeList 对象

- 数组的 symbol.iterator 属性

        let arr = ['a', 'b', 'c'];
        let iter = arr[Symbol.iterator]();

        iter.next() // { value: 'a', done: false }
        iter.next() // { value: 'b', done: false }
        iter.next() // { value: 'c', done: false }
        iter.next() // { value: undefined, done: true }

> 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of 循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在 Symbol.iterator 属性上面部署，这样才会被 for...of 循环遍历。

- 为一个对象添加一个 Iterator 接口的例子

            let obj = {
                data:['1','2'],
                [Symbol.iterator](){
                    const self = this
                    let index = 0
                    return {
                        next(){
                            if(index < self.data.lenth){
                                return {
                                    value: self.data[index++],
                                    done: false
                                }
                            }
                            return { value: undefined, done: true };
                        }
                    }
                }
            }

  > 对于类似数组的对象（存在数值键名和 length 属性），部署 Iterator 接口，有一个简便方法，就是 Symbol.iterator 方法直接引用数组的 Iterator 接口。

            NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

              // 或者
              NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

              [...document.querySelectorAll('div')] // 可以执行了

  > NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的 Symbol.iterator 属性，可以看到没有任何影响。

> 下面是另一个类似数组的对象调用数组的 Symbol.iterator 方法的例子。

        let iterable = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
        };
        for (let item of iterable) {
        console.log(item); // 'a', 'b', 'c'
        }

- 注意，普通对象部署数组的 Symbol.iterator 方法，并无效果。

        let iterable = {
        a: 'a',
        b: 'b',
        c: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
        };
        for (let item of iterable) {
        console.log(item); // undefined, undefined, undefined
        }

# 调用 Iterator 接口的场合

## 解构赋值

> 对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法。

## 扩展运算符

> 扩展运算符（...）也会调用默认的 Iterator 接口。
> 实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。

## yield\*

> yield\*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

## 其他场合

> 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

        for...of
        Array.from()
        Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
        Promise.all()
        Promise.race()

# 字符串 Iterator 接口

> 字符串是一个类似数组的对象，也原生具有 Iterator 接口。

        var someString = "hi";

        typeof someString[Symbol.iterator]
        // "function"

        var iterator = someString[Symbol.iterator]();

        iterator.next() // { value: "h", done: false }
        iterator.next() // { value: "i", done: false }
        iterator.next() // { value: undefined, done: true }

> 可以覆盖原生的 Symbol.iterator 方法，达到修改遍历器行为的目的。

        var str = new String("hi");

        [...str] // ["h", "i"]

        str[Symbol.iterator] = function() {
        return {
            next: function() {
            if (this._first) {
                this._first = false;
                return { value: "bye", done: false };
            } else {
                return { done: true };
            }
            },
            _first: true
        };
        };

        [...str] // ["bye"]
        str // "hi"

# Iterator 接口与 Generator 函数

> Symbol.iterator()方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。

        let myIterable = {
        [Symbol.iterator]: function* () {
            yield 1;
            yield 2;
            yield 3;
        }
        };
        [...myIterable] // [1, 2, 3]

        // 或者采用下面的简洁写法

        let obj = {
        * [Symbol.iterator]() {
            yield 'hello';
            yield 'world';
        }
        };

        for (let x of obj) {
        console.log(x);
        }
        // "hello"
        // "world"

# 遍历器对象的 return()，throw()

> 遍历器对象除了具有 next()方法，还可以具有 return()方法和 throw()方法。如果你自己写遍历器对象生成函数，那么 next()方法是必须部署的，return()方法和 throw()方法是否部署是可选的。

> return()方法的使用场合是，如果 for...of 循环提前退出（通常是因为出错，或者有 break 语句），就会调用 return()方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署 return()方法。

        function readLinesSync(file) {
        return {
            [Symbol.iterator]() {
            return {
                next() {
                return { done: false };
                },
                return() {
                file.close();
                return { done: true };
                }
            };
            },
        };
        }

> 上面代码中，函数 readLinesSync 接受一个文件对象作为参数，返回一个遍历器对象，其中除了 next()方法，还部署了 return()方法。下面的两种情况，都会触发执行 return()方法。

        // 情况一
        for (let line of readLinesSync(fileName)) {
        console.log(line);
        break;
        }

        // 情况二
        for (let line of readLinesSync(fileName)) {
        console.log(line);
        throw new Error();
        }

> 上面代码中，情况一输出文件的第一行以后，就会执行 return()方法，关闭这个文件；情况二会在执行 return()方法关闭文件之后，再抛出错误。

> 注意，return()方法必须返回一个对象，这是 Generator 语法决定的。

> throw()方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。请参阅《Generator 函数》一章。

# for...of 循环

> 一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。也就是说，for...of 循环内部调用的是数据结构的 Symbol.iterator 方法。

> for...of 循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如 arguments 对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

## 数组

> 数组原生具备 iterator 接口（即默认部署了 Symbol.iterator 属性），for...of 循环本质上就是调用这个接口产生的遍历器

- for...of 循环可以代替数组实例的 forEach 方法。

        const arr = ['red', 'green', 'blue'];

        arr.forEach(function (element, index) {
        console.log(element); // red green blue
        console.log(index);   // 0 1 2
        });

- JavaScript 原有的 for...in 循环，只能获得对象的键名，不能直接获取键值。ES6 提供 for...of 循环，允许遍历获得键值。

        var arr = ['a', 'b', 'c', 'd'];

        for (let a in arr) {
        console.log(a); // 0 1 2 3
        }

        for (let a of arr) {
        console.log(a); // a b c d
        }

- 上面代码表明，for...in 循环读取键名，for...of 循环读取键值。如果要通过 for...of 循环，获取数组的索引，可以借助数组实例的 entries 方法和 keys 方法。

> for...of 循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟 for...in 循环也不一样。

        let arr = [3, 5, 7];
        arr.foo = 'hello';

        for (let i in arr) {
        console.log(i); // "0", "1", "2", "foo"
        }

        for (let i of arr) {
        console.log(i); //  "3", "5", "7"
        }

> 上面代码中，for...of 循环不会返回数组 arr 的 foo 属性。

## Set 和 Map 结构

> Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用 for...of 循环。

        var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
        for (var e of engines) {
        console.log(e);
        }
        // Gecko
        // Trident
        // Webkit

        var es6 = new Map();
        es6.set("edition", 6);
        es6.set("committee", "TC39");
        es6.set("standard", "ECMA-262");
        for (var [name, value] of es6) {
        console.log(name + ": " + value);
        }
        // edition: 6
        // committee: TC39
        // standard: ECMA-262

> 遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。

        let map = new Map().set('a', 1).set('b', 2);
        for (let pair of map) {
        console.log(pair);
        }
        // ['a', 1]
        // ['b', 2]

        for (let [key, value] of map) {
        console.log(key + ' : ' + value);
        }
        // a : 1
        // b : 2

# 计算生成的数据结构

> 有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。

    entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
    keys() 返回一个遍历器对象，用来遍历所有的键名。
    values() 返回一个遍历器对象，用来遍历所有的键值。

> 这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。

        let arr = ['a', 'b', 'c'];
        for (let pair of arr.entries()) {
        console.log(pair);
        }
        // [0, 'a']
        // [1, 'b']
        // [2, 'c']

## 对象

> 对于普通的对象，for...of 结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in 循环依然可以用来遍历键名。

- 对于遍历一个普通的对象可以采用，object.keys 来遍历对象

        for(let key in object.keys(obj)){
            console.log(key + ':' + obj(key))
        }

- 也可以使用 generator 函数将对象重新包装一下

        const obj = { a: 1, b: 2, c: 3 }

        function* entries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
        }

        for (let [key, value] of entries(obj)) {
        console.log(key, '->', value);
        }
        // a -> 1
        // b -> 2
        // c -> 3

## 类似数组的对象

> 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用 Array.from 方法将其转为数组。

        // 字符串
        let str = "hello";

        for (let s of str) {
        console.log(s); // h e l l o
        }

        // DOM NodeList对象
        let paras = document.querySelectorAll("p");

        for (let p of paras) {
        p.classList.add("test");
        }

        // arguments对象
        function printArgs() {
        for (let x of arguments) {
            console.log(x);
        }
        }
        printArgs('a', 'b');
        // 'a'
        // 'b'

> 对于字符串来说，for...of 循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。
> 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用 Array.from 方法将其转为数组。

## 与其他遍历语法的比较

> JavaScript 提供多种遍历语法。最原始的写法就是 for 循环。
> 数组提供内置的 forEach 方法。这种写法的问题在于，无法中途跳出 forEach 循环，break 命令或 return 命令都不能奏效
> for...in 循环可以遍历数组的键名。

- for...in 循环有几个缺点。

        1. 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
        2. for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
        3. 某些情况下，for...in循环会以任意顺序遍历键名。

- 总之，for...in 循环主要是为遍历对象而设计的，不适用于遍历数组。

- for...of

        1. 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
        2. 不同于forEach方法，它可以与break、continue和return配合使用。
        3. 提供了遍历所有数据结构的统一操作接口。
