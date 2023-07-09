# Generator(生成器)

> Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

> 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

> Generator 函数是一个普通函数，但是有两个特征。一是，function 关键字与函数名之间有一个星号；二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。

        function* helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
        }

        var hw = helloWorldGenerator();

    Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

> Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

> 必须调用遍历器对象的 next 方法，使得指针移向下一个状态。也就是说，每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。换言之，Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。

        hw.next()

        // { value: 'hello', done: false }

        hw.next()
        // { value: 'world', done: false }

        hw.next()
        // { value: 'hello', done: false }

        hw.next()
        // { value: 'world', done: false }

        1. 第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。

        2. 第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。

        3. 第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

        4. 第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

> 调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的 next 方法，就会返回一个有着 value 和 done 两个属性的对象。value 属性表示当前的内部状态的值，是 yield 表达式后面那个表达式的值；done 属性是一个布尔值，表示是否遍历结束。

> function 关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

        function * foo(x, y) { ··· }
        function *foo(x, y) { ··· }
        function* foo(x, y) { ··· }
        function*foo(x, y) { ··· }

# yield 表达式

> 由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield 表达式就是暂停标志。

- next 方法运行逻辑：

  1. 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。

  2. 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。

  3. 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值

  4. 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined

- generator 函数不一定需要使用 return 语句。当生成器函数执行到最后时，如果没有遇到 return 语句，它会自动返回一个 StopIteration 异常来标识结束

- 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined

- yield 与 return 语句有相似之处：都能返回跟在紧跟语句之后的表达式的值。区别在于每次遇到 yield，函数暂停执行，下次再次从改位置继续向下执行，而 return 语句不具备位置记忆功能，一个函数内只能执行一次，但是可可以执行多个 yield 表达式

- generator 函数可以不用 yield，这是就变成一个单纯的暂缓执行函数

        function* f() {
        console.log('执行了！')
        }

        var generator = f();

        setTimeout(function () {
        generator.next()
        }, 2000);

        只有调用next()放大才能执行函数

- yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。

        function* demo() {
        console.log('Hello' + yield); // SyntaxError
        console.log('Hello' + yield 123); // SyntaxError

        console.log('Hello' + (yield)); // OK
        console.log('Hello' + (yield 123)); // OK
        }

- yield 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

        function* demo() {
        foo(yield 'a', yield 'b'); // OK
        let input = yield; // OK
        }

# 与 Iterator 接口的关系

> Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 Symbol.iterator 属性，从而使得该对象具有 Iterator 接口

        var myIterable = {};
        myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
        };

        [...myIterable] // [1, 2, 3]

- Generator 函数执行后，返回一个遍历器对象。该对象本身也具有 Symbol.iterator 属性，执行后返回自身。

        function* gen(){
        // some code
        }

        var g = gen();

        g[Symbol.iterator]() === g
        // true

# next 方法参数

> yield 表达式本身没有返回值，或者说总返回一个 undefined，next 方法可以携带一个参数，改参数会被当做上一个 yield 表达式的返回值

        function* f() {
        for(var i = 0; true; i++) {
            var reset = yield i;
            if(reset) { i = -1; }
        }
        }

        var g = f();

        g.next() // { value: 0, done: false }
        g.next() // { value: 1, done: false }
        g.next(true) // { value: 0, done: false }

    上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

> 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过 next 方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

        function* foo(x) {
        var y = 2 * (yield (x + 1));
        var z = yield (y / 3);
        return (x + y + z);
        }

        var a = foo(5);
        a.next() // Object{value:6, done:false}
        a.next() // Object{value:NaN, done:false}
        a.next() // Object{value:NaN, done:true}

        var b = foo(5);
        b.next() // { value:6, done:false }
        b.next(12) // { value:8, done:false }
        b.next(13) // { value:42, done:true }

    上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

    如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

