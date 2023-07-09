# thunk 函数

> 编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数
> 它是"传名调用"的一种实现策略，用来替换某个表达式

    function f(m){
     return m * 2;
    }

    f(x + 5);

    // 等同于
    var thunk = function () {
     return x + 5;
    };

    function f(thunk){
     return thunk() * 2;
    }

# javascript 中的 thunk 函数

> 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数

    // 正常版本的readFile（多参数版本）
    fs.readFile(fileName, callback);

    // Thunk版本的readFile（单参数版本）
    var readFileThunk = Thunk(fileName);
    readFileThunk(callback);

    var Thunk = function (fileName){
    return function (callback){
        return fs.readFile(fileName, callback);
    };
    };

> thunk 函数使参数和回调分开
