// 模板字符串基本使用
const name = 'tom'
const age = 18
const str = `my name is ${name}, age is ${age}`

function a(...args){
    console.log(args);
}

// 可以调用函数，以变量为分隔符，将字符串变为数组(如果变量后面没有字符串，会加一个空字符串)，变量分别为第二，第三个参数...
// [ [ 'my name is ', ', age is ', '' ], 'tom', 18 ]
a`my name is ${name}, age is ${age}`