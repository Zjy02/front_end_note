## 数字方法

    Number.parseFloat()	
    将字符串转换成浮点数,和全局方法 parseFloat()作用一致。

    Number.parseInt()	
    将字符串转换成整型数字，和全局方法 parseInt() 作用一致。

    Number.isFinite()	
        判断传递的参数是否为有限数字。

    Number.isInteger()	
        判断传递的参数是否为整数。

    Number.isNaN()	
        判断传递的参数是否为 isNaN()。

    Number.isSafeInteger()	
        判断传递的参数是否为安全整数。

## 数字类型原型上的一些方法

    toExponentia() 
        返回数字的指数形式的字符串 如1.23e+2

    toFixed() 
        返回指定小数位数的表达形式
        var a = 123
        b = a.toFixed(2); //b=123.00
    toPrecision() 
        返回一个指定精度的数字 如
        var a = 123;
        b = a.toPrecision(2); // b= 1.2e+2