> 由于 next 方法的参数表示上一个 yield 表达式的返回值，所以在第一次使用 next 方法时，传递参数是无效的。V8 引擎直接忽略第一次使用 next 方法时的参数，只有从第二次使用 next 方法开始，参数才是有效的。从语义上讲，第一个 next 方法用来启动遍历器对象，所以不用带有参数。

- 通过 next 方法向 Generator 函数内部传入

        function* dataConsumer() {
        console.log('Started');
        console.log(`1. ${yield}`);
        console.log(`2. ${yield}`);
        return 'result';
        }

        let genObj = dataConsumer();
        genObj.next();
        // Started
        genObj.next('a')
        // 1. a
        genObj.next('b')
        // 2. b

- 第一次调用 next 方法时，就能够输入值

                function wrapper(generatorFunction) {
                return function (...args) {
                let generatorObject = generatorFunction(...args);
                generatorObject.next();
                return generatorObject;
                };
                }

                const wrapped = wrapper(function* () {
                console.log(`First input: ${yield}`);
                return 'DONE';
                });

                wrapped().next('hello!')
                // First input: hello!

        Generator 函数如果不用wrapper先包一层，是无法第一次调用next方法，就输入参数的。

# for ... of 循环

> for...of 循环可以自动遍历 Generator 函数运行时生成的 Iterator 对象，且此时不再需要调用 next 方法。

        function* foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        return 6;
        }

        for (let v of foo()) {
        console.log(v);
        }
        // 1 2 3 4 5

> 上面代码使用 for...of 循环，依次显示 5 个 yield 表达式的值。这里需要注意，一旦 next 方法的返回对象的 done 属性为 true，for...of 循环就会中止，且不包含该返回对象，所以上面代码的 return 语句返回的 6，不包括在 for...of 循环之中

- 利用 Generator 函数和 for...of 循环，实现斐波那契数列

        function* fibonacci() {
        let [prev, curr] = [0, 1];
        for (;;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
        }
        }

        for (let n of fibonacci()) {
        if (n > 1000) break;
        console.log(n);
        }

> 利用 for...of 循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用 for...of 循环，通过 Generator 函数为它加上这个接口，就可以用了。

                function* objectEntries(obj) {
                let propKeys = Reflect.ownKeys(obj);

                for (let propKey of propKeys) {
                yield [propKey, obj[propKey]];
                }
                }

                let jane = { first: 'Jane', last: 'Doe' };

                for (let [key, value] of objectEntries(jane)) {
                console.log(`${key}: ${value}`);
                }
                // first: Jane
                // last: Doe

- 给对象添加 symbol.iterator 属性，实现用 for...of 遍历对象

          function* objectEntries() {
          let propKeys = Object.keys(this);

          for (let propKey of propKeys) {
          yield [propKey, this[propKey]];
          }
          }

          let jane = { first: 'Jane', last: 'Doe' };

          jane[Symbol.iterator] = objectEntries;

          for (let [key, value] of jane) {
          console.log(`${key}: ${value}`);
          }
          // first: Jane
          // last: Doe

  > 除了 for...of 循环以外，扩展运算符（...）、解构赋值和 Array.from 方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

          function* numbers () {
                  yield 1
                  yield 2
                  return 3
                  yield 4
          }

          // 扩展运算符
          [...numbers()] // [1, 2]

          // Array.from 方法
          Array.from(numbers()) // [1, 2]

          // 解构赋值
          let [x, y] = numbers();
          x // 1
          y // 2

          // for...of 循环
          for (let n of numbers()) {
                  console.log(n)
          }
          // 1
          // 2

## Generator.prototype.throw()

> Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获

                var g = function* () {
                 try {
                  yield;
                 } catch (e) {
                  console.log('内部捕获', e);
                 }
                };

                  var i = g();
                  i.next();

                 try {
                  i.throw('a');
                  i.throw('b');
                 } catch (e) {
                  console.log('外部捕获', e);
                 }
                // 内部捕获 a
                // 外部捕获 b

