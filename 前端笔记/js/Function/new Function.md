## new Function 语法

> 语法 let func = new Function ([arg1, arg2, ...argN], functionBody);

      let say = new Function('a','b','alert( a + b )')

      say(1,2) // 3

> 可以不用传递参数

      let say = new Function('alert(3)')

> 应用场景，我们可以接受网络请求传递的字符串，创建一个新的函数执行他  

## 关于闭包

> 如果我们使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境 
> 此类函数无法访问外部（outer）变量，只能访问全局变量(window上的变量，全局var声明的，let const不行)

    function getFunc() {
      let value = "test";

      let func = new Function('alert(value)');

      return func;
    }

    getFunc()(); // error: value is not defined

> 如果 new Function 可以访问外部变量

    问题在于，在将 JavaScript 发布到生产环境之前，需要使用 压缩程序（minifier） 对其进行压缩 —— 一个特殊的程序，通过删除多余的注释和空格等压缩代码 —— 更重要的是，将局部变量命名为较短的变量。

    例如，如果一个函数有 let userName，压缩程序会把它替换为 let a（如果 a 已被占用了，那就使用其他字符），剩余的局部变量也会被进行类似的替换。一般来说这样的替换是安全的，毕竟这些变量是函数内的局部变量，函数外的任何东西都无法访问它。在函数内部，压缩程序会替换所有使用了这些变量的代码。压缩程序很聪明，它会分析代码的结构，而不是呆板地查找然后替换，因此它不会“破坏”你的程序。

    但是在这种情况下，如果使 new Function 可以访问自身函数以外的变量，它也很有可能无法找到重命名的 userName，这是因为新函数的创建发生在代码压缩以后，变量名已经被替换了。

    即使我们可以在 new Function 中访问外部词法环境，我们也会受挫于压缩程序。

    此外，这样的代码在架构上很差并且容易出错。

    当我们需要向 new Function 创建出的新函数传递数据时，我们必须显式地通过参数进行传递。