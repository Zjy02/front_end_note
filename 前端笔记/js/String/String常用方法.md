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

> charAt(x) 返回字符串中 x 位置的字符，

    var myString = 'jQuery FTW!!!';
    console.log(myString.charAt(7));
    // F

### charCodeAt()

> charCodeAt(x)返回字符串中的 x 位置的 Unicode

    var message="jquery4u"
    alert(message.charCodeAt(1)
    //113

### concat()

> 用于两个连接两个或者多个字符串，此方法不会改变原字符串，返回拼接的字符串

    var message="Sam"
    var final=message.concat(" is a"," hopeless romantic.")
    alert(final)
    //   "Sam is a hopeless romantic."

### fromCharcode()

> fromCharcode(c1,c2)转换一组 Unicode 值转换为字符。

    console.log(String.fromCharCode(97,98,99,120,121,122))
    //output: abcxyz
    console.log(String.fromCharCode(72,69,76,76,79))
    //output: HELLO

### indexOf()

> indexOf(str,index),str 是要查找的字符串，index 是从那个地方开始查找，返回值是查找的字符串的索引，没找到返回 -1

    'abcdefghigklmnopqrstuvwxyz'.indexOf('b')
    //1
    'abcdefghigklmnopqrstuvwxyz'.indexOf('b',3)
    //-1

### lastIndexOf()

> 和 indexOf(str,index),查找 str 在字符串中最后出现的位置，index 是从哪里查找

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

> replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

    var myString = '999 JavaScript Coders';
    console.log(myString.replace(/JavaScript/i, "jQuery"));
    //output: 999 jQuery Coders

    var myString = '999 JavaScript Coders';
    console.log(myString.replace(new RegExp( "999", "gi" ), "The"));
    //output: The JavaScript Coders