> 遍历器对象 i 连续抛出两个错误。第一个错误被 Generator 函数体内的 catch 语句捕获。i 第二次抛出错误，由于 Generator 函数内部的 catch 语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的 catch 语句捕获。

> throw 方法可以接受一个参数，该参数会被 catch 语句接收，建议抛出 Error 对象的实例。

        var g = function* () {
        try {
        yield;
        } catch (e) {
        console.log(e);
        }
        };

        var i = g();
        i.next();
        i.throw(new Error('出错了！'));
        // Error: 出错了！(…)

- 不要混淆遍历器对象的 throw 方法和全局的 throw 命令。上面代码的错误，是用遍历器对象的 throw 方法抛出的，而不是用 throw 命令抛出的。后者只能被函数体外的 catch 语句捕获。

- 如果 Generator 函数内部和外部，都没有部署 try...catch 代码块，那么程序将报错，直接中断执行。

        var gen = function* gen(){
          yield console.log('hello');
          yield console.log('world');
        }

        var g = gen();
        g.next();
        g.throw();
        // hello
        // Uncaught undefined

        g.throw抛出错误以后，没有任何try...catch代码块可以捕获这个错误，导致程序报错，中断执行。

- throw 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 next 方法。

                  function* gen() {
                  try {
                  yield 1;
                  } catch (e) {
                  console.log('内部捕获');
                  }
                  }

                  var g = gen();
                  g.throw(1);
                  // Uncaught 1

  > g.throw(1)执行时，next 方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。这种行为其实很好理解，因为第一次执行 next 方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时 throw 方法抛错只可能抛出在函数外部。

- throw 方法被内部捕获以后，会附带执行到下一条 yield 表达式，这种情况下等同于执行一次 next 方法。

                var gen = function* gen(){
                try {
                yield 1;
                } catch (e) {
                yield 2;
                }
                yield 3;
                }

                var g = gen();
                g.next() // { value:1, done:false }
                g.throw() // { value:2, done:false }
                g.next() // { value:3, done:false }
                g.next() // { value:undefined, done:true }

- throw 命令与 g.throw 方法是无关的，两者互不影响。

- 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用 next 方法，将返回一个 value 属性等于 undefined、done 属性等于 true 的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束

                function* g() {
                 yield 1;
                 console.log('throwing an exception');
                 throw new Error('generator broke!');
                 yield 2;
                 yield 3;
                }

                function log(generator) {
                 var v;
                 console.log('starting generator');
                try {
                 v = generator.next();
                 console.log('第一次运行next方法', v);
                } catch (err) {
                 console.log('捕捉错误', v);
                }
                try {
                 v = generator.next();
                 console.log('第二次运行next方法', v);
                } catch (err) {
                 console.log('捕捉错误', v);
                }
                try {
                 v = generator.next();
                 console.log('第三次运行next方法', v);
                } catch (err) {
                 console.log('捕捉错误', v);
                }
                 console.log('caller done');
                }

                log(g());
                // starting generator
                // 第一次运行next方法 { value: 1, done: false }
                // throwing an exception
                // 捕捉错误 { value: 1, done: false }
                // 第三次运行next方法 { value: undefined, done: true }

        上面代码一共三次运行next方法，第二次运行的时候会抛出错误，然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了。

## Generator.prototype.return()

> Generator 函数返回的遍历器对象，还有一个 return()方法，可以返回给定的值，并且终结遍历 Generator 函数。

                function* gen() {
                 yield 1;
                 yield 2;
                 yield 3;
                }

                var g = gen();

                g.next()        // { value: 1, done: false }
                g.return('foo') // { value: "foo", done: true }

g.next() // { value: undefined, done: true }

- 如果 return()方法调用时，不提供参数，则返回值的 value 属性为 undefined。

