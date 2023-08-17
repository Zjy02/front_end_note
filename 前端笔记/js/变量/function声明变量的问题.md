## function 声明变量

> 在块级作用域中，不使用关键字声明变量，会让变量提升到全局
      console.log(a,window.a) //undefined undefined 这里会报错
      {
        console.log(a,window.a) //undefined undefined 这里报错
        a = 10
        console.log(a,window.a) // 10 10
      }
      console.log(a,window.a)   // 10 10

> 上面代码，只用在执行声明代码，变量才会挂载到全局

      console.log(window.a,a);//undefined  undefined
      {
          console.log(window.a,a);//undefined  、undefined
          var a = 10;
          console.log(window.a,a)//10 10
      }
      console.log(window.a,a);//10 10

> 上面，使用var声明变量，可以看出，var 没执行代码之前会提升到块级作用域顶部，并且挂载到全局
> 只是将声明提升上去，赋值操作并没有

- 总结

1. 在块级作用域中默认声明的变量，只有代码执行到声明语句之后，才可以进行访问，否则会报错。
2. 块级作用域中默认声明的变量会被提升到全局作用域


> 在阮一峰的ECMAScript6入门中提到
1. ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
2. ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
3. 原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。

允许在块级作用域内声明函数。
函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。
4. 函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。
5. 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
6. 还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域


> 块级作用域中声明函数 就像预先在全局作用域中使用var声明一个变量，默认值为undefined

      console.log(window.a,a);//undefined undefined
      {
        console.log(window.a,a);//undefined function a(){}
        function a(){};
        console.log(window.a,a)//function a(){} function a(){}
      }
      console.log(window.a,a);//function a(){} function a(){}
    
> 上面代码，函数声明还在会会块级作用域中提升到顶部，并且会提升到全局作用域，只用在执行函数声明时，才会映射到全局



> 在块级作用中，有同名的变量和函数声明时

    console.log(window.a,a);//undefined undefined
    {
        console.log(window.a,a);//undefined function a(){}
        function a() {};
        a = 10;
        console.log(window.a,a); //function a(){}  10
    };
    console.log(window.a,a); //function a(){}  function a(){}

> 在这里，首先，块级作用域函数a的声明会被提升到全局作用域，第一行打印比较符合预期。然后在块级作用域中，由于声明函数a提升到块级作用域顶端，所以打印a = function a(){}，而window.a由于并没有执行函数定义的那一行代码，所以仍然为undefined。当执行到声明函数定义的时候，就会把函数a映射到全局作用域中。当执行a = 10的时候，JS引擎会进行LHS查找，此时，声明函数已经被同时提升到全局作用域和块级作用域顶端了，由于遮蔽效果，此时查找a只会找到块级作用域内的a，并不会找到全局作用域的a，这时，a已经被定义，a = 10只会执行赋值操作，并不会进行提升

- 遮蔽效果，不同作用域中相同名称的变量就会触发遮蔽效应(shadowing)
> 在块级作用域中有遮蔽效果，在函数作用域中也有，var let const 都有遮蔽效果
> 具体参考 [JS中的块作用域和遮蔽效应](https://segmentfault.com/a/1190000041847386
)
    console.log(window.a,a);//undefined undefined
    {
        console.log(window.a,a);//undefined function a(){}
        a = 10;
        console.log(window.a,a)  //undefined 10
        function a() {};
        console.log(window.a,a); //10  10
    };
    console.log(window.a,a); //10 10
> 同样，在执行 a = 10 时,并不会提升到去全局，执行到函数声明时，会重写全局上的对应的同名变量，将全局上的a赋值为10


- 总结 

> 块级作用域函数只有执行函数声明语句的时候，才会重写对应的全局作用域上的同名变量。