# Object.is()

> 用来确定两个值是否相同,返回一个 boolean 值
> Object.is(value1, value2)
> 如果下面有一个成立 两个值就相等

    都是 undefined
    都是 null
    都是 true 或者都是 false
    都是长度相同、字符相同、顺序相同的字符串
    都是相同的对象（意味着两个值都引用了内存中的同一对象）
    都是 BigInt 且具有相同的数值
    都是 symbol 且引用相同的 symbol 值
    都是数字且
        都是 +0
        都是 -0
        都是 NaN
        都有相同的值，非零且都不是 NaN

> Object.is() 不与 "==" 等价 Object.is() 不会对其操作数进行类型转换
> Object.is() 也不等价于 "===" 运算符,他们唯一区别在于处理 0 和 NaN 时

    === 会将 +0 -0 视为相等(==也是这样的)
    === 将 NaN NaN 视为不相等(==也是这样的)