> 如果 Generator 函数内部有 try...finally 代码块，且正在执行 try 代码块，那么 return()方法会导致立刻进入 finally 代码块，执行完以后，整个函数才会结束。

                function* numbers () {
                yield 1;
                try {
                yield 2;
                yield 3;
                } finally {
                yield 4;
                yield 5;
                }
                yield 6;
                }
                var g = numbers();
                g.next() // { value: 1, done: false }
                g.next() // { value: 2, done: false }
                g.return(7) // { value: 4, done: false }
                g.next() // { value: 5, done: false }
                g.next() // { value: 7, done: true }

## next()、throw()、return() 的共同点

> 它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。

1. next()是将 yield 表达式替换成一个值。

2. throw()是将 yield 表达式替换成一个 throw 语句。

3. return()是将 yield 表达式替换成一个 return 语句。

# yield\* 表达式

> 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历

        function* foo() {
        yield 'a';
        yield 'b';
        }

        function* bar() {
        yield 'x';
        // 手动遍历 foo()
        for (let i of foo()) {
        console.log(i);
        }
        yield 'y';
        }

        for (let v of bar()){
        console.log(v);
        }
        // x
        // a
        // b
        // y

        foo和bar都是 Generator 函数，在bar里面调用foo，就需要手动遍历foo。如果有多个 Generator 函数嵌套，写起来就非常麻烦

> ES6 提供了 yield\*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数

                function* bar() {
                  yield 'x';
                  yield* foo();
                  yield 'y';
                }

                // 等同于
                function* bar() {
                  yield 'x';
                  yield 'a';
                  yield 'b';
                  yield 'y';
                }

                // 等同于
                function* bar() {
                  yield 'x';
                for (let v of foo()) {
                  yield v;
                }
                  yield 'y';
                }

                for (let v of bar()){
                  console.log(v);
                }
                // "x"
                // "a"
                // "b"
                // "y"

        function* inner() {
          yield 'hello!';
        }

        function* outer1() {
          yield 'open';
          yield inner();
          yield 'close';
        }

        var gen = outer1()
        gen.next().value // "open"
        gen.next().value // 返回一个遍历器对象
        gen.next().value // "close"

        function* outer2() {
          yield 'open'
          yield* inner()
          yield 'close'
        }

        var gen = outer2()
        gen.next().value // "open"
        gen.next().value // "hello!"
        gen.next().value // "close"

        outer2使用了yield*，outer1没使用。结果就是，outer1返回一个遍历器对象，outer2返回该遍历器对象的内部值

> 从语法角度看，如果 yield 表达式后面跟的是一个遍历器对象，需要在 yield 表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为 yield\*表达式。

> yield\*后面的 Generator 函数（没有 return 语句时），等同于在 Generator 函数内部，部署一个 for...of 循环

> yield*后面的 Generator 函数（没有 return 语句时），不过是 for...of 的一种简写形式，完全可以用后者替代前者。反之，在有 return 语句时，则需要用 var value = yield* iterator 的形式获取 return 语句的值

> 任何数据结构只要有 Iterator 接口，就可以被 yield\*遍历
> yield 表达式返回整个字符串，yield*语句返回单个字符。因为字符串具有 Iterator 接口，所以被 yield*遍历。

        function* genFuncWithReturn() {
        yield 'a';
        yield 'b';
        return 'The result';
        }
        function* logReturned(genObj) {
        let result = yield* genObj;
        console.log(result);
        }

        [...logReturned(genFuncWithReturn())]

        上面代码中，存在两次遍历。第一次是扩展运算符遍历函数logReturned返回的遍历器对象，第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象。这两次遍历的效果是叠加的，最终表现为扩展运算符遍历函数genFuncWithReturn返回的遍历器对象。所以，最后的数据表达式得到的值等于[ 'a', 'b' ]。但是，函数genFuncWithReturn的return语句的返回值The result，会返回给函数logReturned内部的result变量，因此会有终端输出

> yield\*命令可以很方便地取出嵌套数组的所有成员

        function* iterTree(tree) {
         if (Array.isArray(tree)) {
          for(let i=0; i < tree.length; i++) {
           yield* iterTree(tree[i]);
          }
         } else {
          yield tree;
         }
        }

        const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

        for(let x of iterTree(tree)) {
         console.log(x);
        }
        // a
        // b
        // c
        // d
        // e

