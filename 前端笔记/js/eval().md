# eval()

> 函数会将传入的字符串当做 js 代码运行

    console.log(eval('2 + 2'));
    // Expected output: 4

    console.log(eval(new String('2 + 2')));
    // Expected output: 2 + 2

    console.log(eval('2 + 2') === eval('4'));
    // Expected output: true

    console.log(eval('2 + 2') === eval(new String('2 + 2')));
    // Expected output: false

- 不建议使用 eval() 使用 Function()代替
