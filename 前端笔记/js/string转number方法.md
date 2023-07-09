# Number()

    字符串：全部由数字组成则返回数字，包含非数字的字符则返回NaN，空字符串返回0。
    Infinity和数字：原样返回。
    null / false：返回0。
    undefined：返回NaN。

# parseInt()

    parseInt(string,radix)
    string为字符串，如果不是字符串则先转还成字符串
    radix为进制 取值范围2~36

    string前后的空格会被忽略。
    string参与转换的只有位于前面的、连续的数字部分，如'12m'中的'12'，这一点与有洁癖的Number()不同。
    string中的数字的进制不一定是10进制，是由radix参数指定的，只有符合radix指定的进制的合法数字可以参与转换。例如如果radix为2，string中只有二进制允许的数字0和1是有效的，其他的数字都是非法的。例如0112只有011能转换，结果相当于二进制的11转为十进制，得到3。
    Infinity/null/undefined/false会返回NaN，这一点与Number()不同（其实严格来说parseInt会先将这些值转为字符串），简单来说就是，parseInt只认数字。
    radix不填或填0的时候默认为10，如果string是以'0x'/'0X'开头的，将作为16进制来解析，radix默认为16。radix超出指定范围返回NaN。
    任何时候都应该显式指定radix的值，因为radix默认为10的表现因环境而异，不能指望