> 由于扩展运算符...默认调用 Iterator 接口，所以上面这个函数也可以用于嵌套数组的平

        [...iterTree(tree)] // ["a", "b", "c", "d", "e"]

- yield\*遍历二叉树

        // 下面是二叉树的构造函数，
        // 三个参数分别是左树、当前节点和右树
        function Tree(left, label, right) {
        this.left = left;
        this.label = label;
        this.right = right;
        }

        // 下面是中序（inorder）遍历函数。
        // 由于返回的是一个遍历器，所以要用generator函数。
        // 函数体内采用递归算法，所以左树和右树要用yield*遍历
        function* inorder(t) {
        if (t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
        }
        }

        // 下面生成二叉树
        function make(array) {
        // 判断是否为叶节点
        if (array.length == 1) return new Tree(null, array[0], null);
        return new Tree(make(array[0]), array[1], make(array[2]));
        }
        let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

        // 遍历二叉树
        var result = [];
        for (let node of inorder(tree)) {
        result.push(node);
        }

        result
        // ['a', 'b', 'c', 'd', 'e', 'f', 'g']

## 作为对象属性的 Generator 函数

> 如果一个对象的属性是 Generator 函数，可以简写成下面的形式

        let obj = {
        * myGeneratorMethod() {
        ···
        }
        };

        //完整形式
        let obj = {
        myGeneratorMethod: function* () {
        // ···
        }
        };

## Generator 函数的 this

> Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的 prototype 对象上的方法

        function* g() {}

        g.prototype.hello = function () {
        return 'hi!';
        };

        let obj = g();

        obj instanceof g // true
        obj.hello() // 'hi!'

> Generator 函数 g 返回的遍历器 obj，是 g 的实例，而且继承了 g.prototype。但是，如果把 g 当作普通的构造函数，并不会生效，因为 g 返回的总是遍历器对象，而不是 this 对象

        function* g() {
        this.a = 11;
        }

        let obj = g();
        obj.next();
        obj.a // undefined

- Generator 函数也不能跟 new 命令一起用，会报错。

- 让 Generator 函数返回一个正常的对象实例，既可以用 next 方法，又可以获得正常的 this

        //让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this

                function* F() {
                  this.a = 1;
                  yield this.b = 2;
                  yield this.c = 3;
                }
                var obj = {};
                var f = F.call(obj);

                f.next();  // Object {value: 2, done: false}
                f.next();  // Object {value: 3, done: false}
                f.next();  // Object {value: undefined, done: true}

                obj.a // 1
                obj.b // 2
                obj.c // 3

- 另一个方法是将 obj 换成 F.prototype

        function* F() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
        }
        var f = F.call(F.prototype);

        f.next();  // Object {value: 2, done: false}
        f.next();  // Object {value: 3, done: false}
        f.next();  // Object {value: undefined, done: true}

        f.a // 1
        f.b // 2
        f.c // 3

        再将F改成构造函数，就可以对它执行new命令了。

        function* gen() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
        }

        function F() {
        return gen.call(gen.prototype);
        }

        var f = new F();

        f.next();  // Object {value: 2, done: false}
        f.next();  // Object {value: 3, done: false}
        f.next();  // Object {value: undefined, done: true}

        f.a // 1
        f.b // 2
        f.c // 3

# Generator 与状态机

> Generator 是实现状态机的最佳结构

# Generator 应用

1. 异步操作的同步化表达

- Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达

                  function* main() {
                  var result = yield request("http://some.url");
                  var resp = JSON.parse(result);
                  console.log(resp.value);
                  }

                  function request(url) {
                  makeAjaxCall(url, function(response){
                  it.next(response);
                  });
                  }

                  var it = main();
                  it.next();

2. 部署 Iterator 接口

   > 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。

3. 作为数据结构
   > Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
