# 常用字符串方法

1. charAt()
2. charCodeAt()
3. concant()
4. fromChacode()
5. indexOf()
6. lastIndexOf()
7. match(regexp)
8. replace()
9. search()
10. slice()
11. split()
12. substr()
13. substring()
14. toLowerCase()
15. toUpperCase()
16. includes()
17. endsWith()
18. repeat()
19. valueOf()
20. trim()

### charAt()

> str.charAt(x) 返回字符串中 x 位置的字符，

    var myString = 'jQuery FTW!!!';
    console.log(myString.charAt(7));
    // F

### charCodeAt()

> str.charCodeAt(x)返回字符串中的 x 位置的 Unicode

    var message="jquery4u"
    alert(message.charCodeAt(1))
    //113
    'z'.charCodeAt()
    //122

### concat()

> 用于两个连接两个或者多个字符串，此方法不会改变原字符串，返回拼接的字符串

    var message="Sam"
    var final=message.concat(" is a"," hopeless romantic.")
    alert(final)
    //   "Sam is a hopeless romantic."

### fromCharcode()

> str.fromCharcode(c1,c2)转换一组 Unicode 值转换为字符。

    console.log(String.fromCharCode(97,98,99,120,121,122))
    //output: abcxyz
    console.log(String.fromCharCode(72,69,76,76,79))
    //output: HELLO

### indexOf()

> str.indexOf(str,index),str 是要查找的字符串，index 是从那个地方开始查找，返回值是查找的字符串的索引，没找到返回 -1

    'abcdefghigklmnopqrstuvwxyz'.indexOf('b')
    //1
    'abcdefghigklmnopqrstuvwxyz'.indexOf('b',3)
    //-1

### lastIndexOf()

> 和 str.indexOf(str,index),查找 str 在字符串中最后出现的位置，index 是从哪里查找

        var myString = 'javascript rox';
        console.log(myString.lastIndexOf('r'));
        //output: 11

### match()

> 根据正则表达式来搜索匹配项，返回查找的字符串，没有返回 null

    var intRegex = /[0-9 -()+]+$/;

    var myNumber = '999';
    var myInt = myNumber.match(intRegex);
    console.log(isInt);
    //output: 999

    var myString = '999 JS Coders';
    var myInt = myString.match(intRegex);
    console.log(isInt);
    //output: null

### replace()

> str.replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

    var myString = '999 JavaScript Coders';
    console.log(myString.replace(/JavaScript/i, "jQuery"));
    //output: 999 jQuery Coders

    var myString = '999 JavaScript Coders';
    console.log(myString.replace(new RegExp( "999", "gi" ), "The"));
    //output: The JavaScript Coders

### search()

> str.search(str/regexp) 查询 str 的位置

### slice()

> ste.slice(start,end) 截取字符串，包头不包尾，不传参数相当于把整个字符串复制过去

### split()

> str.split(str,num) 以 str 为分隔符吧字符串切割成字符串数组，nums 是数组的长度

    let str = '1,2,3,444444444,5555,5,6,7,8888888'
    str.split(',',4)
    ['1', '2', '3', '444444444']

### substr()

> str.substr(index,num),从 index 下标开始(包含),截取 num 个字符

### substring()

> str.substring(indexStart[, indexEnd]),提取从 indexStart 到 indexEnd（不包括）之间的字符
> 提取从 indexStart 到 indexEnd（不包括）之间的字符

### toLowerCase()

> 方法用于把字符串转换为小写

### toLowerCase()

> 用于把字符串转换为大写。

### includes()

> includes() 方法用于检查字符串是否包含指定的字符串或字符。

    var mystring = "Hello, welcome to edureka";

    var n = mystring.includes("edureka");
    //output: True

### endsWith()

> endsWith()函数检查字符串是否以指定的字符串或字符结束。

    var mystr = "List of javascript functions";
    var n = mystr.endsWith("functions");
    //output: True

### repeat()

> repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

    var string = "Welcome to Edureka";
    string.repeat(2);
    //output: Welcome to Edureka Welcome to Edureka

### valueOf()

> valueOf() 方法返回一个 String 对象的原始值（primitive value），该值等同于 String.prototype.toString()。

    var mystr = "Hello World!";
    var res = mystr.valueOf();
    //output: Hello World!

### trim()

> trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）

    var str = "     Hello Edureka!     ";
    alert(str.trim());
