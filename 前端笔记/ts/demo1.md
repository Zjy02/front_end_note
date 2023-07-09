# 语言类型

1. js 属于 动态类型语言

- 动态类型语言在运行的时候才知道错误

2. java .. 属于静态类型语言

- 静态类型语言在编译的时候就知道错误

## 基本数据类型

    let isDone:Boolean = false
    let age:Number = 10
    let char:string = 'aavv'
    let un:undefined = undefined
    let n:null = null
    let params:any = 45
    params = "a"

## 数组

    //number类型的数组
    let arr: number[]  = [1,23,4]
    //只能向数组里添加number类型 否则报错
    arr.push(45)

    function test(){
        //arguments是类数组 没有数组的方法
        console.log(arguments)

    }

## 元组

    //元组本质上就是数组，只是指定的元素的类型
    //下面的例子 数组里面的元素只能是string 和 number
    //初始化的时候不能超过2(这个值取决于你定义的元组)个
    let user: [string,number] = ['vv',1]

    //可以用push突破限制
    //但是只能push string 和number类型的数据
    user.psuh(1)

## interface 接口 (duck typing)鸭子类型

> 用来对对象的约束 静态检查 ，(不会编译成 js 代码)
> 对对象的形状(shape)进行描述

    //I可以提醒别人是接口
    interface Iperson {
        readonly id: number;
        name:string;
        age?:number
    }
    let v:Iperson = {
        id:1122,
        name:'1',
        age:1
    }
    v.id = 1

- 对象初始化的时候要与接口一样 不能多添加/缺少一个属性 类型也要一至
- ？ 为可选属性 声明对象是可以添加 也可以不加，初始化之后不能再对对象进行添加 name? (接口中的可选属性)
- readonly 为只读属性, 初始化的时候必须要加上 初始化后就不能修改 只能读取

## function 函数

    //声明了一个函数，并且定义了输入的数据类型和输出的数据类型
    //定义了输出数据类型 就必须 要有return
    // 传入参数是z是可选的 xy是必须传的参数
    function add(x: number, y : number, z?: number):number{
    if(typeof z == 'number'){
        return z +y
    }
    return x + y
    }
    //可以用interface 来定义 函数类型
    interface Isun {
        (x: number, y : number, z?: number):number
    }
    //:后面实在定义类型 此时add2 也是函数类型 并且可以将add赋值给add2
    let add2: (x: number, y : number, z?: number)=> number = add

> 将一个函数赋给变量，变量会获得一个函数类型

### 类型推论

    //在没有声明类型时 ts 会自动帮我们推论出变量类型
    let str = '1'
    str = 1 //会报错

## union type 联合类型

    // a可以是number 或者 string
    let a: number || string

    // 在没有确定a 为什么类型时无法访问a 具体类型的属性
    //length为string的属性
    //只能访问number 和 string的公共属性 如 valueof tostring
    a.length //报错

### 类型断言

    //类型断言 不能使用联合类型的其他类型
    function getlength (input: string | number):number{
    const str = input as string
    if(str.length){
        return str.length
    }else{
        const number = input as number
        return number.toString.length
    }

}

### type guard 类型守护

    //在if 分支中ts会自动判断类型
    function getlength (input: string | number):number {
        if( typeof input == 'string'){

    // 这里ts判断input为string，此时就可以用input.length
            return input.length
        }else{
            return input.toString.length
        }
    }

# class

> 原理使用原型链来实现继承

- 类
- 对象
- 面向对象:封装 继承 多态

1. public

2. private

3. protected

## implements

> 累继承接口后要重写接口的方法和属性
> 接口可以继承接口

    interface radio {
        swiith(trigger:boolean): void
    }
    interface bettery {
        check():void;
    }

    interface radioandbettery extends radio{
        check():void;
    }
    class car implements radio{
        swiith(trigger:boolean){

        }
    }
    // 与implements radioandbettery 一样效果
    class cellphone implements radio,bettery{
        swiith(trigger:boolean){

        }
        check(): void {

        }
    }

# 枚举

    数字枚举
    enum dir {
        up,   //0
        down, //1
        left, //2
        right //3
    }

    console.log(dir.up) // 0
    console.log(dir[0]) // up

    enum a {
            up = 10,   //10
            down,      //11
            left,     //12
            right     //13
        }

        字符串枚举

        const enum a {
            up = 'up',
            down = 'down',
            left = 'left',
            right= 'right'
        }

# 泛型

    //再用到的时候再填入类型值
    function swap<T,U>(tuple:[T,U]) : [U,T] {
        return [tuple[1],tuple[0]]
    }

    const result = swap(['string',123])

## 约束泛型

    //函数拒收的参数属性包括length
    //利用接口来限制传入的参数
    interface Iwith {
        length:number
    }

    function echoa<T extends Iwith> (arg:T): T {
        console.log(arg.length)
        return arg
    }

    const str = echoa('str')
    const obj = echoa({ length:1,age:1 })
    const arr2 = echoa([1,2,3])

- 接口使用泛型

  interface tow<T,U> {
  key:T,
  value:U
  }

  const KPI: tow<number,string> = {key:1,value:'1'}

# 类型别名 type aliase

    为定义的类型起一个别名

    type strandnum = string |  number
    let a : strandnum = "1"

##

    //number 只能为一
    const number:1 = 1

    // a 只能为'up' 'down' 'left' 'right' 中的几个
    type dir = 'up' | 'down' | 'left' | 'right'
    let a : dir = "left"


    interface Ic {
        age:number
    }
    type c = Tc & { name: string}

    let d : c = {name:'1',age:1}

## 声明文件

    //放在d.ts文件上
    declare var jquery : (selector: string) => any;
    jquery('#foo')
