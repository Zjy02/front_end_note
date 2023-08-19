## function 内置属性

> name

    function a (){
      
    }

    console.log(a.name)  //a

    let use = {
      function a(){},
      function b(){}
    }

    console.log(use.a.name) // a

> 如果是匿名函数。则返回空字符串

> length 它返回函数入参的个数

    function f1(a) {}
    function f2(a, b) {}
    function many(a, b, ...more) {}

    alert(f1.length); // 1
    alert(f2.length); // 2
    alert(many.length); // 2

> 自定义属性

    function sayHi() {
    alert("Hi");

      // 计算调用次数
      sayHi.counter++;
    }
    sayHi.counter = 0; // 初始值

    sayHi(); // Hi
    sayHi(); // Hi

    alert( `Called ${sayHi.counter} times` ); // Called 2 times

- 注意

  > 被赋值给函数的属性，比如 sayHi.counter = 0，不会 在函数内定义一个局部变量 counter。换句话说，属性 counter 和变量 let counter 是毫不相关的两个东西。

  > 我们可以把函数当作对象，在它里面存储属性，但是这对它的执行没有任何影响。变量不是函数属性，反之亦然。它们之间是平行的

> 使用函数属性代替闭包

    function makeCounter() {
      // 不需要这个了
      // let count = 0

      function counter() {
        return counter.count++;
      };

      counter.count = 0;

      return counter;
    }

    let counter = makeCounter();
    alert( counter() ); // 0
    alert( counter() ); // 1

  > 现在 count 被直接存储在函数里，而不是它外部的词法环境

> 两者最大的不同就是如果 count 的值位于外层（函数）变量中，那么外部的代码无法访问到它，只有嵌套的那些函数可以修改它。而如果它是绑定到函数的，那么就可以这样

    function makeCounter() {

      function counter() {
        return counter.count++;
      };

      counter.count = 0;

      return counter;
    }

    let counter = makeCounter();

    counter.count = 10;
    alert( counter() ); // 10

## 函数表达式
> 普通的函数表达式

    let sayHi = function(who) {
      alert(`Hello, ${who}`);
    };

> 添加一个名字

    let sayHi = function fuc (who) {
      alert(`Hello, ${who}`);
    };
    
> 首先请注意，它仍然是一个函数表达式。在 function 后面加一个名字 "func" 没有使它成为一个函数声明，因为它仍然是作为赋值表达式中的一部分被创建的。
> 添加这个名字当然也没有打破任何东西。
> 函数依然可以通过 sayHi() 来调用

- 关于名字 func 有两个特殊的地方，这就是添加它的原因：

  > 它允许函数在内部引用自己。
  > 它在函数外是不可见的。

> 为什么不直接使用 sayHi来调用自己

    let sayHi = function fuc (who) {
      alert(`Hello, ${who}`);
      fuc('why')
    };

    let welcome = sayHi
    sayHi = null

    welcome('ok') // Error 会报错
  
> 函数声明没有这个东西

1. 这里所讲的“内部名”特性只针对函数表达式，而不是函数声明。对于函数声明，没有用来添加“内部”名的语法。
2. 有时，当我们需要一个可靠的内部名时，这就成为了你把函数声明重写成函数表达式的理由了。